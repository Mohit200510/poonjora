
import { createServer, loadEnv } from "vite";
import fs from "node:fs/promises";
import path from "node:path";

// ========================================
// 1. Load Supabase environment variables
// ========================================

const env = loadEnv("production", process.cwd(), "VITE_");

const supabaseUrl =
  process.env.VITE_SUPABASE_URL ||
  env.VITE_SUPABASE_URL;

const supabaseKey =
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY"
  );
}

// ========================================
// 2. Configuration
// ========================================

const SITE_URL = "https://poonjora.in";

const FESTIVAL_YEARS = [2026, 2027];

// Only approved URLs appear in the sitemap.
// Diwali 2027 is not approved yet.
const APPROVED_FESTIVAL_ROUTES = new Set([
  "/festivals/diwali/2026",
]);

const MAX_RECORDS = 1000;

const distDirectory = path.resolve(
  process.cwd(),
  "dist"
);

const templatePath = path.join(
  distDirectory,
  "index.html"
);

const sitemapPath = path.join(
  distDirectory,
  "sitemap.xml"
);

// ========================================
// 3. HTML and XML escaping
// ========================================

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ========================================
// 4. Validate festival slug
// ========================================

function isValidSlug(slug) {
  return (
    typeof slug === "string" &&
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)
  );
}

// ========================================
// 5. Start Vite SSR module loader
// ========================================

const server = await createServer({
  server: {
    middlewareMode: true,
  },
  appType: "custom",
});

try {
  console.log(
    "Starting Poonjora festival pre-rendering..."
  );

  // ========================================
  // 6. Load festival renderer
  // ========================================

  const { renderFestivalSections } =
    await server.ssrLoadModule(
      "/src/entry-server.jsx"
    );

  if (typeof renderFestivalSections !== "function") {
    throw new Error(
      "renderFestivalSections is not available."
    );
  }

  // ========================================
  // 7. Fetch published festival content
  // ========================================

  const url = new URL(
    `${supabaseUrl.replace(/\/$/, "")}/rest/v1/festival_content`
  );

  url.searchParams.set(
    "is_published",
    "eq.true"
  );

  url.searchParams.set(
    "select",
    "*"
  );

  url.searchParams.set(
    "order",
    "slug.asc"
  );

  url.searchParams.set(
    "limit",
    String(MAX_RECORDS)
  );

  const response = await fetch(url, {
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Supabase request failed (${response.status}): ${errorText}`
    );
  }

  const records = await response.json();

  if (!Array.isArray(records)) {
    throw new Error(
      "Invalid festival_content response."
    );
  }

  if (records.length === 0) {
    throw new Error(
      "No published festival content found."
    );
  }

  if (records.length >= MAX_RECORDS) {
    throw new Error(
      "Festival record limit reached. Pagination is required."
    );
  }

  console.log(
    `Published festivals: ${records.length}`
  );

  // ========================================
  // 8. Read production HTML
  // ========================================

  const baseTemplate = await fs.readFile(
    templatePath,
    "utf8"
  );

  const rootPattern =
    /<div\s+id=["']root["']\s*><\/div>/i;

  if (!rootPattern.test(baseTemplate)) {
    throw new Error(
      "React root element not found in dist/index.html"
    );
  }

  if (!baseTemplate.includes("</head>")) {
    throw new Error(
      "HTML head closing tag not found."
    );
  }

  // ========================================
  // 9. Generate festival HTML pages
  // ========================================

  let generatedCount = 0;

  const generatedRoutes = [];
  const seenSlugs = new Set();

  for (const data of records) {
    const slug = data.slug;

    if (!isValidSlug(slug)) {
      throw new Error(
        `Invalid festival slug: ${slug}`
      );
    }

    if (seenSlugs.has(slug)) {
      throw new Error(
        `Duplicate published festival slug: ${slug}`
      );
    }

    seenSlugs.add(slug);

    if (
      typeof data.title !== "string" ||
      !data.title.trim()
    ) {
      throw new Error(
        `Missing festival title: ${slug}`
      );
    }

    const content = {
      ...data,

      alternate: data.alternate_name,

      artwork: {
        left: data.hero_left_image,
        right: data.hero_right_image,
      },
    };

    console.log(
      `Rendering: ${content.title}`
    );

    const festivalHtml =
      renderFestivalSections(content);

    if (
      typeof festivalHtml !== "string" ||
      !festivalHtml.trim()
    ) {
      throw new Error(
        `Empty editorial HTML for ${slug}`
      );
    }

    for (const year of FESTIVAL_YEARS) {
      const festivalPath =
        `/festivals/${slug}/${year}`;

     const canonicalUrl =
  `${SITE_URL}${festivalPath}/`;

      const seoTitle =
        `${content.title} ${year}: Puja Vidhi, Samagri & Katha | Poonjora`;

      const seoDescription =
        `Explore ${content.title} ${year} puja vidhi, samagri, katha, mantras, traditions and festival significance on Poonjora.`;

      const seoTags = `
<title>${escapeHtml(seoTitle)}</title>
<meta name="description" content="${escapeHtml(seoDescription)}" />
<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />
`;

      let html = baseTemplate.replace(
        rootPattern,
        `<div id="root">${festivalHtml}</div>`
      );

      html = html.replace(
        "</head>",
        `${seoTags}\n</head>`
      );

      // Unapproved pages remain accessible
      // for testing but are marked noindex.
      if (
        !APPROVED_FESTIVAL_ROUTES.has(festivalPath)
      ) {
        html = html.replace(
          "</head>",
          '<meta name="robots" content="noindex,follow" />\n</head>'
        );
      }

      const outputDirectory = path.join(
        distDirectory,
        "festivals",
        slug,
        String(year)
      );

      await fs.mkdir(
        outputDirectory,
        {
          recursive: true,
        }
      );

      const outputFile = path.join(
        outputDirectory,
        "index.html"
      );

      await fs.writeFile(
        outputFile,
        html,
        "utf8"
      );

      generatedRoutes.push(festivalPath);

      generatedCount++;

      console.log(
        `Generated: ${festivalPath}`
      );
    }
  }

  // ========================================
  // 10. Generate sitemap
  // ========================================

  let sitemap = await fs.readFile(
    sitemapPath,
    "utf8"
  );

  if (!sitemap.includes("</urlset>")) {
    throw new Error(
      "Invalid sitemap.xml: missing </urlset>."
    );
  }

  const approvedRoutes = generatedRoutes.filter(
    (route) =>
      APPROVED_FESTIVAL_ROUTES.has(route)
  );

  for (const route of approvedRoutes) {
   const fullUrl = `${SITE_URL}${route}/`;

    const escapedUrl = escapeHtml(fullUrl);

    // Avoid duplicate entries.
    if (
      sitemap.includes(
        `<loc>${escapedUrl}</loc>`
      )
    ) {
      continue;
    }

    const sitemapEntry = `
  <url>
    <loc>${escapedUrl}</loc>
  </url>
`;

    sitemap = sitemap.replace(
      "</urlset>",
      `${sitemapEntry}\n</urlset>`
    );
  }

  await fs.writeFile(
    sitemapPath,
    sitemap,
    "utf8"
  );

  // ========================================
  // 11. Final summary
  // ========================================

  console.log(
    "--------------------------------------"
  );

  console.log(
    "Poonjora festival pre-rendering successful!"
  );

  console.log(
    `Published festivals: ${records.length}`
  );

  console.log(
    `Years: ${FESTIVAL_YEARS.join(", ")}`
  );

  console.log(
    `Generated pages: ${generatedCount}`
  );

  console.log(
    `Approved sitemap URLs: ${approvedRoutes.length}`
  );

  console.log(
    "Generated routes:"
  );

  generatedRoutes.forEach((route) => {
    console.log(
      `  ${route}`
    );
  });

  console.log(
    `Sitemap: ${sitemapPath}`
  );

  console.log(
    "--------------------------------------"
  );

} catch (error) {
  console.error(
    "Festival pre-rendering failed:",
    error
  );

  process.exitCode = 1;

} finally {
  await server.close();
}

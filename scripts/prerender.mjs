
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
// 2. Festival configuration
// ========================================

const festivalSlug = "diwali";
const festivalYear = "2026";

const festivalPath =
  `/festivals/${festivalSlug}/${festivalYear}`;

const canonicalUrl =
  `https://poonjora.in${festivalPath}`;

// ========================================
// 3. HTML escaping helper
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
// 4. Start Vite SSR module loader
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
  // 5. Load festival rendering function
  // ========================================

  const { renderFestivalSections } =
    await server.ssrLoadModule(
      "/src/entry-server.jsx"
    );

  // ========================================
  // 6. Fetch published festival content
  // ========================================

  const url = new URL(
    `${supabaseUrl.replace(/\/$/, "")}/rest/v1/festival_content`
  );

  url.searchParams.set(
    "slug",
    `eq.${festivalSlug}`
  );

  url.searchParams.set(
    "is_published",
    "eq.true"
  );

  url.searchParams.set(
    "select",
    "*"
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

  if (
    !Array.isArray(records) ||
    records.length !== 1
  ) {
    throw new Error(
      "Expected exactly one published Diwali record in festival_content."
    );
  }

  const data = records[0];

  // ========================================
  // 7. Prepare festival content
  // ========================================

  const content = {
    ...data,

    alternate: data.alternate_name,

    artwork: {
      left: data.hero_left_image,
      right: data.hero_right_image,
    },
  };

  console.log(
    `Loaded festival: ${content.title}`
  );

  // ========================================
  // 8. Generate festival HTML
  // ========================================

  const festivalHtml =
    renderFestivalSections(content);

  if (
    !festivalHtml ||
    !festivalHtml.trim()
  ) {
    throw new Error(
      "Festival HTML generation returned empty content."
    );
  }

  console.log(
    "Festival editorial HTML generated."
  );

  // ========================================
  // 9. Read production Vite HTML
  // ========================================

  const distDirectory = path.resolve(
    process.cwd(),
    "dist"
  );

  const templatePath = path.join(
    distDirectory,
    "index.html"
  );

  let template = await fs.readFile(
    templatePath,
    "utf8"
  );

  // ========================================
  // 10. Insert editorial HTML into root
  // ========================================

  const rootPattern =
    /<div\s+id=["']root["']\s*><\/div>/i;

  if (!rootPattern.test(template)) {
    throw new Error(
      "React root element not found in dist/index.html"
    );
  }

  template = template.replace(
    rootPattern,
    `<div id="root">${festivalHtml}</div>`
  );

  // ========================================
  // 11. Add SEO metadata
  // ========================================

  const seoTitle =
    `${content.title} ${festivalYear}: Puja Vidhi, Samagri & Katha | Poonjora`;

  const seoDescription =
    `Explore ${content.title} ${festivalYear} puja vidhi, samagri, katha, mantras, traditions and festival significance on Poonjora.`;

  const seoTags = `
<title>${escapeHtml(seoTitle)}</title>
<meta name="description" content="${escapeHtml(seoDescription)}" />
<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />
`;

  if (!template.includes("</head>")) {
    throw new Error(
      "HTML head closing tag not found."
    );
  }

  template = template.replace(
    "</head>",
    `${seoTags}\n</head>`
  );

  // ========================================
  // 12. Create festival route directory
  // ========================================

  const outputDirectory = path.join(
    distDirectory,
    "festivals",
    festivalSlug,
    festivalYear
  );

  await fs.mkdir(
    outputDirectory,
    {
      recursive: true,
    }
  );

  // ========================================
  // 13. Write production HTML
  // ========================================

  const outputFile = path.join(
    outputDirectory,
    "index.html"
  );

  await fs.writeFile(
    outputFile,
    template,
    "utf8"
  );

  // ========================================
  // 14. Success
  // ========================================

  console.log(
    "--------------------------------------"
  );

  console.log(
    "Poonjora festival pre-rendering successful!"
  );

  console.log(
    `Festival: ${content.title}`
  );

  console.log(
    `Year: ${festivalYear}`
  );

  console.log(
    `Route: ${festivalPath}`
  );

  console.log(
    `Output: ${outputFile}`
  );

  console.log(
    `HTML size: ${Buffer.byteLength(template)} bytes`
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


import { createServer, loadEnv } from "vite";
import fs from "node:fs/promises";
import path from "node:path";

const env = loadEnv("production", process.cwd(), "VITE_");
const supabaseUrl =
  process.env.VITE_SUPABASE_URL || env.VITE_SUPABASE_URL;
const supabaseKey =
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}

const SITE_URL = "https://poonjora.com";
const FESTIVAL_YEARS = [2026];
const MAX_RECORDS = 1000;

const distDirectory = path.resolve(process.cwd(), "dist");
const templatePath = path.join(distDirectory, "index.html");
const sitemapPath = path.join(distDirectory, "sitemap.xml");

const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const isValidSlug = (slug) =>
  typeof slug === "string" &&
  /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);

const rootPattern =
  /<div\s+id=["']root["']\s*><\/div>/i;

async function fetchPublished(table, order) {
  const url = new URL(
    `${supabaseUrl.replace(/\/$/, "")}/rest/v1/${table}`
  );

  url.searchParams.set("is_published", "eq.true");
  url.searchParams.set("select", "*");
  url.searchParams.set("order", order);
  url.searchParams.set("limit", String(MAX_RECORDS));

  const response = await fetch(url, {
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      `${table} fetch failed (${response.status}): ${await response.text()}`
    );
  }

  const records = await response.json();

  if (!Array.isArray(records)) {
    throw new Error(`Invalid ${table} response`);
  }

  if (records.length >= MAX_RECORDS) {
    throw new Error(`${table} limit reached; implement pagination`);
  }

  return records;
}

function normalizeContent(record) {
  return {
    ...record,
    alternate: record.alternate_name,
    artwork: {
      left: record.hero_left_image,
      right: record.hero_right_image,
    },
  };
}

function buildSeo(content, language, year, canonicalUrl, alternateUrl) {
  const seoTitle =
    content.seo_title?.trim() ||
    (language === "hi"
      ? `${content.title} ${year}: पूजा विधि, सामग्री और कथा | Poonjora`
      : `${content.title} ${year}: Puja Vidhi, Samagri & Katha | Poonjora`);

  const seoDescription =
    content.seo_description?.trim() ||
    (language === "hi"
      ? `${content.title} ${year} की पूजा विधि, सामग्री, कथा, मंत्र और धार्मिक महत्व जानें।`
      : `Explore ${content.title} ${year} puja vidhi, samagri, katha, mantras, traditions and festival significance on Poonjora.`);

  const socialImage =
    content.slug === "chhath-puja"
      ? "https://cffhhqqkcrcxxivilosk.supabase.co/storage/v1/object/public/festival-images/chhath-puja/poonjora-chhath-puja-social-1200x630.jpg"
      : content.artwork?.left || "";

  return `
<title>${escapeHtml(seoTitle)}</title>
<meta name="description" content="${escapeHtml(seoDescription)}" />
<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />

${
  alternateUrl
    ? `<link rel="alternate" hreflang="en-IN" href="${escapeHtml(
        language === "en" ? canonicalUrl : alternateUrl
      )}" />
<link rel="alternate" hreflang="hi-IN" href="${escapeHtml(
        language === "hi" ? canonicalUrl : alternateUrl
      )}" />`
    : ""
}

<meta property="og:type" content="article" />
<meta property="og:site_name" content="Poonjora" />
<meta property="og:locale" content="${language === "hi" ? "hi_IN" : "en_IN"}" />
<meta property="og:title" content="${escapeHtml(seoTitle)}" />
<meta property="og:description" content="${escapeHtml(seoDescription)}" />
<meta property="og:url" content="${escapeHtml(canonicalUrl)}" />

${
  socialImage
    ? `<meta property="og:image" content="${escapeHtml(socialImage)}" />
<meta property="og:image:alt" content="${escapeHtml(content.title)}" />`
    : ""
}

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${escapeHtml(seoTitle)}" />
<meta name="twitter:description" content="${escapeHtml(seoDescription)}" />
${
  socialImage
    ? `<meta name="twitter:image" content="${escapeHtml(socialImage)}" />`
    : ""
}
`;
}

const server = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
});

try {
  console.log("Starting multilingual festival prerendering...");

  const { renderFestivalSections } =
    await server.ssrLoadModule("/src/entry-server.jsx");

  if (typeof renderFestivalSections !== "function") {
    throw new Error("renderFestivalSections unavailable");
  }

  const [records, translations] = await Promise.all([
    fetchPublished("festival_content", "slug.asc"),
    fetchPublished(
      "festival_content_translations",
      "festival_id.asc"
    ),
  ]);

  if (!records.length) {
    throw new Error("No published English festival content found");
  }

  const hindiByFestivalId = new Map();

  for (const row of translations) {
    if (row.language_code !== "hi") continue;

    if (hindiByFestivalId.has(String(row.festival_id))) {
      throw new Error(
        `Duplicate Hindi translation for festival ${row.festival_id}`
      );
    }

    hindiByFestivalId.set(String(row.festival_id), row);
  }

  console.log(`Published English festivals: ${records.length}`);
  console.log(`Published Hindi translations: ${hindiByFestivalId.size}`);

  const baseTemplate = await fs.readFile(templatePath, "utf8");

  if (
    !rootPattern.test(baseTemplate) ||
    !baseTemplate.includes("</head>")
  ) {
    throw new Error("Invalid dist/index.html template");
  }

  const generatedRoutes = [];
  const seenSlugs = new Set();

  async function writePage(content, language, year, alternateUrl) {
    const route =
      `${language === "hi" ? "/hi" : ""}/festivals/${content.slug}/${year}`;

    const canonicalUrl = `${SITE_URL}${route}/`;

    const festivalHtml = renderFestivalSections(content, language);

    if (
      typeof festivalHtml !== "string" ||
      !festivalHtml.trim()
    ) {
      throw new Error(`Empty HTML: ${route}`);
    }

    let html = baseTemplate.replace(
      rootPattern,
      `<div id="root">${festivalHtml}</div>`
    );

    html = html.replace(
      /<html\b([^>]*)>/i,
      (full, attrs) =>
        `<html${
          /\blang\s*=/.test(attrs)
            ? attrs.replace(
                /\blang\s*=\s*(["']).*?\1/i,
                `lang="${language}"`
              )
            : `${attrs} lang="${language}"`
        }>`
    );

    // Remove generic metadata before adding page-specific SEO.
    html = html.replace(
      /<title\b[^>]*>[\s\S]*?<\/title>/gi,
      ""
    );

    html = html.replace(
      /<meta\s+name=["']description["'][^>]*\/?>/gi,
      ""
    );

    html = html.replace(
      /<link\s+rel=["']canonical["'][^>]*\/?>/gi,
      ""
    );

    html = html.replace(
      "</head>",
      `${buildSeo(
        content,
        language,
        year,
        canonicalUrl,
        alternateUrl
      )}\n</head>`
    );

    const outputDirectory = path.join(
      distDirectory,
      ...route.slice(1).split("/")
    );

    await fs.mkdir(outputDirectory, {
      recursive: true,
    });

    await fs.writeFile(
      path.join(outputDirectory, "index.html"),
      html,
      "utf8"
    );

    generatedRoutes.push(route);
    console.log(`Generated: ${route}`);
  }

  for (const record of records) {
    if (!isValidSlug(record.slug)) {
      throw new Error(`Invalid slug: ${record.slug}`);
    }

    if (seenSlugs.has(record.slug)) {
      throw new Error(`Duplicate slug: ${record.slug}`);
    }

    seenSlugs.add(record.slug);

    if (!record.title?.trim()) {
      throw new Error(`Missing title: ${record.slug}`);
    }

    const english = normalizeContent(record);

    const translation = hindiByFestivalId.get(
      String(record.id)
    );

    const hindi = translation
      ? normalizeContent({
          ...record,
          ...translation,
          id: record.id,
          slug: record.slug,
          hero_left_image: record.hero_left_image,
          hero_right_image: record.hero_right_image,
          seo_title: translation.seo_title,
          seo_description: translation.seo_description,
        })
      : null;

    for (const year of FESTIVAL_YEARS) {
      const enUrl =
        `${SITE_URL}/festivals/${record.slug}/${year}/`;

      const hiUrl =
        `${SITE_URL}/hi/festivals/${record.slug}/${year}/`;

      await writePage(
        english,
        "en",
        year,
        hindi ? hiUrl : null
      );

      if (hindi) {
        await writePage(hindi, "hi", year, enUrl);
      }
    }
  }

  let sitemap = await fs.readFile(
    sitemapPath,
    "utf8"
  );

  if (!sitemap.includes("</urlset>")) {
    throw new Error("Invalid sitemap.xml");
  }

  for (const route of generatedRoutes) {
    const fullUrl = `${SITE_URL}${route}/`;
    const escapedUrl = escapeHtml(fullUrl);

    if (sitemap.includes(`<loc>${escapedUrl}</loc>`)) {
      continue;
    }

    sitemap = sitemap.replace(
      "</urlset>",
      `  <url>
    <loc>${escapedUrl}</loc>
  </url>
</urlset>`
    );
  }

  await fs.writeFile(
    sitemapPath,
    sitemap,
    "utf8"
  );

  console.log("--------------------------------------");
  console.log("Poonjora multilingual prerendering successful!");
  console.log(`English festivals: ${records.length}`);
  console.log(`Published Hindi translations: ${hindiByFestivalId.size}`);
  console.log(`Generated pages: ${generatedRoutes.length}`);
  console.log(`Years: ${FESTIVAL_YEARS.join(", ")}`);
  console.log(`Sitemap: ${sitemapPath}`);
  console.log("--------------------------------------");

} catch (error) {
  console.error("Festival prerendering failed:", error);
  process.exitCode = 1;
} finally {
  await server.close();
}

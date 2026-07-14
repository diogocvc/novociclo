import fs from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "content");
const PUBLIC_DIR = path.join(process.cwd(), "public");
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://novociclo.vercel.app";

const STATIC_ROUTES = [
  { path: "", priority: "1.0" },
  { path: "/manifesto", priority: "0.6" },
  { path: "/sobre", priority: "0.6" },
  { path: "/creditos", priority: "0.3" },
  { path: "/contato", priority: "0.3" },
];

function collectContentSlugs(): string[] {
  const slugs: string[] = [];
  const years = fs.readdirSync(CONTENT_DIR).filter((f) => /^\d{4}$/.test(f));

  for (const year of years) {
    const yearPath = path.join(CONTENT_DIR, year);
    const months = fs
      .readdirSync(yearPath)
      .filter((f) => /^\d{2}$/.test(f));

    for (const month of months) {
      const monthPath = path.join(yearPath, month);
      const files = fs
        .readdirSync(monthPath)
        .filter((f) => f.endsWith(".mdx"));

      for (const file of files) {
        const day = file.replace(".mdx", "");
        slugs.push(`/${year}/${month}/${day}`);
      }
    }
  }

  return slugs;
}

export function generateSitemap(): string {
  const slugs = collectContentSlugs();
  const urls = [
    ...STATIC_ROUTES.map((r) => ({
      loc: `${SITE_URL}${r.path}`,
      priority: r.priority,
    })),
    ...slugs.map((slug) => ({
      loc: `${SITE_URL}${slug}`,
      priority: "0.7",
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return xml;
}

const xml = generateSitemap();
const urlCount = (xml.match(/<loc>/g) ?? []).length;
const outPath = path.join(PUBLIC_DIR, "sitemap.xml");
fs.writeFileSync(outPath, xml, "utf-8");
console.log(`Sitemap generated: ${outPath} (${urlCount} URLs)`);

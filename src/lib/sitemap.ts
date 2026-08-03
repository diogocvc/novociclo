import { getAllChapters } from "@/lib/content";

const DEFAULT_SITE_URL = "https://novociclo-red.vercel.app";

const STATIC_ROUTES = [
  { path: "", priority: "1.0" },
  { path: "/sobre", priority: "0.6" },
  { path: "/creditos", priority: "0.3" },
  { path: "/contato", priority: "0.3" },
];

export function generateSitemap(siteUrl?: string): string {
  const baseUrl = (siteUrl ?? process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL).replace(/\/$/, "");
  const chapters = getAllChapters();

  const urls = [
    ...STATIC_ROUTES.map((r) => ({
      loc: `${baseUrl}${r.path}`,
      priority: r.priority,
    })),
    ...chapters.map((c) => ({
      loc: `${baseUrl}/${c.slug}`,
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

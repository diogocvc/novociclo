import fs from "fs";
import path from "path";
import { generateSitemap } from "@/lib/sitemap";

const PUBLIC_DIR = path.join(process.cwd(), "public");

const xml = generateSitemap();
const urlCount = (xml.match(/<loc>/g) ?? []).length;
const outPath = path.join(PUBLIC_DIR, "sitemap.xml");
fs.writeFileSync(outPath, xml, "utf-8");
console.log(`Sitemap generated: ${outPath} (${urlCount} URLs)`);

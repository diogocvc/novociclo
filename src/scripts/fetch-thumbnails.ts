import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { News } from "@/types";

const CONTENT_DIR = path.join(process.cwd(), "content");
const GENERIC_GE_THUMB =
  "https://s2-ge.glbimg.com/ecRQoCSBk34mh9TLZBn-J1Sxpmw=/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2026/S/p/3Uj3kXREK9fkABSm0L8g/afp-20260705-b9bv84r-v1-highres-fblwc2026match91branor.jpg";

async function extractImageFromUrl(url: string): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; NovoCicloBot/1.0; +https://novociclo.vercel.app)",
      },
    });
    clearTimeout(timeout);

    if (!response.ok) return null;

    const html = await response.text();

    const patterns = [
      /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i,
      /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i,
      /<figure[^>]*class=["'][^"']*thumbnail[^"']*["'][^>]*>.*?<img[^>]+src=["']([^"']+)["']/i,
      /<img[^>]+src=["']([^"']+)["'][^>]*>/i,
    ];

    for (const pattern of patterns) {
      const match = html.match(pattern);
      if (match?.[1]) {
        const img = match[1];
        if (img.startsWith("http") || img.startsWith("//")) {
          return img.startsWith("//") ? `https:${img}` : img;
        }
      }
    }

    return null;
  } catch {
    return null;
  }
}

function needsThumbnail(item: News): boolean {
  return !item.thumbnail || item.thumbnail === GENERIC_GE_THUMB || item.thumbnail === "";
}

async function processFile(filePath: string): Promise<boolean> {
  const raw = fs.readFileSync(filePath, "utf-8");
  const parsed = matter(raw);
  const fm = parsed.data as Record<string, unknown>;

  let changed = false;

  const destaque = fm.noticia_destaque as News | undefined;
  if (destaque && needsThumbnail(destaque)) {
    const img = await extractImageFromUrl(destaque.url);
    if (img) {
      destaque.thumbnail = img;
      changed = true;
      console.log(`  destaque: ${destaque.titulo.slice(0, 60)}... → ${img.slice(0, 80)}...`);
    }
  }

  const refs = fm.noticias_referencia as News[] | undefined;
  if (refs) {
    for (let i = 0; i < refs.length; i++) {
      if (needsThumbnail(refs[i])) {
        const img = await extractImageFromUrl(refs[i].url);
        if (img) {
          refs[i].thumbnail = img;
          changed = true;
          console.log(`  ref[${i}]: ${refs[i].titulo.slice(0, 60)}... → ${img.slice(0, 80)}...`);
        }
      }
    }
  }

  if (!changed) return false;

  const output = matter.stringify(parsed.content, fm);
  fs.writeFileSync(filePath, output, "utf-8");
  return true;
}

async function main(): Promise<void> {
  const contentDir = path.join(CONTENT_DIR, "2026", "07");

  if (!fs.existsSync(contentDir)) {
    console.error("Diretório não encontrado:", contentDir);
    process.exit(1);
  }

  const files = fs
    .readdirSync(contentDir)
    .filter((f) => f.endsWith(".mdx"))
    .sort();

  let updated = 0;
  let skipped = 0;

  for (const file of files) {
    const filePath = path.join(contentDir, file);
    console.log(`\n📄 ${file}`);
    const changed = await processFile(filePath);
    if (changed) {
      updated++;
    } else {
      skipped++;
    }
  }

  console.log(`\n${updated} arquivos atualizados, ${skipped} inalterados`);
}

main().catch((err) => {
  console.error("Erro:", err);
  process.exit(1);
});

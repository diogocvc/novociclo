import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { News } from "@/types";
import { isRelevant, isBlocked } from "@/agents/researcher";
import { collectMdxFiles } from "@/lib/content";

const CONTENT_DIR = path.join(process.cwd(), "content");

interface ChapterFrontmatter {
  id: string;
  data: string;
  slug: string;
  titulo: string;
  subtitulo?: string;
  resumo: string;
  categorias: string[];
  tags: string[];
  referencias: string[];
  tempo_de_leitura: number;
  noticia_destaque?: News;
  noticias_referencia?: News[];
}

function cleanupChapter(filePath: string): boolean {
  const raw = fs.readFileSync(filePath, "utf-8");
  const parsed = matter(raw);
  const fm = parsed.data as unknown as ChapterFrontmatter;

  const refs = fm.noticias_referencia ?? [];
  const validRefs = refs.filter(
    (n) =>
      isRelevant(n.titulo, n.resumo_original, n.url) &&
      !isBlocked(n.titulo, n.resumo_original, n.url),
  );

  let changed = false;

  if (fm.noticia_destaque) {
    const destaqueRelevante =
      isRelevant(
        fm.noticia_destaque.titulo,
        fm.noticia_destaque.resumo_original,
        fm.noticia_destaque.url,
      ) &&
      !isBlocked(
        fm.noticia_destaque.titulo,
        fm.noticia_destaque.resumo_original,
        fm.noticia_destaque.url,
      );

    if (!destaqueRelevante) {
      changed = true;
      if (validRefs.length > 0) {
        fm.noticia_destaque = validRefs[0];
        fm.noticias_referencia = validRefs.slice(1);
      } else {
        delete fm.noticia_destaque;
        fm.noticias_referencia = [];
      }
    } else {
      if (validRefs.length !== refs.length) {
        changed = true;
        fm.noticias_referencia = validRefs;
      }
    }
  } else {
    if (validRefs.length !== refs.length) {
      changed = true;
      fm.noticias_referencia = validRefs;
    }
  }

  if (!changed) return false;

  const output = matter.stringify(parsed.content, fm as unknown as Record<string, unknown>);
  fs.writeFileSync(filePath, output, "utf-8");
  return true;
}

function main(): void {
  const mdxFiles = collectMdxFiles(CONTENT_DIR);
  let cleaned = 0;
  let skipped = 0;

  for (const filePath of mdxFiles) {
    const relativePath = path.relative(CONTENT_DIR, filePath);
    if (cleanupChapter(filePath)) {
      console.log(`🧹 ${relativePath}`);
      cleaned++;
    } else {
      skipped++;
    }
  }

  console.log(`\n${cleaned} limpos, ${skipped} inalterados`);
}

main();

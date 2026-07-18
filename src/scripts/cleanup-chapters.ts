import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { isRelevant, isBlocked } from "@/agents/researcher";

const CONTENT_DIR = path.join(process.cwd(), "content");

interface NewsItem {
  id: string;
  titulo: string;
  resumo_original: string;
  url: string;
  thumbnail?: string;
  fonte: string;
  autor?: string;
  data_publicacao: string;
  idioma: string;
  data_coleta: string;
}

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
  noticia_destaque?: NewsItem;
  noticias_referencia?: NewsItem[];
}

function collectMdxFiles(dir: string): string[] {
  const files: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectMdxFiles(fullPath));
    } else if (entry.name.endsWith(".mdx")) {
      files.push(fullPath);
    }
  }
  return files;
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

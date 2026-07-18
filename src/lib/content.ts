import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { News } from "@/types";

const CONTENT_DIR = path.join(process.cwd(), "content");

interface RawFrontmatter {
  id: string;
  data: string;
  slug: string;
  titulo: string;
  subtitulo?: string;
  resumo: string;
  categorias: string[];
  tags: string[];
  referencias: string[];
  noticia_destaque_id?: string;
  noticias_referencia_ids?: string[];
  noticia_destaque?: News;
  noticias_referencia?: News[];
  tempo_de_leitura: number;
}

export function collectMdxFiles(dir: string): string[] {
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

  return files.sort();
}

export function getAllChapters(): RawFrontmatter[] {
  const mdxFiles = collectMdxFiles(CONTENT_DIR);
  const chapters: RawFrontmatter[] = [];

  for (const filePath of mdxFiles) {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(raw);
    chapters.push(data as unknown as RawFrontmatter);
  }

  return chapters.sort(
    (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()
  );
}

export function getLatestChapterData(): RawFrontmatter | undefined {
  const chapters = getAllChapters();
  return chapters[0];
}

export function getChapterBySlugData(slug: string): RawFrontmatter | undefined {
  const chapters = getAllChapters();
  return chapters.find((c) => c.slug === slug);
}

export function getChapterNarrative(slug: string): string {
  const mdxFiles = collectMdxFiles(CONTENT_DIR);
  for (const filePath of mdxFiles) {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { content, data } = matter(raw);
    if ((data as RawFrontmatter).slug === slug) {
      return content.trim();
    }
  }
  return "";
}

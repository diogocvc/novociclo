import type { Chapter } from "@/types";
import { getAllChapters, getChapterNarrative } from "@/lib/content";
import { mockNews } from "./mock-news";

function buildChapter(raw: ReturnType<typeof getAllChapters>[number]): Chapter {
  return {
    id: raw.id,
    data: raw.data,
    slug: raw.slug,
    titulo: raw.titulo,
    subtitulo: raw.subtitulo,
    resumo: raw.resumo,
    narrativa: getChapterNarrative(raw.slug),
    acontecimentos: [],
    categorias: raw.categorias as Chapter["categorias"],
    tags: raw.tags,
    referencias: raw.referencias,
    data_publicacao: raw.data,
    tempo_de_leitura: raw.tempo_de_leitura,
    frontmatter: {},
    noticia_destaque: raw.noticia_destaque_id
      ? mockNews[raw.noticia_destaque_id]
      : undefined,
    noticias_referencia:
      raw.noticias_referencia_ids
        ?.map((id) => mockNews[id])
        .filter(Boolean) ?? [],
  };
}

export function getAllPublishedChapters(): Chapter[] {
  return getAllChapters().map(buildChapter);
}

export function getLatestChapter(): Chapter | undefined {
  const raw = getAllChapters()[0];
  if (!raw) return undefined;
  return buildChapter(raw);
}

export function getChapterBySlug(slug: string): Chapter | undefined {
  const raw = getAllChapters().find((c) => c.slug === slug);
  if (!raw) return undefined;
  return buildChapter(raw);
}

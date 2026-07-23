import type { Chapter, News } from "@/types";
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
    noticia_destaque: raw.noticia_destaque ?? (
      raw.noticia_destaque_id
        ? mockNews[raw.noticia_destaque_id]
        : undefined
    ),
    noticias_referencia: raw.noticias_referencia ?? (
      raw.noticias_referencia_ids
        ?.map((id) => mockNews[id])
        .filter(Boolean) ?? []
    ),
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

export function getLatestChapterWithNews(): Chapter | undefined {
  const chapters = getAllPublishedChapters();
  return chapters.find(
    (c) => c.noticia_destaque || c.noticias_referencia.length > 0
  );
}

export function getLatestNewsItems(count: number): News[] {
  const chapters = getAllPublishedChapters();
  const seen = new Set<string>();

  const allNews: { news: News; pubDate: Date }[] = [];
  for (const chapter of chapters) {
    if (chapter.noticia_destaque && !seen.has(chapter.noticia_destaque.id)) {
      seen.add(chapter.noticia_destaque.id);
      allNews.push({ news: chapter.noticia_destaque, pubDate: new Date(chapter.noticia_destaque.data_publicacao) });
    }
    for (const ref of chapter.noticias_referencia) {
      if (!seen.has(ref.id)) {
        seen.add(ref.id);
        allNews.push({ news: ref, pubDate: new Date(ref.data_publicacao) });
      }
    }
  }

  allNews.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return allNews.slice(0, count).map((item) => item.news);
}

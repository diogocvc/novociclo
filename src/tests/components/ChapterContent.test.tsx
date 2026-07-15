import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ChapterContent from "@/components/chapter/ChapterContent";
import type { Chapter, News } from "@/types";

const mockNews: News = {
  id: "n1",
  titulo: "Notícia em destaque",
  resumo_original: "Resumo",
  url: "https://ge.globo.com/destaque",
  thumbnail: "https://picsum.photos/800/450",
  fonte: "ge",
  data_publicacao: "2026-07-14T10:00:00-03:00",
  idioma: "pt-BR",
  data_coleta: "2026-07-14T10:30:00-03:00",
};

const refNews: News = {
  id: "r1",
  titulo: "Notícia de referência",
  resumo_original: "Resumo",
  url: "https://ge.globo.com/ref",
  fonte: "UOL",
  data_publicacao: "2026-07-14T09:00:00-03:00",
  idioma: "pt-BR",
  data_coleta: "2026-07-14T09:30:00-03:00",
};

const mockChapter: Chapter = {
  id: "2026-07-14",
  data: "2026-07-14",
  slug: "2026/07/14",
  titulo: "Título do Capítulo",
  subtitulo: "Subtítulo do capítulo",
  resumo: "Resumo do capítulo",
  narrativa: "Corpo da narrativa",
  acontecimentos: [],
  categorias: ["Seleção Brasileira"],
  tags: ["tag1"],
  referencias: [],
  data_publicacao: "2026-07-14",
  tempo_de_leitura: 2,
  frontmatter: {},
  noticia_destaque: mockNews,
  noticias_referencia: [refNews],
};

describe("ChapterContent", () => {
  it("renders chapter title", () => {
    render(<ChapterContent chapter={mockChapter} />);
    expect(screen.getByText("Título do Capítulo")).toBeDefined();
  });

  it("renders chapter subtitle", () => {
    render(<ChapterContent chapter={mockChapter} />);
    expect(screen.getByText("Subtítulo do capítulo")).toBeDefined();
  });

  it("renders chapter summary", () => {
    render(<ChapterContent chapter={mockChapter} />);
    expect(screen.getByText("Resumo do capítulo")).toBeDefined();
  });

  it("renders featured news source", () => {
    render(<ChapterContent chapter={mockChapter} />);
    const sources = screen.getAllByText("Veja em: ge");
    expect(sources.length).toBeGreaterThanOrEqual(1);
  });

  it("renders reference news section", () => {
    render(<ChapterContent chapter={mockChapter} />);
    expect(screen.getByText("NOTÍCIAS DO DIA")).toBeDefined();
  });

  it("renders reference news cards", () => {
    render(<ChapterContent chapter={mockChapter} />);
    expect(screen.getByText("Notícia de referência")).toBeDefined();
    const uolSources = screen.getAllByText("UOL");
    expect(uolSources.length).toBeGreaterThanOrEqual(1);
  });

  it("renders without subtitle", () => {
    const chapterWithoutSub = { ...mockChapter, subtitulo: undefined };
    render(<ChapterContent chapter={chapterWithoutSub} />);
    expect(screen.getByText("Título do Capítulo")).toBeDefined();
  });

  it("renders without featured news", () => {
    const chapterWithoutFeatured = { ...mockChapter, noticia_destaque: undefined };
    render(<ChapterContent chapter={chapterWithoutFeatured} />);
    expect(screen.getByText("Título do Capítulo")).toBeDefined();
  });
});

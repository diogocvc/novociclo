import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import NewsCard from "@/components/chapter/NewsCard";
import type { News } from "@/types";

const mockNews: News = {
  id: "n1",
  titulo: "Brasil vence amistoso contra Argentina",
  resumo_original: "Resumo da notícia",
  url: "https://ge.globo.com/teste",
  thumbnail: "https://picsum.photos/400/225",
  fonte: "ge",
  data_publicacao: "2026-07-14T10:00:00-03:00",
  idioma: "pt-BR",
  data_coleta: "2026-07-14T10:30:00-03:00",
};

describe("NewsCard", () => {
  it("renders news title", () => {
    render(<NewsCard news={mockNews} />);
    expect(screen.getByText("Brasil vence amistoso contra Argentina")).toBeDefined();
  });

  it("renders source name", () => {
    render(<NewsCard news={mockNews} />);
    const sources = screen.getAllByText("ge");
    expect(sources.length).toBeGreaterThanOrEqual(1);
  });

  it("renders thumbnail image", () => {
    render(<NewsCard news={mockNews} />);
    const img = screen.getByAltText("Brasil vence amistoso contra Argentina");
    expect(img).toBeDefined();
    expect(img.getAttribute("src")).toBe("https://picsum.photos/400/225");
  });

  it("links to the news URL", () => {
    render(<NewsCard news={mockNews} />);
    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toBe("https://ge.globo.com/teste");
  });

  it("renders fallback when no thumbnail", () => {
    const newsWithoutThumb: News = { ...mockNews, thumbnail: undefined };
    render(<NewsCard news={newsWithoutThumb} />);
    const sources = screen.getAllByText("ge");
    expect(sources.length).toBeGreaterThanOrEqual(1);
  });
});

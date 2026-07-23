import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import NoNewsToday from "@/components/home/NoNewsToday";
import type { News } from "@/types";

const mockNews: News[] = [
  {
    id: "n1",
    titulo: "Seleção Brasileira se prepara para amistoso",
    resumo_original: "A Seleção Brasileira iniciou a preparação...",
    url: "https://ge.globo.com/noticia1",
    fonte: "ge",
    data_publicacao: "2026-07-22T18:00:00.000Z",
    idioma: "pt-BR",
    data_coleta: "2026-07-22T22:00:00.000Z",
  },
];

describe("NoNewsToday", () => {
  it("renders 'hoje' message when date is today", () => {
    render(
      <NoNewsToday
        date={new Date()}
        latestNews={mockNews}
      />
    );

    expect(screen.getByText(/hoje/i)).toBeDefined();
  });

  it("renders 'neste dia' message when date is in the past", () => {
    render(
      <NoNewsToday
        date={new Date("2026-07-14")}
        latestNews={mockNews}
      />
    );

    expect(
      screen.getByText(/não houve notícias do novo ciclo neste dia/i)
    ).toBeDefined();
  });

  it("renders news cards when latestNews is provided", () => {
    render(
      <NoNewsToday
        date={new Date("2026-07-14")}
        latestNews={mockNews}
      />
    );

    const links = screen.getAllByRole("link");
    expect(links.length).toBeGreaterThan(0);
    expect(links[0].getAttribute("href")).toBe("https://ge.globo.com/noticia1");
  });

  it("shows the title of the latest news", () => {
    render(
      <NoNewsToday
        date={new Date("2026-07-14")}
        latestNews={mockNews}
      />
    );

    expect(screen.getByText("Seleção Brasileira se prepara para amistoso")).toBeDefined();
  });
});

import { describe, it, expect, vi, beforeEach } from "vitest";
import type { MockedFunction } from "vitest";

const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

vi.mock("@/lib/rss", () => ({
  fetchAllRss: vi.fn(),
}));

vi.mock("@/lib/llm", () => ({
  callLLM: vi.fn(),
}));

import { ResearcherAgent } from "@/agents/researcher";
import { callLLM } from "@/lib/llm";
import { fetchAllRss } from "@/lib/rss";

const mockCallLLM = callLLM as MockedFunction<typeof callLLM>;
const mockFetchAllRss = fetchAllRss as MockedFunction<typeof fetchAllRss>;

const makeNews = (id: string, titulo: string) => ({
  id,
  titulo,
  resumo_original: "Resumo",
  url: `https://ge.globo.com/${id}`,
  fonte: "ge",
  data_publicacao: "2026-07-15T10:00:00-03:00",
  idioma: "pt-BR",
  data_coleta: "2026-07-15T10:30:00-03:00",
});

describe("ResearcherAgent", () => {
  let agent: ResearcherAgent;

  beforeEach(() => {
    agent = new ResearcherAgent();
    vi.clearAllMocks();
  });

  it("uses RSS news when enough relevant items", async () => {
    mockFetchAllRss.mockResolvedValueOnce([
      makeNews("n1", "Seleção Brasileira vence amistoso"),
      makeNews("n2", "CBF anuncia novos jogos"),
      makeNews("n3", "Neymar volta aos treinos"),
    ]);

    const result = await agent.execute({ date: new Date("2026-07-15") });
    expect(result.success).toBe(true);
    expect((result.data as { news: unknown[] }).news).toHaveLength(3);
    expect(mockCallLLM).not.toHaveBeenCalled();
  });

  it("falls back to LLM when RSS has few relevant items", async () => {
    mockFetchAllRss.mockResolvedValueOnce([
      makeNews("n1", "Notícia genérica sem relação"),
    ]);

    mockCallLLM.mockResolvedValueOnce({
      content: { news: [makeNews("n4", "Brasil se prepara para 2030")] },
      tokens: { prompt: 10, completion: 20, total: 30 },
    });

    const result = await agent.execute({ date: new Date("2026-07-15") });
    expect(result.success).toBe(true);
    expect(mockCallLLM).toHaveBeenCalledTimes(1);
  });

  it("excludes articles from other sports (volleyball, basketball, handball, tennis)", async () => {
    mockFetchAllRss.mockResolvedValueOnce([
      makeNews("n1", "Seleção Brasileira de Vôlei vence campeonato"),
      makeNews("n2", "Brasil enfrenta EUA no basquete hoje"),
      makeNews("n3", "Seleção Brasileira de handebol é campeã"),
      makeNews("n4", "Brasil avança no tênis em Roland Garros"),
      makeNews("n5", "Seleção Brasileira de futebol vence amistoso"),
      makeNews("n6", "CBF anuncia amistoso para setembro"),
    ]);

    mockCallLLM.mockResolvedValueOnce({
      content: { news: [makeNews("n7", "Brasil se prepara para 2030")] },
      tokens: { prompt: 10, completion: 20, total: 30 },
    });

    const result = await agent.execute({ date: new Date("2026-07-15") });
    expect(result.success).toBe(true);
    const news = (result.data as { news: unknown[] }).news;
    const titles = news.map((n: Record<string, unknown>) => n.titulo as string);
    expect(titles).not.toContain("Seleção Brasileira de Vôlei vence campeonato");
    expect(titles).not.toContain("Brasil enfrenta EUA no basquete hoje");
    expect(titles).not.toContain("Seleção Brasileira de handebol é campeã");
    expect(titles).not.toContain("Brasil avança no tênis em Roland Garros");
  });

  it("excludes articles with other sports in the summary", async () => {
    mockFetchAllRss.mockResolvedValueOnce([
      {
        ...makeNews("n1", "Brasil conquista medalha"),
        resumo_original: "A seleção brasileira de vôlei venceu mais uma",
      },
      makeNews("n2", "Seleção Brasileira de futebol vence amistoso"),
      makeNews("n3", "CBF anuncia novo técnico"),
      makeNews("n4", "Neymar é convocado"),
    ]);

    const result = await agent.execute({ date: new Date("2026-07-15") });
    expect(result.success).toBe(true);
    const news = (result.data as { news: unknown[] }).news;
    const titles = news.map((n: Record<string, unknown>) => n.titulo as string);
    expect(titles).not.toContain("Brasil conquista medalha");
    expect(titles).toContain("Seleção Brasileira de futebol vence amistoso");
  });

  it("returns error when RSS and LLM both fail", async () => {
    mockFetchAllRss.mockResolvedValueOnce([]);
    mockCallLLM.mockRejectedValueOnce(new Error("LLM error"));

    const result = await agent.execute({ date: new Date() });
    expect(result.success).toBe(false);
    expect(result.error).toBe("LLM error");
  });
});

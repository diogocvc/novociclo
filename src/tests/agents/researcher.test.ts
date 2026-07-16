import { describe, it, expect, vi, beforeEach } from "vitest";

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

const mockCallLLM = vi.mocked(callLLM);
const mockFetchAllRss = vi.mocked(fetchAllRss);

const makeNews = (id: string, titulo: string, url?: string) => ({
  id,
  titulo,
  resumo_original: "Resumo",
  url: url ?? `https://ge.globo.com/${id}`,
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
    mockCallLLM.mockResolvedValue({
      content: { news: [] },
      tokens: { prompt: 10, completion: 5, total: 15 },
    });
  });

  it("uses RSS news when enough relevant items", async () => {
    mockFetchAllRss.mockResolvedValueOnce([
      makeNews("n1", "Seleção Brasileira vence amistoso"),
      makeNews("n2", "CBF traça objetivos da Seleção até 2030"),
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
      content: { news: [makeNews("n4", "Brasil se prepara para a Copa do Mundo 2030")] },
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
      makeNews("n6", "Seleção Brasileira joga amistoso em setembro"),
    ]);

    const result = await agent.execute({ date: new Date("2026-07-15") });
    expect(result.success).toBe(true);
    const news = (result.data as { news: { titulo: string }[] }).news;
    const titles = news.map((n) => n.titulo);
    expect(titles).not.toContain("Seleção Brasileira de Vôlei vence campeonato");
    expect(titles).not.toContain("Brasil enfrenta EUA no basquete hoje");
    expect(titles).not.toContain("Seleção Brasileira de handebol é campeã");
    expect(titles).not.toContain("Brasil avança no tênis em Roland Garros");
    expect(titles).toContain("Seleção Brasileira de futebol vence amistoso");
    expect(titles).toContain("Seleção Brasileira joga amistoso em setembro");
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
    const news = (result.data as { news: { titulo: string }[] }).news;
    const titles = news.map((n) => n.titulo);
    expect(titles).not.toContain("Brasil conquista medalha");
    expect(titles).toContain("Seleção Brasileira de futebol vence amistoso");
  });

  it("excludes Série D articles (CBF without Seleção context)", async () => {
    mockFetchAllRss.mockResolvedValueOnce([
      makeNews("n1", "CBF divulga tabela detalhada das oitavas de final da Série D"),
      makeNews("n2", "Seleção Brasileira enfrenta Argentina nas Eliminatórias"),
    ]);

    const result = await agent.execute({ date: new Date("2026-07-15") });
    expect(result.success).toBe(true);
    const news = (result.data as { news: { titulo: string }[] }).news;
    const titles = news.map((n) => n.titulo);
    expect(titles).not.toContain("CBF divulga tabela detalhada das oitavas de final da Série D");
    expect(titles).toContain("Seleção Brasileira enfrenta Argentina nas Eliminatórias");
  });

  it("excludes articles about other national teams", async () => {
    mockFetchAllRss.mockResolvedValueOnce([
      makeNews("n1", "Presidente da França parabeniza seleção após eliminação na Copa"),
      makeNews("n2", "Espanha é segunda seleção a chegar em final de Copa"),
      makeNews("n3", "CBF traça objetivos da Seleção até 2030"),
    ]);

    const result = await agent.execute({ date: new Date("2026-07-15") });
    expect(result.success).toBe(true);
    const news = (result.data as { news: { titulo: string }[] }).news;
    const titles = news.map((n) => n.titulo);
    expect(titles).not.toContain("Presidente da França parabeniza seleção após eliminação na Copa");
    expect(titles).not.toContain("Espanha é segunda seleção a chegar em final de Copa");
    expect(titles).toContain("CBF traça objetivos da Seleção até 2030");
  });

  it("includes FIFA news", async () => {
    mockFetchAllRss.mockResolvedValueOnce([
      makeNews("n1", "FIFA define novas regras para a Copa do Mundo"),
      makeNews("n2", "FIFA anuncia calendário de eliminatórias"),
    ]);

    const result = await agent.execute({ date: new Date("2026-07-15") });
    expect(result.success).toBe(true);
    const news = (result.data as { news: { titulo: string }[] }).news;
    const titles = news.map((n) => n.titulo);
    expect(titles).toContain("FIFA define novas regras para a Copa do Mundo");
    expect(titles).toContain("FIFA anuncia calendário de eliminatórias");
  });

  it("includes sedes preparation with competition context", async () => {
    mockFetchAllRss.mockResolvedValueOnce([
      makeNews("n1", "Uruguai prepara estádios para a Copa do Mundo 2030"),
      makeNews("n2", "Seleção Brasileira inicia preparação para Eliminatórias"),
    ]);

    const result = await agent.execute({ date: new Date("2026-07-15") });
    expect(result.success).toBe(true);
    const news = (result.data as { news: { titulo: string }[] }).news;
    const titles = news.map((n) => n.titulo);
    expect(titles).toContain("Uruguai prepara estádios para a Copa do Mundo 2030");
    expect(titles).toContain("Seleção Brasileira inicia preparação para Eliminatórias");
  });

  it("excludes by URL path (other sports sections)", async () => {
    mockFetchAllRss.mockResolvedValueOnce([
      makeNews("n1", "Brasil vence França", "https://ge.globo.com/volei/noticia/brasil-vence-franca"),
      makeNews("n2", "Seleção Brasileira vence amistoso", "https://ge.globo.com/futebol/selecao/amistoso"),
    ]);

    const result = await agent.execute({ date: new Date("2026-07-15") });
    expect(result.success).toBe(true);
    const news = (result.data as { news: { titulo: string }[] }).news;
    const titles = news.map((n) => n.titulo);
    expect(titles).not.toContain("Brasil vence França");
    expect(titles).toContain("Seleção Brasileira vence amistoso");
  });

  it("filters LLM output that is out of scope", async () => {
    mockFetchAllRss.mockResolvedValueOnce([
      makeNews("n1", "Notícia genérica"),
    ]);

    mockCallLLM.mockResolvedValueOnce({
      content: {
        news: [
          makeNews("n2", "Seleção Brasileira renovada para 2030"),
          makeNews("n3", "França elimina Espanha na semifinal da Copa"),
        ],
      },
      tokens: { prompt: 10, completion: 20, total: 30 },
    });

    const result = await agent.execute({ date: new Date("2026-07-15") });
    expect(result.success).toBe(true);
    const news = (result.data as { news: { titulo: string }[] }).news;
    const titles = news.map((n) => n.titulo);
    expect(titles).toContain("Seleção Brasileira renovada para 2030");
    expect(titles).not.toContain("França elimina Espanha na semifinal da Copa");
  });

  it("returns error when RSS and LLM both fail", async () => {
    mockFetchAllRss.mockResolvedValueOnce([]);
    mockCallLLM.mockRejectedValueOnce(new Error("LLM error"));

    const result = await agent.execute({ date: new Date() });
    expect(result.success).toBe(false);
    expect(result.error).toBe("LLM error");
  });
});

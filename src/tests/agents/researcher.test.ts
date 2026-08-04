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

  it("returns what RSS gives when few relevant items (no LLM fallback)", async () => {
    mockFetchAllRss.mockResolvedValueOnce([
      makeNews("n1", "Notícia genérica sem relação"),
    ]);

    const result = await agent.execute({ date: new Date("2026-07-15") });
    expect(result.success).toBe(true);
    expect(mockCallLLM).not.toHaveBeenCalled();
    const news = (result.data as { news: unknown[] }).news;
    expect(news).toHaveLength(0);
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

  it("excludes Kings League esports article even when Neymar is mentioned", async () => {
    mockFetchAllRss.mockResolvedValueOnce([
      {
        ...makeNews("n1", "Furia bate atual campeão, e G3X elimina DesimpaiN para avançar à semi do Mundial da Kings"),
        resumo_original:
          "Equipe de Neymar e Cris Guedes goleou por 5 a 1 o Los Troncos, da Espanha, enquanto o G3X venceu por 6 a 5 o clássico brasileiro marcado pela rivalidade; semis e final serão disputadas neste sábado (1º)",
        url: "https://ge.globo.com/kings-league/noticia/2026/07/31/furia-bate-atual-campeao-e-g3x-elimina-desimpain-para-avancar-a-semi-do-mundial-da-kings.ghtml",
      },
      {
        ...makeNews("n2", "Seleção Brasileira vence amistoso"),
        data_publicacao: "2026-07-31T10:00:00-03:00",
      },
    ]);

    const result = await agent.execute({ date: new Date("2026-07-31") });
    expect(result.success).toBe(true);
    const news = (result.data as { news: { titulo: string }[] }).news;
    const titles = news.map((n) => n.titulo);
    expect(titles).not.toContain(
      "Furia bate atual campeão, e G3X elimina DesimpaiN para avançar à semi do Mundial da Kings"
    );
    expect(titles).toContain("Seleção Brasileira vence amistoso");
  });

  it("excludes rhythmic gymnastics article even with 'seleção brasileira' in the title", async () => {
    mockFetchAllRss.mockResolvedValueOnce([
      {
        ...makeNews("n1", "Seleção brasileira de conjunto se prepara visando vaga olímpica no Mundial de Frankfurt"),
        resumo_original:
          "Equipe viaja neste sábado para a competição, que pode garantir vaga antecipada para ao time brasileiro nos Jogos de Los Angeles",
        url: "https://ge.globo.com/se/ginastica-ritmica/noticia/2026/07/31/selecao-brasileira-de-conjunto-se-prepara-visando-vaga-olimpica-no-mundial-de-frankfurt.ghtml",
      },
      {
        ...makeNews("n2", "CBF traça objetivos da Seleção até 2030"),
        data_publicacao: "2026-07-31T10:00:00-03:00",
      },
    ]);

    const result = await agent.execute({ date: new Date("2026-07-31") });
    expect(result.success).toBe(true);
    const news = (result.data as { news: { titulo: string }[] }).news;
    const titles = news.map((n) => n.titulo);
    expect(titles).not.toContain(
      "Seleção brasileira de conjunto se prepara visando vaga olímpica no Mundial de Frankfurt"
    );
    expect(titles).toContain("CBF traça objetivos da Seleção até 2030");
  });

  it("excludes articles whose URL is in the blocklist", async () => {
    mockFetchAllRss.mockResolvedValueOnce([
      {
        ...makeNews("n1", "Seleção Brasileira anuncia novo calendário de amistosos"),
        url: "https://ge.globo.com/kings-league/noticia/2026/07/31/furia-bate-atual-campeao-e-g3x-elimina-desimpain-para-avancar-a-semi-do-mundial-da-kings.ghtml",
      },
      {
        ...makeNews("n2", "Seleção Brasileira joga amistoso em setembro"),
        data_publicacao: "2026-07-31T10:00:00-03:00",
      },
    ]);

    const result = await agent.execute({ date: new Date("2026-07-31") });
    expect(result.success).toBe(true);
    const news = (result.data as { news: { titulo: string }[] }).news;
    const titles = news.map((n) => n.titulo);
    expect(titles).not.toContain("Seleção Brasileira anuncia novo calendário de amistosos");
    expect(titles).toContain("Seleção Brasileira joga amistoso em setembro");
  });

  it("returns empty result when RSS has no items (no error)", async () => {
    mockFetchAllRss.mockResolvedValueOnce([]);

    const result = await agent.execute({ date: new Date() });
    expect(result.success).toBe(true);
    const news = (result.data as { news: unknown[] }).news;
    expect(news).toHaveLength(0);
  });

  it("excludes off-context news: foreign players, foreign clubs and former-player health", async () => {
    mockFetchAllRss.mockResolvedValueOnce([
      {
        ...makeNews(
          "n1",
          "O que se sabe sobre o estado de saúde de Kléberson",
          "https://www.band.com.br/esportes/o-que-se-sabe-sobre-o-estado-de-saude-de-kleberson-202608031540",
        ),
        resumo_original: "Ex-jogador da seleção brasileira, campeão do mundo em 2002, passa bem",
      },
      makeNews(
        "n2",
        "Vozinha pode acertar com clube do Marrocos após ser anunciado pelo Colo Colo",
        "https://placar.com.br/futebol-internacional/vozinha-pode-acertar-com-clube-do-marrocos-apos-ser-anunciado-pelo-colo-colo",
      ),
      makeNews(
        "n3",
        "Cucurella empresta medalha da Copa do Mundo para carteiro",
        "https://placar.com.br/futebol-internacional/cucurella-empresta-medalha-da-copa-do-mundo-para-carteiro",
      ),
      makeNews(
        "n4",
        "21 anos e 1,94 m: Carlos Espí chega ao Real Madrid para disputar vaga com Endrick",
        "https://placar.com.br/futebol-internacional/21-anos-e-194-m-carlos-espi-chega-ao-real-madrid-para-disputar-vaga-com-endrick",
      ),
      makeNews(
        "n5",
        "Real Madrid anuncia venda de concorrente de Endrick; veja detalhes",
        "https://www.band.com.br/esportes/real-madrid-anuncia-venda-de-concorrente-de-endrick-veja-detalhes-202608031727",
      ),
      makeNews("n6", "Seleção Brasileira vence amistoso"),
    ]);

    const result = await agent.execute({ date: new Date("2026-07-15") });
    expect(result.success).toBe(true);
    const titles = ((result.data as { news: { titulo: string }[] }).news).map((n) => n.titulo);
    expect(titles).not.toContain("O que se sabe sobre o estado de saúde de Kléberson");
    expect(titles).not.toContain("Vozinha pode acertar com clube do Marrocos após ser anunciado pelo Colo Colo");
    expect(titles).not.toContain("Cucurella empresta medalha da Copa do Mundo para carteiro");
    expect(titles).not.toContain("21 anos e 1,94 m: Carlos Espí chega ao Real Madrid para disputar vaga com Endrick");
    expect(titles).not.toContain("Real Madrid anuncia venda de concorrente de Endrick; veja detalhes");
    expect(titles).toContain("Seleção Brasileira vence amistoso");
  });

  it("keeps a Seleção player as the subject in international club news", async () => {
    mockFetchAllRss.mockResolvedValueOnce([
      makeNews(
        "n1",
        "Endrick é monitorado pela Roma, que estuda empréstimo do brasileiro",
        "https://placar.com.br/futebol-internacional/endrick-e-monitorado-pela-roma-que-estuda-emprestimo-do-brasileiro",
      ),
      makeNews("n2", "Seleção Brasileira joga amistoso em setembro"),
    ]);

    const result = await agent.execute({ date: new Date("2026-07-15") });
    expect(result.success).toBe(true);
    const titles = ((result.data as { news: { titulo: string }[] }).news).map((n) => n.titulo);
    expect(titles).toContain("Endrick é monitorado pela Roma, que estuda empréstimo do brasileiro");
    expect(titles).toContain("Seleção Brasileira joga amistoso em setembro");
  });

  it("keeps club news when a Seleção player is the main subject (Vini Jr.)", async () => {
    mockFetchAllRss.mockResolvedValueOnce([
      makeNews(
        "n1",
        "Arteta conversou com Vini Jr. para levá-lo ao Arsenal, diz jornal",
        "https://placar.com.br/futebol-internacional/arteta-conversa-com-vini-jr-para-leva-lo-ao-arsenal",
      ),
      makeNews(
        "n2",
        "Com futuro indefinido, Vini Jr. se reapresenta ao Real Madrid; veja fotos",
        "https://www.band.com.br/esportes/com-futuro-indefinido-vini-jr-se-reapresenta-ao-real-madrid",
      ),
      makeNews("n3", "Seleção Brasileira vence amistoso"),
    ]);

    const result = await agent.execute({ date: new Date("2026-07-15") });
    expect(result.success).toBe(true);
    const titles = ((result.data as { news: { titulo: string }[] }).news).map((n) => n.titulo);
    expect(titles).toContain("Arteta conversou com Vini Jr. para levá-lo ao Arsenal, diz jornal");
    expect(titles).toContain("Com futuro indefinido, Vini Jr. se reapresenta ao Real Madrid; veja fotos");
    expect(titles).toContain("Seleção Brasileira vence amistoso");
  });

  it("keeps strong Seleção context even on futebol-internacional URLs (no blanket URL block)", async () => {
    mockFetchAllRss.mockResolvedValueOnce([
      makeNews(
        "n1",
        "Seleção Brasileira define preparação para as Eliminatórias",
        "https://placar.com.br/futebol-internacional/selecao-brasileira-define-preparacao-para-eliminatorias",
      ),
    ]);

    const result = await agent.execute({ date: new Date("2026-07-15") });
    expect(result.success).toBe(true);
    const titles = ((result.data as { news: { titulo: string }[] }).news).map((n) => n.titulo);
    expect(titles).toContain("Seleção Brasileira define preparação para as Eliminatórias");
  });
});

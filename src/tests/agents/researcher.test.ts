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
      makeNews("n3", "Vini Jr. inicia pré-temporada no Real Madrid"),
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

  it("excludes today's off-context news (04/08): family, all-time lists, former-player nostalgia, other FIFA competitions and relative-clause player references", async () => {
    mockFetchAllRss.mockResolvedValueOnce([
      {
        ...makeNews(
          "n1",
          "Filho de Neymar revela que não seguirá o pai: 'Não sou muito do esporte'",
          "https://www.band.com.br/entretenimento/filho-de-neymar-revela-que-nao-seguira-o-pai-nao-sou-muito-do-esporte-202608040917",
        ),
        resumo_original:
          "Davi Lucca diz que pretende trabalhar no Instituto Neymar Jr., que fez leilão na noite de segunda-feira (3)",
      },
      {
        ...makeNews(
          "n2",
          'Neymar "pede" dois brasileiros em lista de maiores goleiros da história',
          "https://www.band.com.br/esportes/neymar-pede-dois-brasileiros-em-lista-de-maiores-goleiros-da-historia-202608041136",
        ),
        resumo_original: "Ranking colocou Lev Yashin como o maior arqueiro de toda a história",
      },
      {
        ...makeNews(
          "n3",
          "Roberto Carlos santista e mais: para que times ídolos torciam na infância",
          "https://placar.com.br/placar/roberto-carlos-santista-e-mais-para-que-times-idolos-torciam-na-infancia",
        ),
        resumo_original:
          "Neymar, Rivellino, Sócrates e Ronaldo fizeram história por clubes diferentes dos que torciam quando crianças; e qual era o time do coração de Pelé?",
      },
      {
        ...makeNews(
          "n4",
          "Fifa lança plano de direitos humanos e sustentabilidade para Copa do Mundo Feminina no Brasil",
          "https://ge.globo.com/futebol/copa-do-mundo-feminina/noticia/2026/08/04/fifa-lanca-plano-de-direitos-humanos-e-sustentabilidade-para-copa-do-mundo-feminina-no-brasil.ghtml",
        ),
        resumo_original:
          "A Fifa lançou a estratégia de sustentabilidade e direitos humanos da entidade para a Copa do Mundo Feminina de 2027, no Brasil",
      },
      {
        ...makeNews(
          "n5",
          'Goleiro da Noruega que "discutiu" com Neymar assina com gigante alemão',
          "https://www.band.com.br/esportes/goleiro-noruegues-que-eliminou-o-brasil-na-copa-e-provocou-neymar-assina-com-o-rb-leipzig-202608040857",
        ),
        resumo_original: "Orjan Nyland foi um dos grandes destaques da equipe europeia no Mundial",
      },
      makeNews("n6", "Seleção Brasileira vence amistoso"),
    ]);

    const result = await agent.execute({ date: new Date("2026-07-15") });
    expect(result.success).toBe(true);
    const titles = ((result.data as { news: { titulo: string }[] }).news).map((n) => n.titulo);
    expect(titles).not.toContain("Filho de Neymar revela que não seguirá o pai: 'Não sou muito do esporte'");
    expect(titles).not.toContain('Neymar "pede" dois brasileiros em lista de maiores goleiros da história');
    expect(titles).not.toContain("Roberto Carlos santista e mais: para que times ídolos torciam na infância");
    expect(titles).not.toContain("Fifa lança plano de direitos humanos e sustentabilidade para Copa do Mundo Feminina no Brasil");
    expect(titles).not.toContain('Goleiro da Noruega que "discutiu" com Neymar assina com gigante alemão');
    expect(titles).toContain("Seleção Brasileira vence amistoso");
  });

  it("excludes today's off-context news (05/08): Neymar retired from the Seleção and club-transfer rankings", async () => {
    mockFetchAllRss.mockResolvedValueOnce([
      {
        ...makeNews(
          "n1",
          "Polêmicas de Neymar: astro do Santos acumula 'tretas' em 2026; veja lista",
          "https://www.band.com.br/esportes/robinho-jr-goleiro-da-noruega-remo-poker-e-mais-as-polemicas-de-neymar-em-2026-202608051127",
        ),
        resumo_original:
          "De atritos no Santos a atritos na Seleção Brasileira, relembre os episódios marcantes do camisa 10",
      },
      {
        ...makeNews(
          "n2",
          "Comportamento de Neymar repercute na imprensa europeia: 'Fora de controle'",
          "https://www.band.com.br/esportes/imprensa-internacional-repercute-comportamento-de-neymar-e-ve-jogador-fora-de-controle-202608051100",
        ),
        resumo_original:
          "Atitude do atacante na zona mista do Mangueirão ganha destaque nos principais jornais do Velho Continente",
      },
      {
        ...makeNews(
          "n3",
          "Beijo para torcedora e xingamentos: veja polêmicas de Neymar contra o Remo",
          "https://www.band.com.br/esportes/beijo-para-torcedora-e-xingamentos-veja-polemicas-de-neymar-contra-o-remo-202608051031",
        ),
        resumo_original: "Meia santistas se envolveu em discussão com membros do clube paraense",
      },
      {
        ...makeNews(
          "n4",
          "Luiz Henrique no Flamengo? Veja o ranking dos jogadores mais caros Brasil",
          "https://placar.com.br/mercado-da-bola/luiz-henrique-no-flamengo-veja-o-ranking-dos-jogadores-mais-caros-brasil",
        ),
        resumo_original:
          "Após desistir de Almada, Rubro-Negro tenta avançar em acordo por atacante do Zenit e da seleção brasileira",
      },
      makeNews("n5", "Seleção Brasileira vence amistoso"),
      makeNews("n6", "Neymar é convocado"),
      makeNews("n7", "Vini Jr. renova com o Real Madrid até 2031"),
    ]);

    const result = await agent.execute({ date: new Date("2026-07-15") });
    expect(result.success).toBe(true);
    const titles = ((result.data as { news: { titulo: string }[] }).news).map((n) => n.titulo);
    expect(titles).not.toContain("Polêmicas de Neymar: astro do Santos acumula 'tretas' em 2026; veja lista");
    expect(titles).not.toContain("Comportamento de Neymar repercute na imprensa europeia: 'Fora de controle'");
    expect(titles).not.toContain("Beijo para torcedora e xingamentos: veja polêmicas de Neymar contra o Remo");
    expect(titles).not.toContain("Luiz Henrique no Flamengo? Veja o ranking dos jogadores mais caros Brasil");
    expect(titles).toContain("Seleção Brasileira vence amistoso");
    expect(titles).toContain("Neymar é convocado");
    expect(titles).toContain("Vini Jr. renova com o Real Madrid até 2031");
  });

  it("excludes today's off-context news (06/08): Brazilian club focus, foreign star and promo/media announcement", async () => {
    mockFetchAllRss.mockResolvedValueOnce([
      {
        ...makeNews(
          "n1",
          "Após ação na Justiça, Mayke tem rescisão com o Santos publicada no BID",
          "https://www.uol.com.br/esporte/futebol/ultimas-noticias/2026/08/06/apos-acao-na-justica-mayke-tem-rescisao-com-o-santos-publicada-no-bid.ghtm",
        ),
        resumo_original:
          "O lateral-direito Mayke não é mais jogador do Santos. Nesta quinta-feira (6), a rescisão contratual do atleta foi publicada no Boletim Informativo Diário (BID) da CBF, deixando-o livre no mercado para assinar com qualquer outra equipe",
      },
      {
        ...makeNews(
          "n2",
          "Mayke rescinde contrato com o Santos e fica livre no mercado; veja detalhes",
          "https://www.band.com.br/esportes/mayke-rescinde-contrato-com-o-santos-e-fica-livre-no-mercado-veja-detalhes-202608061919",
        ),
        resumo_original: "Rescisão do lateral-direito foi publicada no site da CBF",
      },
      {
        ...makeNews(
          "n3",
          "Messi brilha em vitória do Inter Miami após vice na Copa do Mundo",
          "https://www.band.com.br/esportes/jornada-de-messi-para-esquecer-o-vice-da-copa-tem-show-com-gols-e-assistencia-pelo-inter-miami-202608060948",
        ),
        resumo_original: "Craque argentino comandou virada contra o San Luís na Leagues Cup",
      },
      {
        ...makeNews(
          "n4",
          "PLACAR lança tradicional edição pós-Copa do Mundo de 2026",
          "https://placar.com.br/copa-do-mundo/placar-lanca-tradicional-edicao-pos-copa-do-mundo-de-2026",
        ),
        resumo_original:
          "Edição de agosto traz um balanço da competição vencida pela Espanha, com estatísticas e a análise do fiasco da seleção brasileira",
      },
      {
        ...makeNews(
          "n5",
          "Mercado: Fabinho sem clube, dois anúncios no São Paulo e Real reforçado",
          "https://www.uol.com.br/esporte/futebol/ultimas-noticias/2026/08/06/mercado-fabinho-sem-clube-dois-anuncios-no-sao-paulo-e-real-reforcado.ghtm",
        ),
        resumo_original:
          "O mercado da bola foi bastante movimentado nesta quinta-feira com anúncios de reforços no São Paulo, o fim de novelas importantes no Real Madrid e a liberação do meio-campista da seleção brasileira Fabinho, que agora procura um novo clube",
      },
      makeNews("n6", "Seleção Brasileira vence amistoso"),
      makeNews("n7", "Fifa pede desculpas a confederações"),
      makeNews("n8", "Real Madrid anuncia renovação com Vini Jr"),
      {
        ...makeNews(
          "n9",
          "Al-Ittihad anuncia saída do volante Fabinho, que jogou a Copa de 2026; jogador está livre",
        ),
        resumo_original:
          "Atleta de 32 anos disputou três partidas pela seleção brasileira no último Mundial",
      },
    ]);

    const result = await agent.execute({ date: new Date("2026-07-15") });
    expect(result.success).toBe(true);
    const titles = ((result.data as { news: { titulo: string }[] }).news).map((n) => n.titulo);
    expect(titles).not.toContain("Após ação na Justiça, Mayke tem rescisão com o Santos publicada no BID");
    expect(titles).not.toContain("Mayke rescinde contrato com o Santos e fica livre no mercado; veja detalhes");
    expect(titles).not.toContain("Messi brilha em vitória do Inter Miami após vice na Copa do Mundo");
    expect(titles).not.toContain("PLACAR lança tradicional edição pós-Copa do Mundo de 2026");
    expect(titles).not.toContain("Mercado: Fabinho sem clube, dois anúncios no São Paulo e Real reforçado");
    expect(titles).toContain("Seleção Brasileira vence amistoso");
    expect(titles).toContain("Fifa pede desculpas a confederações");
    expect(titles).toContain("Real Madrid anuncia renovação com Vini Jr");
    expect(titles).toContain("Al-Ittihad anuncia saída do volante Fabinho, que jogou a Copa de 2026; jogador está livre");
  });

  it("excludes CBF news focused on a club director/celebrity (Stábile/Memphis)", async () => {
    mockFetchAllRss.mockResolvedValueOnce([
      {
        ...makeNews(
          "n1",
          "CBF condena ameaças contra Stábile durante novela por Memphis; veja nota",
          "https://www.band.com.br/esportes/cbf-condena-ameacas-contra-stabile-durante-novela-por-memphis-veja-nota-202608181745",
        ),
        resumo_original:
          "Entidade prestou solidariedade ao dirigente após relatos de intimidações com armas e vazamento de dados de familiares",
        data_publicacao: "2026-08-18T17:45:11-03:00",
      },
      {
        ...makeNews("n2", "Seleção Brasileira joga amistoso em setembro"),
        data_publicacao: "2026-08-18T10:00:00-03:00",
      },
    ]);

    const result = await agent.execute({ date: new Date("2026-08-18") });
    expect(result.success).toBe(true);
    const titles = ((result.data as { news: { titulo: string }[] }).news).map((n) => n.titulo);
    expect(titles).not.toContain("CBF condena ameaças contra Stábile durante novela por Memphis; veja nota");
    expect(titles).toContain("Seleção Brasileira joga amistoso em setembro");
  });

  it("excludes journalist profile news without Seleção context (Manu Gutiérrez)", async () => {
    mockFetchAllRss.mockResolvedValueOnce([
      {
        ...makeNews(
          "n1",
          "Manu Gutiérrez, o repórter da Copa do Mundo 2026",
          "https://placar.com.br/copa-do-mundo/manu-gutierrez-o-reporter-da-copa-do-mundo-2026",
        ),
        resumo_original:
          "'Encontrei no microfone uma alternativa para me aproximar desses campos que um dia sonhei em estar', disse o jornalista venezuelano",
        data_publicacao: "2026-08-17T15:26:38-03:00",
      },
      {
        ...makeNews("n2", "Seleção Brasileira joga amistoso em setembro"),
        data_publicacao: "2026-08-18T10:00:00-03:00",
      },
    ]);

    const result = await agent.execute({ date: new Date("2026-08-18") });
    expect(result.success).toBe(true);
    const titles = ((result.data as { news: { titulo: string }[] }).news).map((n) => n.titulo);
    expect(titles).not.toContain("Manu Gutiérrez, o repórter da Copa do Mundo 2026");
    expect(titles).toContain("Seleção Brasileira joga amistoso em setembro");
  });

  it("keeps Copa 2030 context news (Greek promising generation)", async () => {
    mockFetchAllRss.mockResolvedValueOnce([
      {
        ...makeNews(
          "n1",
          "Olho neles: conheça a promissora geração grega",
          "https://placar.com.br/futebol-europeu/olho-neles-conheca-a-promissora-geracao-grega",
        ),
        resumo_original:
          "Com jovens promessas emergindo no futebol europeu, a Grécia tem tudo para voltar aos maiores palcos e ir longe na Copa do Mundo 2030",
        data_publicacao: "2026-08-18T16:10:54-03:00",
      },
    ]);

    const result = await agent.execute({ date: new Date("2026-08-19") });
    expect(result.success).toBe(true);
    const titles = ((result.data as { news: { titulo: string }[] }).news).map((n) => n.titulo);
    expect(titles).toContain("Olho neles: conheça a promissora geração grega");
  });
});

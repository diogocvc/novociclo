import { BaseAgent, type AgentInput, type AgentOutput } from "../base";
import { fetchAllRss } from "@/lib/rss";
import rawBlocklist from "@/config/news-blocklist.json";

const blocklist = rawBlocklist as { urls: string[]; keywords: string[] };

type Group = {
  name: string;
  keywords: string[];
  weight: number;
};

const POSITIVE_GROUPS: Group[] = [
  {
    name: "SELEÇÃO",
    weight: 3,
    keywords: [
      "seleção brasileira", "selecao brasileira",
      "neymar", "ancelotti", "vinicius jr", "vinicius junior",
      "rodrygo", "endrick", "vini jr", "seleção masculina",
    ],
  },
  {
    name: "CBF",
    weight: 2,
    keywords: [
      "cbf", "confederação brasileira de futebol",
    ],
  },
  {
    name: "FIFA",
    weight: 3,
    keywords: [
      "fifa", "federação internacional de futebol", "infantino",
    ],
  },
  {
    name: "COMPETIÇÃO",
    weight: 3,
    keywords: [
      "copa do mundo", "copa 2030", "mundial 2030",
      "eliminatórias", "copa américa", "sul-americano",
    ],
  },
  {
    name: "SEDES",
    weight: 1,
    keywords: [
      "argentina", "uruguai", "paraguai",
      "marrocos", "portugal", "espanha",
    ],
  },
  {
    name: "CONTEXTO",
    weight: 1,
    keywords: [
      "brasil", "seleção", "futebol",
      "jogador", "técnico", "treinador",
    ],
  },
];

const EXCLUDED_KEYWORDS = [
  "vôlei", "volei", "voley", "voleibol",
  "basquete", "basquetebol", "nba",
  "handebol", "handball",
  "tênis", "tenis",
  "judô", "judo", "natação", "natacao",
  "atletismo", "ginástica", "ginastica",
  "fórmula 1", "formula 1", "f1",
  "mma", "boxe", "surfe", "skate",
  "futsal",
  "futebol de areia",
  "futebol feminino",
  "fisiculturismo",
  "liga das nações",
  "série a", "série b", "série c", "série d",
  "serie a", "serie b", "serie c", "serie d",
  "brasileirão", "brasileirao",
  "libertadores",
  "copa do brasil",
  "seleção francesa", "seleção espanhola", "seleção argentina",
  "seleção inglesa", "seleção alemã", "seleção italiana",
  "seleção portuguesa", "seleção holandesa", "seleção belga",
  "seleção da frança", "seleção da espanha", "seleção da argentina",
  "presidente da frança", "presidente da espanha",
  "botafogo", "ferroviário",
  "copa paulista", "copa do nordeste",
  "campeonato estadual", "estadual",
  "série a2", "serie a2", "série a3", "serie a3",
  "gramado natural", "grama natural",
  "transfer ban",
  "nfl",
];

const EXCLUDED_URL_PATTERNS = [
  "/volei/", "/basquete/", "/handebol/", "/tenis/",
  "/fisiculturismo/",
  "/futebol/futebol-internacional/",
  "/sp/", "/rj/", "/ce/", "/rs/", "/mg/", "/ba/",
  "/pr/", "/pe/", "/sc/", "/df/", "/es/", "/go/",
  "/futebol/times/",
  "/flamengo/", "/corinthians/", "/palmeiras/",
  "/sao-paulo/", "/santos/", "/gremio/", "/internacional/",
];

const CLUBES_BRASILEIROS = [
  "flamengo", "corinthians", "palmeiras", "são paulo", "saopaulo",
  "santos", "grêmio", "gremio", "internacional", "atlético-mg",
  "atletico-mg", "atlético paranaense", "cruzeiro", "botafogo",
  "fluminense", "vasco", "bahia", "fortaleza", "ceará", "ceara",
  "goiás", "goias", "coritiba", "chapecoense", "sport", "nautico",
  "vitória", "vitoria", "juventude", "cuiabá", "criciúma",
];

const OTHER_NATIONALITIES = [
  "frança", "francesa", "franceses",
  "espanha", "espanhola", "espanhóis", "espanhois",
  "argentina", "argentino", "argentinos",
  "inglaterra", "inglês", "inglesa", "ingleses",
  "alemanha", "alemã", "alemão", "alemao",
  "itália", "italiana", "italiano", "italianos",
  "portugal", "português", "portuguesa", "portugues",
  "holanda", "holandês", "holandesa", "holandes",
  "bélgica", "belga",
];

function hasDisguisedClubOrOffTopicNews(title: string, resumo: string, url: string): boolean {
  const text = `${title} ${resumo}`.toLowerCase();
  const temClube = CLUBES_BRASILEIROS.some((c) => text.includes(c));
  const temSelecaoOuCbf = text.includes("seleção") || text.includes("selecao") || text.includes("cbf");
  const temFifa = text.includes("fifa");
  const temCopa = text.includes("copa do mundo");

  if (temClube && temFifa && !temSelecaoOuCbf) return true;
  if (temClube && temCopa && !temSelecaoOuCbf) return true;

  return false;
}

function hasExcludedContent(title: string, resumo: string, url: string): boolean {
  const text = `${title} ${resumo}`;
  const urlLower = url.toLowerCase();

  if (EXCLUDED_KEYWORDS.some((kw) => text.includes(kw))) return true;
  if (EXCLUDED_URL_PATTERNS.some((p) => urlLower.includes(p))) return true;

  const hasNationality = OTHER_NATIONALITIES.some((n) => text.includes(n));
  const hasSelecao = text.includes("seleção") || text.includes("selecao");
  const hasBrasil =
    text.includes("brasil") ||
    text.includes("brasileira") ||
    text.includes("brasileiro") ||
    text.includes("brasileiras") ||
    text.includes("brasileiros");

  if (hasNationality && hasSelecao && !hasBrasil) return true;
  if (hasDisguisedClubOrOffTopicNews(title, resumo, url)) return true;

  return false;
}

function calculateScore(title: string, resumo: string): { score: number; matchedGroups: number } {
  const text = `${title} ${resumo}`.toLowerCase();
  let score = 0;
  let matchedGroups = 0;

  for (const group of POSITIVE_GROUPS) {
    const groupMatched = group.keywords.some((kw) => text.includes(kw));
    if (groupMatched) {
      score += group.weight;
      matchedGroups++;
    }
  }

  return { score, matchedGroups };
}

export function isRelevant(title: string, resumo?: string, url?: string): boolean {
  const safeResumo = (resumo ?? "").toLowerCase();
  const safeUrl = (url ?? "").toLowerCase();
  const text = `${title.toLowerCase()} ${safeResumo}`;

  if (hasExcludedContent(text, safeResumo, safeUrl)) return false;

  const { score, matchedGroups } = calculateScore(title, safeResumo);
  return score >= 3;
}

export function isBlocked(title: string, resumo?: string, url?: string): boolean {
  const safeResumo = (resumo ?? "").toLowerCase();
  const safeUrl = (url ?? "").toLowerCase();
  const text = `${title.toLowerCase()} ${safeResumo}`;

  if (safeUrl && blocklist.urls.some((u) => safeUrl.includes(u))) return true;
  if (blocklist.keywords.some((kw) => text.includes(kw.toLowerCase()))) return true;

  return false;
}

export class ResearcherAgent extends BaseAgent {
  constructor() {
    super("Pesquisador");
  }

  async execute(input: AgentInput): Promise<AgentOutput> {
    this.log("Iniciando coleta de notícias");
    this.log(`Data: ${input.date.toISOString()}`);

    try {
      const allRss = await fetchAllRss();
      const targetEnd = new Date(input.date);
      targetEnd.setHours(23, 59, 59, 999);
      const threeDaysBefore = new Date(targetEnd);
      threeDaysBefore.setDate(threeDaysBefore.getDate() - 3);

      const relevantRss = allRss.filter((n) => {
        if (!isRelevant(n.titulo, n.subtitulo || n.resumo_original, n.url)) return false;
        const pubDate = new Date(n.data_publicacao);
        if (isNaN(pubDate.getTime())) return true;
        return pubDate >= threeDaysBefore && pubDate <= targetEnd;
      });
      const cleanRss = relevantRss.filter((n) => !isBlocked(n.titulo, n.resumo_original, n.url));
      const topRss = cleanRss.slice(0, 8);

      if (topRss.length >= 3) {
        this.log(`RSS: ${allRss.length} total, ${relevantRss.length} relevantes, ${relevantRss.length - cleanRss.length} bloqueadas, ${topRss.length} selecionadas`);
      } else {
        this.log(`Apenas ${topRss.length} notícias relevantes no RSS. Publicando sem complemento (sem LLM).`);
      }
      return {
        success: true,
        data: { news: topRss, source: "rss" },
      };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro desconhecido";
      this.log(`Falha na coleta: ${message}`, "error");
      return { success: false, error: message };
    }
  }
}

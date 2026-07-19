import { BaseAgent, type AgentInput, type AgentOutput } from "../base";
import type { News } from "@/types";
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
];

const EXCLUDED_URL_PATTERNS = [
  "/volei/", "/basquete/", "/handebol/", "/tenis/",
  "/fisiculturismo/",
  "/futebol/futebol-internacional/",
  "/sp/", "/rj/", "/ce/", "/rs/", "/mg/", "/ba/",
  "/pr/", "/pe/", "/sc/", "/df/", "/es/", "/go/",
  "/futebol/times/",
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

const PROMPT = `Você é o Pesquisador do Novo Ciclo (modo fallback).

ATENÇÃO: Você está sendo acionado porque a coleta via RSS retornou poucas notícias relevantes. Sua missão é complementar com notícias factuais e realistas.

Escopo permitido (APENAS estes temas):
- Seleção Brasileira de Futebol (jogadores, convocações, técnico, jogos, preparação)
- CBF (decisões, eleições, planejamento que impactam a Seleção)
- FIFA (regras, decisões que impactam a Copa do Mundo)
- Copa do Mundo 2030 (preparação dos países sede, eliminatórias, Copa América 2028)

Regras:
- Gera de 3 a 8 notícias factuais e realistas
- NÃO inclua notícias sobre outras seleções (França, Espanha, Argentina como adversárias)
- NÃO inclua notícias de outras modalidades (vôlei, basquete, handebol, tênis, etc.)
- NÃO inclua notícias de divisões inferiores (Série B, C, D) ou estaduais
- Cada notícia deve ter: id, titulo, resumo_original, url, fonte, data_publicacao, idioma, data_coleta
- Fontes possíveis: ge.globo.com, uol.com.br, espn.com.br, cbf.com.br
- URLs devem seguir o padrão real dos domínios
- Data de publicação deve ser próxima à data fornecida
- NÃO invente jogadores ou eventos que não existem
- NÃO inclua opinião pessoal
- Responda APENAS com um objeto JSON no formato: { "news": [...] }`;

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
        return {
          success: true,
          data: { news: topRss, source: "rss" },
        };
      }

      this.log(`Apenas ${topRss.length} notícias relevantes no RSS. Gerando complemento via LLM...`);
      const result = await this.callLLM<{ news: News[] }>(PROMPT, {
        data: input.date.toISOString().split("T")[0],
      });

      const validLlmNews = result.news.filter((n) => isRelevant(n.titulo, n.subtitulo || n.resumo_original, n.url));
      if (validLlmNews.length < result.news.length) {
        this.log(`LLM gerou ${result.news.length} notícias, ${result.news.length - validLlmNews.length} fora do escopo`);
      }

      const combined = [...topRss, ...validLlmNews].slice(0, 8);
      this.log(`Coleta concluída: ${combined.length} notícias (${topRss.length} RSS + ${validLlmNews.length} LLM)`);
      return {
        success: true,
        data: { news: combined, source: "mixed" },
      };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro desconhecido";
      this.log(`Falha na coleta: ${message}`, "error");
      return { success: false, error: message };
    }
  }
}

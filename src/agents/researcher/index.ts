import { BaseAgent, type AgentInput, type AgentOutput } from "../base";
import type { News } from "@/types";
import { fetchAllRss } from "@/lib/rss";

const RELEVANCE_KEYWORDS = [
  "brasil", "seleção brasileira", "selecao brasileira",
  "neymar", "ancelotti", "cbf", "hexa", "hexacampeão",
  "copa 2030", "novo ciclo",
];

const EXCLUDED_KEYWORDS = [
  "vôlei", "volei", "voley", "voleibol",
  "basquete", "basquetebol", "nba",
  "handebol", "handball",
  "tênis", "tenis",
];

const PROMPT = `Você é o Pesquisador do Novo Ciclo (modo fallback).

ATENÇÃO: Você está sendo acionado porque a coleta via RSS retornou poucas notícias relevantes sobre a Seleção Brasileira. Sua missão é complementar com notícias factuais e realistas sobre a caminhada da Seleção rumo à Copa do Mundo de 2030.

Regras:
- Gera de 3 a 8 notícias factuais e realistas
- Foco exclusivo em: Seleção Brasileira de Futebol, jogadores, CBF, comissão técnica, Copa 2030
- NÃO inclua notícias de outras modalidades (vôlei, basquete, handebol, tênis, etc.)
- Cada notícia deve ter: id, titulo, resumo_original, url, fonte, data_publicacao, idioma, data_coleta
- Fontes possíveis: ge.globo.com, uol.com.br, espn.com.br, cbf.com.br
- URLs devem seguir o padrão real dos domínios
- Data de publicação deve ser próxima à data fornecida
- NÃO invente jogadores ou eventos que não existem
- NÃO inclua opinião pessoal
- Responda APENAS com um objeto JSON no formato: { "news": [...] }`;

function isRelevant(title: string, resumo?: string): boolean {
  const lowerTitle = title.toLowerCase();
  const lowerResumo = resumo?.toLowerCase() ?? "";

  const hasExcluded = EXCLUDED_KEYWORDS.some(
    (kw) => lowerTitle.includes(kw) || lowerResumo.includes(kw),
  );
  if (hasExcluded) return false;

  return RELEVANCE_KEYWORDS.some((kw) => lowerTitle.includes(kw));
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
      const relevantRss = allRss.filter((n) => isRelevant(n.titulo, n.resumo_original));
      const topRss = relevantRss.slice(0, 8);

      if (topRss.length >= 3) {
        this.log(`RSS: ${allRss.length} total, ${relevantRss.length} relevantes, ${topRss.length} selecionadas`);
        return {
          success: true,
          data: { news: topRss, source: "rss" },
        };
      }

      this.log(`Apenas ${topRss.length} notícias relevantes no RSS. Gerando complemento via LLM...`);
      const result = await this.callLLM<{ news: News[] }>(PROMPT, {
        data: input.date.toISOString().split("T")[0],
      });

      const combined = [...topRss, ...result.news].slice(0, 8);
      this.log(`Coleta concluída: ${combined.length} notícias (${topRss.length} RSS + ${result.news.length} LLM)`);
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

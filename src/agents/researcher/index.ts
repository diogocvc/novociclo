import { BaseAgent, type AgentInput, type AgentOutput } from "../base";
import type { News } from "@/types";

const PROMPT = `Você é o Pesquisador do Novo Ciclo.

Sua missão é gerar notícias reais e recentes sobre a Seleção Brasileira de Futebol, relacionadas à jornada em direção à Copa do Mundo de 2030.

Regras:
- Gere de 3 a 8 notícias factuais e realistas
- Cada notícia deve ter: id, titulo, resumo, url, fonte, dataPublicacao, categoria
- Fontes possíveis: ge.globo.com, uol.com.br, bbc.com, sportingnews.com, espn.com.br
- URLs devem seguir o padrão real dos domínios (ex: ge.globo.com/futebol/selecao-brasileira/...)
- Data de publicação deve ser próxima à data fornecida
- Categorias válidas: convocacao, jogo, classificacao, lesao, transferencia, declaracao, pre-temporada, amistoso, copa-2030
- NÃO invente jogadores ou eventos que não existem
- NÃO inclua opinião pessoal
- Responda APENAS com um objeto JSON no formato: { "news": [...] }`;

export class ResearcherAgent extends BaseAgent {
  constructor() {
    super("Pesquisador");
  }

  async execute(input: AgentInput): Promise<AgentOutput> {
    this.log("Iniciando coleta de notícias");
    this.log(`Data: ${input.date.toISOString()}`);

    try {
      const result = await this.callLLM<{ news: News[] }>(PROMPT, {
        data: input.date.toISOString().split("T")[0],
      });

      this.log(`Coleta concluída: ${result.news.length} notícias encontradas`);
      return {
        success: true,
        data: { news: result.news },
      };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro desconhecido";
      this.log(`Falha na coleta: ${message}`, "error");
      return { success: false, error: message };
    }
  }
}

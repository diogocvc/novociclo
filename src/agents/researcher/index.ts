import { BaseAgent, type AgentInput, type AgentOutput } from "../base";
import type { News } from "@/types";

const PROMPT = `Você é o Pesquisador do Novo Ciclo.

Sua missão é encontrar todas as informações relevantes publicadas desde a última execução do sistema.

Regras:
- Leia RSS feeds das fontes configuradas
- Consulte APIs configuradas
- Colete metadados (título, resumo, url, fonte, data, autor, thumbnail)
- Padronize URLs
- Remova links inválidos
- NÃO modifique o conteúdo original
- NÃO resuma
- NÃO interprete
- NÃO classifique importância`;

export class ResearcherAgent extends BaseAgent {
  constructor() {
    super("Pesquisador");
  }

  async execute(input: AgentInput): Promise<AgentOutput> {
    this.log("Iniciando coleta de notícias");
    this.log(`Data: ${input.date.toISOString()}`);

    try {
      const news: News[] = [];

      this.log(`Coleta concluída: ${news.length} notícias encontradas`);
      return {
        success: true,
        data: { news },
      };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro desconhecido";
      this.log(`Falha na coleta: ${message}`, "error");
      return { success: false, error: message };
    }
  }
}

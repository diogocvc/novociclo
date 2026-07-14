import { BaseAgent, type AgentInput, type AgentOutput } from "../base";
import type { Event } from "@/types";

const PROMPT = `Você é o Curador do Novo Ciclo.

Sua missão é transformar uma coleção de notícias em uma coleção de acontecimentos.

Regras:
- Remova duplicidades
- Agrupe notícias sobre o mesmo fato em um único acontecimento
- Elimine conteúdos irrelevantes
- Classifique cada acontecimento por categoria
- Identifique rumores, confirmações e anúncios oficiais
- Priorize fatos confirmados
- Preserve diversidade de fontes
- Cada acontecimento deve ter: id, titulo, resumo, categoria, fontes (array de strings)
- Responda APENAS com um objeto JSON no formato: { "events": [...] }`;

export class CuratorAgent extends BaseAgent {
  constructor() {
    super("Curador");
  }

  async execute(input: AgentInput): Promise<AgentOutput> {
    this.log("Iniciando curadoria");

    try {
      const news = input.news as { id: string; titulo: string; resumo: string; fonte: string; categoria: string }[] | undefined;
      this.log(`Processadas ${news?.length ?? 0} notícias`);

      if (!news || news.length === 0) {
        this.log("Nenhuma notícia para curar");
        return { success: true, data: { events: [] } };
      }

      const result = await this.callLLM<{ events: Event[] }>(PROMPT, {
        noticias: news,
      });

      this.log(`Curadoria concluída: ${result.events.length} acontecimentos`);
      return {
        success: true,
        data: { events: result.events },
      };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro desconhecido";
      this.log(`Falha na curadoria: ${message}`, "error");
      return { success: false, error: message };
    }
  }
}

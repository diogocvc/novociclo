import { BaseAgent, type AgentInput, type AgentOutput } from "../base";
import type { Event } from "@/types";

const PROMPT = `Você é o Curador do Novo Ciclo.

Sua missão é transformar uma coleção de notícias sobre a Seleção Brasileira em uma coleção de acontecimentos estruturados.

Escopo do ciclo (tudo isto é RELEVANTE e NÃO deve ser descartado):
- A Seleção Brasileira masculina e sua comissão técnica
- Jogadores convocáveis ou convocados (Vinicius Jr, Rodrygo, Endrick, etc.)
- CBF e Confederação Brasileira de Futebol
- FIFA, Infantino e governança da entidade
- Copa do Mundo 2030, Eliminatórias, Copa América e competições do ciclo
- Notícias que afetam direta ou indiretamente o caminho do Brasil até 2030

REGRAS DE NÃO-DESCARTE (obrigatórias):
1. Se a notícia menciona "Fifa", "Infantino", "CBF", "Seleção" ou "Copa do Mundo", INCLUA como acontecimento. Não importa se o assunto principal é outro país.
2. As notícias JÁ foram filtradas pelo Pesquisador. Seu trabalho é agrupar e estruturar, NÃO eliminar em massa.
3. Na dúvida entre incluir ou descartar, INCLUA.

O que descartar: apenas esportes não-futebol, futebol feminino, futebol de clubes sem qualquer conexão com a Seleção.

Regras:
- Remova duplicidades (mesmo fato em diferentes fontes)
- Agrupe notícias sobre o mesmo fato em um único acontecimento
- Classifique cada acontecimento por categoria
- Priorize fatos confirmados sobre rumores
- Preserve diversidade de fontes

Categorias: Seleção Brasileira, Comissão Técnica, Convocações, Jogadores, Lesões, Clubes, CBF, FIFA, Copa do Mundo 2030, Bastidores, Estatísticas

Cada acontecimento:
- id: string (slug única)
- titulo: string
- descricao: string (resumo do fato)
- categoria: string (uma das categorias acima)
- nivel_de_importancia: number (1-10)
- noticias_relacionadas: string[] (URLs ou IDs)
- data: string (ISO)

Responda APENAS com um objeto JSON no formato: { "events": [...] }`;

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

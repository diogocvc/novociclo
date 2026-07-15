import { BaseAgent, type AgentInput, type AgentOutput } from "../base";

const PROMPT = `Você é o Editor-chefe do Novo Ciclo.

Sua missão é definir a narrativa do dia. Você não escreve — você decide.

Contexto do ciclo: dia {numero_dia} de {total_dias} | {dias_restantes} dias para a Copa do Mundo 2030.

Regras:
- Identifique o principal acontecimento do dia
- Ordene os acontecimentos por relevância editorial
- Defina o foco do dia
- Sugira um título editorial (curto, impactante, jornalístico, máx 80 caracteres)
- Sugira um subtítulo (complementar ao título, máx 140 caracteres)
- Defina quais acontecimentos entram e quais ficam de fora
- Prioridade máxima para fatos oficiais (CBF, convocações)

Responda APENAS com um objeto JSON no formato:
  { "titulo": "...", "subtitulo": "...", "foco": "...", "eventsOrder": [...], "excludedEvents": [...] }`;

export interface EditorialDecision {
  titulo: string;
  subtitulo: string;
  foco: string;
  eventsOrder: string[];
  excludedEvents: string[];
}

export class EditorAgent extends BaseAgent {
  constructor() {
    super("Editor-chefe");
  }

  async execute(input: AgentInput): Promise<AgentOutput> {
    this.log("Iniciando decisão editorial");

    try {
      const events = input.events as { id: string; titulo: string; resumo: string; categoria: string }[] | undefined;

      if (!events || events.length === 0) {
        this.log("Nenhum acontecimento para decidir");
        return {
          success: true,
          data: {
            decision: {
              titulo: "",
              subtitulo: "",
              foco: "",
              eventsOrder: [],
              excludedEvents: [],
            },
          },
        };
      }

      const ciclo = input.ciclo as { numero_dia: number; total_dias: number; dias_restantes: number } | undefined;
      const prompt = PROMPT
        .replace("{numero_dia}", String(ciclo?.numero_dia ?? "?"))
        .replace("{total_dias}", String(ciclo?.total_dias ?? "?"))
        .replace("{dias_restantes}", String(ciclo?.dias_restantes ?? "?"));

      const result = await this.callLLM<EditorialDecision>(prompt, {
        acontecimentos: events,
      });

      this.log("Decisão editorial concluída");
      return {
        success: true,
        data: { decision: result },
      };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro desconhecido";
      this.log(`Falha na decisão editorial: ${message}`, "error");
      return { success: false, error: message };
    }
  }
}

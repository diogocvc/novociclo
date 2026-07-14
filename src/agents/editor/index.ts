import { BaseAgent, type AgentInput, type AgentOutput } from "../base";

const PROMPT = `Você é o Editor-chefe do Novo Ciclo.

Sua missão é definir qual é a narrativa do dia. Você não escreve. Você toma decisões editoriais.

Regras:
- Identifique o principal acontecimento do dia
- Ordene os acontecimentos por relevância
- Defina o foco do dia
- Sugira um título editorial (curto, impactante, jornalístico)
- Sugira um subtítulo (complementar ao título)
- Defina quais acontecimentos entram e quais ficam de fora
- O título deve ter no máximo 80 caracteres
- O subtítulo deve ter no máximo 140 caracteres
- Responda APENAS com um objeto JSON no formato:
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

      const result = await this.callLLM<EditorialDecision>(PROMPT, {
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

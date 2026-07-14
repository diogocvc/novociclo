import { BaseAgent, type AgentInput, type AgentOutput } from "../base";

const PROMPT = `Você é o Editor-chefe do Novo Ciclo.

Sua missão é definir qual é a narrativa do dia. Você não escreve. Você toma decisões editoriais.

Regras:
- Identifique o principal acontecimento do dia
- Ordene os acontecimentos por relevância
- Defina o foco do Dia
- Sugira um título editorial
- Defina quais acontecimentos entram e quais ficam de fora`;

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
      const decision: EditorialDecision = {
        titulo: "",
        subtitulo: "",
        foco: "",
        eventsOrder: [],
        excludedEvents: [],
      };

      this.log("Decisão editorial concluída");
      return {
        success: true,
        data: { decision },
      };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro desconhecido";
      this.log(`Falha na decisão editorial: ${message}`, "error");
      return { success: false, error: message };
    }
  }
}

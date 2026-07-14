import { BaseAgent, type AgentInput, type AgentOutput } from "../base";

const PROMPT = `Você é o Escritor do Novo Ciclo.

Sua missão é escrever o capítulo diário com base nas decisões editoriais e nos acontecimentos selecionados.

Regras:
- Escreva em português brasileiro
- Tom sóbrio e informativo
- Nunca expresse opinião
- Baseie-se exclusivamente nos acontecimentos fornecidos
- Estrutura: título, subtítulo, resumo, corpo do capítulo`;

export interface ChapterDraft {
  titulo: string;
  subtitulo: string;
  resumo: string;
  corpo: string;
}

export class WriterAgent extends BaseAgent {
  constructor() {
    super("Escritor");
  }

  async execute(input: AgentInput): Promise<AgentOutput> {
    this.log("Iniciando escrita do capítulo");

    try {
      const draft: ChapterDraft = {
        titulo: "",
        subtitulo: "",
        resumo: "",
        corpo: "",
      };

      this.log("Capítulo escrito com sucesso");
      return {
        success: true,
        data: { draft },
      };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro desconhecido";
      this.log(`Falha na escrita: ${message}`, "error");
      return { success: false, error: message };
    }
  }
}

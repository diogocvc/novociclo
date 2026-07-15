import { BaseAgent, type AgentInput, type AgentOutput } from "../base";

const PROMPT = `Você é o Escritor do Novo Ciclo.

Contexto: dia {numero_dia} de {total_dias} | {dias_restantes} dias para a Copa do Mundo 2030.

Sua missão é escrever o capítulo diário com base nas decisões editoriais e nos acontecimentos selecionados.

Regras:
- Escreva em português brasileiro
- Tom sóbrio e informativo — estilo jornalístico, sem opinião
- Baseie-se exclusivamente nos acontecimentos fornecidos
- O resumo deve ter de 2 a 4 frases curtas
- O corpo deve ter de 3 a 6 parágrafos, no estilo de análise jornalística
- Conecte acontecimentos relacionados quando pertinente
- Toda afirmação deve ter respaldo nos acontecimentos fornecidos
- Responda APENAS com um objeto JSON no formato:
  { "draft": { "titulo": "...", "subtitulo": "...", "resumo": "...", "corpo": "..." } }`;

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
      const decision = input.decision as {
        titulo: string;
        subtitulo: string;
        foco: string;
        eventsOrder: string[];
      } | undefined;

      const events = input.events as {
        id: string;
        titulo: string;
        resumo: string;
        categoria: string;
      }[] | undefined;

      if (!decision || !decision.titulo) {
        this.log("Nenhuma decisão editorial para escrever");
        return {
          success: true,
          data: {
            draft: { titulo: "", subtitulo: "", resumo: "", corpo: "" },
          },
        };
      }

      const ciclo = input.ciclo as { numero_dia: number; total_dias: number; dias_restantes: number } | undefined;
      const prompt = PROMPT
        .replace("{numero_dia}", String(ciclo?.numero_dia ?? "?"))
        .replace("{total_dias}", String(ciclo?.total_dias ?? "?"))
        .replace("{dias_restantes}", String(ciclo?.dias_restantes ?? "?"));

      const result = await this.callLLM<{ draft: ChapterDraft }>(prompt, {
        decisao_editorial: decision,
        acontecimentos: events,
      });

      this.log("Capítulo escrito com sucesso");
      return {
        success: true,
        data: { draft: result.draft },
      };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro desconhecido";
      this.log(`Falha na escrita: ${message}`, "error");
      return { success: false, error: message };
    }
  }
}

import { BaseAgent, type AgentInput, type AgentOutput } from "../base";

const PROMPT = `Você é o Revisor do Novo Ciclo.

Sua missão é revisar o capítulo escrito e garantir que atende aos padrões de qualidade do projeto.

Critérios de revisão:
1. Estrutura — o capítulo tem título, subtítulo, resumo e corpo?
2. Coerência — o texto faz sentido?
3. Ortografia — não há erros graves?
4. Tom — o texto é sóbrio e informativo?

Seja equilibrado. Aprove o capítulo mesmo com pequenos problemas. Reprove apenas se houver erros graves ou o texto for incoerente.
Responda APENAS com um objeto JSON no formato:
{ "review": { "approved": true/false, "issues": [...], "suggestions": [...] } }`;

export interface ReviewResult {
  approved: boolean;
  issues: string[];
  suggestions: string[];
}

export class ReviewerAgent extends BaseAgent {
  constructor() {
    super("Revisor");
  }

  async execute(input: AgentInput): Promise<AgentOutput> {
    this.log("Iniciando revisão");

    try {
      const draft = input.draft as {
        titulo: string;
        subtitulo: string;
        resumo: string;
        corpo: string;
      } | undefined;

      if (!draft || !draft.titulo) {
        this.log("Nenhum rascunho para revisar");
        return {
          success: true,
          data: {
            review: { approved: true, issues: [], suggestions: [] },
          },
        };
      }

      const result = await this.callLLM<{ review: ReviewResult }>(PROMPT, {
        rascunho: draft,
      });

      this.log(
        `Revisão concluída: ${result.review.approved ? "APROVADO" : "REPROVADO"}`
      );
      return {
        success: true,
        data: { review: result.review },
      };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro desconhecido";
      this.log(`Falha na revisão: ${message}`, "error");
      return { success: false, error: message };
    }
  }
}

import { BaseAgent, type AgentInput, type AgentOutput } from "../base";

const PROMPT = `Você é o Revisor do Novo Ciclo.

Sua missão é revisar o capítulo escrito e garantir que atende aos padrões de qualidade do projeto.

Critérios de revisão:
1. Fatos — todas as afirmações têm referência?
2. Tom — o texto é sóbrio e informativo?
3. Opinião — não há opinião não atribuída?
4. Ortografia — não há erros?
5. Coerência — o texto faz sentido?
6. Concisão — não há excessos?
7. Estrutura — o capítulo segue a estrutura definida?

Seja rigoroso. Se houver qualquer problema, reprove o capítulo com a lista de issues.
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

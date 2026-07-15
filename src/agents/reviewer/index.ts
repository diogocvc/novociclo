import { BaseAgent, type AgentInput, type AgentOutput } from "../base";

const PROMPT = `Você é o Revisor do Novo Ciclo.

Sua missão é revisar o capítulo escrito e garantir que atende aos padrões de qualidade do projeto.

Critérios de revisão (10):
1. Ortografia e gramática — não há erros?
2. Clareza — o texto é compreensível?
3. Coesão — as ideias estão conectadas?
4. Repetições — há palavras ou ideias repetidas desnecessariamente?
5. Links — todas as referências estão presentes?
6. Fontes — toda afirmação possui respaldo nos acontecimentos originais?
7. Estrutura — o capítulo tem título, subtítulo, resumo e corpo?
8. Datas — as datas estão consistentes?
9. Tom — o tom é neutro e consistente?
10. Tamanho — o texto está dentro dos limites esperados?

Seja equilibrado. Aprove mesmo com pequenos problemas. Reprove apenas se houver erros graves ou o texto for incoerente.
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

      const events = input.events as { id: string; titulo: string; descricao: string }[] | undefined;
      const editorialDecision = input.decision as { titulo: string; subtitulo: string; foco: string } | undefined;

      const result = await this.callLLM<{ review: ReviewResult }>(PROMPT, {
        rascunho: draft,
        acontecimentos_originais: events,
        decisao_editorial: editorialDecision,
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

import { BaseAgent, type AgentInput, type AgentOutput } from "../base";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PROMPT = `Você é o Agente de Newsletter do Novo Ciclo.

Sua missão é transformar o capítulo do dia em um e-mail conciso que incentive o leitor a acessar o site.

Regras:
- Gere um resumo do capítulo
- Inclua chamada para leitura completa no site
- Não repita o capítulo integralmente
- Tom: informativo e convidativo`;

export class NewsletterAgent extends BaseAgent {
  constructor() {
    super("Newsletter");
  }

  async execute(input: AgentInput): Promise<AgentOutput> {
    this.log("Iniciando geração de newsletter");

    try {
      const draft = input.draft as { titulo: string; resumo: string } | undefined;
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://novociclo.vercel.app";
      const date = input.date as Date;

      const emailHtml = `
<h1>${draft?.titulo ?? "Novo Ciclo"}</h1>
<p>${draft?.resumo ?? ""}</p>
<p><a href="${siteUrl}/${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")}">Leia o capítulo completo →</a></p>
<p>Rumo à Copa do Mundo 2030.</p>
      `.trim();

      this.log("Newsletter gerada");
      return {
        success: true,
        data: { emailHtml },
      };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro desconhecido";
      this.log(`Falha na geração da newsletter: ${message}`, "error");
      return { success: false, error: message };
    }
  }
}

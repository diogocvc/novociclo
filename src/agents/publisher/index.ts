import fs from "fs";
import path from "path";
import { BaseAgent, type AgentInput, type AgentOutput } from "../base";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PROMPT = `Você é o Publicador do Novo Ciclo.

Sua missão é transformar o capítulo aprovado em um arquivo MDX pronto para o repositório.

Regras:
- Gere o arquivo MDX com frontmatter completo
- Salve em content/YYYY/MM/DD.mdx
- Atualize os índices necessários
- O conteúdo nunca deve ser alterado nesta etapa`;

export class PublisherAgent extends BaseAgent {
  constructor() {
    super("Publicador");
  }

  async execute(input: AgentInput): Promise<AgentOutput> {
    this.log("Iniciando publicação");

    try {
      const draft = input.draft as {
        titulo: string;
        subtitulo?: string;
        resumo: string;
        corpo: string;
      };

      const date = input.date as Date;
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const contentDir = path.join(
        process.cwd(),
        "content",
        String(year),
        month
      );

      if (!fs.existsSync(contentDir)) {
        fs.mkdirSync(contentDir, { recursive: true });
      }

      const filePath = path.join(contentDir, `${day}.mdx`);
      const mdxContent = `---
titulo: "${draft.titulo}"
${draft.subtitulo ? `subtitulo: "${draft.subtitulo}"` : ""}
resumo: "${draft.resumo}"
---

${draft.corpo}
`;

      fs.writeFileSync(filePath, mdxContent, "utf-8");
      this.log(`Arquivo publicado: ${filePath}`);

      return {
        success: true,
        data: { filePath },
      };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro desconhecido";
      this.log(`Falha na publicação: ${message}`, "error");
      return { success: false, error: message };
    }
  }
}

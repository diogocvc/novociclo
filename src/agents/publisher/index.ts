import fs from "fs";
import path from "path";
import { BaseAgent, type AgentInput, type AgentOutput } from "../base";

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
      const dateStr = `${year}-${month}-${day}`;
      const mdxContent = `---
id: "${dateStr}"
data: "${dateStr}"
slug: "${year}/${month}/${day}"
titulo: "${draft.titulo}"
${draft.subtitulo ? `subtitulo: "${draft.subtitulo}"\n` : ""}resumo: "${draft.resumo}"
categorias: []
tags: []
referencias: []
tempo_de_leitura: 1
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

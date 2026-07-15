import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { BaseAgent, type AgentInput, type AgentOutput } from "../base";

interface NewsItem {
  id: string;
  titulo: string;
  url: string;
  thumbnail?: string;
  fonte: string;
  data_publicacao: string;
  resumo_original?: string;
  idioma?: string;
  data_coleta?: string;
}

function buildFrontmatter(fields: Record<string, unknown>): string {
  const clean: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(fields)) {
    if (value !== undefined && value !== null) {
      clean[key] = value;
    }
  }
  return yaml.dump(clean, { lineWidth: 120, quotingType: '"' });
}

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

      const allNews = input.news as NewsItem[] | undefined;

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

      const frontmatter: Record<string, unknown> = {
        id: dateStr,
        data: dateStr,
        slug: `${year}/${month}/${day}`,
        titulo: draft.titulo,
        subtitulo: draft.subtitulo || undefined,
        resumo: draft.resumo,
        categorias: [],
        tags: [],
        tempo_de_leitura: 1,
      };

      if (allNews && allNews.length > 0) {
        frontmatter.noticia_destaque = allNews[0];
        if (allNews.length > 1) {
          frontmatter.noticias_referencia = allNews.slice(1);
        }
      }

      const mdxContent = `---\n${buildFrontmatter(frontmatter)}---\n\n${draft.corpo}\n`;

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

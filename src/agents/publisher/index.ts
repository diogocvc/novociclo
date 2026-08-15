import fs from "fs";
import path from "path";
import * as yaml from "js-yaml";
import type { News } from "@/types";
import { BaseAgent, type AgentInput, type AgentOutput } from "../base";

function buildFrontmatter(fields: Record<string, unknown>): string {
  const clean: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(fields)) {
    if (value !== undefined && value !== null) {
      clean[key] = value;
    }
  }
  return yaml.dump(clean, { lineWidth: 120, quoteStyle: "double" });
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

      if (!draft?.titulo?.trim() && !draft?.resumo?.trim()) {
        this.log("Draft sem conteúdo (título e resumo vazios). Arquivo não criado.");
        return { success: true, data: { skipped: true, reason: "empty_draft" } };
      }

      const allNews = input.news as News[] | undefined;
      const events = input.events as
        | { id: string; nivel_de_importancia?: number; noticias_relacionadas?: string[] }[]
        | undefined;
      const decision = input.decision as
        | { eventsOrder?: string[] }
        | undefined;

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
        let orderedNews: News[] = allNews;

        if (events && events.length > 0) {
          const eventOrder = decision?.eventsOrder ?? [];
          const orderedEvents = eventOrder.length
            ? eventOrder
                .map((id) => events.find((e) => e.id === id))
                .filter((e): e is NonNullable<typeof e> => Boolean(e))
            : [...events].sort(
                (a, b) =>
                  (b.nivel_de_importancia ?? 0) - (a.nivel_de_importancia ?? 0)
              );

          orderedNews = [];
          const used = new Set<string>();
          for (const event of orderedEvents) {
            for (const ref of event.noticias_relacionadas ?? []) {
              const match = allNews.find(
                (n) => n.id === ref || n.url === ref
              );
              if (match && !used.has(match.id)) {
                used.add(match.id);
                orderedNews.push(match);
              }
            }
          }
          for (const n of allNews) {
            if (!used.has(n.id)) orderedNews.push(n);
          }
        }

        frontmatter.noticia_destaque = orderedNews[0];
        if (orderedNews.length > 1) {
          frontmatter.noticias_referencia = orderedNews.slice(1);
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

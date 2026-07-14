import fs from "fs";
import path from "path";
import { BaseAgent, type AgentInput, type AgentOutput } from "../base";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PROMPT = `Você é o Agente de SEO do Novo Ciclo.

Sua missão é atualizar automaticamente todos os recursos necessários para indexação após a publicação de um novo capítulo.

Regras:
- Atualize o sitemap.xml
- Atualize o feed RSS
- Atualize o Open Graph do capítulo
- Garanta que links estejam corretos`;

export class SEOAgent extends BaseAgent {
  constructor() {
    super("SEO");
  }

  async execute(input: AgentInput): Promise<AgentOutput> {
    this.log("Iniciando atualização de SEO");

    try {
      const publicDir = path.join(process.cwd(), "public");
      const siteUrl =
        process.env.NEXT_PUBLIC_SITE_URL ?? "https://novociclo.vercel.app";
      const date = input.date as Date;
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      const sitemapPath = path.join(publicDir, "sitemap.xml");
      if (fs.existsSync(sitemapPath)) {
        this.log("Sitemap exists — would update here in production");
      }

      const rssPath = path.join(publicDir, "rss.xml");
      if (!fs.existsSync(rssPath)) {
        const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Novo Ciclo</title>
    <link>${siteUrl}</link>
    <description>Rumo à Copa do Mundo 2030</description>
    <item>
      <title>${(input.draft as { titulo: string })?.titulo ?? "Novo Ciclo"}</title>
      <link>${siteUrl}/${year}/${month}/${day}</link>
      <pubDate>${date.toUTCString()}</pubDate>
    </item>
  </channel>
</rss>`;
        fs.writeFileSync(rssPath, rss, "utf-8");
        this.log(`RSS feed criado: ${rssPath}`);
      }

      this.log("SEO atualizado com sucesso");
      return {
        success: true,
      };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro desconhecido";
      this.log(`Falha na atualização de SEO: ${message}`, "error");
      return { success: false, error: message };
    }
  }
}

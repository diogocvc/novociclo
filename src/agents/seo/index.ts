import fs from "fs";
import path from "path";
import { BaseAgent, type AgentInput, type AgentOutput } from "../base";

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

      const draft = input.draft as { titulo?: string } | undefined;
      const rssPath = path.join(publicDir, "rss.xml");
      const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Novo Ciclo</title>
    <link>${siteUrl}</link>
    <description>Rumo à Copa do Mundo 2030</description>
    <item>
      <title>${draft?.titulo ?? "Novo Ciclo"}</title>
      <link>${siteUrl}/${year}/${month}/${day}</link>
      <pubDate>${date.toUTCString()}</pubDate>
    </item>
  </channel>
</rss>`;
      fs.writeFileSync(rssPath, rss, "utf-8");
      this.log(`RSS feed atualizado: ${rssPath}`);

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

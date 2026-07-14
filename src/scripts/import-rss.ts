import fs from "fs";
import path from "path";
import type { News } from "@/types";
import { sources } from "@/config/sources";

const DATA_DIR = path.join(process.cwd(), "src", "data");

interface RssItem {
  title?: string;
  link?: string;
  pubDate?: string;
  content?: string;
}

async function fetchRss(url: string): Promise<RssItem[]> {
  try {
    const response = await fetch(url);
    const text = await response.text();
    const items: RssItem[] = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
    let match;

    while ((match = itemRegex.exec(text)) !== null) {
      const itemXml = match[1];
      const title = itemXml.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/i)?.[1]
        ?? itemXml.match(/<title>(.*?)<\/title>/i)?.[1];
      const link = itemXml.match(/<link>(.*?)<\/link>/i)?.[1];
      const pubDate = itemXml.match(/<pubDate>(.*?)<\/pubDate>/i)?.[1];
      items.push({ title, link, pubDate });
    }

    return items;
  } catch (error) {
    console.error(`Failed to fetch RSS from ${url}:`, error);
    return [];
  }
}

export async function importAllSources(): Promise<News[]> {
  const allNews: News[] = [];
  const activeSources = sources.filter((s) => s.ativo && s.rss);

  for (const source of activeSources) {
    if (!source.rss) continue;
    console.log(`Fetching: ${source.nome} (${source.rss})`);
    const items = await fetchRss(source.rss);

    for (const item of items) {
      if (!item.title || !item.link) continue;

      const news: News = {
        id: `rss-${source.nome}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        titulo: item.title,
        resumo_original: item.content ?? item.title,
        url: item.link,
        fonte: source.nome,
        data_publicacao: item.pubDate ?? new Date().toISOString(),
        idioma: source.idioma,
        data_coleta: new Date().toISOString(),
      };
      allNews.push(news);
    }
  }

  return allNews;
}

export function saveImportedNews(news: News[]): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  const dateStr = new Date().toISOString().split("T")[0];
  const outPath = path.join(DATA_DIR, `imported-news-${dateStr}.json`);
  fs.writeFileSync(outPath, JSON.stringify(news, null, 2), "utf-8");
  console.log(`Saved ${news.length} news articles to ${outPath}`);
}

importAllSources()
  .then((news) => {
    saveImportedNews(news);
    process.exit(0);
  })
  .catch((err) => {
    console.error("Import failed:", err);
    process.exit(1);
  });

import fs from "fs";
import path from "path";
import { fetchAllRss } from "@/lib/rss";
import type { News } from "@/types";

const DATA_DIR = path.join(process.cwd(), "src", "data");

export function saveImportedNews(news: News[]): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  const dateStr = new Date().toISOString().split("T")[0];
  const outPath = path.join(DATA_DIR, `imported-news-${dateStr}.json`);
  fs.writeFileSync(outPath, JSON.stringify(news, null, 2), "utf-8");
  console.log(`Salvos ${news.length} artigos em ${outPath}`);
}

fetchAllRss()
  .then((news) => {
    console.log(`Importadas ${news.length} notícias no total`);
    saveImportedNews(news);
    process.exit(0);
  })
  .catch((err) => {
    console.error("Importação falhou:", err);
    process.exit(1);
  });

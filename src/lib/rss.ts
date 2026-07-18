import { XMLParser } from "fast-xml-parser";
import type { News } from "@/types";
import { sources } from "@/config/sources";

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  textNodeName: "#text",
  isArray: (name) => name === "item" || name === "entry",
});

interface RssChannel {
  title?: string;
  item?: RssItem[];
}

interface RssFeed {
  rss?: {
    channel: RssChannel;
  };
  feed?: {
    entry?: AtomEntry[];
    title?: string;
  };
}

interface RssItem {
  title?: string | { "#cdata"?: string };
  link?: string | { "@_href"?: string };
  description?: string | { "#cdata"?: string };
  "content:encoded"?: string | { "#cdata"?: string };
  "atom:subtitle"?: string | { "#cdata"?: string };
  pubDate?: string;
  published?: string;
  "media:content"?: { "@_url"?: string };
}

interface AtomEntry {
  title?: string | { "#cdata"?: string };
  link?: { "@_href"?: string };
  summary?: string | { "#cdata"?: string };
  published?: string;
}

function extractText(
  val: string | { "#cdata"?: string; "#text"?: string } | undefined
): string {
  if (!val) return "";
  if (typeof val === "string") return val;
  if (val["#cdata"]) return val["#cdata"];
  if (val["#text"]) return val["#text"];
  return "";
}

function extractLink(item: RssItem | AtomEntry): string {
  if (typeof item.link === "string") return item.link;
  if (item.link && typeof item.link === "object" && "@_href" in item.link) {
    return (item.link as { "@_href"?: string })["@_href"] ?? "";
  }
  return "";
}

function extractThumbnail(item: RssItem): string | undefined {
  const media = item["media:content"];
  if (media?.["@_url"]) return media["@_url"];

  const desc = extractText(item.description || item["content:encoded"]);
  const match = desc.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match?.[1] ?? undefined;
}

function parseRssItems(channel: RssChannel): RawNews[] {
  if (!channel.item) return [];
  return channel.item.map((item: RssItem) => ({
    title: extractText(item.title),
    link: extractLink(item),
    description: extractText(item.description || item["content:encoded"]),
    subtitle: extractText(item["atom:subtitle"]),
    pubDate: item.pubDate ?? "",
    thumbnail: extractThumbnail(item),
  }));
}

function parseAtomEntries(feed: { entry?: AtomEntry[] }): RawNews[] {
  if (!feed.entry) return [];
  return feed.entry.map((entry: AtomEntry) => ({
    title: extractText(entry.title),
    link: extractLink(entry),
    description: extractText(entry.summary),
    pubDate: entry.published ?? "",
  }));
}

interface RawNews {
  title: string;
  link: string;
  description: string;
  subtitle: string;
  pubDate: string;
  thumbnail?: string;
}

export async function fetchSourceRss(
  rssUrl: string
): Promise<RawNews[]> {
  try {
    const response = await fetch(rssUrl);
    const text = await response.text();
    const parsed = parser.parse(text) as RssFeed;

    if (parsed.rss?.channel) {
      return parseRssItems(parsed.rss.channel);
    }

    if (parsed.feed) {
      return parseAtomEntries(parsed.feed);
    }

    return [];
  } catch {
    return [];
  }
}

export async function fetchAllRss(): Promise<News[]> {
  const allNews: News[] = [];
  const rssSources = sources.filter((s) => s.ativo && s.rss);

  for (const source of rssSources) {
    if (!source.rss) continue;
    try {
      const items = await fetchSourceRss(source.rss);
      for (const item of items) {
        if (!item.title || !item.link) continue;
        allNews.push({
          id: `rss-${source.nome}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          titulo: item.title,
          subtitulo: item.subtitle || undefined,
          resumo_original: item.description || item.title,
          url: item.link,
          thumbnail: item.thumbnail,
          fonte: source.nome,
          autor: undefined,
          data_publicacao: item.pubDate || new Date().toISOString(),
          idioma: source.idioma,
          data_coleta: new Date().toISOString(),
        });
      }
    } catch {
      console.warn(`[RSS] Falha ao buscar ${source.nome}: ${source.rss}`);
    }
  }

  return allNews;
}

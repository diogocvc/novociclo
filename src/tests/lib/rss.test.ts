import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

vi.mock("@/config/sources", () => ({
  sources: [
    {
      nome: "ge",
      url: "https://ge.globo.com",
      rss: "https://globoesporte.globo.com/rss/ge/",
      idioma: "pt-BR",
      ativo: true,
    },
  ],
}));

const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>ge</title>
    <link>https://ge.globo.com/</link>
    <item>
      <title>Seleção Brasileira inicia preparação</title>
      <link>https://ge.globo.com/noticia1</link>
      <description>Descrição da notícia</description>
      <pubDate>Wed, 15 Jul 2026 10:00:00 -0300</pubDate>
    </item>
    <item>
      <title>Outra notícia qualquer</title>
      <link>https://ge.globo.com/noticia2</link>
      <description>Outra descrição</description>
      <pubDate>Wed, 15 Jul 2026 11:00:00 -0300</pubDate>
    </item>
  </channel>
</rss>`;

function mockRssResponse(xml: string) {
  const encoder = new TextEncoder();
  const buffer = encoder.encode(xml).buffer;
  return {
    ok: true,
    arrayBuffer: () => Promise.resolve(buffer),
    headers: {
      get: (name: string) =>
        name.toLowerCase() === "content-type"
          ? "application/rss+xml; charset=utf-8"
          : null,
    },
  };
}

describe("rss lib", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("fetches and parses RSS items", async () => {
    mockFetch.mockResolvedValueOnce(mockRssResponse(rssXml));

    const { fetchSourceRss } = await import("@/lib/rss");
    const items = await fetchSourceRss("https://globoesporte.globo.com/rss/ge/");

    expect(items).toHaveLength(2);
    expect(items[0].title).toBe("Seleção Brasileira inicia preparação");
    expect(items[0].link).toBe("https://ge.globo.com/noticia1");
    expect(items[1].title).toBe("Outra notícia qualquer");
  });

  it("fetchAllRss returns News array", async () => {
    mockFetch.mockResolvedValueOnce(mockRssResponse(rssXml));

    const { fetchAllRss } = await import("@/lib/rss");
    const news = await fetchAllRss();

    expect(news.length).toBeGreaterThanOrEqual(2);
    expect(news[0]).toHaveProperty("id");
    expect(news[0]).toHaveProperty("titulo");
    expect(news[0]).toHaveProperty("url");
    expect(news[0]).toHaveProperty("fonte");
    expect(news[0].fonte).toBe("ge");
  });

  it("handles fetch errors gracefully", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    const { fetchSourceRss } = await import("@/lib/rss");
    const items = await fetchSourceRss("https://invalid.url/rss");

    expect(items).toEqual([]);
  });
});

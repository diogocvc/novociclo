import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import fs from "fs";
import path from "path";

vi.mock("@/lib/llm");

import { SEOAgent } from "@/agents/seo";

describe("SEOAgent", () => {
  let agent: SEOAgent;

  beforeEach(() => {
    agent = new SEOAgent();
    vi.spyOn(process, "cwd").mockReturnValue(path.resolve(__dirname, "../fixtures"));
    const publicDir = path.resolve(__dirname, "../fixtures/public");
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
  });

  afterEach(() => {
    vi.restoreAllMocks();
    const rssPath = path.resolve(__dirname, "../fixtures/public/rss.xml");
    if (fs.existsSync(rssPath)) {
      fs.unlinkSync(rssPath);
    }
    const sitemapPath = path.resolve(__dirname, "../fixtures/public/sitemap.xml");
    if (fs.existsSync(sitemapPath)) {
      fs.unlinkSync(sitemapPath);
    }
  });

  it("creates RSS feed", async () => {
    const result = await agent.execute({
      date: new Date("2026-07-14"),
      draft: { titulo: "Capítulo de teste" },
    });

    expect(result.success).toBe(true);

    const rssPath = path.resolve(__dirname, "../fixtures/public/rss.xml");
    expect(fs.existsSync(rssPath)).toBe(true);
    const content = fs.readFileSync(rssPath, "utf-8");
    expect(content).toContain("Capítulo de teste");
    expect(content).toContain("2026/07/14");
  });

  it("creates sitemap listing published chapters", async () => {
    const result = await agent.execute({
      date: new Date("2026-07-14"),
      draft: { titulo: "Capítulo de teste" },
    });

    expect(result.success).toBe(true);

    const sitemapPath = path.resolve(__dirname, "../fixtures/public/sitemap.xml");
    expect(fs.existsSync(sitemapPath)).toBe(true);
    const content = fs.readFileSync(sitemapPath, "utf-8");
    expect(content).toContain("https://novociclo.vercel.app/2026/07/05");
    expect(content).toContain("https://novociclo.vercel.app/sobre");
    expect(content).not.toContain("/manifesto");
  });
});

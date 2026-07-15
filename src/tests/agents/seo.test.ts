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
  });

  afterEach(() => {
    vi.restoreAllMocks();
    const rssPath = path.resolve(__dirname, "../fixtures/public/rss.xml");
    if (fs.existsSync(rssPath)) {
      fs.unlinkSync(rssPath);
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
});

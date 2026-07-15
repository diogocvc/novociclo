import { describe, it, expect, beforeAll, afterAll } from "vitest";
import path from "path";

const ORIGINAL_CWD = process.cwd();

describe("content module", () => {
  beforeAll(() => {
    const fixtureDir = path.resolve(__dirname, "../fixtures");
    process.chdir(fixtureDir);
  });

  afterAll(() => {
    process.chdir(ORIGINAL_CWD);
  });

  it("loads getAllChapters from fixtures", async () => {
    const { getAllChapters } = await import("@/lib/content");
    const chapters = getAllChapters();
    expect(chapters.length).toBeGreaterThanOrEqual(2);
  });

  it("getLatestChapterData returns most recent", async () => {
    const { getLatestChapterData } = await import("@/lib/content");
    const latest = getLatestChapterData();
    expect(latest).toBeDefined();
    expect(latest!.slug).toBe("2026/07/06");
  });

  it("getChapterBySlugData finds correct chapter", async () => {
    const { getChapterBySlugData } = await import("@/lib/content");
    const chapter = getChapterBySlugData("2026/07/05");
    expect(chapter).toBeDefined();
    expect(chapter!.titulo).toBe("O fim de um ciclo");
  });

  it("getChapterNarrative returns MDX body", async () => {
    const { getChapterNarrative } = await import("@/lib/content");
    const narrative = getChapterNarrative("2026/07/05");
    expect(narrative).toContain("Seleção Brasileira foi eliminada");
  });
});

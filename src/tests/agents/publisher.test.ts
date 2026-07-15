import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import fs from "fs";
import path from "path";

vi.mock("@/lib/llm");

import { PublisherAgent } from "@/agents/publisher";

const TEST_CONTENT_DIR = path.resolve(__dirname, "../fixtures/content_test");

describe("PublisherAgent", () => {
  let agent: PublisherAgent;

  beforeEach(() => {
    agent = new PublisherAgent();
    vi.spyOn(process, "cwd").mockReturnValue(path.resolve(__dirname, "../fixtures"));
  });

  afterEach(() => {
    vi.restoreAllMocks();
    if (fs.existsSync(TEST_CONTENT_DIR)) {
      fs.rmSync(TEST_CONTENT_DIR, { recursive: true, force: true });
    }
  });

  it("creates MDX file on publish", async () => {
    const date = new Date("2026-07-15T12:00:00-03:00");
    const result = await agent.execute({
      date,
      draft: {
        titulo: "Teste",
        subtitulo: "Subtítulo",
        resumo: "Resumo",
        corpo: "Corpo do capítulo.",
      },
    });

    expect(result.success).toBe(true);

    const expectedPath = path.resolve(
      __dirname,
      "../fixtures/content/2026/07/15.mdx"
    );
    expect(fs.existsSync(expectedPath)).toBe(true);
    const content = fs.readFileSync(expectedPath, "utf-8");
    expect(content).toContain("Teste");
    expect(content).toContain("Corpo do capítulo");

    fs.unlinkSync(expectedPath);
  });
});

import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/llm");

import { NewsletterAgent } from "@/agents/newsletter";

describe("NewsletterAgent", () => {
  let agent: NewsletterAgent;

  beforeEach(() => {
    agent = new NewsletterAgent();
  });

  it("generates email HTML", async () => {
    const result = await agent.execute({
      date: new Date("2026-07-14"),
      draft: {
        titulo: "Título do capítulo",
        subtitulo: "Sub",
        resumo: "Resumo do capítulo",
        corpo: "Corpo",
      },
    });

    expect(result.success).toBe(true);
    const html = (result.data as { emailHtml: string }).emailHtml;
    expect(html).toContain("Título do capítulo");
    expect(html).toContain("Resumo do capítulo");
    expect(html).toContain("novociclo.vercel.app");
    expect(html).toContain("2026/07/14");
  });

  it("handles missing draft gracefully", async () => {
    const result = await agent.execute({
      date: new Date("2026-07-14"),
    });

    expect(result.success).toBe(true);
    const html = (result.data as { emailHtml: string }).emailHtml;
    expect(html).toContain("Novo Ciclo");
  });
});

import { describe, it, expect, vi, beforeEach } from "vitest";
import type { MockedFunction } from "vitest";

vi.mock("@/lib/llm", () => ({
  callLLM: vi.fn(),
}));

import { ReviewerAgent } from "@/agents/reviewer";
import { callLLM } from "@/lib/llm";

const mockCallLLM = callLLM as MockedFunction<typeof callLLM>;

describe("ReviewerAgent", () => {
  let agent: ReviewerAgent;

  beforeEach(() => {
    agent = new ReviewerAgent();
    vi.clearAllMocks();
  });

  it("approves a valid draft", async () => {
    mockCallLLM.mockResolvedValueOnce({
      content: {
        review: { approved: true, issues: [], suggestions: [] },
      },
      tokens: { prompt: 10, completion: 20, total: 30 },
    });

    const result = await agent.execute({
      date: new Date(),
      draft: { titulo: "Título", subtitulo: "Sub", resumo: "Resumo", corpo: "Corpo" },
    });

    expect(result.success).toBe(true);
    const review = (result.data as { review: { approved: boolean } }).review;
    expect(review.approved).toBe(true);
  });

  it("rejects a bad draft", async () => {
    mockCallLLM.mockResolvedValueOnce({
      content: {
        review: { approved: false, issues: ["Texto incoerente"], suggestions: ["Reescrever"] },
      },
      tokens: { prompt: 10, completion: 20, total: 30 },
    });

    const result = await agent.execute({
      date: new Date(),
      draft: { titulo: "Título", subtitulo: "", resumo: "", corpo: "" },
    });

    expect(result.success).toBe(true);
    expect((result.data as { review: { approved: boolean } }).review.approved).toBe(false);
  });

  it("auto-approves when no draft", async () => {
    const result = await agent.execute({
      date: new Date(),
      draft: { titulo: "", subtitulo: "", resumo: "", corpo: "" },
    });

    expect(result.success).toBe(true);
    expect((result.data as { review: { approved: boolean } }).review.approved).toBe(true);
  });
});

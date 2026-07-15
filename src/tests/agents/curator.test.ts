import { describe, it, expect, vi, beforeEach } from "vitest";
import type { MockedFunction } from "vitest";

vi.mock("@/lib/llm", () => ({
  callLLM: vi.fn(),
}));

import { CuratorAgent } from "@/agents/curator";
import { callLLM } from "@/lib/llm";

const mockCallLLM = callLLM as MockedFunction<typeof callLLM>;

describe("CuratorAgent", () => {
  let agent: CuratorAgent;

  beforeEach(() => {
    agent = new CuratorAgent();
    vi.clearAllMocks();
  });

  it("curates news into events", async () => {
    mockCallLLM.mockResolvedValueOnce({
      content: {
        events: [
          {
            id: "e1",
            titulo: "Evento teste",
            descricao: "Descrição",
            categoria: "Seleção Brasileira",
            nivel_de_importancia: 5,
            noticias_relacionadas: ["n1"],
            data: "2026-07-14",
          },
        ],
      },
      tokens: { prompt: 10, completion: 20, total: 30 },
    });

    const result = await agent.execute({
      date: new Date(),
      news: [{ id: "n1", titulo: "test", resumo: "test", fonte: "ge", categoria: "Seleção Brasileira" }],
    });

    expect(result.success).toBe(true);
    expect((result.data as { events: unknown[] }).events).toHaveLength(1);
  });

  it("returns empty events when no news provided", async () => {
    const result = await agent.execute({ date: new Date(), news: [] });
    expect(result.success).toBe(true);
    expect((result.data as { events: unknown[] }).events).toEqual([]);
  });

  it("returns error when LLM fails", async () => {
    mockCallLLM.mockRejectedValueOnce(new Error("API error"));

    const result = await agent.execute({
      date: new Date(),
      news: [{ id: "n1", titulo: "test", resumo: "test", fonte: "ge", categoria: "Seleção Brasileira" }],
    });

    expect(result.success).toBe(false);
    expect(result.error).toBe("API error");
  });
});

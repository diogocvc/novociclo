import { describe, it, expect, vi, beforeEach } from "vitest";
import type { MockedFunction } from "vitest";

vi.mock("@/lib/llm", () => ({
  callLLM: vi.fn(),
}));

import { WriterAgent } from "@/agents/writer";
import { callLLM } from "@/lib/llm";

const mockCallLLM = callLLM as MockedFunction<typeof callLLM>;

describe("WriterAgent", () => {
  let agent: WriterAgent;

  beforeEach(() => {
    agent = new WriterAgent();
    vi.clearAllMocks();
  });

  it("writes a draft from decision", async () => {
    mockCallLLM.mockResolvedValueOnce({
      content: {
        draft: {
          titulo: "Capítulo teste",
          subtitulo: "Subtítulo",
          resumo: "Resumo do capítulo",
          corpo: "Corpo do capítulo com análise jornalística.",
        },
      },
      tokens: { prompt: 10, completion: 20, total: 30 },
    });

    const result = await agent.execute({
      date: new Date(),
      decision: {
        titulo: "Decisão",
        subtitulo: "Sub",
        foco: "Foco",
        eventsOrder: ["e1"],
      },
      events: [{ id: "e1", titulo: "Evento", resumo: "Resumo", categoria: "Seleção Brasileira" }],
    });

    expect(result.success).toBe(true);
    const draft = (result.data as { draft: Record<string, unknown> }).draft;
    expect(draft.titulo).toBe("Capítulo teste");
  });

  it("returns empty draft when no decision", async () => {
    const result = await agent.execute({
      date: new Date(),
      decision: { titulo: "", subtitulo: "", foco: "", eventsOrder: [] },
    });

    expect(result.success).toBe(true);
    const draft = (result.data as { draft: Record<string, unknown> }).draft;
    expect(draft.titulo).toBe("");
  });
});

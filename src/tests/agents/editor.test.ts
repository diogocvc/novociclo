import { describe, it, expect, vi, beforeEach } from "vitest";
import type { MockedFunction } from "vitest";

vi.mock("@/lib/llm", () => ({
  callLLM: vi.fn(),
}));

import { EditorAgent } from "@/agents/editor";
import { callLLM } from "@/lib/llm";

const mockCallLLM = callLLM as MockedFunction<typeof callLLM>;

describe("EditorAgent", () => {
  let agent: EditorAgent;

  beforeEach(() => {
    agent = new EditorAgent();
    vi.clearAllMocks();
  });

  it("returns editorial decision", async () => {
    mockCallLLM.mockResolvedValueOnce({
      content: {
        titulo: "Título do dia",
        subtitulo: "Subtítulo do dia",
        foco: "Foco do dia",
        eventsOrder: ["e1"],
        excludedEvents: [],
      },
      tokens: { prompt: 10, completion: 20, total: 30 },
    });

    const result = await agent.execute({
      date: new Date(),
      events: [{ id: "e1", titulo: "Evento", resumo: "Resumo", categoria: "Seleção Brasileira" }],
    });

    expect(result.success).toBe(true);
    const decision = (result.data as { decision: Record<string, unknown> }).decision;
    expect(decision.titulo).toBe("Título do dia");
  });

  it("returns empty decision when no events", async () => {
    const result = await agent.execute({ date: new Date(), events: [] });
    expect(result.success).toBe(true);
    const decision = (result.data as { decision: Record<string, unknown> }).decision;
    expect(decision.titulo).toBe("");
  });
});

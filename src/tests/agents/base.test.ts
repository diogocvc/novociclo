import { describe, it, expect, vi, beforeEach } from "vitest";
import { BaseAgent, type AgentInput, type AgentOutput } from "@/agents/base";

vi.mock("@/lib/llm", () => ({
  callLLM: vi.fn().mockResolvedValue({
    content: { message: "ok" },
    tokens: { prompt: 10, completion: 20, total: 30 },
  }),
}));

class TestAgent extends BaseAgent {
  constructor() {
    super("TestAgent", "2.0.0");
  }

  async execute(input: AgentInput): Promise<AgentOutput> {
    this.log("executing");
    try {
      const result = await this.callLLM<{ message: string }>("test prompt", {
        input,
      });
      return { success: true, data: result };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "unknown",
      };
    }
  }
}

describe("BaseAgent", () => {
  let agent: TestAgent;

  beforeEach(() => {
    agent = new TestAgent();
  });

  it("has a name", () => {
    expect(agent.name).toBe("TestAgent");
  });

  it("has a version", () => {
    expect(agent.version).toBe("2.0.0");
  });

  it("execute returns success on valid input", async () => {
    const input: AgentInput = { date: new Date() };
    const result = await agent.execute(input);
    expect(result.success).toBe(true);
    expect(result.data).toEqual({ message: "ok" });
  });
});

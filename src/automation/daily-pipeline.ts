import { ResearcherAgent } from "@/agents/researcher";
import { CuratorAgent } from "@/agents/curator";
import { EditorAgent } from "@/agents/editor";
import { WriterAgent } from "@/agents/writer";
import { ReviewerAgent } from "@/agents/reviewer";
import { PublisherAgent } from "@/agents/publisher";
import { NewsletterAgent } from "@/agents/newsletter";
import { SEOAgent } from "@/agents/seo";
import type { AgentInput, AgentOutput } from "@/agents/base";

const MAX_RETRIES = 3;

interface PipelineResult {
  date: string;
  steps: {
    name: string;
    success: boolean;
    error?: string;
    durationMs: number;
  }[];
  success: boolean;
}

async function retry(
  fn: () => Promise<AgentOutput>,
  agentName: string,
  maxRetries: number = MAX_RETRIES
): Promise<AgentOutput> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const result = await fn();
    if (result.success) return result;
    if (attempt < maxRetries) {
      console.log(
        `[Pipeline] ${agentName} falhou (tentativa ${attempt}/${maxRetries}). Reexecutando...`
      );
    }
  }
  return { success: false, error: `${agentName} excedeu o limite de tentativas` };
}

export async function runDailyPipeline(
  date: Date = new Date()
): Promise<PipelineResult> {
  const result: PipelineResult = {
    date: date.toISOString(),
    steps: [],
    success: true,
  };

  console.log(`\n=== Pipeline Diário: ${date.toISOString()} ===\n`);

  const input: AgentInput = { date };

  const researcher = new ResearcherAgent();
  const curator = new CuratorAgent();
  const editor = new EditorAgent();
  const writer = new WriterAgent();
  const reviewer = new ReviewerAgent();
  const publisher = new PublisherAgent();
  const newsletter = new NewsletterAgent();
  const seo = new SEOAgent();

  const step = (name: string, fn: () => Promise<AgentOutput>) => ({
    name,
    fn,
  });

  const steps = [
    step("Pesquisador", () => retry(() => researcher.execute(input), "Pesquisador")),
    step("Curador", () => {
      input.news = (result.steps[0] as unknown as { data?: { news?: unknown } })?.data?.news;
      return retry(() => curator.execute(input), "Curador");
    }),
    step("Editor-chefe", () => {
      input.events = (result.steps[1] as unknown as { data?: { events?: unknown } })?.data?.events;
      return retry(() => editor.execute(input), "Editor-chefe");
    }),
    step("Escritor", () => {
      input.decision = (result.steps[2] as unknown as { data?: { decision?: unknown } })?.data?.decision;
      return retry(() => writer.execute(input), "Escritor");
    }),
    step("Revisor", () => {
      input.draft = (result.steps[3] as unknown as { data?: { draft?: unknown } })?.data?.draft;
      return retry(() => reviewer.execute(input), "Revisor");
    }),
    step("Publicador", () => {
      const review = (result.steps[4] as unknown as { data?: { review?: { approved: boolean } } })?.data?.review;
      if (!review?.approved) {
        return Promise.resolve({ success: false, error: "Capítulo não aprovado na revisão" });
      }
      return retry(() => publisher.execute(input), "Publicador");
    }),
    step("Newsletter", () => {
      return retry(() => newsletter.execute(input), "Newsletter");
    }),
    step("SEO", () => {
      return retry(() => seo.execute(input), "SEO");
    }),
  ];

  for (const s of steps) {
    const start = Date.now();
    let output: AgentOutput = { success: false, error: "Step not executed" };

    try {
      output = await s.fn();
    } catch (error) {
      output = {
        success: false,
        error: error instanceof Error ? error.message : "Erro desconhecido",
      };
    }

    const durationMs = Date.now() - start;
    result.steps.push({
      name: s.name,
      success: output.success,
      error: output.error,
      durationMs,
    });

    if (!output.success) {
      result.success = false;
      console.log(`[Pipeline] ❌ ${s.name}: ${output.error}`);
      break;
    } else {
      console.log(`[Pipeline] ✅ ${s.name} (${durationMs}ms)`);
    }
  }

  const totalDuration = result.steps.reduce((acc, s) => acc + s.durationMs, 0);
  console.log(`\n=== Pipeline ${result.success ? "✅ CONCLUÍDO" : "❌ FALHOU"} (${totalDuration}ms) ===\n`);

  return result;
}

const date = process.argv[2] ? new Date(process.argv[2]) : new Date();
runDailyPipeline(date)
  .then((result) => process.exit(result.success ? 0 : 1))
  .catch((err) => {
    console.error("Pipeline failed:", err);
    process.exit(1);
  });

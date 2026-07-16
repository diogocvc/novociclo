import { ResearcherAgent } from "@/agents/researcher";
import { CuratorAgent } from "@/agents/curator";
import { EditorAgent } from "@/agents/editor";
import { WriterAgent } from "@/agents/writer";
import { ReviewerAgent } from "@/agents/reviewer";
import { PublisherAgent } from "@/agents/publisher";
import { NewsletterAgent } from "@/agents/newsletter";
import { SEOAgent } from "@/agents/seo";
import type { AgentInput, AgentOutput } from "@/agents/base";
import { getCountdownData } from "@/lib/countdown";

const MAX_RETRIES = 3;
const LLM_COOLDOWN_MS = 65_000;

let lastLlmCompletion = 0;

interface PipelineResult {
  date: string;
  steps: {
    name: string;
    success: boolean;
    error?: string;
    durationMs: number;
  }[];
  outputs: AgentOutput[];
  success: boolean;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function waitForLlmCooldown() {
  if (lastLlmCompletion === 0) return;
  const elapsed = Date.now() - lastLlmCompletion;
  if (elapsed < LLM_COOLDOWN_MS) {
    const waitMs = LLM_COOLDOWN_MS - elapsed;
    console.log(`[Pipeline] 🕐 Aguardando ${waitMs}ms (cooldown LLM)...`);
    await sleep(waitMs);
  }
}

function extractRetryAfterMs(errorMessage: string): number | null {
  const match = errorMessage.match(/try again in ([\d.]+)s/);
  if (match) {
    return Math.ceil(parseFloat(match[1]) * 1000) + 1000;
  }
  return null;
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
      const retryAfter = result.error ? extractRetryAfterMs(result.error) : null;
      const delayMs = retryAfter ?? (attempt * 2000);
      console.log(
        `[Pipeline] ${agentName} falhou (tentativa ${attempt}/${maxRetries}). Reexecutando em ${delayMs}ms...`
      );
      await sleep(delayMs);
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
    outputs: [],
    success: true,
  };

  console.log(`\n=== Pipeline Diário: ${date.toISOString()} ===\n`);

  const countdown = getCountdownData(date);
  const ciclo = {
    numero_dia: countdown.daysElapsed,
    total_dias: countdown.totalDays,
    dias_restantes: countdown.daysRemaining,
  };

  const input: AgentInput = { date, ciclo };

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
    step("Curador", async () => {
      await waitForLlmCooldown();
      const prev = result.outputs[0]?.data as { news?: unknown } | undefined;
      input.news = prev?.news;
      return retry(() => curator.execute(input), "Curador");
    }),
    step("Editor-chefe", async () => {
      await waitForLlmCooldown();
      const prev = result.outputs[1]?.data as { events?: unknown } | undefined;
      input.events = prev?.events;
      return retry(() => editor.execute(input), "Editor-chefe");
    }),
    step("Escritor", async () => {
      await waitForLlmCooldown();
      const editorOutput = result.outputs[2]?.data as { decision?: unknown } | undefined;
      input.decision = editorOutput?.decision;
      input.events = (result.outputs[1]?.data as { events?: unknown } | undefined)?.events;
      return retry(() => writer.execute(input), "Escritor");
    }),
    step("Revisor", async () => {
      await waitForLlmCooldown();
      const writerOutput = result.outputs[3]?.data as { draft?: unknown } | undefined;
      input.draft = writerOutput?.draft;
      input.events = (result.outputs[1]?.data as { events?: unknown } | undefined)?.events;
      input.decision = (result.outputs[2]?.data as { decision?: unknown } | undefined)?.decision;
      return retry(() => reviewer.execute(input), "Revisor");
    }),
    step("Publicador", () => {
      const reviewerOutput = result.outputs[4]?.data as { review?: { approved: boolean } } | undefined;
      if (!reviewerOutput?.review?.approved) {
        return Promise.resolve({ success: false, error: "Capítulo não aprovado na revisão" });
      }
      const researcherOutput = result.outputs[0]?.data as { news?: unknown } | undefined;
      input.news = researcherOutput?.news;
      return retry(() => publisher.execute(input), "Publicador");
    }),
    step("Newsletter", () => {
      const writerDraft = result.outputs[3]?.data as { draft?: unknown } | undefined;
      input.draft = writerDraft?.draft;
      return retry(() => newsletter.execute(input), "Newsletter");
    }),
    step("SEO", () => {
      const writerDraft = result.outputs[3]?.data as { draft?: unknown } | undefined;
      input.draft = writerDraft?.draft;
      return retry(() => seo.execute(input), "SEO");
    }),
  ];

  const llmSteps = new Set(["Pesquisador", "Curador", "Editor-chefe", "Escritor", "Revisor"]);

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
    result.outputs.push(output);

    if (output.success && llmSteps.has(s.name)) {
      lastLlmCompletion = Date.now();
    }

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

import { describe, it, expect, vi, beforeEach } from "vitest";

vi.spyOn(process, "exit").mockImplementation(() => undefined as never);
vi.spyOn(global, "setTimeout").mockImplementation((fn) => fn() as unknown as ReturnType<typeof setTimeout>);

const { successWithReview } = vi.hoisted(() => {
  const fn = vi.fn().mockResolvedValue({
    success: true,
    data: { review: { approved: true } },
  });
  return { successWithReview: fn };
});

vi.mock("@/agents/researcher", () => ({
  ResearcherAgent: vi.fn(function () {
    return { execute: successWithReview };
  }),
}));
vi.mock("@/agents/curator", () => ({
  CuratorAgent: vi.fn(function () {
    return { execute: successWithReview };
  }),
}));
vi.mock("@/agents/editor", () => ({
  EditorAgent: vi.fn(function () {
    return { execute: successWithReview };
  }),
}));
vi.mock("@/agents/writer", () => ({
  WriterAgent: vi.fn(function () {
    return { execute: successWithReview };
  }),
}));
vi.mock("@/agents/reviewer", () => ({
  ReviewerAgent: vi.fn(function () {
    return { execute: successWithReview };
  }),
}));
vi.mock("@/agents/publisher", () => ({
  PublisherAgent: vi.fn(function () {
    return { execute: successWithReview };
  }),
}));
vi.mock("@/agents/newsletter", () => ({
  NewsletterAgent: vi.fn(function () {
    return { execute: successWithReview };
  }),
}));
vi.mock("@/agents/seo", () => ({
  SEOAgent: vi.fn(function () {
    return { execute: successWithReview };
  }),
}));

import { runDailyPipeline } from "@/automation/daily-pipeline";

describe("daily-pipeline", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("completes all 8 steps successfully", async () => {
    const result = await runDailyPipeline(new Date("2026-07-14"));
    expect(result.success).toBe(true);
    expect(result.steps).toHaveLength(8);
    expect(result.steps.every((s) => s.success)).toBe(true);
  });

  it("stops on persistent failure after retries", async () => {
    successWithReview.mockResolvedValue({ success: false, error: "Falha persistente" });

    const result = await runDailyPipeline(new Date("2026-07-14"));
    expect(result.success).toBe(false);
    expect(result.steps[0].success).toBe(false);
  });
});

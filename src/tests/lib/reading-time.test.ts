import { describe, it, expect } from "vitest";
import { estimateReadingTime } from "@/lib/reading-time";

describe("estimateReadingTime", () => {
  it("returns 1 for empty text", () => {
    expect(estimateReadingTime("")).toBe(1);
  });

  it("returns 1 for very short text", () => {
    expect(estimateReadingTime("Hello world")).toBe(1);
  });

  it("returns correct estimate for longer text", () => {
    const words = Array(400).fill("palavra").join(" ");
    expect(estimateReadingTime(words)).toBeGreaterThanOrEqual(2);
  });

  it("accepts custom words-per-minute", () => {
    const words = Array(200).fill("palavra").join(" ");
    expect(estimateReadingTime(words, 100)).toBe(2);
  });
});

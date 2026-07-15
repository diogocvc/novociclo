import { describe, it, expect } from "vitest";
import { getCountdownData } from "@/lib/countdown";

describe("getCountdownData", () => {
  it("returns correct structure for a given date", () => {
    const date = new Date("2026-07-05T12:00:00-03:00");
    const data = getCountdownData(date);

    expect(data).toHaveProperty("daysElapsed");
    expect(data).toHaveProperty("daysRemaining");
    expect(data).toHaveProperty("totalDays");
    expect(data).toHaveProperty("progressPercentage");
    expect(data).toHaveProperty("startDate");
    expect(data).toHaveProperty("worldCupDate");
    expect(data).toHaveProperty("currentDate");
  });

  it("starts with day 1 on cycle start", () => {
    const date = new Date("2026-07-05T12:00:00-03:00");
    const data = getCountdownData(date);
    expect(data.daysElapsed).toBe(1);
  });

  it("progressPercentage is between 0 and 100", () => {
    const data = getCountdownData();
    expect(data.progressPercentage).toBeGreaterThanOrEqual(0);
    expect(data.progressPercentage).toBeLessThanOrEqual(100);
  });
});

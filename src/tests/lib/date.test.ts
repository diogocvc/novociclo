import { describe, it, expect } from "vitest";
import {
  getDayNumber,
  getTotalDuration,
  getDaysElapsed,
  getDaysRemaining,
  getProgressPercentage,
  formatDate,
  formatDateShort,
  formatDateRelative,
  getWeekNumber,
} from "@/lib/date";

const startDate = new Date("2026-07-05T00:00:00-03:00");
const endDate = new Date("2030-06-11T00:00:00-03:00");
const midDate = new Date("2027-01-01T00:00:00-03:00");

describe("getDayNumber", () => {
  it("returns 1 for the start date", () => {
    expect(getDayNumber(startDate, startDate)).toBe(1);
  });

  it("returns correct number for a later date", () => {
    const day = getDayNumber(startDate, new Date("2026-07-06T00:00:00-03:00"));
    expect(day).toBe(2);
  });
});

describe("getTotalDuration", () => {
  it("returns total days between two dates", () => {
    const days = getTotalDuration(startDate, endDate);
    expect(days).toBeGreaterThan(1400);
    expect(days).toBeLessThan(1500);
  });
});

describe("getDaysElapsed", () => {
  it("returns a non-negative number", () => {
    expect(getDaysElapsed(startDate)).toBeGreaterThanOrEqual(0);
  });
});

describe("getDaysRemaining", () => {
  it("returns remaining days from a mid-point date", () => {
    const days = getDaysRemaining(midDate, endDate);
    expect(days).toBeGreaterThan(1200);
  });

  it("returns 0 when current date is past end date", () => {
    const past = new Date("2031-01-01");
    expect(getDaysRemaining(past, endDate)).toBe(0);
  });
});

describe("getProgressPercentage", () => {
  it("returns 0 when elapsed is 0", () => {
    expect(getProgressPercentage(0, 100)).toBe(0);
  });

  it("returns 50 for halfway", () => {
    expect(getProgressPercentage(50, 100)).toBe(50);
  });

  it("returns 0 when total is 0", () => {
    expect(getProgressPercentage(10, 0)).toBe(0);
  });
});

describe("formatDate", () => {
  it("formats a date in Portuguese", () => {
    const date = new Date("2026-07-05T12:00:00-03:00");
    const result = formatDate(date);
    expect(result).toContain("julho");
    expect(result).toContain("2026");
  });
});

describe("formatDateShort", () => {
  it("formats as dd/MM/yyyy", () => {
    const date = new Date("2026-07-05T12:00:00-03:00");
    expect(formatDateShort(date)).toMatch(/^\d{2}\/\d{2}\/\d{4}$/);
  });
});

describe("formatDateRelative", () => {
  it("returns a relative string", () => {
    const recent = new Date();
    expect(formatDateRelative(recent)).toBeTruthy();
  });
});

describe("getWeekNumber", () => {
  it("returns 1 for the first week", () => {
    const week = getWeekNumber(startDate, startDate);
    expect(week).toBe(1);
  });

  it("returns 2 for one week later", () => {
    const later = new Date("2026-07-12T00:00:00-03:00");
    expect(getWeekNumber(later, startDate)).toBe(2);
  });
});

import { describe, it, expect } from "vitest";
import { cycle, parseDateEnv } from "@/config/cycle";

describe("cycle config", () => {
  it("has required properties", () => {
    expect(cycle).toHaveProperty("nome");
    expect(cycle).toHaveProperty("data_inicio");
    expect(cycle).toHaveProperty("data_copa");
    expect(cycle).toHaveProperty("titulo_padrao");
    expect(cycle).toHaveProperty("descricao");
    expect(cycle).toHaveProperty("idioma");
  });

  it("data_inicio is a valid Date", () => {
    expect(cycle.data_inicio instanceof Date).toBe(true);
    expect(isNaN(cycle.data_inicio.getTime())).toBe(false);
  });

  it("data_copa is a valid Date", () => {
    expect(cycle.data_copa instanceof Date).toBe(true);
    expect(isNaN(cycle.data_copa.getTime())).toBe(false);
  });

  it("data_inicio is before data_copa", () => {
    expect(cycle.data_inicio.getTime()).toBeLessThan(cycle.data_copa.getTime());
  });

  it("idioma is pt-BR", () => {
    expect(cycle.idioma).toBe("pt-BR");
  });
});

describe("parseDateEnv", () => {
  it("normalizes a date-only value to midnight BRT (-03:00)", () => {
    const date = parseDateEnv("2026-07-05", "2030-06-11T00:00:00-03:00");
    expect(date.getUTCFullYear()).toBe(2026);
    expect(date.getUTCMonth()).toBe(6);
    expect(date.getUTCDate()).toBe(5);
    expect(date.getUTCHours()).toBe(3);
  });

  it("keeps a full ISO value with its offset", () => {
    const date = parseDateEnv("2026-07-05T00:00:00-03:00", "2030-06-11T00:00:00-03:00");
    expect(date.getTime()).toBe(new Date("2026-07-05T03:00:00Z").getTime());
  });

  it("falls back to the default when the value is invalid", () => {
    const date = parseDateEnv("not-a-date", "2026-07-05T00:00:00-03:00");
    expect(isNaN(date.getTime())).toBe(false);
    expect(date.getTime()).toBe(new Date("2026-07-05T03:00:00Z").getTime());
  });

  it("falls back when the value is undefined", () => {
    const date = parseDateEnv(undefined, "2026-07-05T00:00:00-03:00");
    expect(date.getTime()).toBe(new Date("2026-07-05T03:00:00Z").getTime());
  });
});

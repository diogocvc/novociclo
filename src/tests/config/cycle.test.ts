import { describe, it, expect } from "vitest";
import { cycle } from "@/config/cycle";

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

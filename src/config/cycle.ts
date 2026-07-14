export const cycle = {
  nome: process.env.NEXT_PUBLIC_SITE_NAME ?? "Novo Ciclo",
  data_inicio: new Date(
    process.env.NEXT_PUBLIC_CYCLE_START_DATE ?? "2026-07-05T00:00:00-03:00"
  ),
  data_copa: new Date(
    process.env.NEXT_PUBLIC_WORLD_CUP_DATE ?? "2030-06-11T00:00:00-03:00"
  ),
  titulo_padrao: "Novo Ciclo — Rumo à Copa do Mundo 2030",
  descricao:
    "A reconstrução da Seleção Brasileira rumo ao hexacampeonato mundial, documentada dia após dia.",
  idioma: "pt-BR",
  fuso_horario: "America/Sao_Paulo",
} as const;

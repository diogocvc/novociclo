import type { Chapter } from "@/types";

export const mockChapters: Chapter[] = [
  {
    id: "1",
    data: "2026-07-14",
    slug: "2026/07/14",
    titulo: "Pequenas escolhas, grandes mudanças",
    subtitulo: "O primeiro passo para construir o futuro",
    resumo:
      "O primeiro passo para construir o futuro é reconhecer que cada dia é uma oportunidade de recomeço.",
    narrativa:
      "A Seleção Brasileira inicia mais uma semana de preparação rumo ao hexacampeonato mundial. Os holofotes se voltam para os jovens talentos que despontam nos gramados europeus enquanto a comissão técnica avalia as opções para os próximos compromissos.\n\nO dia foi marcado por declarações importantes do coordenador técnico, que reforçou a filosofia de renovação sem perder a identidade do futebol brasileiro. As categorias de base seguem sendo o alicerce do projeto, com investimentos contínuos em infraestrutura e metodologia de treinamento.\n\nNo cenário internacional, a FIFA divulgou atualizações sobre o formato da Copa do Mundo de 2030, que celebrará o centenário do torneio em três continentes.",
    acontecimentos: [],
    categorias: ["Seleção Brasileira", "Comissão Técnica", "Copa do Mundo 2030"],
    tags: ["renovação", "base", "preparação"],
    referencias: [],
    data_publicacao: "2026-07-14T08:00:00-03:00",
    tempo_de_leitura: 6,
    frontmatter: {},
  },
  {
    id: "2",
    data: "2026-07-13",
    slug: "2026/07/13",
    titulo: "A base do futuro",
    subtitulo: "Categorias de base revelam nova geração",
    resumo:
      "Os olheiros da CBF acompanham de perto a nova geração que surge nos campeonatos estaduais.",
    narrativa:
      "Domingo de observação nos gramados brasileiros. Os principais clubes do país colocaram em campo suas categorias de base, e os olheiros da CBF registraram atuações promissoras. O coordenador técnico esteve presente em duas partidas, sinalizando que a renovação da Seleção passa por um olhar atento ao futebol nacional.\n\nA comissão técnica destacou a importância de equilibrar a exposição internacional com o desenvolvimento local, evitando a evasão precoce de talentos.",
    acontecimentos: [],
    categorias: ["Seleção Brasileira", "Jogadores", "CBF"],
    tags: ["base", "revelação", "observação"],
    referencias: [],
    data_publicacao: "2026-07-13T08:00:00-03:00",
    tempo_de_leitura: 4,
    frontmatter: {},
  },
];

export function getLatestChapter(): Chapter | undefined {
  return mockChapters[0];
}

export function getChapterBySlug(slug: string): Chapter | undefined {
  return mockChapters.find((c) => c.slug === slug);
}

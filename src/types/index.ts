export interface News {
  id: string;
  titulo: string;
  subtitulo?: string;
  resumo_original: string;
  url: string;
  thumbnail?: string;
  fonte: string;
  autor?: string;
  data_publicacao: string;
  idioma: string;
  data_coleta: string;
}

export interface Event {
  id: string;
  titulo: string;
  descricao: string;
  categoria: Category;
  nivel_de_importancia: number;
  noticias_relacionadas: string[];
  data: string;
}

export interface Chapter {
  id: string;
  data: string;
  slug: string;
  titulo: string;
  subtitulo?: string;
  resumo: string;
  narrativa: string;
  acontecimentos: Event[];
  categorias: Category[];
  tags: string[];
  referencias: string[];
  data_publicacao: string;
  tempo_de_leitura: number;
  frontmatter: Record<string, string>;
  noticia_destaque?: News;
  noticias_referencia: News[];
}

export interface Source {
  nome: string;
  url: string;
  tipo: "rss" | "site";
  rss?: string;
  idioma: string;
  ativo: boolean;
}

export type Category =
  | "Seleção Brasileira"
  | "Comissão Técnica"
  | "Convocações"
  | "Jogadores"
  | "Lesões"
  | "Clubes"
  | "CBF"
  | "FIFA"
  | "Copa do Mundo 2030"
  | "Bastidores"
  | "Estatísticas";

export interface CountdownData {
  daysElapsed: number;
  daysRemaining: number;
  totalDays: number;
  progressPercentage: number;
  startDate: Date;
  worldCupDate: Date;
  currentDate: Date;
}

export interface NavLink {
  label: string;
  href: string;
}

import type { Chapter, News } from "@/types";

const noticiasDia14: News[] = [
  {
    id: "n1",
    titulo: "Comissão técnica avalia jovens talentos em semana decisiva de observação",
    resumo_original:
      "Coordenador técnico da Seleção Brasileira acompanha treinos de atletas sub-20 visando renovação do elenco principal.",
    url: "https://ge.globo.com/futebol/selecao-brasileira/noticia/2026/07/14/comissao-tecnica-avalia-jovens-talentos.ghtml",
    thumbnail:
      "https://s2-ge.glbimg.com/example1.jpg",
    fonte: "ge",
    autor: "Alexandre Oliveira",
    data_publicacao: "2026-07-14T09:30:00-03:00",
    idioma: "pt-BR",
    data_coleta: "2026-07-14T10:00:00-03:00",
  },
  {
    id: "n2",
    titulo: "FIFA confirma formato oficial da Copa do Mundo 2030 com três continentes",
    resumo_original:
      "Conselho da FIFA aprovou o regulamento definitivo do torneio que celebrará o centenário em Argentina, Uruguai, Paraguai, Espanha, Portugal e Marrocos.",
    url: "https://www.espn.com.br/futebol/copa-do-mundo/artigo/fifa-formato-2030",
    thumbnail:
      "https://a2.espncdn.com/example2.jpg",
    fonte: "ESPN Brasil",
    autor: "Marcelo Teixeira",
    data_publicacao: "2026-07-14T08:15:00-03:00",
    idioma: "pt-BR",
    data_coleta: "2026-07-14T08:30:00-03:00",
  },
  {
    id: "n3",
    titulo: "Jogadores brasileiros se destacam em pré-temporada europeia",
    resumo_original:
      "Atletas convocáveis da Seleção Brasileira chamam atenção nos primeiros amistosos de preparação dos clubes europeus.",
    url: "https://www.uol.com.br/esporte/futebol/selecao-brasileira/2026/07/14/jogadores-destaque-pre-temporada.htm",
    thumbnail:
      "https://conteudo.uol.com.br/example3.jpg",
    fonte: "UOL Esporte",
    autor: "Rafael Reis",
    data_publicacao: "2026-07-14T07:00:00-03:00",
    idioma: "pt-BR",
    data_coleta: "2026-07-14T07:30:00-03:00",
  },
  {
    id: "n4",
    titulo: "CBF anuncia parceria com clubes para centro de treinamento da Seleção",
    resumo_original:
      "Acordo prevê compartilhamento de infraestrutura e metodologia entre a confederação e as principais agremiações do país.",
    url: "https://www.cbf.com.br/selecao-brasileira/noticias/cbf-parceria-centro-treinamento",
    fonte: "CBF",
    data_publicacao: "2026-07-14T11:00:00-03:00",
    idioma: "pt-BR",
    data_coleta: "2026-07-14T11:15:00-03:00",
  },
  {
    id: "n5",
    titulo: "Lesão muscular tira volante de início de temporada na Inglaterra",
    resumo_original:
      "Meio-campista brasileiro sofre estiramento na coxa direita e desfalca clube inglês por até três semanas.",
    url: "https://www.cnnbrasil.com.br/esportes/futebol/selecao-brasileira/lesao-volante-inglaterra/",
    thumbnail:
      "https://www.cnnbrasil.com.br/example4.jpg",
    fonte: "CNN Brasil",
    autor: "Fábio Lopes",
    data_publicacao: "2026-07-14T06:45:00-03:00",
    idioma: "pt-BR",
    data_coleta: "2026-07-14T07:00:00-03:00",
  },
];

const noticiasDia13: News[] = [
  {
    id: "n6",
    titulo: "Categorias de base dos clubes brasileiros revelam nova geração promissora",
    resumo_original:
      "Rodada do Campeonato Brasileiro sub-20 teve atuações de destaque que chamaram atenção dos observadores da CBF.",
    url: "https://ge.globo.com/futebol/base/noticia/2026/07/13/categorias-base-revelam-geracao.ghtml",
    thumbnail:
      "https://s2-ge.glbimg.com/example5.jpg",
    fonte: "ge",
    autor: "Thiago Simões",
    data_publicacao: "2026-07-13T10:00:00-03:00",
    idioma: "pt-BR",
    data_coleta: "2026-07-13T10:30:00-03:00",
  },
  {
    id: "n7",
    titulo: "Coordenador técnico da Seleção acompanha jogos do estadual ao vivo",
    resumo_original:
      "Profissional esteve presente em duas partidas no interior de São Paulo para observar atletas pouco conhecidos do grande público.",
    url: "https://www.uol.com.br/esporte/futebol/2026/07/13/coordenador-tecnico-estadual.htm",
    fonte: "UOL Esporte",
    autor: "Danilo Lavieri",
    data_publicacao: "2026-07-13T14:00:00-03:00",
    idioma: "pt-BR",
    data_coleta: "2026-07-13T14:20:00-03:00",
  },
  {
    id: "n8",
    titulo: "Ex-jogadores defendem maior integração entre clubes e Seleção Brasileira",
    resumo_original:
      "Ídolos do futebol nacional cobram diálogo mais próximo entre a CBF e os clubes formadores para evitar desgastes desnecessários.",
    url: "https://www.espn.com.br/futebol/artigo/ex-jogadores-integradcao-clubes-selecao",
    fonte: "ESPN Brasil",
    autor: "João Castelo-Branco",
    data_publicacao: "2026-07-13T09:30:00-03:00",
    idioma: "pt-BR",
    data_coleta: "2026-07-13T10:00:00-03:00",
  },
];

export const mockChapters: Chapter[] = [
  {
    id: "1",
    data: "2026-07-14",
    slug: "2026/07/14",
    titulo: "Pequenas escolhas, grandes mudanças",
    subtitulo: "Dia de observação e planejamento na retomada dos trabalhos da Seleção",
    resumo:
      "A comissão técnica da Seleção Brasileira intensifica o radar sobre jovens talentos enquanto a FIFA define os últimos detalhes da Copa do Mundo de 2030. O dia foi movimentado nos bastidores do futebol brasileiro.",
    narrativa:
      "A comissão técnica da Seleção Brasileira intensifica o radar sobre jovens talentos enquanto a FIFA define os últimos detalhes da Copa do Mundo de 2030.",
    acontecimentos: [],
    categorias: ["Seleção Brasileira", "Comissão Técnica", "Copa do Mundo 2030"],
    tags: ["renovação", "base", "preparação"],
    referencias: [
      "https://ge.globo.com/futebol/selecao-brasileira/noticia/2026/07/14/comissao-tecnica-avalia-jovens-talentos.ghtml",
      "https://www.espn.com.br/futebol/copa-do-mundo/artigo/fifa-formato-2030",
      "https://www.uol.com.br/esporte/futebol/selecao-brasileira/2026/07/14/jogadores-destaque-pre-temporada.htm",
    ],
    data_publicacao: "2026-07-14T08:00:00-03:00",
    tempo_de_leitura: 2,
    frontmatter: {},
    noticia_destaque: noticiasDia14[0],
    noticias_referencia: noticiasDia14,
  },
  {
    id: "2",
    data: "2026-07-13",
    slug: "2026/07/13",
    titulo: "A base do futuro",
    subtitulo: "Olheiros da CBF acompanham de perto a nova geração que surge nos gramados brasileiros",
    resumo:
      "Domingo de observação nos campeonatos estaduais com a presença do coordenador técnico da Seleção, que registrou atuações promissoras e sinalizou que a renovação passa pelo futebol nacional.",
    narrativa:
      "Domingo de observação nos campeonatos estaduais com a presença do coordenador técnico da Seleção.",
    acontecimentos: [],
    categorias: ["Seleção Brasileira", "Jogadores", "CBF"],
    tags: ["base", "revelação", "observação"],
    referencias: [
      "https://ge.globo.com/futebol/base/noticia/2026/07/13/categorias-base-revelam-geracao.ghtml",
      "https://www.uol.com.br/esporte/futebol/2026/07/13/coordenador-tecnico-estadual.htm",
      "https://www.espn.com.br/futebol/artigo/ex-jogadores-integradcao-clubes-selecao",
    ],
    data_publicacao: "2026-07-13T08:00:00-03:00",
    tempo_de_leitura: 1,
    frontmatter: {},
    noticia_destaque: noticiasDia13[0],
    noticias_referencia: noticiasDia13,
  },
];

export function getLatestChapter(): Chapter | undefined {
  return mockChapters[0];
}

export function getChapterBySlug(slug: string): Chapter | undefined {
  return mockChapters.find((c) => c.slug === slug);
}

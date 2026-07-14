import type { News } from "@/types";

export const mockNews: Record<string, News> = {
  n1: {
    id: "n1",
    titulo: "Brasil é eliminado com sua pior campanha em Copas do Mundo desde 1990",
    resumo_original:
      "Seleção Brasileira cai nas oitavas de final da Copa do Mundo 2026 ao perder para a Noruega por 2 a 1.",
    url: "https://ge.globo.com/futebol/copa-do-mundo/noticia/2026/07/05/brasil-e-eliminado-com-sua-pior-campanha-em-copas-do-mundo-desde-1990.ghtml",
    fonte: "ge",
    data_publicacao: "2026-07-05T19:36:00-03:00",
    idioma: "pt-BR",
    data_coleta: "2026-07-05T20:00:00-03:00",
  },
  n2: {
    id: "n2",
    titulo: "E 2030? Veja quem deve aparecer no próximo ciclo da Seleção",
    resumo_original:
      "Lista de jogadores que devem seguir e nomes para ficarem no radar no próximo ciclo da Seleção Brasileira rumo à Copa do Mundo de 2030.",
    url: "https://ge.globo.com/futebol/copa-do-mundo/noticia/2026/07/06/e-2030-veja-quem-deve-seguir-e-nomes-para-ficarem-no-radar-no-proximo-ciclo-da-selecao.ghtml",
    fonte: "ge",
    data_publicacao: "2026-07-06T10:00:00-03:00",
    idioma: "pt-BR",
    data_coleta: "2026-07-06T10:30:00-03:00",
  },
  n3: {
    id: "n3",
    titulo: "Quem se salvou e quem decepcionou do Brasil na Copa do Mundo",
    resumo_original:
      "Análise individual dos jogadores da Seleção Brasileira na campanha da Copa do Mundo 2026.",
    url: "https://ge.globo.com/futebol/copa-do-mundo/noticia/2026/07/06/quem-se-salvou-e-quem-decepcionou-na-selecao-brasileira-na-copa-do-mundo.ghtml",
    fonte: "ge",
    data_publicacao: "2026-07-06T08:00:00-03:00",
    idioma: "pt-BR",
    data_coleta: "2026-07-06T08:30:00-03:00",
  },
  n4: {
    id: "n4",
    titulo: "Choro, adeus de Neymar e recado de Ancelotti: o vestiário da Seleção após queda na Copa",
    resumo_original:
      "Bastidores do vestiário da Seleção Brasileira após a eliminação para a Noruega na Copa do Mundo 2026.",
    url: "https://ge.globo.com/futebol/copa-do-mundo/noticia/2026/07/06/choro-adeus-de-neymar-e-recado-de-ancelotti-o-vestiario-da-selecao-apos-queda-na-copa.ghtml",
    fonte: "ge",
    data_publicacao: "2026-07-06T07:00:00-03:00",
    idioma: "pt-BR",
    data_coleta: "2026-07-06T07:30:00-03:00",
  },
  n5: {
    id: "n5",
    titulo: "Convocação Brasil 2030: Quem fica e as promessas para a próxima Copa do Mundo",
    resumo_original:
      "Projeção dos 26 convocados que devem liderar a Seleção Brasileira daqui a quatro anos, com base em relatórios de mercado e dados do CIES.",
    url: "https://www.sportingnews.com/br/futebol/noticias/convocacao-brasil-copa-2030-promessas/478cbed88ff57f8e73199c70",
    fonte: "Sporting News",
    autor: "Vinícius Perazzini",
    data_publicacao: "2026-07-06T11:00:00-03:00",
    idioma: "pt-BR",
    data_coleta: "2026-07-06T11:30:00-03:00",
  },
  n6: {
    id: "n6",
    titulo: "Quando começam as eliminatórias para a Copa do Mundo de 2030?",
    resumo_original:
      "Com a eliminação do Brasil na Copa 2026, o torcedor já começa a pensar no próximo ciclo para o Mundial de 2030.",
    url: "https://www.sportingnews.com/br/futebol/noticias/quando-comecam-eliminatorias-copa-do-mundo-2030/0de7fb74b59b3c86c2fad740",
    fonte: "Sporting News",
    autor: "Samir Mello",
    data_publicacao: "2026-07-06T09:00:00-03:00",
    idioma: "pt-BR",
    data_coleta: "2026-07-06T09:30:00-03:00",
  },
  n7: {
    id: "n7",
    titulo: "Quem são os jogadores que vão liderar a Seleção na próxima Copa",
    resumo_original:
      "Passada a frustração pela eliminação precoce, os olhos já começam a se voltar para o futuro da Seleção Brasileira.",
    url: "https://www.bbc.com/portuguese/articles/cj4g75d4ldko",
    fonte: "BBC News Brasil",
    data_publicacao: "2026-07-11T08:00:00-03:00",
    idioma: "pt-BR",
    data_coleta: "2026-07-11T08:30:00-03:00",
  },
  n8: {
    id: "n8",
    titulo: "Seleção brasileira aposta em promessas ao falar sobre novo ciclo para Copa",
    resumo_original:
      "Após eliminação na Copa do Mundo, Seleção Brasileira projeta renovação e aposta em jovens promessas para o ciclo de 2030.",
    url: "https://www.uol.com.br/esporte/futebol/ultimas-noticias/2026/07/12/selecao-brasileira-aposta-em-promessas-ao-falar-sobre-novo-ciclo-para-copa.ghtml",
    fonte: "UOL Esporte",
    data_publicacao: "2026-07-12T10:00:00-03:00",
    idioma: "pt-BR",
    data_coleta: "2026-07-12T10:30:00-03:00",
  },
};

export const newsByDate: Record<string, string[]> = {
  "2026-07-05": ["n1"],
  "2026-07-06": ["n2", "n3", "n4", "n5", "n6"],
  "2026-07-11": ["n7"],
  "2026-07-12": ["n8"],
};

import type { Source } from "@/types";

export const sources: Source[] = [
  {
    nome: "ge",
    url: "https://ge.globo.com",
    tipo: "rss",
    rss: "https://ge.globo.com/rss/selecao-brasileira/",
    idioma: "pt-BR",
    ativo: true,
  },
  {
    nome: "ESPN Brasil",
    url: "https://www.espn.com.br/futebol/selecao-brasileira",
    tipo: "site",
    idioma: "pt-BR",
    ativo: true,
  },
  {
    nome: "UOL Esporte",
    url: "https://www.uol.com.br/esporte/futebol/selecao-brasileira/",
    tipo: "site",
    idioma: "pt-BR",
    ativo: true,
  },
  {
    nome: "CNN Brasil",
    url: "https://www.cnnbrasil.com.br/esportes/futebol/selecao-brasileira/",
    tipo: "site",
    idioma: "pt-BR",
    ativo: true,
  },
  {
    nome: "CBF",
    url: "https://www.cbf.com.br/selecao-brasileira",
    tipo: "rss",
    rss: "https://www.cbf.com.br/rss/selecao-brasileira",
    idioma: "pt-BR",
    ativo: true,
  },
  {
    nome: "FIFA",
    url: "https://www.fifa.com",
    tipo: "rss",
    rss: "https://www.fifa.com/rss/brazil",
    idioma: "en",
    ativo: true,
  },
];

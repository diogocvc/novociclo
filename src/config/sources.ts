import type { Source } from "@/types";

export const sources: Source[] = [
  {
    nome: "ge",
    url: "https://ge.globo.com",
    tipo: "rss",
    rss: "https://globoesporte.globo.com/rss/ge/",
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
    url: "https://www.uol.com.br/esporte/",
    tipo: "rss",
    rss: "https://rss.uol.com.br/feed/esporte.xml",
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
    tipo: "site",
    idioma: "pt-BR",
    ativo: true,
  },
  {
    nome: "FIFA",
    url: "https://www.fifa.com",
    tipo: "site",
    idioma: "en",
    ativo: true,
  },
];

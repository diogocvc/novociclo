import fs from "fs";
import path from "path";
import * as yaml from "js-yaml";
import matter from "gray-matter";
import type { News } from "@/types";

const CONTENT_DIR = path.join(process.cwd(), "content");
const YEAR = "2026";
const MONTH = "07";

interface ChapterData {
  titulo: string;
  subtitulo: string;
  resumo: string;
  corpo: string;
  destaque: News;
  referencias: News[];
}

const articles: Record<string, ChapterData> = {
  "05": {
    titulo: "O dia em que o ciclo terminou — e outro começou",
    subtitulo:
      "Seleção Brasileira é eliminada pela Noruega nas oitavas e encerra sua pior campanha em Copas desde 1990",
    resumo:
      "O Brasil perdeu para a Noruega por 2 a 1 no MetLife Stadium, em Nova Jersey, e foi eliminado nas oitavas de final da Copa do Mundo 2026. A derrota marcou a pior campanha brasileira em Mundiais desde 1990 e selou o provável adeus de Neymar à Seleção.",
    corpo: `A Seleção Brasileira foi eliminada da Copa do Mundo de 2026 ao perder para a Noruega por 2 a 1, no MetLife Stadium, em Nova Jersey. A queda nas oitavas de final representa a pior campanha do Brasil em Copas desde 1990.

Haaland marcou duas vezes para a Noruega, enquanto Neymar descontou de pênalti nos acréscimos — em um jogo que pode ter sido o último do camisa 10 com a amarelinha.

Em entrevista coletiva, Carlo Ancelotti afirmou que a derrota "não é o fim, é o início de um novo ciclo". O treinador italiano, que teve seu contrato renovado antes do Mundial, foi garantido no cargo pelo diretor de seleções Rodrigo Caetano.

O resultado acendeu o sinal de alerta para o futebol brasileiro e marcou o início de um novo ciclo de reconstrução rumo à Copa do Mundo de 2030.`,
    destaque: {
      id: "ge-ancelotti-05-07-2026",
      titulo:
        'Ancelotti diz que Brasil merecia vencer a Noruega e mira: "Início de um novo ciclo"',
      resumo_original:
        "Carlo Ancelotti disse que o Brasil merecia vencer a Noruega na eliminação da seleção brasileira na Copa do Mundo. O Brasil perdeu por 2 a 1 e deu adeus ao sonho do hexacampeonato. O treinador disse que a Seleção não merecia perder o jogo para os noruegueses, mas que foi eliminada para um Haaland que acabou decidindo.",
      url: "https://ge.globo.com/futebol/copa-do-mundo/noticia/2026/07/05/ancelotti-analisa-eliminacao-da-selecao-contra-a-noruega.ghtml",
      thumbnail:
        "https://s2-ge.glbimg.com/ecRQoCSBk34mh9TLZBn-J1Sxpmw=/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2026/S/p/3Uj3kXREK9fkABSm0L8g/afp-20260705-b9bv84r-v1-highres-fblwc2026match91branor.jpg",
      fonte: "ge",
      data_publicacao: "Sun, 05 Jul 2026 22:51:31 -0000",
      idioma: "pt-BR",
      data_coleta: "2026-07-15T04:00:00.000Z",
    },
    referencias: [
      {
        id: "ge-brasil-eliminado-05-07-2026",
        titulo:
          "Brasil eliminado da Copa 2026: pior campanha desde 1990",
        resumo_original:
          "Brasil eliminado da Copa do Mundo 2026 após derrota para a Noruega repete o fracasso de 1990 ao se despedir do torneio ainda nas oitavas de final.",
        url: "https://ge.globo.com/futebol/copa-do-mundo/noticia/2026/07/05/brasil-e-eliminado-com-sua-pior-campanha-em-copas-do-mundo-desde-1990.ghtml",
        thumbnail: "",
        fonte: "ge",
        data_publicacao: "Sun, 05 Jul 2026 22:04:04 -0000",
        idioma: "pt-BR",
        data_coleta: "2026-07-15T04:00:00.000Z",
      },
      {
        id: "ge-neymar-fim-05-07-2026",
        titulo:
          'Neymar indica fim de ciclo na Seleção: "Agora acabou"',
        resumo_original:
          "Neymar indicou que se despediu da Seleção na derrota para a Noruega, na eliminação nas oitavas de final da Copa do Mundo. O camisa 10 disse: 'Tentei, tentei. Agora acabou. Comecei aqui, acabei aqui.'",
        url: "https://ge.globo.com/futebol/copa-do-mundo/noticia/2026/07/05/neymar-fala-apos-eliminacao-do-brasil-tentei-tentei-agora-acabou.ghtml",
        thumbnail: "",
        fonte: "ge",
        data_publicacao: "Sun, 05 Jul 2026 22:39:25 -0000",
        idioma: "pt-BR",
        data_coleta: "2026-07-15T04:00:00.000Z",
      },
      {
        id: "ge-caetano-garante-05-07-2026",
        titulo:
          "Rodrigo Caetano garante Ancelotti como treinador da seleção brasileira até a Copa do Mundo de 2030",
        resumo_original:
          "Diretor de seleções da CBF garante permanência de Ancelotti até 2030: 'Cabe a nós agora a necessidade de termos um ciclo dentro de uma normalidade.'",
        url: "https://ge.globo.com/futebol/copa-do-mundo/noticia/2026/07/05/rodrigo-caetano-garante-ancelotti-como-treinador-da-selecao-brasileira-ate-a-copa-do-mundo-de-2030.ghtml",
        thumbnail: "",
        fonte: "ge",
        data_publicacao: "Sun, 05 Jul 2026 21:41:05 -0000",
        idioma: "pt-BR",
        data_coleta: "2026-07-15T04:00:00.000Z",
      },
      {
        id: "uol-ancelotti-novo-ciclo-05-07-2026",
        titulo:
          "Ancelotti após eliminação do Brasil: 'É o princípio de um novo ciclo'",
        resumo_original:
          "Após a derrota por 2 a 1 para a Noruega, que culminou na eliminação da seleção brasileira nas oitavas de final da Copa do Mundo, o técnico Carlo Ancelotti tratou de afirmar que o clima não é de terra arrasada.",
        url: "https://www.uol.com.br/esporte/futebol/ultimas-noticias/2026/07/05/ancelotti-apos-eliminacao-do-brasil-e-o-principio-de-um-novo-ciclo.htm",
        thumbnail: "",
        fonte: "UOL",
        data_publicacao: "Sun, 05 Jul 2026 23:08:03 -0000",
        idioma: "pt-BR",
        data_coleta: "2026-07-15T04:00:00.000Z",
      },
    ],
  },
  "06": {
    titulo: "O dia seguinte — o plano que falhou e as projeções para 2030",
    subtitulo:
      "Análise tática aponta erros de Ancelotti contra a Noruega, enquanto o ge lista quem deve ficar para o próximo ciclo",
    resumo:
      "Um dia após a eliminação, a imprensa esportiva detalha os erros táticos da derrota para a Noruega. Ancelotti se manifesta publicamente e diz que 'a dor é grande, mas a confiança não muda'. O ge publica um raio-x completo dos jogadores que devem seguir no ciclo de 2030.",
    corpo: `O dia seguinte à eliminação foi marcado por análises aprofundadas e projeções para o futuro. O ge publicou uma análise detalhada apontando que o plano de Carlo Ancelotti falhou contra a Noruega: a Seleção abriu mão da bola e as substituições no segundo tempo tiraram a força da equipe.

O técnico italiano se manifestou nas redes sociais: "Hoje a dor é grande. Mas a confiança no que estamos construindo não muda. Vamos seguir trabalhar pela nossa Seleção. Sempre juntos. Sempre Brasil!"

Enquanto isso, o ge listou os jogadores que devem seguir e os nomes que ficam no radar para o próximo ciclo, com destaque para as posições que precisam de atenção: laterais, meio-campo e goleiro. A renovação do elenco já começou a ser desenhada nos bastidores.`,
    destaque: {
      id: "ge-analise-06-07-2026",
      titulo:
        "Análise: plano de Ancelotti falha, e mudanças pioram Seleção em eliminação da Copa",
      resumo_original:
        "Seleção abre mão da bola na maior parte do jogo e perde chances na cara do gol. Substituições no segundo tempo tiram força da equipe, e Noruega castiga com Haaland.",
      url: "https://ge.globo.com/futebol/copa-do-mundo/noticia/2026/07/06/analise-plano-de-ancelotti-falha-e-mudancas-pioram-selecao-em-eliminacao-da-copa.ghtml",
      thumbnail:
        "https://s2-ge.glbimg.com/ecRQoCSBk34mh9TLZBn-J1Sxpmw=/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2026/S/p/3Uj3kXREK9fkABSm0L8g/afp-20260705-b9bv84r-v1-highres-fblwc2026match91branor.jpg",
      fonte: "ge",
      data_publicacao: "Mon, 06 Jul 2026 03:00:18 -0000",
      idioma: "pt-BR",
      data_coleta: "2026-07-15T04:00:00.000Z",
    },
    referencias: [
      {
        id: "ge-ancelotti-manifesta-06-07-2026",
        titulo:
          'Ancelotti se manifesta: "A dor é grande, mas a confiança no que estamos construindo não muda"',
        resumo_original:
          "Um dia após a eliminação do Brasil com derrota por 2 a 1 para a Noruega, o técnico Carlo Ancelotti se manifestou. Treinador italiano tem 17 jogos, 10 vitórias, três empates e quatro derrotas.",
        url: "https://ge.globo.com/futebol/copa-do-mundo/noticia/2026/07/06/ancelotti-se-manifesta-a-dor-e-grande-mas-nao-muda-a-confianca.ghtml",
        thumbnail: "",
        fonte: "ge",
        data_publicacao: "Mon, 06 Jul 2026 23:49:52 -0000",
        idioma: "pt-BR",
        data_coleta: "2026-07-15T04:00:00.000Z",
      },
      {
        id: "ge-e-2030-06-07-2026",
        titulo:
          "E 2030? Veja quem deve fazer parte do próximo ciclo da Seleção",
        resumo_original:
          "O planejamento da Seleção Brasileira para a Copa de 2030 começará nos próximos dias. O ge lista jogadores que podem seguir e outros que devem ficar no radar durante o ciclo.",
        url: "https://ge.globo.com/futebol/copa-do-mundo/noticia/2026/07/06/e-2030-veja-quem-deve-seguir-e-nomes-para-ficarem-no-radar-no-proximo-ciclo-da-selecao.ghtml",
        thumbnail: "",
        fonte: "ge",
        data_publicacao: "Mon, 06 Jul 2026 15:00:08 -0000",
        idioma: "pt-BR",
        data_coleta: "2026-07-15T04:00:00.000Z",
      },
    ],
  },
  "07": {
    titulo: "O voo de volta — Ancelotti no Canadá e o calendário do novo ciclo",
    subtitulo:
      "Seleção se despede dos EUA com apenas um jogador no voo de volta ao Brasil; CBF garante Ancelotti até 2030 e define primeiros amistosos",
    resumo:
      "Enquanto Ancelotti segue para férias no Canadá, a delegação brasileira deixa os Estados Unidos com apenas Danilo no voo de volta ao Rio. A CBF já trabalha no calendário do novo ciclo, que inclui amistosos contra a Austrália em setembro. Jogadores veteranos indicam despedida da Seleção.",
    corpo: `Dois dias após a eliminação para a Noruega, a seleção brasileira deixou o hotel em Nova Jersey e a delegação seguiu destinos distintos. Carlo Ancelotti viajou para o Canadá, onde passará férias com a família antes de retomar o trabalho em agosto. Do elenco de 26 jogadores, apenas Danilo, do Flamengo, embarcou no voo fretado de volta ao Brasil.

Enquanto os jogadores se dispersam, a CBF já traça o planejamento para o novo ciclo. O ge noticiou que a entidade trabalha com o calendário já definido: a Super Data FIFA de setembro, entre os dias 21 de setembro e 6 de outubro, terá três amistosos, começando com dois jogos contra a Austrália nos dias 25 e 29.

Em meio à logística do retorno, as despedidas dos veteranos ganharam destaque. Neymar, Danilo, Marquinhos e Casemiro indicaram que podem não vestir mais a amarelinha em Copas do Mundo. A renovação do elenco para 2030 já começou a ser desenhada.`,
    destaque: {
      id: "ge-ancelotti-viaja-canada-07-07-2026",
      titulo:
        "Ancelotti viaja ao Canadá, e CBF trabalha calendário para próximo ciclo",
      resumo_original:
        "Entendimento nos bastidores é que o período para cobranças é para 2030 e treinador teve um ano para 'apagar incêndio'. Italiano chega ao Rio entre fim de agosto e início de setembro.",
      url: "https://ge.globo.com/futebol/copa-do-mundo/noticia/2026/07/07/ancelotti-viaja-ao-canada-e-cbf-trabalha-calendario-para-proximo-ciclo.ghtml",
      thumbnail:
        "https://s2-ge.glbimg.com/ecRQoCSBk34mh9TLZBn-J1Sxpmw=/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2026/S/p/3Uj3kXREK9fkABSm0L8g/afp-20260705-b9bv84r-v1-highres-fblwc2026match91branor.jpg",
      fonte: "ge",
      data_publicacao: "Tue, 07 Jul 2026 03:00:42 -0000",
      idioma: "pt-BR",
      data_coleta: "2026-07-15T04:00:00.000Z",
    },
    referencias: [
      {
        id: "ge-recordes-negativos-07-07-2026",
        titulo:
          "Eliminação para Noruega fecha ciclo de fracassos e recordes negativos da Seleção; veja lista",
        resumo_original:
          "Brasil teve a pior campanha da história das eliminatórias, perdeu jogos em circunstâncias inéditas e voltou a cair nas oitavas depois de 36 anos.",
        url: "https://ge.globo.com/futebol/copa-do-mundo/noticia/2026/07/07/eliminacao-para-noruega-fecha-ciclo-de-fracassos-e-recordes-negativos-da-selecao-veja-lista.ghtml",
        thumbnail: "",
        fonte: "ge",
        data_publicacao: "Tue, 07 Jul 2026 21:00:08 -0000",
        idioma: "pt-BR",
        data_coleta: "2026-07-15T04:00:00.000Z",
      },
      {
        id: "ge-despedida-veteranos-07-07-2026",
        titulo:
          "Despedida? Veja o que disseram os jogadores veteranos sobre futuro na seleção brasileira",
        resumo_original:
          "Além de Neymar, Danilo e Marquinhos indicaram despedidas; Alisson e Casemiro foram menos enfáticos. Ancelotti falou em 'precisar pensar' o futuro do meio de campo.",
        url: "https://ge.globo.com/futebol/copa-do-mundo/noticia/2026/07/07/despedida-veja-o-que-disseram-os-jogadores-veteranos-sobre-futuro-na-selecao-brasileira.ghtml",
        thumbnail: "",
        fonte: "ge",
        data_publicacao: "Tue, 07 Jul 2026 05:00:16 -0000",
        idioma: "pt-BR",
        data_coleta: "2026-07-15T04:00:00.000Z",
      },
      {
        id: "oglobo-selecao-hotel-07-07-2026",
        titulo:
          "Seleção deixa hotel após eliminação na Copa do Mundo, e apenas um jogador retornará ao Brasil",
        resumo_original:
          "Após a eliminação, a seleção brasileira deixou o hotel em Nova Jersey. Apenas o zagueiro Danilo, do Flamengo, e o goleiro sub-20 Léo Nannetti retornam no voo fretado.",
        url: "https://oglobo.globo.com/esportes/copa-do-mundo-2026/noticia/2026/07/07/selecao-deixa-hotel-apos-eliminacao-na-copa-do-mundo-e-apenas-um-jogador-retornara-ao-brasil.ghtml",
        thumbnail: "",
        fonte: "O Globo",
        data_publicacao: "Tue, 07 Jul 2026 18:08:35 -0000",
        idioma: "pt-BR",
        data_coleta: "2026-07-15T04:00:00.000Z",
      },
    ],
  },
  "08": {
    titulo: "O desembarque — Danilo solo e o recomeço da Seleção",
    subtitulo:
      "Único jogador a desembarcar no Rio, Danilo representa o fim de um ciclo; CBF define primeiros passos da reformulação com Ancelotti",
    resumo:
      "A delegação da Seleção desembarca no Rio com apenas Danilo entre os jogadores. Haaland comenta o jogo contra o Brasil. O ge lança enquete interativa 'VC convoca' para a Copa de 2030, enquanto a CBF define os primeiros passos da reformulação para o novo ciclo.",
    corpo: `A madrugada no Rio de Janeiro foi simbólica: apenas o zagueiro Danilo, único jogador a retornar no voo fretado, desembarcou no Brasil. A imagem representa o fim de um ciclo e o início de outro — a dispersão do elenco da Copa de 2026 dá lugar ao planejamento para 2030.

Enquanto isso, na Europa, Haaland comentou pela primeira vez a experiência de enfrentar o Brasil. Em vídeo publicado em seu canal no YouTube, o atacante norueguês disse: "O Brasil é uma nação do futebol. É um pouco irreal jogar contra o Brasil."

O ge lançou uma enquete interativa convocando os torcedores a montarem sua própria lista de 26 jogadores para a Copa de 2030, com mais de 80 nomes disponíveis. A CBF, por sua vez, definiu os primeiros passos da reformulação: a Super Data FIFA de setembro será o ponto de partida, com amistosos contra a Austrália e a expectativa de ampliar a observação de novos talentos.`,
    destaque: {
      id: "ge-danilo-desembarca-08-07-2026",
      titulo:
        "Danilo é o único a desembarcar no Rio após eliminação na Copa",
      resumo_original:
        "Delegação da seleção desembarca no Rio com apenas um jogador após eliminação na Copa. Danilo, do Flamengo, foi o único dos 26 convocados a retornar no voo fretado.",
      url: "https://ge.globo.com/futebol/copa-do-mundo/noticia/2026/07/08/delegacao-da-selecao-desembarca-no-rio-com-apenas-um-jogador-apos-eliminacao-na-copa.ghtml",
      thumbnail:
        "https://s2-ge.glbimg.com/ecRQoCSBk34mh9TLZBn-J1Sxpmw=/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2026/S/p/3Uj3kXREK9fkABSm0L8g/afp-20260705-b9bv84r-v1-highres-fblwc2026match91branor.jpg",
      fonte: "ge",
      data_publicacao: "Wed, 08 Jul 2026 06:05:33 -0000",
      idioma: "pt-BR",
      data_coleta: "2026-07-15T04:00:00.000Z",
    },
    referencias: [
      {
        id: "ge-haaland-08-07-2026",
        titulo:
          'Haaland comenta jogo com o Brasil na Copa: "Nação do futebol"',
        resumo_original:
          "Em vídeo, atacante norueguês comenta sobre a experiência de enfrentar o Brasil: 'É um pouco irreal jogar contra o Brasil. Nunca imaginei que isso pudesse acontecer.'",
        url: "https://ge.globo.com/futebol/copa-do-mundo/noticia/2026/07/08/haaland-comenta-jogo-com-o-brasil-na-copa-nacao-do-futebol-um-pouco-irreal-jogar-contra.ghtml",
        thumbnail: "",
        fonte: "ge",
        data_publicacao: "Wed, 08 Jul 2026 18:21:13 -0000",
        idioma: "pt-BR",
        data_coleta: "2026-07-15T04:00:00.000Z",
      },
      {
        id: "ge-vc-convoca-08-07-2026",
        titulo:
          "VC convoca: quem você quer na lista da Seleção para a Copa do Mundo 2030",
        resumo_original:
          "O ge montou uma lista com mais de 80 jogadores que podem seguir e outros que devem ficar no radar durante o ciclo. Convoque seus 26 nomes para o Mundial 2030.",
        url: "https://ge.globo.com/futebol/copa-do-mundo/noticia/2026/07/08/vc-convoca-quem-voce-quer-na-lista-da-selecao-para-a-copa-do-mundo-2030.ghtml",
        thumbnail: "",
        fonte: "ge",
        data_publicacao: "Wed, 08 Jul 2026 14:00:13 -0000",
        idioma: "pt-BR",
        data_coleta: "2026-07-15T04:00:00.000Z",
      },
      {
        id: "estadao-brasil-11o-08-07-2026",
        titulo:
          "Brasil termina Copa do Mundo em 11º lugar, sua pior posição em 60 anos",
        resumo_original:
          "Com o fim das oitavas, Brasil terminou em 11º, sua pior posição em 60 anos. A campanha igualou a Copa de 1966. A única campanha inferior foi em 1934.",
        url: "https://www.estadao.com.br/esportes/copa-do-mundo/brasil-termina-copa-do-mundo-em-11-lugar-sua-pior-posicao-em-60-anos/",
        thumbnail: "",
        fonte: "Estadão",
        data_publicacao: "Wed, 08 Jul 2026 00:46:17 -0000",
        idioma: "pt-BR",
        data_coleta: "2026-07-15T04:00:00.000Z",
      },
    ],
  },
  "09": {
    titulo: "A crise nos bastidores e a psicologia da derrota",
    subtitulo:
      "Jogadores pedem estabilidade para Ancelotti à CBF, enquanto 41% dos torcedores dizem não acreditar mais no hexa, aponta pesquisa",
    resumo:
      "Em meio à crise na CBF com disputas internas de poder, os jogadores levam à diretoria o pedido de manutenção de Ancelotti. Uma pesquisa revela que 41% dos brasileiros não acreditam mais no hexa. A BBC analisa o que a frustração da torcida ensina sobre lidar com derrotas.",
    corpo: `A quinta-feira trouxe à tona as tensões políticas nos bastidores da CBF. A eliminação precoce reabriu disputas internas de poder, com denúncias de gastos questionáveis e pressão sobre o presidente Samir Xaud. Enquanto isso, os jogadores se reuniram com a diretoria para defender a permanência de Carlo Ancelotti, pedindo estabilidade após um ciclo marcado por quatro trocas de comando técnico.

Uma pesquisa da Orbit Data Science capturou o humor da torcida: 41% das conversas nas redes sociais indicam descrença na conquista do hexa, enquanto 17% ainda mantêm esperança para 2030. Endrick surge como o principal símbolo de renovação, aparecendo em 19% das menções positivas.

A BBC publicou uma análise do ponto de vista da psicologia sobre a reação da torcida, destacando como o pensamento catastrófico e o imediatismo da era digital amplificam a sensação de fracasso — mas também como a derrota no esporte pode ensinar a lidar com frustrações.`,
    destaque: {
      id: "portal-manaos-jogadores-ancelotti-09-07-2026",
      titulo:
        "Eliminada da Copa, Seleção quer manter Ancelotti e evitar nova troca de comando",
      resumo_original:
        "Jogadores do elenco se reuniram com o presidente Samir Xaud e defenderam a permanência de Ancelotti para o próximo ciclo, pedindo estabilidade após quatro trocas de comando desde 2023.",
      url: "https://portalmanaos.com.br/2026/07/09/eliminada-da-copa-selecao-quer-manter-ancelotti-e-evitar-nova-troca-de-comando/",
      thumbnail:
        "https://s2-ge.glbimg.com/ecRQoCSBk34mh9TLZBn-J1Sxpmw=/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2026/S/p/3Uj3kXREK9fkABSm0L8g/afp-20260705-b9bv84r-v1-highres-fblwc2026match91branor.jpg",
      fonte: "Portal Manaós",
      data_publicacao: "Thu, 09 Jul 2026 15:16:21 -0000",
      idioma: "pt-BR",
      data_coleta: "2026-07-15T04:00:00.000Z",
    },
    referencias: [
      {
        id: "bbc-psicologia-derrota-09-07-2026",
        titulo:
          "Eliminação do Brasil na Copa: o que a frustração da torcida ensina sobre lidar com derrotas, segundo a psicologia",
        resumo_original:
          "Especialistas analisam a reação dos torcedores após eliminação. Pensamento catastrófico, imediatismo e o papel das redes sociais na amplificação da frustração.",
        url: "https://www.bbc.com/portuguese/articles/clyeknmr72vo",
        thumbnail: "",
        fonte: "BBC",
        data_publicacao: "Thu, 09 Jul 2026 08:31:08 -0000",
        idioma: "pt-BR",
        data_coleta: "2026-07-15T04:00:00.000Z",
      },
      {
        id: "brasil247-pesquisa-09-07-2026",
        titulo:
          "Copa do Mundo: 41% dos brasileiros não acreditam mais no hexa da Seleção",
        resumo_original:
          "Pesquisa da Orbit Data Science aponta pessimismo após eliminação. Endrick surge como símbolo de renovação, enquanto Neymar deixa de ser principal referência.",
        url: "https://www.brasil247.com/247-na-copa/copa-do-mundo-41-dos-brasileiros-nao-acreditam-mais-no-hexa-da-selecao/",
        thumbnail: "",
        fonte: "Brasil 247",
        data_publicacao: "Thu, 09 Jul 2026 13:26:02 -0000",
        idioma: "pt-BR",
        data_coleta: "2026-07-15T04:00:00.000Z",
      },
      {
        id: "otempo-zenit-dupla-09-07-2026",
        titulo:
          "Em alta no Zenit, dupla brasileira mira chance em novo ciclo da Seleção",
        resumo_original:
          "Pedrinho e Luiz Henrique, companheiros no Zenit, vivem bom momento e surgem como candidatos a espaço nas próximas convocações de Ancelotti.",
        url: "https://www.otempo.com.br/sports/futebol-internacional/2026/7/9/em-alta-no-zenit-dupla-brasileira-mira-chance-em-novo-ciclo-da-selecao",
        thumbnail: "",
        fonte: "O Tempo",
        data_publicacao: "Thu, 09 Jul 2026 23:00:40 -0000",
        idioma: "pt-BR",
        data_coleta: "2026-07-15T04:00:00.000Z",
      },
    ],
  },
  "10": {
    titulo: "Sete caras novas — o futuro da Seleção começa a ganhar forma",
    subtitulo:
      "UOL lista candidatos a ocupar vagas no novo ciclo, enquanto a França avança à semifinal da Copa e o planejamento da CBF para 2030 segue em curso",
    resumo:
      "O blog do Rafael Reis, no UOL, lista sete caras novas que podem pintar na Seleção no ciclo da próxima Copa. Enquanto a Copa do Mundo segue com França e Espanha nas semifinais, os bastidores do futebol brasileiro já projetam a renovação do elenco para 2030.",
    corpo: `Enquanto a Copa do Mundo segue sem o Brasil, com França e Espanha se preparando para a semifinal, os olhos do futebol brasileiro já se voltam para o futuro. O blog do Rafael Reis, no UOL, listou sete caras novas que podem aparecer na Seleção no ciclo da Copa de 2030, incluindo nomes como Wesley (Roma), Andrey Santos (Chelsea/Manchester United) e Vitor Roque (Palmeiras).

O periódico de 16 dias entre setembro e outubro, aprovado pela FIFA, será a primeira oportunidade para Ancelotti testar novos nomes. A pré-convocação para os amistosos contra a Austrália deve ser enviada até o dia 6 de setembro.

O planejamento da CBF para o novo ciclo segue em curso, com a expectativa de que a renovação do elenco seja gradual, sem rupturas imediatas. A avaliação interna é de que o grupo tem uma base sólida de jovens talentos que precisam ser integrados ao longo dos próximos meses.`,
    destaque: {
      id: "uol-sete-caras-novas-10-07-2026",
      titulo:
        "Renovação para 2030: 7 caras novas que podem pintar no novo ciclo da Seleção",
      resumo_original:
        "Blog do Rafael Reis apresenta opções de jogadores candidatos a fazer parte da renovação da seleção brasileira para a Copa do Mundo 2030, incluindo laterais, meio-campistas e atacantes.",
      url: "https://www.uol.com.br/esporte/futebol/colunas/rafael-reis/2026/07/10/7-caras-novas-que-podem-aparecer-na-selecao-no-ciclo-da-proxima-copa.htm",
      thumbnail:
        "https://s2-ge.glbimg.com/ecRQoCSBk34mh9TLZBn-J1Sxpmw=/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2026/S/p/3Uj3kXREK9fkABSm0L8g/afp-20260705-b9bv84r-v1-highres-fblwc2026match91branor.jpg",
      fonte: "UOL",
      data_publicacao: "Fri, 10 Jul 2026 08:30:00 -0000",
      idioma: "pt-BR",
      data_coleta: "2026-07-15T04:00:00.000Z",
    },
    referencias: [
      {
        id: "ge-bola-parada-08-07-2026",
        titulo:
          "E a bola parada? Como jogada que era trunfo da Seleção fracassou na Copa",
        resumo_original:
          "Algo que chegou a ser um trunfo na Seleção: o aproveitamento nas bolas paradas ofensivas. O time de Ancelotti não fez nenhum gol em lance desse tipo no Mundial.",
        url: "https://ge.globo.com/futebol/copa-do-mundo/noticia/2026/07/08/e-a-bola-parada-como-jogada-que-era-trunfo-da-selecao-fracassou-na-copa.ghtml",
        thumbnail: "",
        fonte: "ge",
        data_publicacao: "Wed, 08 Jul 2026 07:01:00 -0000",
        idioma: "pt-BR",
        data_coleta: "2026-07-15T04:00:00.000Z",
      },
    ],
  },
  "11": {
    titulo: "A vingança do calendário — Noruega é eliminada e o Brasil olha para 2030",
    subtitulo:
      "Noruega cai nas quartas para a Inglaterra, e brasileiros celebram nas redes; BBC e Exame traçam perfis dos jogadores que podem liderar o novo ciclo",
    resumo:
      "A Noruega é eliminada pela Inglaterra nas quartas de final. Torcedores brasileiros celebram a queda do algoz. Enquanto isso, BBC News Brasil e Exame publicam análises detalhadas sobre os jogadores que devem liderar a Seleção no ciclo até 2030, destacando Vinicius Jr., Rodrygo, Estêvão e Militão.",
    corpo: `O sábado trouxe uma dose de alívio para o torcedor brasileiro: a Noruega foi eliminada pela Inglaterra por 2 a 1 na prorrogação, com dois gols de Jude Bellingham. Nas redes sociais, brasileiros celebraram a queda do algoz com humor e ironia, em contraste com a frustração da semana anterior.

Mas o dia também foi marcado por um olhar para o futuro. A BBC News Brasil publicou uma análise detalhada dos jogadores que devem compor a espinha dorsal da Seleção no ciclo de 2030: Vinicius Jr., Rodrygo, Estêvão e Éder Militão são apontados como os pilares da renovação. A matéria destaca que a próxima convocação, em setembro, marcará o início de uma nova era.

A Exame também traçou um raio-x do novo ciclo, destacando que Ancelotti inicia a reformulação com foco no meio-campo e nas laterais, setores identificados como pontos críticos para o sucesso em 2030.`,
    destaque: {
      id: "bbc-quem-vai-liderar-11-07-2026",
      titulo:
        "Quem são os jogadores que vão liderar a Seleção na próxima Copa e tentar acabar com jejum histórico do Brasil",
      resumo_original:
        "Passada a frustração pela eliminação, os olhos já se voltam para o futuro. Ancelotti afirma que derrota marca 'o início de um novo ciclo'. BBC lista candidatos a liderar o time.",
      url: "https://www.bbc.com/portuguese/articles/cj4g75d4ldko",
      thumbnail:
        "https://s2-ge.glbimg.com/ecRQoCSBk34mh9TLZBn-J1Sxpmw=/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2026/S/p/3Uj3kXREK9fkABSm0L8g/afp-20260705-b9bv84r-v1-highres-fblwc2026match91branor.jpg",
      fonte: "BBC",
      data_publicacao: "Sat, 11 Jul 2026 09:43:23 -0000",
      idioma: "pt-BR",
      data_coleta: "2026-07-15T04:00:00.000Z",
    },
    referencias: [
      {
        id: "ge-torcida-lamenta-11-07-2026",
        titulo:
          "Torcida brasileira lamenta sábado sem Brasil na Copa",
        resumo_original:
          "Eliminação precoce da Seleção gera frustração e torcedores expressam tristeza nas redes sociais após a eliminação nas oitavas de final.",
        url: "https://ge.globo.com/futebol/copa-do-mundo/noticia/2026/07/11/torcida-brasileira-lamenta-sabado-sem-brasil-na-copa-era-pra-ser-a-gente-veja-reacoes.ghtml",
        thumbnail: "",
        fonte: "ge",
        data_publicacao: "Sat, 11 Jul 2026 17:00:38 -0000",
        idioma: "pt-BR",
        data_coleta: "2026-07-15T04:00:00.000Z",
      },
      {
        id: "ge-brasileiros-comemoram-11-07-2026",
        titulo:
          'Brasileiros comemoram eliminação da Noruega: "Pode remar de volta pra casa"',
        resumo_original:
          "Depois da eliminação do Brasil, torcedores guardaram ressentimento. Noruega foi eliminada pela Inglaterra e recebeu 'carinho' dos brasileiros nas redes.",
        url: "https://ge.globo.com/futebol/copa-do-mundo/noticia/2026/07/11/brasileiros-comemoram-eliminacao-da-noruega-pode-remar-de-volta-pra-casa-veja-reacoes.ghtml",
        thumbnail: "",
        fonte: "ge",
        data_publicacao: "Sun, 12 Jul 2026 00:11:17 -0000",
        idioma: "pt-BR",
        data_coleta: "2026-07-15T04:00:00.000Z",
      },
      {
        id: "exame-jogadores-11-07-2026",
        titulo:
          "Os jogadores que podem liderar a Seleção na próxima Copa do Mundo — e encerrar jejum desde 2002",
        resumo_original:
          "Ancelotti inicia reformulação após a Copa de 2026 e projeta novo ciclo com Vinicius Júnior, Rodrygo, Estêvão e Militão como protagonistas.",
        url: "https://exame.com/esporte/os-jogadores-que-podem-liderar-a-selecao-na-proxima-copa-do-mundo-e-encerrar-jejum-desde-2002/",
        thumbnail: "",
        fonte: "Exame",
        data_publicacao: "Sat, 11 Jul 2026 17:48:42 -0000",
        idioma: "pt-BR",
        data_coleta: "2026-07-15T04:00:00.000Z",
      },
    ],
  },
  "12": {
    titulo: "Promessas e planejamento — uma semana depois",
    subtitulo:
      "Alisson se manifesta pela primeira vez após a eliminação; CBF divulga vídeo projetando 'mais estabilidade e planejamento' para o novo ciclo",
    resumo:
      "Uma semana após a eliminação, Alisson quebra o silêncio e diz que o Brasil 'segue na busca do hexa'. A CBF divulga um vídeo projetando o novo ciclo com a promessa de mais estabilidade, enquanto o UOL destaca a aposta em jovens promessas.",
    corpo: `Exatamente uma semana após a eliminação para a Noruega, o goleiro Alisson manifestou-se publicamente pela primeira vez. Em uma longa postagem, o camisa 1 do Liverpool escreveu: "Meu desejo era estar escrevendo essa legenda como campeão do mundo! Mas de alguma maneira, não foi possível. Seguimos em frente na busca do hexa!!"

A CBF divulgou um vídeo nas redes sociais projetando o "novo ciclo" para a equipe. A entidade prometeu "mais estabilidade, mais planejamento e muito mais trabalho duro", em contraste com o ciclo anterior, que teve quatro técnicos em três anos.

O UOL Esporte destacou que a comissão técnica volta suas atenções para as categorias de base e os jovens talentos que despontam no cenário nacional e internacional como pilares do novo ciclo, com a promessa de que a renovação será gradual e planejada.`,
    destaque: {
      id: "ge-alisson-12-07-2026",
      titulo:
        'Alisson diz que Brasil segue na busca pelo hexa: "Nessa vida debaixo do sol, o sabor é agridoce"',
      resumo_original:
        "Camisa 1 da Seleção se manifesta pela primeira vez uma semana após eliminação. Goleiro agradece torcedores e afirma: 'Seguimos em frente na busca do hexa.'",
      url: "https://ge.globo.com/futebol/copa-do-mundo/noticia/2026/07/12/alisson-diz-que-brasil-segue-na-busca-pelo-hexa-nessa-vida-debaixo-do-sol-o-sabor-e-agridoce.ghtml",
      thumbnail:
        "https://s2-ge.glbimg.com/ecRQoCSBk34mh9TLZBn-J1Sxpmw=/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2026/S/p/3Uj3kXREK9fkABSm0L8g/afp-20260705-b9bv84r-v1-highres-fblwc2026match91branor.jpg",
      fonte: "ge",
      data_publicacao: "Sun, 12 Jul 2026 15:51:36 -0000",
      idioma: "pt-BR",
      data_coleta: "2026-07-15T04:00:00.000Z",
    },
    referencias: [
      {
        id: "uol-promessas-12-07-2026",
        titulo:
          "Seleção brasileira aposta em promessas ao falar sobre novo ciclo para Copa",
        resumo_original:
          "CBF divulga vídeo projetando 'novo ciclo' para a equipe, com promessa de mais estabilidade e planejamento para a Copa do Mundo de 2030.",
        url: "https://www.uol.com.br/esporte/futebol/ultimas-noticias/2026/07/12/selecao-brasileira-aposta-em-promessas-ao-falar-sobre-novo-ciclo-para-copa.ghtm",
        thumbnail: "",
        fonte: "UOL",
        data_publicacao: "Sun, 12 Jul 2026 16:30:27 -0000",
        idioma: "pt-BR",
        data_coleta: "2026-07-15T04:00:00.000Z",
      },
      {
        id: "folha-cbf-planejamento-12-07-2026",
        titulo:
          "Copa 2030: CBF fala em 'mais estabilidade e planejamento'",
        resumo_original:
          "Em vídeo, CBF promete mais estabilidade e planejamento para a Copa de 2030. Entidade projeta novo ciclo após eliminação nas oitavas para a Noruega.",
        url: "https://www1.folha.uol.com.br/esporte/2026/07/cbf-promete-mais-estabilidade-e-planejamento-para-copa-de-2030.shtml",
        thumbnail: "",
        fonte: "Folha",
        data_publicacao: "Sun, 12 Jul 2026 17:20:00 -0000",
        idioma: "pt-BR",
        data_coleta: "2026-07-15T04:00:00.000Z",
      },
    ],
  },
  "13": {
    titulo: "O calendário do recomeço e a falta de identidade",
    subtitulo:
      "Brasil volta a campo em setembro contra a Austrália, enquanto Caio Ribeiro e Felipe Melo apontam crise de identidade na formação de jogadores",
    resumo:
      "A Folha divulga o calendário pós-Copa: Brasil enfrenta a Austrália em setembro. No Seleção Copa, Caio Ribeiro e Felipe Melo criticam duramente a falta de identidade do futebol brasileiro desde a base, em mais um capítulo da crise de identidade da Seleção.",
    corpo: `O calendário do novo ciclo começa a ganhar forma. A Folha de S.Paulo confirmou que a Seleção Brasileira volta a campo nos dias 25 e 29 de setembro contra a Austrália, em Townsville e Brisbane, respectivamente. A Super Data FIFA de 16 dias entre setembro e outubro será a primeira oportunidade para Ancelotti testar a renovação do elenco.

Enquanto o calendário se desenha, o debate sobre as causas do fracasso continua. No programa Seleção Copa, Caio Ribeiro disparou: "O Brasil precisa repensar sua maneira desde a categoria de base até chegar no profissional. A gente precisa reaproximar o torcedor da seleção brasileira." Felipe Melo complementou: "O pior que está acontecendo é o respeito. O cara bota o time reserva contra a França e diz: 'Vamos ficar em segundo? Vamos pegar o Brasil? Está tranquilo.' Cadê o respeito?"

Paulo Nunes também criticou a formação: "A gente não tem meia de criação, não tem volante, a gente tem muito jogador de lado. Não temos laterais. Temos quatro anos para fazer isso."`,
    destaque: {
      id: "folha-calendario-13-07-2026",
      titulo:
        "Brasil volta a campo em setembro contra a Austrália; veja calendário após a Copa",
      resumo_original:
        "Seleção volta a campo nos dias 25 e 29 de setembro contra a Austrália. Amistosos marcam o início do novo ciclo de preparação para a Copa do Mundo de 2030.",
      url: "https://www1.folha.uol.com.br/esporte/2026/07/brasil-volta-a-campo-em-setembro-contra-a-australia-veja-calendario-apos-a-copa.shtml",
      thumbnail:
        "https://s2-ge.glbimg.com/ecRQoCSBk34mh9TLZBn-J1Sxpmw=/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2026/S/p/3Uj3kXREK9fkABSm0L8g/afp-20260705-b9bv84r-v1-highres-fblwc2026match91branor.jpg",
      fonte: "Folha",
      data_publicacao: "Mon, 13 Jul 2026 04:01:00 -0000",
      idioma: "pt-BR",
      data_coleta: "2026-07-15T04:00:00.000Z",
    },
    referencias: [
      {
        id: "ge-caio-ribeiro-13-07-2026",
        titulo:
          'Caio Ribeiro vê falta de identidade no Brasil desde a base, e Felipe Melo concorda: "Cadê o respeito?"',
        resumo_original:
          "Comentaristas convergem ao listarem debilidades que enfraqueceram a seleção brasileira ao longo dos anos. Paulo Nunes também reforçou críticas.",
        url: "https://ge.globo.com/futebol/copa-do-mundo/noticia/2026/07/13/caio-ribeiro-ve-problema-no-brasil-desde-a-base-e-felipe-melo-concorda-cade-o-respeito.ghtml",
        thumbnail: "",
        fonte: "ge",
        data_publicacao: "Mon, 13 Jul 2026 22:55:39 -0000",
        idioma: "pt-BR",
        data_coleta: "2026-07-15T04:00:00.000Z",
      },
    ],
  },
};

function buildFrontmatter(fields: Record<string, unknown>): string {
  const clean: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(fields)) {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value) && value.length === 0) continue;
      clean[key] = value;
    }
  }
  return yaml.dump(clean, { lineWidth: 120, quoteStyle: "double" });
}

function writeMdxFile(filePath: string, day: string, data: ChapterData): void {
  const dateStr = `2026-07-${day}`;

  const frontmatter: Record<string, unknown> = {
    id: dateStr,
    data: dateStr,
    slug: `2026/07/${day}`,
    titulo: data.titulo,
    subtitulo: data.subtitulo,
    resumo: data.resumo,
    categorias: [],
    tags: [],
    tempo_de_leitura: 1,
    noticia_destaque: data.destaque,
  };

  if (data.referencias.length > 0) {
    frontmatter.noticias_referencia = data.referencias;
  }

  const mdxContent = `---\n${buildFrontmatter(frontmatter)}---\n\n${data.corpo}\n`;
  fs.writeFileSync(filePath, mdxContent, "utf-8");
}

function updateExistingMdx(filePath: string, day: string, data: ChapterData): void {
  const raw = fs.readFileSync(filePath, "utf-8");
  const parsed = matter(raw);
  const fm = parsed.data as Record<string, unknown>;

  fm.noticia_destaque = data.destaque;
  fm.noticias_referencia = data.referencias;

  const output = matter.stringify(parsed.content, fm);
  fs.writeFileSync(filePath, output, "utf-8");
}

function main(): void {
  const contentDir = path.join(CONTENT_DIR, YEAR, MONTH);

  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
  }

  const sortedDays = Object.keys(articles).sort();
  let updated = 0;
  let created = 0;
  const skipped = 0;

  for (const day of sortedDays) {
    const filePath = path.join(contentDir, `${day}.mdx`);
    const data = articles[day];

    if (fs.existsSync(filePath)) {
      updateExistingMdx(filePath, day, data);
      console.log(`📝 ${YEAR}/${MONTH}/${day}.mdx — notícias atualizadas`);
      updated++;
    } else {
      writeMdxFile(filePath, day, data);
      console.log(`✨ ${YEAR}/${MONTH}/${day}.mdx — capítulo criado`);
      created++;
    }
  }

  console.log(`\n${updated} atualizados, ${created} criados, ${skipped} ignorados`);
}

main();

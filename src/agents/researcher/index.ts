import { BaseAgent, type AgentInput, type AgentOutput } from "../base";
import { fetchAllRss } from "@/lib/rss";
import rawBlocklist from "@/config/news-blocklist.json";

const blocklist = rawBlocklist as { urls: string[]; keywords: string[] };

type Group = {
  name: string;
  keywords: string[];
  weight: number;
};

const POSITIVE_GROUPS: Group[] = [
  {
    name: "SELEÇÃO",
    weight: 3,
    keywords: [
      "seleção brasileira", "selecao brasileira",
      "ancelotti", "vinicius jr", "vinicius junior",
      "rodrygo", "endrick", "vini jr", "seleção masculina",
    ],
  },
  {
    name: "CBF",
    weight: 2,
    keywords: [
      "cbf", "confederação brasileira de futebol",
    ],
  },
  {
    name: "FIFA",
    weight: 3,
    keywords: [
      "fifa", "federação internacional de futebol", "infantino",
    ],
  },
  {
    name: "COMPETIÇÃO",
    weight: 3,
    keywords: [
      "copa do mundo", "copa 2030", "mundial 2030",
      "eliminatórias", "copa américa", "sul-americano",
    ],
  },
  {
    name: "SEDES",
    weight: 1,
    keywords: [
      "argentina", "uruguai", "paraguai",
      "marrocos", "portugal", "espanha",
    ],
  },
  {
    name: "CONTEXTO",
    weight: 1,
    keywords: [
      "brasil", "seleção", "futebol",
      "jogador", "técnico", "treinador",
    ],
  },
];

const EXCLUDED_KEYWORDS = [
  "vôlei", "volei", "voley", "voleibol",
  "basquete", "basquetebol", "nba",
  "handebol", "handball",
  "tênis", "tenis",
  "judô", "judo", "natação", "natacao",
  "atletismo", "ginástica", "ginastica",
  "ginástica rítmica", "ginastica ritmica",
  "ginástica artística", "ginastica artistica",
  "fórmula 1", "formula 1", "f1",
  "mma", "boxe", "surfe", "skate",
  "futsal",
  "futebol de areia",
  "futebol feminino",
  "copa do mundo feminina", "copa feminina", "mundial feminino",
  "copa do mundo 2027", "copa do mundo de 2027", "copa de 2027", "copa 2027", "mundial 2027",
  "copa das nações",
  "fisiculturismo",
  "liga das nações",
  "kings league",
  "esports", "e-sports", "e-sport", "gaming",
  "streamer",
  "série a", "série b", "série c", "série d",
  "serie a", "serie b", "serie c", "serie d",
  "brasileirão", "brasileirao",
  "libertadores",
  "copa do brasil",
  "seleção francesa", "seleção espanhola", "seleção argentina",
  "seleção inglesa", "seleção alemã", "seleção italiana",
  "seleção portuguesa", "seleção holandesa", "seleção belga",
  "seleção da frança", "seleção da espanha", "seleção da argentina",
  "presidente da frança", "presidente da espanha",
  "botafogo", "ferroviário",
  "copa paulista", "copa do nordeste",
  "campeonato estadual", "estadual",
  "série a2", "serie a2", "série a3", "serie a3",
  "gramado natural", "grama natural",
  "transfer ban",
  "nfl",
  "maratonista", "maratona",
  "desaparecido", "desaparecimento",
  "doping", "suspensão por doping",
];

const EXCLUDED_URL_PATTERNS = [
  "/volei/", "/basquete/", "/handebol/", "/tenis/",
  "/fisiculturismo/",
  "/kings-league/", "/esports/", "/gaming/",
  "/ginastica-ritmica/", "/ginastica-artistica/", "/ginastica/",
  "/atletismo/", "/natacao/", "/surfe/", "/skate/",
  "/mma/", "/combate/", "/judo/", "/boxe/",
  "/nfl/", "/futebol-americano/",
  "/feminina/", "/copa-do-mundo-feminina/", "/futebol-feminino/",
  "/entretenimento/",
  "/sp/", "/rj/", "/ce/", "/rs/", "/mg/", "/ba/",
  "/pr/", "/pe/", "/sc/", "/df/", "/es/", "/go/",
  "/ac/", "/al/", "/am/", "/ap/", "/ma/", "/mt/",
  "/ms/", "/pa/", "/pb/", "/pi/", "/rn/", "/ro/",
  "/rr/", "/se/", "/to/",
  "/futebol/times/",
  "/flamengo/", "/corinthians/", "/palmeiras/",
  "/sao-paulo/", "/santos/", "/gremio/", "/internacional/",
];

const CLUBES_BRASILEIROS = [
  "flamengo", "corinthians", "palmeiras", "são paulo", "saopaulo",
  "santos", "grêmio", "gremio", "internacional", "atlético-mg",
  "atletico-mg", "atlético paranaense", "cruzeiro", "botafogo",
  "fluminense", "vasco", "bahia", "fortaleza", "ceará", "ceara",
  "goiás", "goias", "coritiba", "chapecoense", "sport", "nautico",
  "vitória", "vitoria", "juventude", "cuiabá", "criciúma",
];

const OTHER_NATIONALITIES = [
  "frança", "francesa", "franceses",
  "espanha", "espanhola", "espanhóis", "espanhois",
  "argentina", "argentino", "argentinos",
  "inglaterra", "inglês", "inglesa", "ingleses",
  "alemanha", "alemã", "alemão", "alemao",
  "itália", "italiana", "italiano", "italianos",
  "portugal", "português", "portuguesa", "portugues",
  "holanda", "holandês", "holandesa", "holandes",
  "bélgica", "belga",
];

const SELEÇÃO_STRONG_PHRASES = [
  "seleção brasileira", "selecao brasileira",
  "seleção masculina", "selecao masculina",
  "eliminatórias", "eliminatorias",
  "convocação", "convocacoes", "convocações",
  "convocado", "convocados", "convocada", "convocadas",
  "copa do mundo 2030", "copa 2030", "mundial 2030",
  "cbf", "confederação brasileira de futebol",
  "ancelotti",
];

const SELEÇÃO_NAMES = [
  "vinicius jr", "vinicius junior", "vini jr",
  "rodrygo", "endrick",
];

const FOREIGN_CLUBS = [
  "real madrid", "barcelona", "atlético de madrid", "atletico de madrid",
  "liverpool", "manchester city", "manchester united", "arsenal", "chelsea",
  "psg", "bayern", "juventus", "milan", "roma", "napoli",
  "inter de milão", "inter de milao", "borussia", "ajax",
  "porto", "benfica", "sevilha", "valencia", "leverkusen",
  "colo-colo", "colo colo", "olympique",
];

const SECONDARY_POSITIONING = [
  "concorrente de", "concorrente do",
  "disputar vaga com", "disputar a vaga com", "disputa por vaga",
  "rival de", "companheiro de",
  "comparado a", "comparado com", "à altura de", "a altura de",
];

const FORMER_PLAYER_OR_HEALTH = [
  "estado de saúde", "estado de saude",
  "saúde de", "saude de",
  "ex-jogador", "aposentado", "aposentada",
  "internado", "hospitalizado",
];

const FAMILY_RELATIVE_PREFIXES = [
  "filho de", "filha de",
  "esposa de", "esposo de", "mulher de", "marido de",
  "namorada de", "namorado de", "noiva de",
  "irmão de", "irmao de", "irmã de", "irma de",
  "pai de", "mãe de", "mae de",
  "ex-mulher de", "ex-noiva de",
];

const ALL_TIME_LIST_PHRASES = [
  "lista de maiores goleiros da história",
  "maiores goleiros da história",
  "maiores jogadores da história",
  "melhores goleiros da história",
  "melhores jogadores da história",
  "ranking dos maiores da história",
  "ranking dos jogadores mais caros",
  "jogadores mais caros",
  "veja o ranking",
];

const FORMER_PLAYERS = [
  "neymar",
  "roberto carlos",
  "ronaldo", "ronaldinho",
  "kaká", "kaka",
  "romário", "romario",
  "pelé", "pele",
  "zico",
  "sócrates", "socrates",
  "rivellino", "rivelino",
  "garrincha",
  "tostão", "tostao",
  "zagallo",
  "cafu",
  "rivaldo",
];

const NOSTALGIA_KEYWORDS = [
  "torciam",
  "torcia na infância", "torcia na infancia",
  "quando criança", "quando crianças",
  "time do coração", "time do coracao",
];

function cleanText(raw: string): string {
  return raw.replace(/<[^>]*>/g, " ");
}

function buildText(title: string, resumo?: string): string {
  return cleanText(`${title} ${resumo ?? ""}`).toLowerCase();
}

function hasTerm(text: string, term: string): boolean {
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`\\b${escaped}\\b`, "i").test(text);
}

function hasDisguisedClubOrOffTopicNews(title: string, resumo: string): boolean {
  const text = buildText(title, resumo);
  const temClube = CLUBES_BRASILEIROS.some((c) => hasTerm(text, c));
  const temSelecaoOuCbf = text.includes("seleção") || text.includes("selecao") || text.includes("cbf");
  const temFifa = text.includes("fifa");
  const temCopa = text.includes("copa do mundo");
  const temEliminatorias = text.includes("eliminatórias") || text.includes("eliminatorias");
  const temContextoSelecao = temSelecaoOuCbf || temCopa || temEliminatorias;

  if (temClube && temFifa && !temContextoSelecao) return true;
  if (temClube && temCopa && !temContextoSelecao) return true;

  const selecaoGroup = POSITIVE_GROUPS.find((g) => g.name === "SELEÇÃO");
  const temJogadorSelecao = selecaoGroup?.keywords.some((kw) => text.includes(kw)) ?? false;
  if (temClube && temJogadorSelecao && !temContextoSelecao) return true;

  return false;
}

function hasFamilyRelativeContext(title: string): boolean {
  const t = title.toLowerCase().trim();
  const hasPlayer = SELEÇÃO_NAMES.some((n) => t.includes(n));
  if (!hasPlayer) return false;
  return FAMILY_RELATIVE_PREFIXES.some((p) => t.startsWith(p));
}

function hasAllTimeListOpinion(title: string, resumo: string): boolean {
  const text = buildText(title, resumo);
  return ALL_TIME_LIST_PHRASES.some((p) => text.includes(p));
}

function hasFormerPlayerLegacy(title: string, resumo: string): boolean {
  const t = title.toLowerCase().trim();
  if (FORMER_PLAYERS.some((p) => t.startsWith(p))) return true;
  const text = buildText(title, resumo);
  return NOSTALGIA_KEYWORDS.some((k) => text.includes(k));
}

function hasFormerPlayerOffContext(title: string): boolean {
  const t = title.toLowerCase().trim();
  const hasFormerPlayer = FORMER_PLAYERS.some((p) => t.includes(p));
  if (!hasFormerPlayer) return false;
  const hasDirectSelecao =
    SELEÇÃO_STRONG_PHRASES.some((p) => t.includes(p)) ||
    SELEÇÃO_NAMES.some((n) => t.includes(n));
  return !hasDirectSelecao;
}

function hasBrazilianClubFocusOffContext(title: string): boolean {
  const t = title.toLowerCase().trim();
  const temClube = CLUBES_BRASILEIROS.some((c) => t.includes(c));
  if (!temClube) return false;
  const temJogadorSelecao = SELEÇÃO_NAMES.some((n) => t.includes(n));
  const temFraseForte = SELEÇÃO_STRONG_PHRASES.some((p) => t.includes(p));
  return !temJogadorSelecao && !temFraseForte;
}

function hasForeignStarOffContext(title: string, resumo: string): boolean {
  const text = buildText(title, resumo);
  const t = title.toLowerCase().trim();
  const hasNationality = OTHER_NATIONALITIES.some((n) => text.includes(n));
  if (!hasNationality) return false;
  const hasBrasil =
    text.includes("brasil") ||
    text.includes("brasileira") ||
    text.includes("brasileiro") ||
    text.includes("brasileiras") ||
    text.includes("brasileiros");
  const temSelecaoTitulo = t.includes("seleção") || t.includes("selecao");
  const temJogadorSelecao = SELEÇÃO_NAMES.some((n) => t.includes(n));
  const temFraseForte = SELEÇÃO_STRONG_PHRASES.some((p) => t.includes(p));
  return !hasBrasil && !temSelecaoTitulo && !temJogadorSelecao && !temFraseForte;
}

function hasPromoAnnouncement(title: string): boolean {
  const t = title.toLowerCase().trim();
  const temLanca = t.includes("lança") || t.includes("lanca");
  if (!temLanca) return false;
  return t.includes("edição") || t.includes("edicao") || t.includes("revista");
}

function hasExcludedContent(title: string, resumo: string, url: string): boolean {
  const urlLower = url.toLowerCase();
  const fullText = buildText(title, resumo);
  const cleanResumo = cleanText(resumo).toLowerCase();
  const focused = `${title.toLowerCase()} ${cleanResumo.slice(0, 200)}`;

  if (EXCLUDED_KEYWORDS.some((kw) => focused.includes(kw))) return true;
  if (EXCLUDED_URL_PATTERNS.some((p) => urlLower.includes(p))) return true;
  if (hasFamilyRelativeContext(title)) return true;

  const hasNationality = OTHER_NATIONALITIES.some((n) => fullText.includes(n));
  const hasSelecao = fullText.includes("seleção") || fullText.includes("selecao");
  const hasBrasil =
    fullText.includes("brasil") ||
    fullText.includes("brasileira") ||
    fullText.includes("brasileiro") ||
    fullText.includes("brasileiras") ||
    fullText.includes("brasileiros");

  if (hasNationality && hasSelecao && !hasBrasil) return true;
  if (hasDisguisedClubOrOffTopicNews(title, resumo)) return true;

  return false;
}

function hasStrongSelecaoContext(text: string): boolean {
  return SELEÇÃO_STRONG_PHRASES.some((p) => text.includes(p));
}

function titleStartsWithSelecaoName(title: string): boolean {
  const t = title.toLowerCase().trim();
  return SELEÇÃO_NAMES.some((n) => t.startsWith(n));
}

function hasOffTopicContext(title: string, resumo: string, url: string): boolean {
  const text = buildText(title, resumo);
  const urlLower = url.toLowerCase();
  const titleLower = title.toLowerCase();

  const temJogadorSelecao = SELEÇÃO_NAMES.some((n) => titleLower.includes(n));
  const temPosicionamentoSecundario = SECONDARY_POSITIONING.some((p) => text.includes(p));
  const temJogadorEmClausulaRelativa = SELEÇÃO_NAMES.some((n) => {
    const idxQue = titleLower.lastIndexOf(" que ");
    const idxPlayer = titleLower.indexOf(n);
    return idxPlayer !== -1 && idxQue !== -1 && idxPlayer > idxQue;
  });
  const jogadorPrincipal =
    temJogadorSelecao && !temPosicionamentoSecundario && !temJogadorEmClausulaRelativa;

  if (jogadorPrincipal) return false;

  const hasForeignClub = FOREIGN_CLUBS.some((c) => text.includes(c));
  const internationalUrl = urlLower.includes("/futebol-internacional/");

  return hasForeignClub || temPosicionamentoSecundario || temJogadorEmClausulaRelativa || internationalUrl;
}

function calculateScore(title: string, resumo: string): { score: number; matchedGroups: number } {
  const text = buildText(title, resumo);
  let score = 0;
  let matchedGroups = 0;

  for (const group of POSITIVE_GROUPS) {
    const groupMatched = group.keywords.some((kw) => text.includes(kw));
    if (groupMatched) {
      score += group.weight;
      matchedGroups++;
    }
  }

  return { score, matchedGroups };
}

export function isRelevant(title: string, resumo?: string, url?: string): boolean {
  const safeUrl = (url ?? "").toLowerCase();
  const text = buildText(title, resumo);

  if (hasExcludedContent(title, resumo ?? "", safeUrl)) return false;

  const hasFormerPlayerHealth = FORMER_PLAYER_OR_HEALTH.some((m) => text.includes(m));
  if (hasFormerPlayerHealth) return false;

  if (hasFormerPlayerOffContext(title)) return false;
  if (hasAllTimeListOpinion(title, resumo ?? "")) return false;
  if (hasPromoAnnouncement(title)) return false;
  if (hasBrazilianClubFocusOffContext(title)) return false;
  if (hasForeignStarOffContext(title, resumo ?? "")) return false;

  if (hasStrongSelecaoContext(text)) return true;

  if (hasFormerPlayerLegacy(title, resumo ?? "")) return false;

  if (titleStartsWithSelecaoName(title)) return true;

  const { score } = calculateScore(title, resumo ?? "");
  if (score >= 3) {
    return !hasOffTopicContext(title, resumo ?? "", safeUrl);
  }
  return false;
}

export function isBlocked(title: string, resumo?: string, url?: string): boolean {
  const safeUrl = (url ?? "").toLowerCase();
  const text = buildText(title, resumo);

  if (safeUrl && blocklist.urls.some((u) => safeUrl.includes(u))) return true;
  if (blocklist.keywords.some((kw) => text.includes(kw.toLowerCase()))) return true;

  return false;
}

export class ResearcherAgent extends BaseAgent {
  constructor() {
    super("Pesquisador");
  }

  async execute(input: AgentInput): Promise<AgentOutput> {
    this.log("Iniciando coleta de notícias");
    this.log(`Data: ${input.date.toISOString()}`);

    try {
      const allRss = await fetchAllRss();
      const targetEnd = new Date(input.date);
      targetEnd.setHours(23, 59, 59, 999);
      const threeDaysBefore = new Date(targetEnd);
      threeDaysBefore.setDate(threeDaysBefore.getDate() - 3);

      const relevantRss = allRss.filter((n) => {
        if (!isRelevant(n.titulo, n.subtitulo || n.resumo_original, n.url)) return false;
        const pubDate = new Date(n.data_publicacao);
        if (isNaN(pubDate.getTime())) return true;
        return pubDate >= threeDaysBefore && pubDate <= targetEnd;
      });
      const cleanRss = relevantRss.filter((n) => !isBlocked(n.titulo, n.resumo_original, n.url));
      this.log(`RSS: ${allRss.length} total, ${relevantRss.length} relevantes, ${relevantRss.length - cleanRss.length} bloqueadas, ${cleanRss.length} selecionadas`);
      return {
        success: true,
        data: { news: cleanRss, source: "rss" },
      };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro desconhecido";
      this.log(`Falha na coleta: ${message}`, "error");
      return { success: false, error: message };
    }
  }
}

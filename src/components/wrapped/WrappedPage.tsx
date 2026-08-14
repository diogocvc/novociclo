"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const SECTIONS = [
  { id: "intro", label: "Início" },
  { id: "numeros", label: "NC em Números" },
  { id: "ancdnc", label: "ANC / DNC" },
  { id: "reconstrucao", label: "01 — Reconstrução" },
  { id: "jogadores", label: "02 — Jogadores" },
  { id: "fifa", label: "03 — Crise FIFA" },
  { id: "creditos", label: "Créditos" },
];

type Theme = {
  bg: string;
  card: string;
  border: string;
  fg: string;
  muted: string;
  sub: string;
  accent: string;
  accentAlt: string;
};

const T: Record<string, Theme> = {
  intro: {
    bg: "#0d1f38",
    card: "#122840",
    border: "#1a344e",
    fg: "#f0f8ff",
    muted: "#6ea8cc",
    sub: "#9dcce0",
    accent: "#ffe300",
    accentAlt: "#00a846",
  },
  numeros: {
    bg: "#0d1f38",
    card: "#122840",
    border: "#1a344e",
    fg: "#f0f8ff",
    muted: "#6ea8cc",
    sub: "#9dcce0",
    accent: "#ffe300",
    accentAlt: "#00a846",
  },
  ancdnc: {
    bg: "#ffe300",
    card: "#f5d800",
    border: "#c9ae00",
    fg: "#003d1f",
    muted: "#005a2a",
    sub: "#004822",
    accent: "#003d1f",
    accentAlt: "#003d1f",
  },
  reconstrucao: {
    bg: "#003d1f",
    card: "#00521a",
    border: "#006622",
    fg: "#f0fff4",
    muted: "#7ecfa0",
    sub: "#b0e8c0",
    accent: "#ffe300",
    accentAlt: "#a8f0c0",
  },
  jogadores: {
    bg: "#ffe300",
    card: "#f5d800",
    border: "#c9ae00",
    fg: "#003d1f",
    muted: "#005a2a",
    sub: "#004822",
    accent: "#003d1f",
    accentAlt: "#003d1f",
  },
  fifa: {
    bg: "#0d1f38",
    card: "#122840",
    border: "#1a344e",
    fg: "#f0f8ff",
    muted: "#6ea8cc",
    sub: "#9dcce0",
    accent: "#ffe300",
    accentAlt: "#00a846",
  },
  creditos: {
    bg: "#0d1f38",
    card: "#122840",
    border: "#1a344e",
    fg: "#f0f8ff",
    muted: "#6ea8cc",
    sub: "#9dcce0",
    accent: "#ffe300",
    accentAlt: "#00a846",
  },
};

type WrappedNews = {
  title: string;
  date: string;
  source: string;
  originalUrl: string;
  chapterUrl: string;
};

const news = {
  reconstrucao: [
    {
      title:
        "CBF traça objetivos da Seleção até 2030: vencer a Copa América e as Eliminatórias",
      date: "14/07/2026",
      source: "ge",
      originalUrl:
        "https://ge.globo.com/futebol/copa-do-mundo/noticia/2026/07/14/cbf-faz-balanco-de-gestao-e-define-objetivos-da-selecao-vencer-a-copa-america-e-as-eliminatorias.ghtml",
      chapterUrl: "/2026/07/14",
    },
    {
      title:
        "Carlo Ancelotti retorna ao Brasil e inicia planejamento para primeiros amistosos após a Copa",
      date: "28/07/2026",
      source: "ge",
      originalUrl:
        "https://ge.globo.com/futebol/selecao-brasileira/noticia/2026/07/28/carlo-ancelotti-retorna-ao-brasil-e-inicia-planejamento-para-primeiros-amistosos-apos-a-copa.ghtml",
      chapterUrl: "/2026/07/28",
    },
    {
      title:
        "Seleção fará amistosos em Austrália, Índia e Singapura para fechar 2026",
      date: "29/07/2026",
      source: "ge",
      originalUrl:
        "https://ge.globo.com/futebol/selecao-brasileira/noticia/2026/07/29/selecao-fara-amistosos-em-australia-india-e-singapura-para-fechar-2026-veja-programacao.ghtml",
      chapterUrl: "/2026/07/29",
    },
  ],
  jogadores: [
    {
      title: "Endrick é monitorado pela Roma",
      date: "02/08/2026",
      source: "Placar",
      originalUrl:
        "https://placar.com.br/futebol-internacional/endrick-e-monitorado-pela-roma-que-estuda-emprestimo-do-brasileiro?source=mooh&media=tv&content=geral",
      chapterUrl: "/2026/08/03",
    },
    {
      title:
        "Real Madrid muda postura, aumenta proposta e clareia cenário por renovação com Vini Jr.",
      date: "05/08/2026",
      source: "ge",
      originalUrl:
        "https://ge.globo.com/futebol/futebol-internacional/futebol-espanhol/noticia/2026/08/05/real-madrid-muda-postura-aumenta-proposta-e-clareia-cenario-por-renovacao-com-vini-ate-2031.ghtml",
      chapterUrl: "/2026/08/05",
    },
    {
      title: "Vini Jr. acerta renovação de contrato com o Real Madrid",
      date: "06/08/2026",
      source: "Placar",
      originalUrl:
        "https://placar.com.br/mercado-da-bola/se-queda-vinicius-junior-renova-com-o-real-madrid?source=mooh&media=tv&content=geral",
      chapterUrl: "/2026/08/06",
    },
  ],
  fifa: [
    {
      title: "FIFA pede desculpas após escândalo FFE",
      date: "05/08/2026",
      source: "Placar",
      originalUrl:
        "https://placar.com.br/copa-do-mundo/fifa-pede-desculpas-a-confederacoes-e-engrossa-tom-contra-ataques?source=mooh&media=tv&content=geral",
      chapterUrl: "/2026/08/05",
    },
    {
      title: "Sindicato dos jogadores pede mudanças na FIFA",
      date: "06/08/2026",
      source: "UOL Esporte",
      originalUrl:
        "https://www.uol.com.br/esporte/futebol/ultimas-noticias/2026/08/06/sindicato-dos-jogadores-pede-mudancas-na-fifa-abuso-de-poder-nao-acabou.ghtm",
      chapterUrl: "/2026/08/06",
    },
    {
      title: "UEFA, CONCACAF e AFC divulgam carta conjunta contra Infantino",
      date: "10/08/2026",
      source: "Placar",
      originalUrl:
        "https://placar.com.br/fora-de-campo/uefa-concacaf-e-afc-divulgam-carta-conjunta-contra-infantino?source=mooh&media=tv&content=geral",
      chapterUrl: "/2026/08/10",
    },
  ],
};

function chapterShort(chapterUrl: string): string {
  const [, , month, day] = chapterUrl.split("/");
  return `${day}/${month}`;
}

function NewsCard({ item, t }: { item: WrappedNews; t: Theme }) {
  return (
    <div
      className="flex items-start gap-3 p-4 transition-all duration-200"
      style={{ border: `1px solid ${t.border}`, background: t.card }}
    >
      <div
        className="w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{ background: `${t.accent}22`, border: `1px solid ${t.accent}44` }}
      >
        <svg
          className="w-3.5 h-3.5"
          style={{ color: t.accent }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm leading-snug line-clamp-2" style={{ color: t.fg }}>
          {item.title}
        </p>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-[11px]" style={{ color: t.muted }}>
            {item.date}
          </span>
          <span
            className="text-[11px] font-semibold uppercase tracking-wide"
            style={{ color: t.accent }}
          >
            · {item.source}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2">
          <a
            href={item.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-semibold uppercase tracking-wide underline underline-offset-2 transition-opacity hover:opacity-80"
            style={{ color: t.accent }}
          >
            Ler no {item.source} →
          </a>
          <Link
            href={item.chapterUrl}
            className="text-[11px] uppercase tracking-wide underline underline-offset-2 transition-opacity hover:opacity-80"
            style={{ color: t.sub }}
          >
            Capítulo {chapterShort(item.chapterUrl)} →
          </Link>
        </div>
      </div>
    </div>
  );
}

function FloatingNav({ active }: { active: string }) {
  return (
    <nav className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-3">
      {SECTIONS.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className="group relative flex items-center justify-end gap-2"
          aria-label={s.label}
        >
          <span
            className="absolute right-5 whitespace-nowrap text-[11px] font-medium px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none"
            style={{
              color: "#ffe300",
              background: "#0d1f38",
              border: "1px solid #1a344e",
            }}
          >
            {s.label}
          </span>
          <div
            className="w-2 h-2 rounded-full border transition-all duration-200"
            style={
              active === s.id
                ? {
                    background: "#ffe300",
                    borderColor: "#ffe300",
                    transform: "scale(1.3)",
                  }
                : { background: "transparent", borderColor: "#6ea8cc" }
            }
          />
        </a>
      ))}
    </nav>
  );
}

function useActiveSection() {
  const [active, setActive] = useState("intro");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.4 }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
  return active;
}

function Counter({
  to,
  decimals = 0,
  suffix = "",
  t,
}: {
  to: number;
  decimals?: number;
  suffix?: string;
  t: Theme;
}) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const step = to / 40;
        const timer = setInterval(() => {
          start += step;
          if (start >= to) {
            setVal(to);
            clearInterval(timer);
          } else setVal(start);
        }, 30);
        obs.disconnect();
      }
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);
  const formatted =
    decimals > 0
      ? val.toFixed(decimals).replace(".", ",")
      : Math.round(val).toLocaleString("pt-BR");
  return (
    <span ref={ref} style={{ color: t.accent }}>
      {formatted}
      {suffix}
    </span>
  );
}

const BUNGEE = "var(--font-bungee-shade), sans-serif";
const DISPLAY = "var(--font-barlow-condensed), sans-serif";

const TIMELINE_MARKERS = [
  { visualPct: 0, label: "05/07/2026", sub: "Eliminação na Copa", color: "#00a846", above: true },
  { visualPct: 20, label: "11/07/2026", sub: "Início do NC", color: "#ffe300", above: false },
  { visualPct: 40, label: "11/08/2026", sub: "2,5% do ciclo", color: "#00a846", above: true },
  { visualPct: 100, label: "11/06/2030", sub: "Copa de 2030", color: "#a8c4e0", above: false },
];
const FILLED_PCT = 40;

export default function WrappedPage() {
  const active = useActiveSection();
  const ti = T.intro;

  return (
    <div style={{ background: T.creditos.bg, overflowX: "hidden" }}>
      <FloatingNav active={active} />

      {/* HERO */}
      <section
        id="intro"
        className="min-h-screen flex flex-col justify-between px-6 md:px-16 py-16 relative overflow-hidden"
        style={{
          background: ti.bg,
          color: ti.fg,
          borderBottom: `1px solid ${ti.border}`,
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, ${ti.accent}22 1px, transparent 1.2px)`,
            backgroundSize: "22px 22px",
          }}
        />

        <div className="relative flex items-center justify-between">
          <Link
            href="/"
            className="text-sm uppercase hover:opacity-80 transition-opacity"
            style={{ color: ti.accent, fontFamily: BUNGEE }}
          >
            novociclo.xyz
          </Link>
          <span className="text-xs tracking-wide" style={{ color: ti.muted }}>
            11 de agosto de 2026
          </span>
        </div>

        <div className="relative flex-1 flex flex-col justify-center max-w-4xl py-10">
          <p
            className="text-xs tracking-[0.3em] uppercase mb-4"
            style={{ color: ti.muted }}
          >
            Edição 01
          </p>
          <h1
            className="text-[clamp(3rem,10vw,8rem)] leading-none uppercase"
            style={{ color: ti.accent, fontFamily: BUNGEE }}
          >
            Novo Ciclo
            <br />
            <span style={{ color: ti.fg }}>Wrapped</span>
          </h1>
          <p
            className="mt-6 text-xl md:text-2xl font-semibold italic"
            style={{ color: ti.muted, fontFamily: DISPLAY }}
          >
            30 dias não são 30 minutos!
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed" style={{ color: ti.sub }}>
            11 de agosto de 2026 marca 1 mês do novociclo.xyz. Para comemorar,
            lançamos a primeira edição do Novo Ciclo Wrapped — trazendo os
            números e destacando as notícias que marcaram o início dessa
            jornada.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mt-8 pb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs tracking-wide uppercase" style={{ color: ti.muted }}>
              Linha do tempo — 2026 → 2030
            </span>
            <span
              className="text-[10px] px-2 py-0.5"
              style={{ color: ti.muted, border: `1px solid ${ti.border}`, background: ti.card }}
            >
              escala não-linear
            </span>
          </div>
          <div className="relative h-8 mb-1">
            {TIMELINE_MARKERS.filter((m) => m.above).map((m) => (
              <div
                key={m.label}
                className="absolute flex flex-col items-center"
                style={{ left: `${m.visualPct}%`, transform: "translateX(-50%)" }}
              >
                <span className="text-[10px] font-bold whitespace-nowrap" style={{ color: m.color }}>
                  {m.label}
                </span>
                <span className="text-[9px] whitespace-nowrap" style={{ color: ti.muted }}>
                  {m.sub}
                </span>
                <div className="w-px h-2 mt-0.5" style={{ background: m.color }} />
              </div>
            ))}
          </div>
          <div className="relative w-full overflow-hidden" style={{ height: "48px", background: ti.border }}>
            <div
              className="absolute top-0 bottom-0 flex items-center justify-center z-10"
              style={{ left: "39%", width: "2%" }}
            >
              <div className="w-full h-full" style={{ background: ti.bg }} />
              <span className="absolute text-[9px] font-bold" style={{ color: ti.muted, letterSpacing: "-1px" }}>
                {"//"}
              </span>
            </div>
            <div
              className="absolute left-0 top-0 h-full"
              style={{
                width: `${FILLED_PCT}%`,
                background: `linear-gradient(to right, ${ti.accentAlt}, ${ti.accent})`,
              }}
            />
            {TIMELINE_MARKERS.map((m) => (
              <div
                key={m.label}
                className="absolute top-1/2 w-4 h-4 rounded-full border-2"
                style={{
                  left: `${m.visualPct}%`,
                  transform: "translateX(-50%) translateY(-50%)",
                  background: m.color,
                  borderColor: ti.bg,
                }}
              />
            ))}
          </div>
          <div className="relative h-8 mt-1">
            {TIMELINE_MARKERS.filter((m) => !m.above).map((m) => (
              <div
                key={m.label}
                className="absolute flex flex-col items-center"
                style={{ left: `${m.visualPct}%`, transform: "translateX(-50%)" }}
              >
                <div className="w-px h-2 mb-0.5" style={{ background: m.color }} />
                <span className="text-[10px] font-bold whitespace-nowrap" style={{ color: m.color }}>
                  {m.label}
                </span>
                <span className="text-[9px] whitespace-nowrap" style={{ color: ti.muted }}>
                  {m.sub}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NÚMEROS */}
      {(() => {
        const t = T.numeros;
        return (
          <section
            id="numeros"
            className="min-h-screen flex flex-col justify-center px-6 md:px-16 py-16 relative overflow-hidden"
            style={{ background: t.bg, color: t.fg, borderBottom: `1px solid ${t.border}` }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(circle, ${t.accent}12 1px, transparent 1.2px)`,
                backgroundSize: "30px 30px",
              }}
            />
            <div className="relative max-w-5xl mx-auto w-full">
              <p className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: t.muted }}>
                Dados
              </p>
              <h2
                className="text-[clamp(3rem,8vw,6rem)] font-black uppercase leading-none mb-12"
                style={{ color: t.fg, fontFamily: DISPLAY }}
              >
                <span style={{ fontFamily: BUNGEE, color: t.accent }}>NC</span> em{" "}
                <span style={{ color: t.accent }}>Números</span>
              </h2>
              <div
                className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0"
                style={{ borderColor: t.border, border: `1px solid ${t.border}` }}
              >
                {[
                  { n: 33, decimals: 0, suffix: "", label: "Dias de NC" },
                  { n: 148, decimals: 0, suffix: "", label: "Notícias" },
                  { n: 3.55, decimals: 2, suffix: "", label: "Refs/dia (média)" },
                  { n: 19, decimals: 0, suffix: "", label: "Países" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="p-6 md:p-8 flex flex-col justify-between"
                    style={{ background: t.bg, borderColor: t.border }}
                  >
                    <div
                      className="text-[clamp(2.5rem,6vw,4rem)] font-black leading-none"
                      style={{ fontFamily: DISPLAY }}
                    >
                      <Counter to={s.n} decimals={s.decimals} suffix={s.suffix} t={t} />
                    </div>
                    <div className="text-[11px] uppercase tracking-widest mt-3" style={{ color: t.muted }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
              <div
                className="grid grid-cols-1 md:grid-cols-3 mt-px"
                style={{ border: `1px solid ${t.border}`, borderTop: "none" }}
              >
                <div className="p-6" style={{ background: t.card, borderRight: `1px solid ${t.border}` }}>
                  <div className="text-[11px] tracking-widest uppercase mb-4" style={{ color: t.muted }}>
                    Datas
                  </div>
                  {[
                    ["Primeira data", "05/07/2026"],
                    ["1ª publicação", "11/07/2026"],
                    ["Posts ANC", "6"],
                    ["Posts DNC", "27"],
                  ].map(([l, v]) => (
                    <div
                      key={l}
                      className="flex justify-between py-2.5"
                      style={{ borderBottom: `1px solid ${t.border}` }}
                    >
                      <span className="text-xs" style={{ color: t.muted }}>
                        {l}
                      </span>
                      <span className="text-sm font-bold" style={{ color: t.fg, fontFamily: DISPLAY }}>
                        {v}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="p-6 col-span-2" style={{ background: t.card }}>
                  <div className="text-[11px] tracking-widest uppercase mb-4" style={{ color: t.muted }}>
                    Países com acessos
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Estados Unidos",
                      "Brasil",
                      "Alemanha",
                      "Polônia",
                      "Holanda",
                      "Canadá",
                      "Índia",
                      "China",
                      "Dinamarca",
                      "França",
                      "Irlanda",
                      "Malta",
                      "Noruega",
                      "Romênia",
                      "Coreia do Sul",
                      "Suécia",
                      "Síria",
                      "Taiwan",
                      "Reino Unido",
                    ].map((c) => (
                      <span
                        key={c}
                        className="text-xs px-2.5 py-1"
                        style={{ border: `1px solid ${t.border}`, background: t.bg, color: t.sub }}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })()}

      {/* ANC / DNC */}
      {(() => {
        const t = T.ancdnc;
        return (
          <section
            id="ancdnc"
            className="min-h-screen flex flex-col justify-center px-6 md:px-16 py-16 relative overflow-hidden"
            style={{ background: t.bg, color: t.fg, borderBottom: `1px solid ${t.border}` }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(circle, ${t.accent}30 1.5px, transparent 1.7px)`,
                backgroundSize: "18px 18px",
              }}
            />
            <div className="relative max-w-5xl mx-auto w-full">
              <p className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: t.sub }}>
                Contexto
              </p>
              <h2
                className="text-[clamp(3rem,8vw,6rem)] font-black uppercase leading-none mb-16"
                style={{ color: t.fg, fontFamily: DISPLAY }}
              >
                <span style={{ fontFamily: BUNGEE }}>ANC</span> ×{" "}
                <span style={{ fontFamily: BUNGEE }}>DNC</span>
              </h2>
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-px"
                style={{ background: t.border, border: `1px solid ${t.border}` }}
              >
                {[
                  {
                    key: "ANC",
                    label: "Antes do Novo Ciclo",
                    n: "6",
                    desc: "Entre a eliminação em 05/07/2026 e o lançamento do NC em 11/07/2026, seis publicações cobriram os primeiros dias do luto e da reação imediata.",
                    bg: t.card,
                  },
                  {
                    key: "DNC",
                    label: "Depois do Novo Ciclo",
                    n: "27",
                    desc: "A partir de 11/07/2026, o foco mudou: planejamento, mercado e novas narrativas rumo ao Mundial de 2030.",
                    bg: t.bg,
                  },
                ].map((p) => (
                  <div
                    key={p.key}
                    className="p-8 md:p-12 relative overflow-hidden"
                    style={{ background: p.bg }}
                  >
                    <div
                      className="absolute top-4 right-4 text-[7rem] leading-none select-none opacity-20"
                      style={{ color: t.accent, fontFamily: BUNGEE }}
                      aria-hidden
                    >
                      {p.key}
                    </div>
                    <div className="text-xs tracking-widest uppercase mb-4 font-semibold" style={{ color: t.accentAlt }}>
                      {p.label}
                    </div>
                    <div
                      className="text-[clamp(4rem,9vw,6rem)] font-black leading-none"
                      style={{ color: t.fg, fontFamily: DISPLAY }}
                    >
                      {p.n}
                    </div>
                    <div className="text-sm mt-1 mb-4" style={{ color: t.sub }}>
                      posts publicados
                    </div>
                    <p className="text-sm leading-relaxed max-w-sm" style={{ color: t.sub }}>
                      {p.desc}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4 mt-10">
                <div className="flex-1 h-px" style={{ background: t.border }} />
                <span className="text-xs tracking-widest uppercase" style={{ color: t.sub }}>
                  As três histórias do DNC
                </span>
                <div className="flex-1 h-px" style={{ background: t.border }} />
              </div>
            </div>
          </section>
        );
      })()}

      {/* DNC 01 — Reconstrução */}
      {(() => {
        const t = T.reconstrucao;
        return (
          <section
            id="reconstrucao"
            className="min-h-screen flex flex-col justify-center px-6 md:px-16 py-16 relative overflow-hidden"
            style={{ background: t.bg, color: t.fg, borderBottom: `1px solid ${t.border}` }}
          >
            <div
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage: `radial-gradient(circle, ${t.accentAlt} 1px, transparent 1.2px)`,
                backgroundSize: "24px 24px",
              }}
            />
            <div className="relative max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="text-xs px-3 py-1.5 tracking-widest uppercase"
                    style={{ border: `1px solid ${t.accent}`, color: t.accent, fontFamily: BUNGEE }}
                  >
                    DNC — 01
                  </span>
                </div>
                <p className="text-lg font-bold uppercase tracking-wider mb-2" style={{ color: t.accentAlt, fontFamily: DISPLAY }}>
                  A Reconstrução
                </p>
                <h2
                  className="text-[clamp(2.5rem,6vw,4.5rem)] font-black uppercase leading-none mb-4"
                  style={{ color: t.fg, fontFamily: DISPLAY }}
                >
                  O novo ciclo
                  <br />
                  ganhou um rosto
                </h2>
                <h3 className="text-lg font-semibold mb-3 leading-snug" style={{ color: t.accent, fontFamily: DISPLAY }}>
                  Carlo Ancelotti: O homem escolhido para começar de novo.
                </h3>
                <div
                  className="relative aspect-square overflow-hidden md:hidden mb-8"
                  style={{ background: t.card }}
                >
                  <Image
                    src="/wrapped/ancelotti.jpg"
                    alt="Carlo Ancelotti com escudo da CBF ao fundo"
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(to top, ${t.bg}cc, transparent 60%)` }}
                  />
                </div>
                <p className="text-sm leading-relaxed mb-8 max-w-sm" style={{ color: t.sub }}>
                  Entre planejamento, amistosos e novas convocações, Ancelotti foi
                  uma das primeiras figuras a definir a narrativa do novo ciclo.
                </p>
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {[
                    { val: "12/27", label: "Posts relacionados" },
                    { val: "60×", label: '"Ancelotti" nas notícias' },
                    { val: "CBF", label: "Principal organização" },
                    { val: "Jul", label: "Maior intensidade" },
                  ].map((s) => (
                    <div key={s.label} className="p-3 pl-4" style={{ borderLeft: `3px solid ${t.accent}`, background: t.card }}>
                      <div className="text-xl font-black" style={{ color: t.accent, fontFamily: BUNGEE }}>
                        {s.val}
                      </div>
                      <div className="text-[10px] uppercase tracking-wide mt-0.5" style={{ color: t.muted }}>
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-2">
                  {news.reconstrucao.map((n) => (
                    <NewsCard key={n.title} item={n} t={t} />
                  ))}
                </div>
              </div>
              <div className="hidden md:block relative aspect-square md:aspect-auto md:h-[70vh] overflow-hidden" style={{ background: t.card }}>
                <Image
                  src="/wrapped/ancelotti.jpg"
                  alt="Carlo Ancelotti com escudo da CBF ao fundo"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: `linear-gradient(to top, ${t.bg}cc, transparent 60%)` }}
                />
              </div>
            </div>
          </section>
        );
      })()}

      {/* DNC 02 — Jogadores */}
      {(() => {
        const t = T.jogadores;
        return (
          <section
            id="jogadores"
            className="min-h-screen flex flex-col justify-center px-6 md:px-16 py-16 relative overflow-hidden"
            style={{ background: t.bg, color: t.fg, borderBottom: `1px solid ${t.border}` }}
          >
            <div
              className="absolute top-0 right-0 w-96 h-96 pointer-events-none opacity-10 rounded-full"
              style={{
                background: `radial-gradient(circle, ${t.accent} 0%, transparent 70%)`,
                transform: "translate(30%, -30%)",
              }}
            />
            <div className="relative max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div
                className="hidden md:block relative aspect-square md:aspect-auto md:h-[70vh] overflow-hidden"
                style={{ background: t.card }}
              >
                <Image
                  src="/wrapped/jogadores.jpg"
                  alt="Vini Jr. e Endrick com a camisa da Seleção"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: `linear-gradient(to top, ${t.bg}cc, transparent 60%)` }}
                />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="text-xs px-3 py-1.5 tracking-widest uppercase"
                    style={{ border: `1px solid ${t.accent}`, color: t.accent, fontFamily: BUNGEE }}
                  >
                    DNC — 02
                  </span>
                </div>
                <p className="text-lg font-bold uppercase tracking-wider mb-2" style={{ color: t.accentAlt, fontFamily: DISPLAY }}>
                  O Futuro dos Jogadores
                </p>
                <h2
                  className="text-[clamp(2.5rem,6vw,4.5rem)] font-black uppercase leading-none mb-4"
                  style={{ color: t.fg, fontFamily: DISPLAY }}
                >
                  Depois da Copa,
                  <br />
                  começou outra
                  <br />
                  disputa
                </h2>
                <p className="text-sm leading-relaxed mb-6 max-w-sm" style={{ color: t.sub }}>
                  O caminho até 2030 também passa pelo mercado.{" "}
                  <strong style={{ color: t.fg }}>45 notícias</strong>{" "}
                  movimentaram o universo das transferências.
                </p>
                <div
                  className="relative aspect-square overflow-hidden md:hidden mb-8"
                  style={{ background: t.card }}
                >
                  <Image
                    src="/wrapped/jogadores.jpg"
                    alt="Vini Jr. e Endrick com a camisa da Seleção"
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(to top, ${t.bg}cc, transparent 60%)` }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-6 mb-8">
                  {[
                    {
                      heading: "Jogadores",
                      items: ["Endrick", "Vini Jr.", "Fabinho", "Bruno Guimarães", "Mourinho"],
                      dot: t.accent,
                    },
                    {
                      heading: "Clubes",
                      items: [
                        "Real Madrid",
                        "Roma",
                        "Arsenal",
                        "Aston Villa",
                        "Liverpool",
                        "Al-Ittihad",
                        "Galatasaray",
                        "Lyon",
                      ],
                      dot: t.accentAlt,
                    },
                  ].map((col) => (
                    <div key={col.heading}>
                      <div className="text-[11px] uppercase tracking-widest mb-3" style={{ color: t.muted }}>
                        {col.heading}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {col.items.map((item) => (
                          <span
                            key={item}
                            className="text-[11px] px-2 py-1"
                            style={{ background: t.card, border: `1px solid ${t.border}`, color: t.fg }}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-2">
                  {news.jogadores.map((n) => (
                    <NewsCard key={n.title} item={n} t={t} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      })()}

      {/* DNC 03 — Crise FIFA */}
      {(() => {
        const t = T.fifa;
        return (
          <section
            id="fifa"
            className="min-h-screen flex flex-col justify-center px-6 md:px-16 py-16 relative overflow-hidden"
            style={{ background: t.bg, color: t.fg, borderBottom: `1px solid ${t.border}` }}
          >
            <div
              className="absolute inset-0 pointer-events-none opacity-10"
              style={{
                backgroundImage: `radial-gradient(circle, ${t.fg} 1px, transparent 1.2px)`,
                backgroundSize: "20px 20px",
              }}
            />
            <div className="relative max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="text-xs px-3 py-1.5 tracking-widest uppercase"
                    style={{ border: `1px solid ${t.fg}`, color: t.fg, fontFamily: BUNGEE, background: `${t.fg}18` }}
                  >
                    DNC — 03
                  </span>
                </div>
                <p className="text-lg font-bold uppercase tracking-wider mb-2" style={{ color: t.sub, fontFamily: DISPLAY }}>
                  Crise na FIFA
                </p>
                <h2
                  className="text-[clamp(2.5rem,6vw,4.5rem)] font-black uppercase leading-none mb-4"
                  style={{ color: t.fg, fontFamily: DISPLAY }}
                >
                  O legado
                  <br />
                  da Copa
                </h2>
                <h3 className="text-lg font-semibold mb-3 leading-snug" style={{ color: t.muted, fontFamily: DISPLAY }}>
                  Gianni Infantino: Durante a Copa, era notícia. Agora, virou alvo.
                </h3>
                <div
                  className="relative aspect-square overflow-hidden md:hidden mb-8"
                  style={{ background: t.card }}
                >
                  <Image
                    src="/wrapped/infantino.jpg"
                    alt="Gianni Infantino, presidente da FIFA"
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(to top, ${t.bg}cc, transparent 60%)` }}
                  />
                </div>
                <p className="text-sm leading-relaxed mb-8 max-w-sm" style={{ color: t.sub }}>
                  Conforme a Copa ficava para trás, as atenções se voltaram para
                  as consequências institucionais — e para os conflitos que a
                  gestão da FIFA deixou acesos.
                </p>
                <div className="space-y-2 mb-8">
                  {[
                    { val: "10/27", label: "Posts relacionados", w: "37%" },
                    { val: "42", label: "Notícias sobre o tema", w: "55%" },
                    { val: "03/08", label: "Pico de intensidade", w: "70%" },
                  ].map((s) => (
                    <div key={s.label} className="p-3" style={{ background: t.card, border: `1px solid ${t.border}` }}>
                      <div className="flex justify-between items-baseline mb-1.5">
                        <span className="text-[11px] uppercase tracking-wide" style={{ color: t.muted }}>
                          {s.label}
                        </span>
                        <span className="text-base font-black" style={{ color: t.fg, fontFamily: BUNGEE }}>
                          {s.val}
                        </span>
                      </div>
                      <div className="h-1" style={{ background: `${t.fg}20` }}>
                        <div className="h-full" style={{ width: s.w, background: t.fg }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-2">
                  {news.fifa.map((n) => (
                    <NewsCard key={n.title} item={n} t={t} />
                  ))}
                </div>
              </div>
              <div className="hidden md:block relative aspect-square md:aspect-auto md:h-[70vh] overflow-hidden" style={{ background: t.card }}>
                <Image
                  src="/wrapped/infantino.jpg"
                  alt="Gianni Infantino, presidente da FIFA"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: `linear-gradient(to top, ${t.bg}cc, transparent 60%)` }}
                />
              </div>
            </div>
          </section>
        );
      })()}

      {/* CRÉDITOS */}
      {(() => {
        const t = T.creditos;
        return (
          <section
            id="creditos"
            className="min-h-screen flex flex-col justify-center items-center px-6 md:px-16 py-16 relative overflow-hidden text-center"
            style={{ background: t.bg, color: t.fg }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(circle, ${t.accent}18 1px, transparent 1.2px)`,
                backgroundSize: "22px 22px",
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 70% 50% at 50% 50%, ${t.accentAlt}14 0%, transparent 70%)`,
              }}
            />

            <div className="relative max-w-3xl mx-auto w-full">
              <div className="inline-block px-4 py-1.5 mb-6" style={{ border: `1px solid ${t.accent}50`, background: `${t.accent}0d` }}>
                <span className="text-xs tracking-widest uppercase" style={{ color: t.accent, fontFamily: BUNGEE }}>
                  Créditos
                </span>
              </div>

              <p className="text-sm mb-4" style={{ color: t.muted }}>
                Este relatório é uma parceria
              </p>

              <h2
                className="text-[clamp(2.5rem,7vw,5rem)] font-black uppercase leading-none mb-12"
                style={{ color: t.fg, fontFamily: DISPLAY }}
              >
                Humano
                <br />
                <span style={{ color: t.accent }}>×</span>
                <br />
                Máquina
              </h2>

              <div style={{ border: `1px solid ${t.border}`, background: t.card }}>
                {[
                  { role: "Direção de Arte", name: "Diogo Carvalho" },
                  { role: "Design", name: "Diogo Carvalho" },
                  { role: "Editoria", name: "Diogo Carvalho" },
                  { role: "Desenvolvimento", name: "Opencode + DeepSeek" },
                  { role: "Análise de dados", name: "Opencode + DeepSeek" },
                ].map((c, i) => (
                  <div
                    key={c.role}
                    className="flex justify-between items-center gap-6 px-6 py-4"
                    style={{ borderBottom: i < 4 ? `1px solid ${t.border}` : undefined }}
                  >
                    <span className="text-xs uppercase tracking-widest shrink-0" style={{ color: t.muted }}>
                      {c.role}
                    </span>
                    <span
                      className="text-sm font-semibold shrink-0 text-right"
                      style={{ color: t.fg, fontFamily: DISPLAY, letterSpacing: "0.05em" }}
                    >
                      {c.name}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-8" style={{ borderTop: `1px solid ${t.border}` }}>
                <Link
                  href="/"
                  className="text-3xl uppercase hover:opacity-80 transition-opacity"
                  style={{ color: t.accent, fontFamily: BUNGEE }}
                >
                  novociclo.xyz
                </Link>
                <p className="text-xs mt-2" style={{ color: t.border }}>
                  Edição 01 · Agosto 2026
                </p>
              </div>
            </div>
          </section>
        );
      })()}
    </div>
  );
}
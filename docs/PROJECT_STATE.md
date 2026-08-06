---
title: PROJECT_STATE.md

---

# PROJECT_STATE.md

# Estado Atual do Projeto

## Objetivo

Este documento representa o estado oficial do desenvolvimento do Novo Ciclo.

Seu propósito é fornecer uma visão rápida e precisa do andamento do projeto, permitindo que qualquer colaborador ou agente de IA retome o trabalho sem depender do histórico de conversas.

Sempre que uma tarefa relevante for concluída ou iniciada, este documento deve ser atualizado.

---

# Informações Gerais

**Projeto:** Novo Ciclo

**Versão:** 0.2.0

**Status Geral:** Em Desenvolvimento

**Última atualização:** 06/08/2026 (capítulo 05/08 limpo de 4 notícias off-context; Neymar tratado como ex-jogador da Seleção; listas/rankings como veto absoluto; ADR-011 no DECISIONS.md)

---

# Resumo Executivo

A documentação estrutural do projeto foi concluída e o desenvolvimento do código foi iniciado.

O projeto Next.js + TypeScript + Tailwind v4 está configurado e compilando. A estrutura de diretórios, tipos compartilhados, configurações base, design system e componentes principais de layout foram implementados.

O sistema de conteúdo em MDX está funcional, os scripts de automação estão criados, e a arquitetura dos 8 agentes editoriais está estabelecida com implementações base.

O deploy está no ar via Vercel. O projeto está apto para receber conteúdo real e iniciar a integração com APIs de IA.

---

# Fase Atual

## Desenvolvimento — Fase 1

Status:

🔵 Em andamento

Objetivo:

Implementar a base do projeto: setup, componentes, conteúdo, scripts e agentes.

---

# Progresso Geral

| Área                    | Status          |
| ----------------------- | --------------- |
| Visão do Produto        | ✅ Concluído     |
| PRD                     | ✅ Concluído     |
| Arquitetura do Sistema  | ✅ Concluído     |
| Arquitetura dos Agentes | ✅ Concluído     |
| Modelo de Dados         | ✅ Concluído     |
| Estrutura do Projeto    | ✅ Concluído     |
| Manifesto               | ✅ Concluído     |
| Registro de Decisões    | ✅ Concluído     |
| Estado do Projeto       | ✅ Concluído     |
| Guia Editorial          | ✅ Concluído     |
| Prompts                 | ✅ Concluído     |
| UI                      | ✅ Concluído     |
| Design System           | ✅ Concluído     |
| Automação               | ✅ Concluído     |
| Deploy                  | ✅ Concluído     |
| **Setup Next.js**       | ✅ Concluído     |
| **Componentes Layout**  | ✅ Concluído     |
| **Página Home**         | ✅ Concluído     |
| **Página Capítulo**     | ✅ Concluído     |
| **Páginas Estáticas**   | ✅ Concluído     |
| **Sistema MDX**         | ✅ Concluído     |
| **Scripts Automação**   | ✅ Concluído     |
| **Agentes (base)**      | ✅ Concluído     |
| **Pipeline Diário**     | ✅ Concluído     |
| **Deploy Vercel**       | ✅ Concluído     |
| **LLM (Groq)**          | ✅ Concluído     |
| **Pipeline End-to-End** | ✅ Concluído     |
| **Testes**              | ✅ Concluído     |
| **Refinamento Prompts** | ✅ Concluído     |
| **News no Frontmatter** | ✅ Concluído     |
| **Thumbnails RSS**      | ✅ Concluído     |
| **NoNewsToday**         | ✅ Concluído     |
| **CI/CD Pipeline**      | ✅ Concluído     |
| **Cooldown LLM**        | ✅ Concluído     |
| **Blocklist Notícias**  | ✅ Concluído     |
| **Google Analytics**    | ✅ Concluído     |
| **Lint Zero**           | ✅ Concluído     |
| **Novas Fontes de Notícias** | ✅ Concluído |
| **Correção URL do Site** | ✅ Concluído |
| **Filtro de Relevância em Camadas** | ✅ Concluído |
| **Blocklist Off-Context 03/08** | ✅ Concluído |
| **Limpeza de Conteúdo Off-Context** | ✅ Concluído |
| **Consistência Foco no Jogador** | ✅ Concluído |
| **Resumo do Dia 03/08** | ✅ Concluído |
| **Limpeza Off-Context 04/08** | ✅ Concluído |
| **Filtro de Relevância 04/08 (ADR-010)** | ✅ Concluído |
| **Limpeza Off-Context 05/08** | ✅ Concluído |
| **Neymar como Ex-Jogador + Listas/Rankings (ADR-011)** | ✅ Concluído |

---

# Estrutura do Projeto

```
novo-ciclo/
├── app/                    → Next.js App Router
│   ├── page.tsx            → Home (último capítulo)
│   ├── sobre/              → Sobre o projeto
│   ├── creditos/           → Créditos
│   ├── contato/            → Contato
│   └── [ano]/[mes]/[dia]/  → Capítulo individual
├── components/
│   ├── layout/             → Header, Footer, CountdownBanner
│   ├── home/               → WeeklyNavigation, WeekArchive
│   └── chapter/            → ChapterContent, NewsCard
├── content/                → Capítulos em MDX
│   └── 2026/07/            → 05-15.mdx
├── config/                 → cycle.ts, sources.ts, categories.ts
├── lib/                    → date.ts, countdown.ts, reading-time.ts, content.ts, rss.ts
├── types/                  → index.ts (News, Event, Chapter, Source, Category)
├── data/                   → mock-chapters.ts, mock-news.ts
├── agents/                 → 8 agentes editoriais
│   ├── base.ts
│   ├── researcher/
│   ├── curator/
│   ├── editor/
│   ├── writer/
│   ├── reviewer/
│   ├── publisher/
│   ├── newsletter/
│   └── seo/
├── automation/             → daily-pipeline.ts
├── scripts/                → create-post, import-rss, generate-sitemap, backup, cleanup-chapters, backfill-news, fetch-thumbnails, block-news
├── .github/workflows/      → test.yml, daily.yml
└── vercel.json
```

---

# Backlog Imediato

## Concluído na Última Iteração

* ✅ Setup Next.js 16 + TypeScript + Tailwind v4
* ✅ Estrutura de diretórios
* ✅ Tipos compartilhados (types/)
* ✅ Configurações base (config/cycle.ts, config/sources.ts, config/categories.ts)
* ✅ Utilitários (date, countdown, reading-time)
* ✅ Design system (tokens CSS no globals.css)
* ✅ Componentes de layout (Header, Footer, CountdownBanner)
* ✅ Componentes da home (WeeklyNavigation, WeekArchive)
* ✅ Página principal com duas colunas
* ✅ Página de capítulo individual /[ano]/[mes]/[dia]
* ✅ Sistema de conteúdo MDX (content/ + lib/content.ts)
* ✅ Scripts de automação (create-post, import-rss, sitemap, check-links, backup)
* ✅ Arquitetura dos 8 agentes editoriais (base + implementações)
* ✅ Pipeline diário orquestrado (automation/daily-pipeline.ts)
* ✅ GitHub Actions (test.yml, deploy.yml, daily.yml)
* ✅ Configuração Vercel
* ✅ Deploy publicado em novociclo-red.vercel.app (o domínio novociclo.vercel.app passou a servir outro app)
* ✅ Testes automatizados (91 testes em 21 arquivos)
* ✅ RSS parser real (src/lib/rss.ts com fast-xml-parser)
* ✅ Pipeline end-to-end rodou com RSS real e backoff exponencial
* ✅ Refinamento de prompts e docs dos agentes
* ✅ News no frontmatter (Publisher escreve noticia_destaque/noticias_referencia via js-yaml)
* ✅ Thumbnails extraídos do RSS (105/115 artigos via media:content + fallback HTML)
* ✅ NoNewsToday para capítulos históricos (mensagem "não houve notícias neste dia" + link para último capítulo com notícias)
* ✅ GitHub Actions daily.yml com `contents: write` (deploy.yml removido — substituído por Vercel Git Integration)
* ✅ Capítulos 05-15 regenerados com thumbnails reais do RSS
* ✅ Matriz de relevância por grupos (6 grupos positivos + exclusões por modalidade/outras seleções)
* ✅ Filtro por data no Researcher (notícias até 3 dias antes da data alvo)
* ✅ Validação pós-LLM com o mesmo filtro de relevância
* ✅ Título do capítulo reduzido ~30% + break-words + ajuste layout da notícia em destaque
* ✅ Script cleanup-chapters para re-aplicar filtro em capítulos existentes
* ✅ Backfill dos capítulos 05-13 com notícias reais por data (web search real ge.globo.com, UOL, Folha, BBC, Estadão, Exame)
* ✅ Capítulos 07, 08, 09, 10, 13 criados (estavam faltando) com narrativas baseadas em notícias reais
* ✅ Script backfill-news.ts com dados estruturados de +20 artigos reais
* ✅ Páginas estáticas /sobre, /creditos, /contato (manifesto removido)
* ✅ Header: componente client-side com navegação desktop + overlay mobile
* ✅ Footer com links para páginas estáticas
* ✅ Citação do Ancelotti exibida na home (sem fundo branco, centralizada)
* ✅ Cooldown de 65s entre chamadas LLM + retry inteligente para 429 (rate limit Groq resolvido)
* ✅ js-yaml como dependência direta (era transitiva)
* ✅ Google Analytics via next/script (NEXT_PUBLIC_GA_ID)
* ✅ Blocklist persistente (news-blocklist.json) para bloqueio manual de falsos positivos
* ✅ Script `scripts:block-news` para adicionar URLs/keywords ao blocklist
* ✅ Researcher ignora itens bloqueados e busca próximos do RSS
* ✅ Lint zerado (8 erros corrigidos: unescaped entities, setState em effect, unused imports/vars)
* ✅ Testes e typecheck passando (91 testes, 0 erros)
* ✅ Removido capítulo 02/08 (inteiramente off-topic: transferência de Rodri Real Madrid/Manchester City, notícia UOL); arquivo `content/2026/08/02.mdx` apagado e URL adicionada à blocklist de notícias
* ✅ URL do site corrigida para `novociclo-red.vercel.app` em sitemap, RSS, código (seo/newsletter/sitemap), workflow diário, `.env.example` e testes (era novociclo.vercel.app)
* ✅ Novas fontes de notícias adicionadas em `src/config/sources.ts`: **Placar** (RSS `placar.com.br/rss.xml`) e **Band Esportes** (RSS `rss.bs.vibra.digital/feed.xml?site=esportes`)
* ✅ Lance! e TNT Sports adicionadas como `tipo: "site"` (não possuem RSS público; decisão: manter padrão das demais fontes site)
* ✅ Página de créditos atualizada com as novas fontes (CNN Brasil, Lance!, TNT Sports, Placar e Band Esportes)
* ✅ Decisão registrada: fontes sem RSS público (Lance, TNT, ESPN, CBF, FIFA, CNN) permanecem como `tipo: "site"` — o pipeline (Researcher) só coleta fontes com `rss` definido; site são placeholders de referência na página de créditos
* ✅ Filtro de relevância do Researcher reestruturado em camadas (5 notícias off-context de 03/08 removidas e bloqueadas):
  * **Sinais fortes** (seleção brasileira, eliminatórias, convocação/convocações, copa 2030, CBF, Ancelotti) ⇒ inclui direto
  * **Sujeito no título** (manchete começa com jogador da Seleção, ex.: "Endrick é monitorado pela Roma") ⇒ mantém (foco no jogador)
  * **Veto off-context** (clube estrangeiro, posicionamento secundário — "concorrente de", "disputar vaga com" — e URL `/futebol-internacional/` sem contexto forte) ⇒ exclui quando não há contexto forte
  * **Ex-jogador/saúde** ("estado de saúde", "ex-jogador", "aposentado") ⇒ exclui mesmo com contexto forte (caso Kléberson)
  * **Falsos positivos corrigidos**: matching de clubes brasileiros por fronteira de palavra (evita "vitória" dentro de "vitórias"); exclusão por keywords limitada ao título + primeiros 200 caracteres do resumo com HTML removido (evita derrubar notícia on-topic que apenas menciona outra competição no corpo); Ancelotti e "convocações" agora contam como contexto forte
* ✅ 5 URLs off-context de 03/08 adicionadas ao `news-blocklist.json` (Kléberson/saúde, Vozinha/Marrocos, Cucurella/medalha, Carlos Espí vs Endrick, Real Madrid vende concorrente de Endrick)
* ✅ `cleanup-chapters` reaplicado: capítulos 16, 17, 18, 19, 20, 23 e 29 de julho limpos de conteúdo de outras seleções na Copa 2026 (Ferran Torres, Cucurella, Messi, Enzo Fernandez, Iniesta, Copa 2026 records etc.)
* ✅ Testes de regressão adicionados em `src/tests/agents/researcher.test.ts` (5 casos off-context excluídos, Endrick/Roma mantido, contexto forte mantido em URL `/futebol-internacional/`)
* ✅ Ajuste de consistência: jogador atual da Seleção como **foco** mantém notícia de clube estrangeiro (Vini Jr. → Arsenal/Real Madrid, Endrick → Roma); veto de clube/URL internacional só derruba quando o jogador é secundário ("concorrente de", "disputar vaga com") — padrão cego `/futebol/futebol-internacional/` do ge removido
* ✅ Capítulo 03/08 restaurado e re-limpo: 5 off-context removidos, Vini Jr. e Endrick mantidos; `resumo` do dia e parágrafo do corpo reescritos (removida menção ao Kléberson)
* ✅ Capítulo 04/08 limpo de 5 notícias off-context (Filho de Neymar, Neymar/lista de goleiros, Roberto Carlos/ídolos na infância, Fifa/Copa do Mundo Feminina e Goleiro da Noruega/RB Leipzig); destaque promovido para "Infantino marca reunião..." e `resumo`/corpo reescritos (DE-6)
* ✅ 5 URLs de 04/08 adicionadas ao `news-blocklist.json` (URL da Placar sem query string para casar qualquer variante)
* ✅ Filtro do Researcher ampliado (ADR-010):
  * **Veto outras competições da Fifa** — keywords `copa do mundo feminina`, `copa feminina`, `mundial feminino`, `copa das nações` + URL `/feminina/`, `/copa-do-mundo-feminina/`, `/futebol-feminino/` (corrige Fifa/Copa Feminina)
  * **Veto família/entretenimento** — título iniciando com parentesco (`filho de`, `esposa de`, `irmão de`, `mãe de`…) + jogador da Seleção ⇒ exclui; URL `/entretenimento/` bloqueada (corrige Filho de Neymar)
  * **Veto listas históricas/opinião** — `lista de maiores goleiros da história`, `maiores jogadores da história` etc. ⇒ exclui (corrige Neymar/lista)
  * **Veto ex-jogadores/legado** — título iniciando com ex-jogador (Roberto Carlos, Ronaldo, Ronaldinho, Kaká, Pelé, Zico, Sócrates…) ou nostalgia (`torciam`, `quando crianças`, `time do coração`) ⇒ exclui (corrige Roberto Carlos)
  * **Sujeito em oração relativa** — jogador após `que …` no título deixa de ser "foco" ("goleiro da Noruega que discutiu com Neymar" excluído; "Arteta conversou com Vini Jr." e "Endrick é monitorado pela Roma" mantidos)
* ✅ Testes de regressão: 5 casos de 04/08 excluídos (96 testes no total, lint e typecheck limpos)
* ✅ Capítulo 05/08 limpo de 4 notícias off-context (Polêmicas de Neymar, Comportamento de Neymar na imprensa europeia, Beijo para torcedora/xingamentos contra o Remo e Luiz Henrique no Flamengo/ranking dos mais caros); destaque e demais notícias mantidos; `resumo`/`corpo` já não citavam as removidas
* ✅ 4 URLs de 05/08 adicionadas ao `news-blocklist.json` (URL da Placar sem query string para casar qualquer variante)
* ✅ Filtro do Researcher refinado (ADR-011):
  * **Neymar tratado como ex-jogador** — removido do grupo SELEÇÃO e de `SELEÇÃO_NAMES`, movido para `FORMER_PLAYERS` (Neymar se aposentou da Seleção após a Copa 2026)
  * **Veto de ex-jogador sem relação direta** — título cita ex-jogador e não tem contexto direto da Seleção (frase forte ou jogador atual Vini/Endrick/Rodrygo) ⇒ exclui; menção incidental de "seleção brasileira" no resumo não resgata (corrige as 3 polêmicas de Neymar; "Neymar é convocado" mantido)
  * **Listas/rankings como veto absoluto** — `ranking dos jogadores mais caros`, `jogadores mais caros`, `veja o ranking` ampliam `ALL_TIME_LIST_PHRASES` e o veto passa a rodar **antes** de `hasStrongSelecaoContext` (corrige Luiz Henrique/Flamengo)
* ✅ Testes de regressão: 4 casos de 05/08 excluídos, "Neymar é convocado" e "Vini Jr. renova" mantidos (97 testes no total, lint e typecheck limpos)
* ✅ Deploy re-disparado: o webhook do Vercel não disparou no push do fix de 05/08 (efd9b99); commit de re-trigger necessário para publicar o capítulo limpo

## Decisões editoriais (06/08/2026)

Regras de escopo/relevância estabelecidas hoje, registradas em **ADR-011** (docs/DECISIONS.md):

* **DE-7 — Ex-jogador sem relação direta**: conteúdo de ex-jogador da Seleção (incluindo Neymar, aposentado após a Copa 2026) é off-context a menos que o título tenha relação direta com a Seleção (frase forte como "convocação" ou jogador atual no foco). Menção incidental de "seleção brasileira" no resumo não resgata.
* **DE-8 — Listas/rankings como veto absoluto**: listicles e rankings de mercado ("jogadores mais caros", "maiores da história") são excluídos antes do contexto forte — menção a "seleção brasileira" no resumo não os salva.

## Decisões editoriais (04/08/2026)

Regras de escopo/relevância estabelecidas hoje, registradas em **ADR-009** (docs/DECISIONS.md):

* **DE-1 — Escopo editorial**: notícias sobre jogadores/equipes de outras seleções na Copa 2026 estão fora do escopo, a menos que tenham relação direta com a Seleção Brasileira ou peso relevante para a Copa de 2030.
* **DE-2 — Jogador da Seleção como foco**: notícia de clube estrangeiro é mantida quando o jogador atual da Seleção é o foco (Vini Jr. → Arsenal/Real Madrid; Endrick → Roma). Se o jogador é citado só como referência secundária ("concorrente de", "disputar vaga com", "rival de"), a notícia é descartada.
* **DE-3 — Ex-jogador/saúde**: conteúdo de ex-jogador (estado de saúde, "ex-jogador", aposentado) é off-context, mesmo contendo "seleção brasileira".
* **DE-4 — Filtro em camadas**: o Researcher usa sinais fortes + jogador-foco + veto off-context no lugar do somatório cego de pesos; padrão cego de URL `/futebol-internacional/` do ge removido para consistência entre ge/Placar/Band.
* **DE-5 — Falsos positivos**: matching de clubes por fronteira de palavra ("vitória" ≠ "vitórias"); exclusão por keyword limitada ao título + 200 caracteres do resumo com HTML removido.
* **DE-6 — Redação do capítulo**: ao remover notícias de um capítulo já gerado, reescrever o resumo e o corpo para a listagem final (o LLM escreve antes do filtro).

## Próxima Iteração — Prioridade Alta

* Implementar busca (RF-08)

## Prioridade Média

* Implementar busca (RF-08)

## Prioridade Baixa

* Newsletter com serviço real de envio (Resend, SendGrid)
* Registrar domínio próprio
* Animações e refinamentos de UI

---

# Riscos Conhecidos

## Data oficial da Copa de 2030

A data de abertura da Copa do Mundo de 2030 ainda pode sofrer ajustes oficiais.

Impacto:

Baixo.

Mitigação:

A data é configurável e utilizada apenas como referência para os cálculos do ciclo.

---

## Dependência de fontes externas

Mudanças em feeds RSS ou APIs podem interromper temporariamente a coleta automática.

Mitigação:

Manter múltiplas fontes configuradas e monitoramento de falhas.

---

## Rate limit da Groq (12.000 TPM)

O free tier da Groq tem limite de 12.000 tokens/minuto. O pipeline consome ~12-15K tokens por execução completa.

Impacto:

Alto — pode interromper a geração em dias com muitos artigos relevantes.

Mitigação:

* Cooldown de 65 segundos entre chamadas LLM no pipeline (implementado)
* Retry inteligente que parseia Retry-After do erro 429 e espera o tempo necessário

---

## Dependência de API de IA

O pipeline diário depende de uma API externa (Groq) para gerar conteúdo.

Impacto:

Alto — sem a API, o pipeline não produz capítulos.

Mitigação:

* Configurar fallback entre provedores.
* Implementar retry com backoff.
* Notificar falhas via GitHub Issues.

---

# Pendências

O desenvolvimento da base do projeto está concluído. A aplicação está no ar.

Os próximos passos são:
1. Implementar busca (RF-08)
2. Newsletter com serviço real de envio

---

# Como Atualizar Este Documento

Sempre que houver uma mudança relevante:

1. Atualizar o resumo executivo, se necessário.
2. Atualizar a fase atual.
3. Atualizar a tabela de progresso.
4. Registrar novos riscos ou remover riscos resolvidos.
5. Atualizar o backlog.
6. Definir a próxima etapa do projeto.

Este documento deve refletir sempre o estado real do projeto.

---

# Princípio Final

Qualquer colaborador ou agente de IA deve ser capaz de abrir este documento e compreender, em poucos minutos:

* o estágio atual do projeto;
* o que já foi concluído;
* o que ainda falta;
* qual é a próxima atividade prioritária.

O PROJECT_STATE.md é a fotografia oficial do Novo Ciclo em cada momento da sua evolução.

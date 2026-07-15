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

**Última atualização:** 15/07/2026 (thumbnail, news no frontmatter, NoNewsToday, pipeline CI)

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

---

# Estrutura do Projeto

```
novo-ciclo/
├── app/                    → Next.js App Router
│   ├── page.tsx            → Home (último capítulo)
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
├── scripts/                → create-post, import-rss, generate-sitemap, backup
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
* ✅ Deploy publicado em novociclo.vercel.app
* ✅ Testes automatizados (77 testes em 21 arquivos)
* ✅ RSS parser real (src/lib/rss.ts com fast-xml-parser)
* ✅ Pipeline end-to-end rodou com RSS real e backoff exponencial
* ✅ Refinamento de prompts e docs dos agentes
* ✅ News no frontmatter (Publisher escreve noticia_destaque/noticias_referencia via js-yaml)
* ✅ Thumbnails extraídos do RSS (105/115 artigos via media:content + fallback HTML)
* ✅ NoNewsToday para capítulos históricos (mensagem "não houve notícias neste dia" + link para último capítulo com notícias)
* ✅ GitHub Actions daily.yml com `contents: write` (deploy.yml removido — substituído por Vercel Git Integration)
* ✅ Capítulos 05-15 regenerados com thumbnails reais do RSS

## Próxima Iteração — Prioridade Alta

* Refinar filtro de relevância do Researcher (exclusão por modalidade: vôlei, basquete, handebol, tênis)

## Prioridade Média

* Implementar busca (RF-08)

## Prioridade Baixa

* Newsletter com serviço real de envio (Resend, SendGrid)
* Páginas estáticas (Manifesto, Sobre, Créditos, Contato)
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

* Usar modelo 8B (mais rápido, menos tokens) como fallback.
* Pular agente Revisor quando o rate limit estiver próximo.
* Configurar janela de execução espaçada (já implementado: backoff exponencial).

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
1. Refinar filtro do Researcher (falsos positivos: vôlei, basquete, handebol, tênis)
2. Implementar busca (RF-08)
3. Newsletter com serviço real de envio

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

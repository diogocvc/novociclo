---
title: 11-deployment
---

# 11 — Deploy

## Objetivo

Este documento define a estratégia de deploy, infraestrutura e publicação do Novo Ciclo.

O deploy deve ser totalmente automatizado, de baixo custo e confiável para operar diariamente durante todo o ciclo.

---

# Princípios

## Deploy automático

Toda publicação deve ser feita automaticamente pelo pipeline diário.

## Zero intervenção manual

Nenhuma etapa do processo de publicação deve exigir ação humana.

## Rollback simplificado

Reverter para uma versão anterior deve ser rápido e seguro.

## Baixo custo

Toda a infraestrutura deve operar dentro dos limites gratuitos ou de baixo custo.

---

# Stack de Infraestrutura

| Componente | Serviço | Custo |
|---|---|---|
| Hospedagem | Vercel (Hobby) | Gratuito |
| Repositório | GitHub | Gratuito |
| Automação | GitHub Actions | Gratuito (2000 min/mês) |
| Domínio | A definir | ~ R$ 40/ano |
| Newsletter | A definir | Gratuito (até ~500 assinantes) |
| API de IA | Groq (openai/gpt-oss-120b) | Gratuito (free tier) |

---

# Vercel

## Configuração do Projeto

### Framework

- Next.js.
- Build command: `npm run build`.
- Output directory: `.next`.
- Node.js version: 20.x.

### Variáveis de Ambiente

| Variável | Descrição | Obrigatória |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL do site (`https://novociclo-red.vercel.app`) | Sim |
| `NEXT_PUBLIC_SITE_NAME` | Nome do site (`Novo Ciclo`) | Sim |
| `NEXT_PUBLIC_CYCLE_START_DATE` | Início do ciclo em ISO completo com offset **BRT** (ex.: `2026-07-05T00:00:00-03:00`) | Sim |
| `NEXT_PUBLIC_WORLD_CUP_DATE` | Copa 2030 em ISO completo com offset **BRT** (ex.: `2030-06-11T00:00:00-03:00`) | Sim |
| `LLM_API_KEY` | Chave da API de IA | Sim (pipeline) |
| `NEWSLETTER_API_KEY` | Chave da API de newsletter | Conforme serviço |

> ⚠️ **Formato obrigatório (incidente 13/08):** as variáveis de data devem usar ISO **com offset `-03:00`**. Valores **date-only** (`2026-07-05`) são interpretados por `new Date()` como meia-noite **UTC**, adiantando o dia do ciclo em 1 unidade no início de cada dia (produção exibia 41 quando o correto era 40). O código em `src/config/cycle.ts` normaliza date-only para meia-noite BRT (`parseDateEnv`), mas o valor correto deve ser definido no painel.

> ⚠️ **Redeploy obrigatório:** variáveis `NEXT_PUBLIC_*` são embutidas no build. Alterá-las exige **Redeploy** em Deployments → ••• → Redeploy.

### Deploy

- Produção: branch `main`.
- Automatico: via GitHub Actions (`deploy.yml`).
- Preview: via Vercel para cada PR.

### Domínio

- Domínio principal: `novociclo.com` (a registrar).
- Domínio temporário: `novociclo.vercel.app`.
- SSL: automático (Vercel).

---

# GitHub

## Configuração do Repositório

### Branch Protection (main)

- Requer PR para merge (opcional nas fases iniciais).
- Requer status checks (tests passarem).
- Impedir push direto.

### Secrets

| Secret | Uso |
|---|---|
| `LLM_API_KEY` | Pipeline diário |
| `VERCEL_TOKEN` | Deploy automático |
| `VERCEL_ORG_ID` | Deploy automático |
| `VERCEL_PROJECT_ID` | Deploy automático |
| `NEWSLETTER_API_KEY` | Newsletter (quando configurada) |

### GitHub Actions Permissions

- Permitir ações de commit e push.
- Permitir criação de Issues (para notificações de erro).
- Read/Write para contents.

---

# Pipeline de Publicação

## Fluxo Diário

```text
[GitHub Actions - Daily Cron]
        │
        ▼
[Executa pipeline editorial]
        │
        ▼
[Gera arquivo MDX em content/]
        │
        ▼
[Commit: "daily: capítulo YYYY-MM-DD"]
        │
        ▼
[Push para main]
        │
        ▼
[Vercel detecta push → Build automático]
        │
        ▼
[Deploy em produção]
```

## Fluxo Manual

Disparado via `workflow_dispatch` no GitHub Actions.

Útil para:
- Recuperação de falhas.
- Testes manuais.
- Publicação extraordinária.

---

# Build

## Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "test": "jest",
    "pipeline:daily": "tsx automation/daily-pipeline.ts"
  }
}
```

## Processo de Build

1. `npm ci` — instala dependências exatas.
2. `npm run lint` — verifica qualidade do código.
3. `npm run typecheck` — verifica tipos TypeScript.
4. `npm run build` — gera build de produção.

## Saída Esperada

- Pasta `.next/` com arquivos estáticos e server-side.
- Pasta `content/` com os MDX dos capítulos.
- Pasta `public/` com assets estáticos.
- Sitemap e RSS gerados estaticamente.

---

# Estrutura de Deploy

```text
novo-ciclo.vercel.app (ou novociclo.com)
│
├── /                    → Página inicial (último capítulo)
├── /{ano}/{mes}/{dia}   → Capítulo específico
├── /arquivo             → Histórico completo
├── /sobre               → Sobre o projeto
├── /manifesto           → Manifesto do projeto
├── /creditos            → Créditos
├── /sitemap.xml         → Sitemap
├── /rss.xml             → Feed RSS
└── /api/newsletter      → Endpoint de newsletter
```

---

# Rollback

## Procedimento

1. Identificar o último commit estável.
2. Executar `git revert HEAD` ou checkout do commit anterior.
3. Forçar novo deploy.

## Via Vercel

- Acessar dashboard da Vercel.
- Selecionar deployment anterior.
- Clicar em "Promote to Production".

## Tempo Estimado

- Rollback via git: ~2 minutos.
- Rollback via Vercel: ~1 minuto.

---

# Monitoramento

## Vercel Analytics

- Visualizações de página.
- Tempo de carregamento.
- Erros de frontend.

## GitHub Actions

- Status das execuções.
- Tempo de pipeline.
- Logs de erro.

## Alertas

- Falha no pipeline: GitHub Issue automática.
- Erro 500 no site: notificação via Vercel.
- Limite de API de IA: notificação ao mantenedor.

---

# Manutenção

## Tarefas Regulares

| Frequência | Tarefa |
|---|---|
| Mensal | Verificar logs de erros |
| Mensal | Verificar limites de API |
| Trimestral | Atualizar dependências |
| Semestral | Verificar configuração do ciclo |
| Sob demanda | Adicionar novas fontes RSS |

## Atualização de Dependências

- Utilizar Dependabot (GitHub) para PRs automáticos de dependências.
- Revisar manualmente antes de merge.

---

# Considerações de Segurança

- Chaves de API armazenadas apenas em GitHub Secrets.
- Nenhuma chave exposta no frontend.
- Cabeçalhos de segurança configurados na Vercel (`vercel.json`).
- CSP (Content Security Policy) configurado.

## vercel.json

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ]
}
```

---

# Custos Estimados (Mensais)

| Item | Custo |
|---|---|
| Vercel Hobby | Grátis |
| GitHub Free | Grátis |
| Domínio | ~ R$ 3,50 |
| API de IA | ~ $5–20 (variável) |
| Newsletter | Grátis (início) |
| Total estimado | ~ R$ 25–80 |

---

# Princípio Fundamental

O Novo Ciclo deve publicar sozinho.

Se o deploy exigir intervenção manual para funcionar, a automação não está completa.

A infraestrutura deve ser tão invisível quanto possível — o leitor nunca deve pensar nela.

---
title: 10-automation
---

# 10 — Automação

## Objetivo

Este documento define todos os fluxos automatizados do Novo Ciclo.

A automação é responsável por executar o pipeline editorial diário, publicar o site e manter a infraestrutura sem intervenção manual.

Nenhuma etapa crítica do fluxo diário deve depender de ação humana.

---

# Princípios

## Automação total

Uma vez configurado, o sistema deve executar o ciclo completo de forma autônoma.

## Recuperação automática

Falhas devem ser detectadas e tratadas sem perda de dados.

## Observabilidade

Toda execução deve gerar logs suficientes para diagnóstico remoto.

## Baixo custo

Utilizar apenas serviços gratuitos ou de baixo custo.

---

# Stack de Automação

| Componente | Tecnologia |
|---|---|
| Orquestração | GitHub Actions |
| Pipeline diário | Node.js / TypeScript |
| Agentes | API de LLM (via script Node.js) |
| Notificações | GitHub Issues ou e-mail |
| Logs | GitHub Actions + arquivos locais |
| Armazenamento | Git / GitHub |

---

# Pipeline Diário

## Visão Geral

O pipeline diário executa uma vez por dia e produz um novo capítulo do Novo Ciclo.

## Trigger

- Horário: 18:00 BRT (21:00 UTC) (configurável).
- Mecanismo: Cron no GitHub Actions.
- Fallback: Permitir execução manual via workflow_dispatch.

## Fluxo

```text
[Trigger: Cron 18:00 BRT (21:00 UTC)]
        │
        ▼
[1. Setup: Checkout + Dependências]
        │
        ▼
[2. Coletar notícias (Pesquisador)]
        │
        ▼
[3. Normalizar e curar (Curador)]
        │
        ▼
[4. Decidir narrativa (Editor-chefe)]
        │
        ▼
[5. Escrever capítulo (Escritor)]
        │
        ▼
[6. Revisar (Revisor)]
        │
        ▼
[7. Se aprovado → Publicar (Publicador)]
        │
        ▼
[8. Commit + Push]
        │
        ▼
[9. Build + Deploy (Vercel)]
        │
        ▼
[10. Gerar Newsletter]
        │
        ▼
[11. Atualizar SEO (sitemap, RSS)]
        │
        ▼
[12. Notificar sucesso/erro]
```

## Fluxo Alternativo (Falha na Revisão)

```text
[6. Revisor → REPROVADO]
        │
        ▼
[6a. Registrar erros em log]
        │
        ▼
[6b. Notificar mantenedor]
        │
        ▼
[6c. Interromper pipeline]
        │
        ▼
[6d. Manter último conteúdo publicado]
```

---

# Workflows do GitHub Actions

## daily.yml

```yaml
name: Daily Pipeline
on:
  schedule:
    - cron: "0 21 * * *" # 18:00 BRT (21:00 UTC)
  workflow_dispatch:

permissions:
  contents: write

jobs:
  daily:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
      - uses: actions/setup-node@v5
        with:
          node-version: 24
          cache: npm
      - run: npm ci
      - run: npm run pipeline
        env:
          LLM_API_KEY: ${{ secrets.LLM_API_KEY }}
          NEXT_PUBLIC_SITE_URL: ${{ vars.NEXT_PUBLIC_SITE_URL || 'https://novociclo.vercel.app' }}
          NEXT_PUBLIC_CYCLE_START_DATE: ${{ vars.NEXT_PUBLIC_CYCLE_START_DATE || '2026-07-05T00:00:00-03:00' }}
          NEXT_PUBLIC_WORLD_CUP_DATE: ${{ vars.NEXT_PUBLIC_WORLD_CUP_DATE || '2030-06-11T00:00:00-03:00' }}
          NEXT_PUBLIC_GA_ID: ${{ vars.NEXT_PUBLIC_GA_ID || 'G-T9J81CXJ2E' }}
      - if: success()
        run: |
          git config user.name "Novo Ciclo Bot"
          git config user.email "bot@novociclo.app"
          git add content/ public/rss.xml
          git commit -m "chore: daily pipeline $(date +%Y-%m-%d)" || echo "No changes to commit"
          git pull --rebase
          git push
```

---

# Scripts do Pipeline

## automation/daily-pipeline.ts

Script principal que orquestra os agentes do pipeline diário.

### Fluxo interno

```typescript
async function dailyPipeline(): Promise<void> {
  const startTime = Date.now();
  const logger = createLogger('daily-pipeline');

  try {
    logger.info('Iniciando pipeline diário');

    // Etapa 1: Coleta
    logger.info('Coletando notícias');
    const noticias = await researcher.execute(sources);
    logger.info(`Coletadas ${noticias.length} notícias`);

    // Etapa 2: Curadoria
    logger.info('Realizando curadoria');
    const acontecimentos = await curator.execute(noticias);
    logger.info(`${acontecimentos.length} acontecimentos identificados`);

    // Etapa 3: Decisão editorial
    logger.info('Decidindo narrativa');
    const decisao = await editor.execute(acontecimentos);

    // Etapa 4: Escrita
    logger.info('Escrevendo capítulo');
    const capitulo = await writer.execute(decisao);

    // Etapa 5: Revisão
    logger.info('Revisando capítulo');
    const revisao = await reviewer.execute(capitulo);

    if (revisao.status === 'reprovado') {
      logger.error('Capítulo reprovado na revisão', revisao.erros);
      throw new Error('Revisão reprovada');
    }

    // Etapa 6: Publicação
    logger.info('Publicando capítulo');
    const arquivo = await publisher.execute(capitulo);
    await saveFile(arquivo.caminho, arquivo.conteudo);

    // Etapa 7: Newsletter
    logger.info('Gerando newsletter');
    await newsletter.execute(capitulo);

    // Etapa 8: SEO
    logger.info('Atualizando SEO');
    await seo.execute(capitulo);

    const totalTime = Date.now() - startTime;
    logger.info(`Pipeline concluído em ${totalTime}ms`);
  } catch (error) {
    logger.error('Pipeline falhou', error);
    throw error;
  }
}
```

### Execução dos Agentes

Cada agente é executado como uma função assíncrona que se comunica com a API de LLM.

```typescript
interface AgentInput {
  prompt: string;
  input: Record<string, unknown>;
}

interface AgentOutput {
  result: Record<string, unknown>;
  logs: {
    startTime: number;
    endTime: number;
    tokensUsed: number;
    errors: number;
  };
  status: 'success' | 'error';
}
```

---

# Estrutura do Diretório automation/

```
automation/
├── daily-pipeline.ts      # Orquestrador do pipeline diário
├── publish.ts             # Publicação e commit
├── send-newsletter.ts     # Envio de newsletter
├── generate-feed.ts       # Geração de sitemap e RSS
├── types.ts               # Tipos compartilhados
└── utils/
    ├── logger.ts          # Sistema de logging
    ├── retry.ts           # Lógica de retry
    └── validator.ts       # Validação de dados
```

---

# Tratamento de Falhas

## Estratégia

| Tipo de Falha | Ação |
|---|---|
| Agente falha (erro de API) | Retry 3x com backoff exponencial |
| Agente falha (resposta inválida) | Reexecução isolada do agente |
| Revisor reprova | Pipeline interrompido, notificação enviada |
| Falha de commit | Retry após 30s |
| Falha de build | Último deploy permanece ativo |
| Falha de deploy | Notificação + retry manual |

## Registro de Erros

Cada falha deve registrar:

- timestamp
- etapa do pipeline
- agente envolvido
- mensagem de erro
- dados de entrada (sanitizados)
- stack trace

## Recuperação

- Se o pipeline falhar, o último conteúdo publicado permanece no ar.
- O pipeline pode ser reexecutado manualmente via `workflow_dispatch`.
- Dados parcialmente processados são preservados em disco para diagnóstico.

---

# Logs

## Formato

```
[YYYY-MM-DD HH:mm:ss] [NIVEL] [MODULO] Mensagem
```

## Níveis

- INFO: Progresso normal do pipeline.
- WARN: Situações inesperadas não críticas.
- ERROR: Falhas que interrompem o pipeline.
- DEBUG: Informações detalhadas (habilitado por configuração).

## Armazenamento

- Logs de execução do GitHub Actions: retidos por 90 dias.
- Logs locais: arquivos em `/logs/daily-pipeline-YYYY-MM-DD.log`.
- Logs de erro: arquivos em `/logs/errors/`.

---

# Notificações

## Sucesso

Nenhuma notificação necessária.

## Falha

Criar uma GitHub Issue com:

- Título: `[Pipeline] Falha na execução de {data}`
- Corpo: resumo do erro, etapa falha, logs relevantes.

## Limites de Uso

Monitorar uso da API de LLM.

Se o custo mensal exceder o limite configurado, notificar o mantenedor.

---

# Configuração

## automation/config.ts

```typescript
export const pipelineConfig = {
  schedule: {
    timezone: 'America/Sao_Paulo',
    hour: 8,
    minute: 0,
  },
  retry: {
    maxAttempts: 3,
    backoffMs: 1000,
  },
  llm: {
    model: 'gpt-4',
    maxTokens: 4000,
    temperature: 0.3,
  },
  limits: {
    maxNewsPerDay: 50,
    maxEventsPerDay: 10,
    maxChapterLength: 3000,
  },
  paths: {
    content: 'content',
    logs: 'logs',
  },
};
```

---

# Princípio Fundamental

O Novo Ciclo deve funcionar sozinho.

A automação é o coração do projeto.

Se precisar de intervenção humana para funcionar, o sistema não está completo.

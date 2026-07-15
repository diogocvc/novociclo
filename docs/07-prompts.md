---
title: 07-prompts
---

# 07 — Prompts dos Agentes

## Objetivo

Este documento define os prompts oficiais de cada agente do Novo Ciclo e documenta o comportamento real de cada etapa do pipeline editorial.

---

# Princípios Gerais para Todos os Agentes

1. Trabalhar apenas com informações provenientes das fontes configuradas.
2. Nunca inventar fatos.
3. Priorizar clareza e objetividade.
4. Produzir saídas estritamente no formato estruturado solicitado.
5. Registrar erros quando não conseguir concluir a tarefa.
6. Não depender de contexto interno de outros agentes além das entradas recebidas.

---

# Agente 01 — Pesquisador

## Missão

Coletar todas as notícias relevantes publicadas desde a última execução, priorizando fontes RSS reais.

## Funcionamento Real

1. Chama `fetchAllRss()` para obter notícias das fontes RSS configuradas (ge, UOL).
2. Filtra por palavras-chave de relevância: "brasil", "seleção brasileira", "neymar", "ancelotti", "cbf", "hexa", "copa 2030", "novo ciclo".
3. Seleciona até 8 itens mais relevantes.
4. **Short-circuit:** Se houver 3+ notícias relevantes do RSS, retorna imediatamente — sem chamar LLM.
5. **Fallback:** Se menos de 3 notícias relevantes, chama o LLM para gerar notícias complementares realistas, mescla com as RSS (máx 8).

## Prompt (fallback LLM)

```
Você é o Pesquisador do Novo Ciclo (modo fallback).

ATENÇÃO: Você está sendo acionado porque a coleta via RSS retornou
poucas notícias relevantes sobre a Seleção Brasileira. Sua missão é
complementar com notícias factuais e realistas sobre a caminhada da
Seleção rumo à Copa do Mundo de 2030.

Regras:
- Gera de 3 a 8 notícias factuais e realistas
- Foco exclusivo em: Seleção Brasileira, jogadores, CBF, comissão
  técnica, Copa 2030
- Cada notícia deve ter: id, titulo, resumo_original, url, fonte,
  data_publicacao, idioma, data_coleta
- Fontes possíveis: ge.globo.com, uol.com.br, espn.com.br, cbf.com.br
- URLs devem seguir o padrão real dos domínios
- Data de publicação deve ser próxima à data fornecida
- NÃO invente jogadores ou eventos que não existem
- NÃO inclua opinião pessoal
- Responda APENAS com um objeto JSON no formato: { "news": [...] }
```

## Entrada

```json
{
  "date": "2026-07-15"
}
```

## Saída Esperada

```json
{
  "news": [
    {
      "id": "rss-ge-1234",
      "titulo": "Seleção Brasileira vence amistoso",
      "resumo_original": "Brasil venceu...",
      "url": "https://ge.globo.com/...",
      "fonte": "ge",
      "data_publicacao": "2026-07-15T10:00:00-03:00",
      "idioma": "pt-BR",
      "data_coleta": "2026-07-15T10:30:00-03:00"
    }
  ],
  "source": "rss"
}
```

---

# Agente 02 — Curador

## Missão

Transformar uma coleção de notícias em uma coleção de acontecimentos estruturados.

## Funcionamento Real

1. Recebe `input.news` (array de `News`).
2. **Short-circuit:** Se vazio, retorna `{ events: [] }` — sem chamar LLM.
3. Chama LLM para deduplicar, agrupar, classificar e priorizar.
4. LLM retorna array de `Event` no formato JSON.

## Prompt

```
Você é o Curador do Novo Ciclo.

Sua missão é transformar uma coleção de notícias sobre a Seleção
Brasileira em uma coleção de acontecimentos estruturados.

Regras:
- Remova duplicidades (mesmo fato em diferentes fontes)
- Agrupe notícias sobre o mesmo fato em um único acontecimento
- Elimine conteúdos irrelevantes para o ciclo da Seleção
- Classifique cada acontecimento por categoria
- Priorize fatos confirmados sobre rumores
- Preserve diversidade de fontes

Categorias: Seleção Brasileira, Comissão Técnica, Convocações,
Jogadores, Lesões, Clubes, CBF, FIFA, Copa do Mundo 2030,
Bastidores, Estatísticas

Cada acontecimento:
- id: string (slug única)
- titulo: string
- descricao: string (resumo do fato)
- categoria: string (uma das categorias acima)
- nivel_de_importancia: number (1-10)
- noticias_relacionadas: string[] (URLs ou IDs)
- data: string (ISO)

Responda APENAS com um objeto JSON no formato: { "events": [...] }
```

## Saída Esperada

```json
{
  "events": [
    {
      "id": "selecao-vence-amistoso",
      "titulo": "Seleção vence amistoso preparatório",
      "descricao": "Brasil venceu...",
      "categoria": "Seleção Brasileira",
      "nivel_de_importancia": 8,
      "noticias_relacionadas": ["n1", "n3"],
      "data": "2026-07-15"
    }
  ]
}
```

---

# Agente 03 — Editor-chefe

## Missão

Definir a narrativa do dia — título, foco editorial, ordenação dos acontecimentos.

## Funcionamento Real

1. Recebe `input.events` e `input.ciclo` (contexto do ciclo).
2. **Short-circuit:** Se vazio, retorna decisão vazia — sem chamar LLM.
3. Substitui placeholders `{numero_dia}`, `{total_dias}`, `{dias_restantes}` no prompt com valores reais.
4. Chama LLM para definir título, subtítulo, foco, ordenação e exclusões.

## Prompt

```
Você é o Editor-chefe do Novo Ciclo.

Sua missão é definir a narrativa do dia. Você não escreve — você decide.

Contexto do ciclo: dia {numero_dia} de {total_dias} |
{dias_restantes} dias para a Copa do Mundo 2030.

Regras:
- Identifique o principal acontecimento do dia
- Ordene os acontecimentos por relevância editorial
- Defina o foco do dia
- Sugira um título editorial (curto, impactante, jornalístico,
  máx 80 caracteres)
- Sugira um subtítulo (complementar ao título, máx 140 caracteres)
- Defina quais acontecimentos entram e quais ficam de fora
- Prioridade máxima para fatos oficiais (CBF, convocações)

Responda APENAS com um objeto JSON no formato:
  { "titulo": "...", "subtitulo": "...", "foco": "...",
    "eventsOrder": [...], "excludedEvents": [...] }
```

## Saída Esperada

```json
{
  "decision": {
    "titulo": "Título do dia",
    "subtitulo": "Subtítulo complementar",
    "foco": "Foco editorial do dia",
    "eventsOrder": ["e1", "e2"],
    "excludedEvents": ["e3"]
  }
}
```

---

# Agente 04 — Escritor

## Missão

Escrever o capítulo diário em formato JSON estruturado.

## Funcionamento Real

1. Recebe `input.decision`, `input.events` e `input.ciclo`.
2. **Short-circuit:** Se sem decisão, retorna draft vazio — sem chamar LLM.
3. Substitui placeholders do ciclo no prompt.
4. Chama LLM para gerar `{ draft: { titulo, subtitulo, resumo, corpo } }`.

## Prompt

```
Você é o Escritor do Novo Ciclo.

Contexto: dia {numero_dia} de {total_dias} |
{dias_restantes} dias para a Copa do Mundo 2030.

Sua missão é escrever o capítulo diário com base nas decisões
editoriais e nos acontecimentos selecionados.

Regras:
- Escreva em português brasileiro
- Tom sóbrio e informativo — estilo jornalístico, sem opinião
- Baseie-se exclusivamente nos acontecimentos fornecidos
- O resumo deve ter de 2 a 4 frases curtas
- O corpo deve ter de 3 a 6 parágrafos
- Conecte acontecimentos relacionados quando pertinente
- Toda afirmação deve ter respaldo nos acontecimentos fornecidos
- Responda APENAS com um objeto JSON no formato:
  { "draft": { "titulo": "...", "subtitulo": "...",
    "resumo": "...", "corpo": "..." } }
```

## Saída Esperada

```json
{
  "draft": {
    "titulo": "Dia 10 de 1458 do ciclo...",
    "subtitulo": "Subtítulo do capítulo",
    "resumo": "Resumo com 2 a 4 frases.",
    "corpo": "Parágrafos do capítulo com análise jornalística..."
  }
}
```

---

# Agente 05 — Revisor

## Missão

Garantir a qualidade editorial antes da publicação.

## Funcionamento Real

1. Recebe `input.draft`, `input.events` (acontecimentos originais) e `input.decision` (decisão editorial).
2. **Short-circuit:** Se sem draft, auto-aprova — sem chamar LLM.
3. Chama LLM com 10 critérios de revisão e o contexto completo.

## Prompt

```
Você é o Revisor do Novo Ciclo.

Sua missão é revisar o capítulo escrito e garantir que atende aos
padrões de qualidade do projeto.

Critérios de revisão (10):
1. Ortografia e gramática — não há erros?
2. Clareza — o texto é compreensível?
3. Coesão — as ideias estão conectadas?
4. Repetições — há palavras ou ideias repetidas?
5. Links — todas as referências estão presentes?
6. Fontes — toda afirmação possui respaldo nos acontecimentos
   originais?
7. Estrutura — o capítulo tem título, subtítulo, resumo e corpo?
8. Datas — as datas estão consistentes?
9. Tom — o tom é neutro e consistente?
10. Tamanho — o texto está dentro dos limites esperados?

Seja equilibrado. Aprove mesmo com pequenos problemas. Reprove
apenas se houver erros graves ou o texto for incoerente.
Responda APENAS com um objeto JSON no formato:
{ "review": { "approved": true/false, "issues": [...],
  "suggestions": [...] } }
```

## Saída Esperada

```json
{
  "review": {
    "approved": true,
    "issues": [],
    "suggestions": ["Considere..."]
  }
}
```

---

# Agente 06 — Publicador

## Missão

Salvar o capítulo aprovado como arquivo MDX no sistema de conteúdo.

## Funcionamento Real

**Agente determinístico — não chama LLM.**

1. Recebe `input.draft` (capítulo aprovado) e `input.date`.
2. Constrói o caminho `content/YYYY/MM/DD.mdx`.
3. Cria diretórios com `fs.mkdirSync` se necessário.
4. Gera frontmatter YAML com `titulo`, `subtitulo`, `resumo`, `categorias`, `tags`, `referencias`, `tempo_de_leitura`.
5. Escreve o arquivo MDX com `fs.writeFileSync`.

## Saída Esperada

```json
{
  "filePath": "content/2026/07/15.mdx"
}
```

---

# Agente 07 — Newsletter

## Missão

Gerar a versão HTML para e-mail do capítulo diário.

## Funcionamento Real

**Agente determinístico — não chama LLM.**

1. Recebe `input.draft` e `input.date`.
2. Constrói HTML com template literal contendo título, resumo, link para leitura completa e tagline.
3. Usa `NEXT_PUBLIC_SITE_URL` para o link base.

## Saída Esperada

```json
{
  "emailHtml": "<h1>Título</h1><p>Resumo</p><a href=\"...\">Leia mais</a>..."
}
```

---

# Agente 08 — SEO

## Missão

Atualizar recursos de indexação após a publicação.

## Funcionamento Real

**Agente determinístico — não chama LLM.**

1. Recebe `input.draft` e `input.date`.
2. Verifica existência de `public/sitemap.xml` (log apenas — sem atualização automática).
3. Gera/atualiza `public/rss.xml` com feed RSS 2.0 contendo o capítulo atual.

## Saída Esperada

```json
{
  "success": true
}
```

---

# Encadeamento dos Agentes

```
Pesquisador → Curador → Editor-chefe → Escritor → Revisor → Publicador → Newsletter → SEO
```

Cada agente recebe a saída do agente anterior como entrada, mais o contexto do ciclo (`numero_dia`, `total_dias`, `dias_restantes`) quando aplicável.

Em caso de falha em qualquer agente, o pipeline é interrompido e o erro registrado. Agentes com short-circuit retornam sucesso com dados vazios quando não há trabalho a fazer, evitando chamadas desnecessárias ao LLM.

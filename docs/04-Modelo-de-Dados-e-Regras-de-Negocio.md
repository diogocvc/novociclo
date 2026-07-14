---
title: 04-Modelo-de-Dados-e-Regras-de-Negocio

---

# 04 — Modelo de Dados e Regras de Negócio

## Objetivo

Este documento define todas as entidades, estruturas de dados e regras de negócio do Novo Ciclo.

Seu propósito é garantir que todas as informações do sistema sejam calculadas e apresentadas de forma consistente, independentemente da tecnologia utilizada.

Nenhuma regra de negócio deve existir apenas no código-fonte. Todas devem estar documentadas neste documento.

---

# Princípios

O modelo de dados deve seguir os seguintes princípios:

* Uma única fonte da verdade para cada informação.
* Evitar armazenamento de dados derivados.
* Priorizar estruturas simples e legíveis.
* Facilitar futuras migrações de tecnologia.
* Permitir evolução sem quebra de compatibilidade.

---

# Entidades

O sistema é composto por cinco entidades principais:

* Notícia
* Acontecimento
* Dia
* Fonte
* Categoria

---

# Entidade: Notícia

Representa uma publicação original proveniente de uma fonte externa.

## Campos

* id
* título
* resumo_original
* url
* thumbnail
* fonte
* autor
* data_publicação
* idioma
* data_coleta

Uma notícia nunca é alterada pelo sistema.

Ela representa apenas uma referência.

---

# Entidade: Acontecimento

Representa um fato identificado a partir de uma ou mais notícias.

## Campos

* id
* título
* descrição
* categoria
* nível_de_importância
* notícias_relacionadas
* data

Um acontecimento pode possuir diversas notícias como referência.

---

# Entidade: Dia

Representa o registro oficial de um dia do ciclo.

Cada Dia corresponde exatamente a um dia.

Nunca existirão dois Dias para a mesma data.

## Campos Persistidos

* id
* data
* slug
* título
* subtítulo
* resumo
* narrativa
* acontecimentos
* categorias
* tags
* referências
* data_publicação
* tempo_de_leitura
* frontmatter

---

# Entidade: Fonte

Representa um veículo monitorado.

## Campos

* nome
* url
* tipo
* rss
* idioma
* ativo

---

# Entidade: Categoria

Categorias utilizadas pelo projeto.

Versão inicial:

* Seleção Brasileira
* Comissão Técnica
* Convocações
* Jogadores
* Lesões
* Clubes
* CBF
* FIFA
* Copa do Mundo 2030
* Bastidores
* Estatísticas

---

# Datas Fundamentais

O sistema depende apenas de duas datas configuráveis.

## Data de início do ciclo

Representa o primeiro dia da reconstrução da Seleção Brasileira.

```text
cycleStartDate
```

Valor inicial:

05/07/2026

---

## Data de início da Copa

Representa o primeiro dia oficial da Copa do Mundo de 2030.

```text
worldCupStartDate
```

Esse valor deve ser configurável para permitir atualização quando a FIFA divulgar oficialmente o calendário.

---

# Dados Persistidos

O sistema deve persistir apenas:

* cycleStartDate
* worldCupStartDate
* postDate

Todas as demais informações temporais devem ser calculadas dinamicamente.

---

# Regras de Negócio

## RN-001 — Um capítulo por dia

Cada data do ciclo deve possuir exatamente um Dia.

---

## RN-002 — Numeração do Dia

O número do capítulo é calculado pela diferença entre a data do Dia e a data de início do ciclo.

Fórmula:

```text
numeroDoDia = (postDate - cycleStartDate) + 1
```

Exemplo:

05/07/2026 → Dia 1

06/07/2026 → Dia 2

07/07/2026 → Dia 3

---

## RN-003 — Duração total do ciclo

A duração total do ciclo corresponde à diferença entre a data de início do ciclo e a data de abertura da Copa do Mundo de 2030.

Fórmula:

```text
diasTotaisDoCiclo =
worldCupStartDate - cycleStartDate
```

Esse valor é constante enquanto as datas oficiais não forem alteradas.

---

## RN-004 — Dias restantes

Representa quantos dias faltam até a abertura da Copa.

Fórmula:

```text
diasRestantes =
worldCupStartDate - postDate
```

---

## RN-005 — Identificação oficial do capítulo

Todos os Dias devem seguir exatamente o padrão abaixo:

```text
Dia {numeroDoDia} de {diasTotaisDoCiclo} do ciclo da Seleção Brasileira para a Copa do Mundo de 2030
```

Exemplo:

```text
Dia 187 de 1458 do ciclo da Seleção Brasileira para a Copa do Mundo de 2030
```

Essa identificação é obrigatória e deve estar presente no título do Dia.

---

## RN-006 — Slug

O slug deve utilizar apenas a data.

Formato:

```text
/2027/01/08
```

O número do dia não deve fazer parte da URL.

Isso garante URLs permanentes mesmo que alguma regra futura seja alterada.

---

## RN-007 — Ordem cronológica

Os Dias devem sempre ser exibidos do mais recente para o mais antigo.

---

## RN-008 — Referências

Todo acontecimento deve possuir pelo menos uma notícia como referência.

---

## RN-009 — Fontes

Cada notícia deve manter a atribuição original da fonte.

O sistema nunca deve substituir ou remover essa informação.

---

## RN-010 — Integridade Editorial

O sistema não deve criar fatos.

Toda afirmação presente em um capítulo deve ser sustentada por pelo menos uma referência coletada.

---

# Estrutura do Frontmatter

Cada Dia deve iniciar com um frontmatter semelhante a:

```yaml
title:
subtitle:
date:
dayNumber:
totalCycleDays:
daysRemaining:
slug:
readingTime:
categories:
tags:
sources:
coverImage:
```

---

# Estrutura do Arquivo

```text
---
frontmatter
---

Título

Subtítulo

Resumo

Narrativa

Acontecimentos

Referências
```

---

# Dados Calculados

Os seguintes dados nunca devem ser armazenados permanentemente:

* número do dia
* dias restantes
* duração total do ciclo
* tempo estimado de leitura (pode ser recalculado)
* quantidade de notícias analisadas
* quantidade de acontecimentos
* estatísticas editoriais

Sempre que necessário, essas informações devem ser recalculadas a partir dos dados persistidos.

---

# Evolução Futura

O modelo foi projetado para suportar novos ciclos sem alterações estruturais.

Exemplos:

* Seleção Feminina
* Seleção Sub-20
* Copa América
* Eliminatórias
* Jogos Olímpicos
* Libertadores
* Champions League

Apenas as configurações do ciclo, das fontes e das categorias deverão ser alteradas.

---

# Princípio Fundamental

No Novo Ciclo, as notícias são registros históricos.

Os acontecimentos são interpretações editoriais fundamentadas nessas notícias.

Os Dias são o registro definitivo de cada dia da caminhada da Seleção Brasileira rumo à Copa do Mundo de 2030.

---
title: 03-Arquitetura-dos-Agentes

---

# 03 — Arquitetura dos Agentes

## Objetivo

Este documento define os agentes responsáveis pela produção diária do Novo Ciclo.

Cada agente possui uma responsabilidade exclusiva e se comunica apenas por meio de entradas e saídas bem definidas.

Nenhum agente deve executar tarefas pertencentes a outro agente.

Essa separação torna o sistema mais previsível, testável, escalável e fácil de manter.

---

# Filosofia

O Novo Ciclo funciona como uma redação jornalística automatizada.

Em vez de uma única IA realizando todas as tarefas, diversos agentes especializados trabalham em sequência para produzir um capítulo diário da caminhada da Seleção Brasileira rumo à Copa do Mundo de 2030.

Cada agente possui uma missão específica.

O resultado final é consequência do trabalho coletivo dessa redação.

---

# Fluxo Geral

```text
Scheduler

↓

Pesquisador

↓

Curador

↓

Editor-chefe

↓

Escritor

↓

Revisor

↓

Publicador

↓

Newsletter

↓

SEO
```

---

# Princípios Gerais

Todos os agentes devem seguir os mesmos princípios:

* Trabalhar apenas com informações provenientes das fontes configuradas.
* Nunca inventar fatos.
* Nunca alterar o significado das informações coletadas.
* Priorizar clareza e objetividade.
* Produzir saídas estruturadas.
* Registrar erros quando não conseguirem concluir sua tarefa.
* Não depender do contexto interno de outros agentes além das entradas recebidas.

---

# Agente 01 — Pesquisador

## Missão

Encontrar todas as informações relevantes publicadas desde a última execução do sistema.

## Responsabilidades

* Ler RSS.
* Consultar APIs configuradas.
* Coletar metadados.
* Identificar imagens.
* Padronizar URLs.
* Remover links inválidos.

## Entrada

* Lista de fontes cadastradas.

## Saída

Uma coleção padronizada de notícias contendo:

* título;
* resumo original (quando disponível);
* URL;
* fonte;
* data de publicação;
* autor (quando disponível);
* thumbnail;
* categoria sugerida.

## Critérios de Qualidade

* Não modificar o conteúdo original.
* Não resumir.
* Não interpretar.
* Não classificar importância.

---

# Agente 02 — Curador

## Missão

Transformar uma coleção de notícias em uma coleção de acontecimentos.

## Responsabilidades

* Remover duplicidades.
* Agrupar notícias sobre o mesmo fato.
* Eliminar conteúdos irrelevantes.
* Classificar cada acontecimento.
* Identificar rumores, confirmações e anúncios oficiais.

## Categorias

* Seleção Brasileira
* Comissão Técnica
* Convocações
* Jogadores
* Lesões
* Clubes
* CBF
* FIFA
* Copa 2030
* Bastidores
* Estatísticas

## Critérios de Qualidade

* Priorizar fatos confirmados.
* Evitar repetição.
* Agrupar diferentes perspectivas sobre um mesmo acontecimento.
* Preservar diversidade de fontes.

## Saída

Uma lista de acontecimentos estruturados.

---

# Agente 03 — Editor-chefe

## Missão

Definir qual é a narrativa do dia.

Este agente não escreve.

Ele toma decisões editoriais.

## Responsabilidades

* Identificar o principal acontecimento.
* Ordenar os acontecimentos por relevância.
* Definir o foco do Dia.
* Sugerir um título editorial.
* Definir quais acontecimentos entram e quais ficam de fora.

## Exemplo

Entrada:

* convocação
* entrevista
* amistoso
* mudança na comissão

Saída:

Tema do dia:

"A primeira convocação do novo ciclo começa a tomar forma."

---

# Agente 04 — Escritor

## Missão

Escrever o Dia diário.

## Responsabilidades

Produzir:

* título;
* subtítulo;
* resumo executivo;
* narrativa principal;
* seções;
* contexto histórico;
* chamadas para leitura.

## Diretrizes Editoriais

O texto deve:

* ser cronológico;
* ser neutro;
* evitar sensacionalismo;
* conectar acontecimentos relacionados;
* explicar contexto quando necessário;
* manter leitura fluida.

## Importante

O Escritor escreve sobre acontecimentos.

Nunca sobre manchetes.

---

# Agente 05 — Revisor

## Missão

Garantir qualidade editorial antes da publicação.

## Verificações

* Ortografia.
* Gramática.
* Clareza.
* Coesão.
* Repetições.
* Links ausentes.
* Fontes citadas.
* Estrutura correta.
* Consistência das datas.
* Tamanho do texto.

## Critérios de Aprovação

Todo Dia deve:

* possuir narrativa clara;
* possuir referências;
* conter apenas fatos verificados;
* manter tom consistente.

---

# Agente 06 — Publicador

## Missão

Transformar o Dia em conteúdo do site.

## Responsabilidades

* Gerar arquivo MDX.
* Criar frontmatter.
* Atualizar índices.
* Atualizar feed interno.
* Atualizar páginas de listagem.
* Criar commit.
* Enviar alterações ao repositório.

## Estrutura Esperada

```text
/content

2027-03-18.mdx
```

---

# Agente 07 — Newsletter

## Missão

Transformar o Dia em um e-mail.

## Estrutura

* título;
* resumo curto;
* destaque do dia;
* chamada para leitura;
* link do capítulo.

Objetivo:

Levar o leitor ao site.

---

# Agente 08 — SEO

## Missão

Atualizar automaticamente todos os recursos necessários para indexação.

## Responsabilidades

* sitemap;
* RSS;
* Open Graph;
* Schema.org;
* metadados;
* links canônicos.

---

# Comunicação entre Agentes

Todos os agentes devem trocar informações utilizando estruturas padronizadas.

Nenhum agente deve acessar diretamente o estado interno de outro.

Cada agente recebe apenas:

* entrada;
* contexto necessário;
* configuração.

E devolve apenas:

* saída estruturada;
* logs;
* status da execução.

---

# Tratamento de Falhas

Se um agente falhar:

* interromper a execução da etapa seguinte;
* registrar o erro;
* preservar os dados produzidos até aquele momento;
* permitir reexecução isolada.

Nenhum agente deve publicar conteúdo parcialmente processado.

---

# Observabilidade

Cada agente deve registrar:

* horário de início;
* horário de término;
* tempo de execução;
* quantidade de itens processados;
* quantidade de erros;
* quantidade de avisos.

---

# Evolução Futura

A arquitetura deve permitir adicionar novos agentes sem modificar os existentes.

Exemplos:

* Agente de Tradução.
* Agente de Estatísticas.
* Agente de Podcasts.
* Agente de Vídeos.
* Agente de Redes Sociais.
* Agente de Verificação de Links.
* Agente de Tendências.
* Agente de Arquivamento Histórico.

---

# Princípio Fundamental

O Novo Ciclo não publica notícias.

Ele registra a história da construção da Seleção Brasileira.

As notícias são documentos de referência.

Os acontecimentos são a matéria-prima.

Os Dias diários são o produto final.

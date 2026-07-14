---
title: PRD-Novo-Ciclo

---

# PRD — Novo Ciclo

## Visão Geral

**Novo Ciclo é um agregador de notícias que documenta diariamente o novo ciclo da Seleção Brasileira rumo à Copa do Mundo de 2030.**

Em vez de funcionar como um portal de notícias tradicional, o Novo Ciclo cria um registro cronológico da reconstrução da seleção brasileira, reunindo automaticamente as principais notícias do dia em um único resumo.

O objetivo é que qualquer pessoa consiga acompanhar toda a evolução do ciclo desde o primeiro dia até a estreia na Copa de 2030.

---

# Problema

As notícias sobre a Seleção Brasileira ficam espalhadas entre diversos veículos e desaparecem rapidamente no fluxo diário.

Não existe um lugar que conte, dia após dia, a história completa da construção da equipe para a próxima Copa do Mundo.

---

# Objetivo

Criar automaticamente um post diário contendo:

* Contagem regressiva para a Copa de 2030.
* Resumo dos acontecimentos do dia.
* Links para as notícias originais.
* Newsletter diária.
* Arquivo histórico pesquisável.

Todo o processo deve acontecer sem intervenção manual.

---

# Público-alvo

* Torcedores da Seleção Brasileira
* Jornalistas
* Criadores de conteúdo
* Pesquisadores
* Blogueiros
* Pessoas que acompanham futebol internacional

---

# Proposta de Valor

"Um diário automático da caminhada da Seleção Brasileira rumo à Copa de 2030."

---

# MVP

## Página inicial

Exibir:

Contagem de dias com uma barra de progresso que ocupe toda a largura da página, com a representação visual da quantidade de dias passados no início do novo ciclo, 05/07/26, até o dia da abertura da copa de 20230. Além de ter a informação: "xxxx dias para a Copa". Abaixo da barra, deve exibir o conteúdo do dia. 

Exemplo:

**Este foi dia 01 de 1458 para a Copa do Mundo de 2030**

Resumo do dia

Últimos posts

Busca

Cadastro para newsletter

---

## Estrutura de um post

Título

**Dia 01 de 1458 dias para a Copa**

Subtítulo

Resumo em até três parágrafos explicando os principais acontecimentos do dia.

Seções

* Seleção Brasileira
* Comissão Técnica
* Jogadores
* CBF
* FIFA
* Copa 2030

Cada notícia deve apresentar:

* Thumbnail
* Título
* Fonte
* Link original

---

# Fontes

Primeira versão utilizando apenas fontes oficiais e RSS.

Exemplos:

* ge - https://ge.globo.com
* ESPN Brasil - https://www.espn.com.br
* UOL Esporte - https://www.uol.com.br/esporte/
* CNN Brasil Esportes - https://www.cnnbrasil.com.br/esportes/
* Gazeta Esportiva - https://www.gazetaesportiva.com
* Terra Esportes - https://www.terra.com.br/esportes/
* Lance! - https://www.lance.com.br
* Goal Brasil - https://www.goal.com/br
* O GLOBO Esportes - https://oglobo.globo.com/esportes/
* FIFA - https://www.fifa.com
* FIFA+ - https://www.plus.fifa.com
* CBF - https://www.cbf.com.br
* CBF TV - https://www.cbf.com.br/cbf-tv

Novas fontes poderão ser adicionadas futuramente.

---

# Fluxo diário

Uma vez por dia:

1. Buscar notícias.
2. Remover duplicatas.
3. Classificar por tema.
4. Selecionar apenas notícias relevantes.
5. Gerar resumo.
6. Criar post em Markdown.
7. Fazer commit automaticamente.
8. Publicar o site.
9. Enviar newsletter.

---

# Arquitetura

Frontend

* Next.js
* Tailwind CSS
* MDX

Hospedagem

* Vercel

Repositório

* GitHub

Automação

* GitHub Actions

IA

* Modelo de linguagem via API para resumir e estruturar o conteúdo.

---

# Estrutura do conteúdo

/content

2026-07-08.mdx

2026-07-09.mdx

2026-07-10.mdx

---

# Newsletter

Cada novo post gera automaticamente:

* título do e-mail
* resumo
* link para leitura completa

---

# Requisitos Funcionais

RF-01 Coletar notícias diariamente.

RF-02 Remover duplicidades.

RF-03 Agrupar notícias por categoria.

RF-04 Gerar resumo editorial.

RF-05 Criar post automaticamente.

RF-06 Publicar automaticamente.

RF-07 Enviar newsletter.

RF-08 Permitir busca por posts.

RF-09 Exibir contagem regressiva para a Copa de 2030.

---

# Requisitos Não Funcionais

* Baixo custo operacional.
* Funcionamento totalmente automático.
* Sem necessidade de servidor dedicado.
* Tempo de geração inferior a cinco minutos.
* Site otimizado para SEO.
* Performance elevada.
* Interface responsiva.

---

# Roadmap

## V1

* Posts automáticos
* Newsletter
* Busca
* Arquivo histórico

## V2

* Perfil de jogadores
* Linha do tempo
* Estatísticas
* Convocações
* Histórico de partidas

## V3

* IA conversacional sobre todo o ciclo
* Alertas personalizados
* Favoritos
* Dashboard analítico
* Aplicativo móvel

---

# Métricas

* Assinantes da newsletter
* Visitantes recorrentes
* Tempo médio de leitura
* Taxa de abertura dos e-mails
* Cliques nas notícias
* Crescimento do acervo histórico

---

# Visão de Longo Prazo

Ao final do ciclo da Copa de 2030, o Novo Ciclo terá construído automaticamente um registro histórico completo da reconstrução da Seleção Brasileira, permitindo revisitar cada dia, cada convocação, cada decisão da comissão técnica e cada acontecimento relevante desde o início do ciclo até a estreia no Mundial.

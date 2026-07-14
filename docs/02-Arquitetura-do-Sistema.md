---
title: 02-Arquitetura-do-Sistema

---

# 02-Arquitetura-do-Sistema

## Objetivo

Este documento descreve a arquitetura técnica do Novo Ciclo, definindo os componentes do sistema, o fluxo completo da automação, a comunicação entre módulos e as responsabilidades de cada etapa.

O objetivo da arquitetura é garantir que o projeto seja:

* Totalmente automatizado;
* De baixo custo operacional;
* Escalável;
* Fácil de manter;
* Independente de servidores dedicados;
* Baseado em geração de conteúdo estático.

---

# Princípios da Arquitetura

O sistema deve seguir os seguintes princípios:

### Automação total

Nenhuma etapa da publicação diária deve depender de intervenção humana.

### Modularidade

Cada responsabilidade deve estar isolada em um módulo independente.

### Conteúdo como código

Todo o conteúdo publicado deve existir como arquivos versionados dentro do repositório Git.

### Fontes confiáveis

O sistema deve privilegiar fontes oficiais e veículos reconhecidos, evitando rumores e conteúdos sem atribuição clara.

### Baixo custo

Toda a infraestrutura deve operar utilizando serviços gratuitos ou de baixo custo sempre que possível.

---

# Visão Geral

O Novo Ciclo funciona como uma linha de produção editorial automatizada.

Todos os dias o sistema:

1. Coleta notícias.
2. Remove duplicidades.
3. Classifica os acontecimentos.
4. Identifica os fatos mais relevantes.
5. Escreve um Dia do dia.
6. Publica automaticamente.
7. Atualiza a newsletter.
8. Atualiza o sitemap e o RSS.

Cada etapa possui uma responsabilidade única.

---

# Arquitetura Geral

```text
                    Scheduler

                        │

                        ▼

             Coleta das notícias

                        │

                        ▼

            Normalização dos dados

                        │

                        ▼

          Curadoria e classificação

                        │

                        ▼

          Construção da narrativa diária

                        │

                        ▼

            Geração do arquivo MDX

                        │

                        ▼

            Commit automático no Git

                        │

                        ▼

               Build do Next.js

                        │

                        ▼

               Deploy na Vercel

                        │

                        ▼

         Newsletter + RSS + Sitemap
```

---

# Componentes

## Scheduler

Responsável por iniciar automaticamente o processo diário.

Responsabilidades:

* Executar uma vez por dia.
* Controlar reexecuções em caso de falha.
* Registrar logs.
* Acionar o pipeline completo.

---

## Coletor

Responsável por buscar notícias.

Entradas:

* RSS
* Sites oficiais
* APIs futuras

Saída:

Lista padronizada de notícias.

---

## Normalizador

Converte todas as notícias para um único formato.

Cada item deverá conter:

* título
* resumo
* URL
* fonte
* thumbnail (quando disponível)
* data
* autor (quando disponível)
* categoria
* idioma

---

## Curador

Responsável por decidir quais notícias entram no Dia do dia.

Critérios:

* relevância
* novidade
* credibilidade
* impacto
* duplicidade

O curador também agrupa notícias relacionadas em um único acontecimento.

---

## Escritor

O Escritor não produz um resumo de notícias.

Ele produz um Dia do diário.

Entrada:

Lista de acontecimentos.

Saída:

Um documento editorial contendo:

* título
* subtítulo
* narrativa
* resumo
* acontecimentos
* referências

O foco deve ser contar o que aconteceu naquele dia.

---

## Publicador

Responsável por transformar o conteúdo editorial em arquivos do projeto.

Funções:

* gerar MDX
* atualizar índices
* gerar páginas
* criar commit
* enviar para o repositório

---

## Newsletter

Responsável por gerar uma versão resumida do Dia.

Objetivos:

* incentivar a leitura completa
* destacar os principais acontecimentos
* direcionar para o site

---

## SEO

Responsável por atualizar automaticamente:

* sitemap
* RSS
* metadados
* Open Graph
* dados estruturados

---

# Fluxo Diário

## Etapa 1

Coleta.

↓

## Etapa 2

Normalização.

↓

## Etapa 3

Remoção de duplicidades.

↓

## Etapa 4

Classificação.

↓

## Etapa 5

Curadoria.

↓

## Etapa 6

Construção da narrativa.

↓

## Etapa 7

Geração do MDX.

↓

## Etapa 8

Commit automático.

↓

## Etapa 9

Deploy.

↓

## Etapa 10

Newsletter.

↓

## Etapa 11

Atualização de SEO.

---

# Estrutura de Pastas

```text
/docs

/content

/public

/scripts

/agents

/lib

/types

/components

/app

/github

/newsletter
```

---

# Logs

Cada execução deverá registrar:

* horário de início
* horário de término
* quantidade de notícias coletadas
* quantidade removida por duplicidade
* quantidade utilizada
* tempo de geração
* status final

---

# Recuperação de Falhas

Caso alguma etapa falhe:

* registrar erro;
* interromper a publicação;
* manter o último conteúdo publicado;
* permitir reexecução da etapa sem reiniciar todo o pipeline.

---

# Escalabilidade

A arquitetura deve permitir adicionar novos módulos sem alterar o restante do sistema.

Exemplos:

* novos idiomas;
* novas competições;
* novos esportes;
* podcasts;
* vídeos;
* estatísticas;
* histórico de jogadores;
* inteligência conversacional.

---

# Filosofia Editorial

O Novo Ciclo não é um agregador de manchetes.

Ele é um diário histórico.

Cada publicação representa um Dia da caminhada da Seleção Brasileira rumo à Copa do Mundo de 2030.

As notícias servem como evidências para construir a narrativa daquele dia.

O protagonista do site não é a notícia.

O protagonista é o próprio ciclo.

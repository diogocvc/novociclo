---
title: 05-Estrutura-do-Projeto

---

# 05 — Estrutura do Projeto

## Objetivo

Este documento define a organização física do repositório do Novo Ciclo.

Todos os arquivos, scripts, agentes, documentos e conteúdos devem seguir esta estrutura.

O objetivo é manter o projeto organizado, previsível e facilmente compreendido tanto por desenvolvedores quanto por ferramentas de IA.

---

# Princípios

A estrutura deve seguir cinco princípios.

## Separação de responsabilidades

Cada pasta possui uma única responsabilidade.

Nenhum arquivo deve possuir responsabilidades múltiplas.

---

## Conteúdo como código

Todo conteúdo editorial pertence ao repositório.

Não existe CMS.

---

## Convenção acima de configuração

Sempre que possível, a estrutura deve ser previsível.

Não depender de configurações espalhadas.

---

## Baixo acoplamento

Módulos não devem depender diretamente uns dos outros.

A comunicação deve ocorrer através de contratos bem definidos.

---

## Escalabilidade

A estrutura deve suportar novos ciclos, novos esportes e novos produtos sem reorganizações profundas.

---

# Estrutura Geral

```text
novo-ciclo/

├── app/
├── components/
├── content/
├── public/
├── styles/
├── lib/
├── types/
├── config/
├── agents/
├── automation/
├── scripts/
├── docs/
├── tests/
├── .github/
└── package.json
```

---

# app/

Aplicação Next.js.

Responsável apenas pela interface e roteamento.

Nunca deve conter lógica editorial.

---

# components/

Componentes reutilizáveis.

Exemplos:

* Header
* Footer
* Hero
* Card de notícia
* Card de acontecimento
* Timeline
* Contador
* Newsletter
* Busca
* Player de vídeo (futuro)

---

# content/

Todo conteúdo publicado.

```text
content/

2026/
    07/
       05.mdx
       06.mdx

2027/
2028/
2029/
2030/
```

Cada arquivo representa um Dia.

---

# public/

Arquivos públicos.

```text
public/

images/

icons/

logos/

og/

favicons/
```

---

# styles/

Estilos globais.

* globals.css
* tokens.css
* animations.css

---

# lib/

Bibliotecas internas.

Exemplos:

* markdown
* rss
* seo
* analytics
* newsletter
* logger
* cache
* date
* formatter

---

# types/

Todos os tipos compartilhados.

Exemplos:

* News
* Event
* Chapter
* Source
* Category

---

# config/

Arquivos de configuração.

Exemplo:

```text
config/

cycle.ts
sources.ts
categories.ts
newsletter.ts
seo.ts
```

Nenhum valor fixo deve existir espalhado pelo código.

---

# agents/

Toda a inteligência editorial.

```text
agents/

researcher/

curator/

editor/

writer/

reviewer/
```

Cada agente possui:

* prompt
* regras
* implementação
* testes

---

# automation/

Fluxos automatizados.

Exemplo:

```text
automation/

daily-pipeline.ts

publish.ts

send-newsletter.ts

generate-feed.ts
```

---

# scripts/

Scripts de manutenção.

Exemplos:

```text
scripts/

create-post.ts

import-rss.ts

generate-sitemap.ts

check-links.ts

backup.ts
```

---

# docs/

Toda a documentação oficial.

```text
docs/

00-product-vision.md

01-prd.md

02-system-architecture.md

03-agents.md

04-data-model.md

05-project-structure.md

06-prompts.md

07-ui.md

08-design-system.md

09-automation.md

10-deployment.md
```

A documentação é considerada parte do produto.

---

# tests/

Testes automatizados.

Organização:

```text
tests/

agents/

automation/

components/

integration/
```

---

# .github/

Configuração do GitHub.

```text
.github/

workflows/

daily.yml

deploy.yml

test.yml
```

---

# Convenções de Nomenclatura

## Arquivos

Utilizar kebab-case.

Exemplo:

```text
daily-pipeline.ts
```

---

## Componentes React

PascalCase.

Exemplo:

```text
NewsCard.tsx
```

---

## Hooks

Sempre iniciar com "use".

Exemplo:

```text
useCountdown.ts
```

---

## Tipos

PascalCase.

Exemplo:

```text
Chapter
```

---

## Constantes

UPPER_SNAKE_CASE.

Exemplo:

```text
MAX_NEWS_PER_DAY
```

---

# Organização do Conteúdo

Cada Dia deve permanecer imutável após sua publicação.

Caso seja necessária uma correção editorial, ela deve gerar um registro de atualização preservando a transparência da alteração.

---

# Organização das Imagens

Sempre que possível, utilizar imagens remotas.

Caso uma imagem precise ser armazenada localmente:

```text
public/images/

2027/

01/

08/
```

---

# Configuração do Ciclo

Toda configuração do ciclo deve existir em um único arquivo.

Exemplo:

```text
config/cycle.ts
```

Campos esperados:

* nome do ciclo
* data de início
* data da Copa
* título padrão
* descrição padrão
* idioma
* fuso horário

---

# Responsabilidades

| Pasta      | Responsabilidade          |
| ---------- | ------------------------- |
| app        | Interface                 |
| components | Componentes reutilizáveis |
| content    | Capítulos                 |
| lib        | Utilitários               |
| config     | Configurações             |
| agents     | Inteligência editorial    |
| automation | Pipeline diário           |
| scripts    | Ferramentas auxiliares    |
| docs       | Documentação              |
| tests      | Testes                    |

---

# Princípio Fundamental

A estrutura do projeto deve refletir a arquitetura do sistema.

Qualquer desenvolvedor ou agente de IA deve conseguir localizar rapidamente onde uma funcionalidade pertence apenas observando a organização das pastas.

Nenhuma pasta deve acumular responsabilidades que pertencem a outra.

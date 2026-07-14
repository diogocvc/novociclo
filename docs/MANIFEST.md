---
title: MANIFEST.md

---

# MANIFEST.md

# Manifesto do Projeto — Novo Ciclo

## Objetivo

Este documento é o ponto de entrada oficial do projeto **Novo Ciclo**.

Todo desenvolvedor, colaborador ou agente de IA deve ler este documento antes de realizar qualquer alteração no repositório.

O objetivo do Manifesto é garantir que todas as decisões, implementações e evoluções do projeto sigam os mesmos princípios, reduzindo ambiguidades, retrabalho e inconsistências.

---

# Filosofia do Projeto

O Novo Ciclo é um produto orientado por documentação.

A documentação não é um complemento do software; ela faz parte do software.

Toda decisão relevante deve ser registrada.

Toda implementação deve respeitar a arquitetura documentada.

Toda evolução do sistema deve manter a consistência entre código, documentação e produto.

Quando existir divergência entre código e documentação, a documentação deve ser considerada a fonte oficial da verdade até que a decisão seja revisada e registrada.

---

# Missão do Produto

O Novo Ciclo registra diariamente a caminhada da Seleção Brasileira de futebol rumo à Copa do Mundo de 2030.

O produto não é um agregador de manchetes.

O produto é um diário histórico construído automaticamente a partir de acontecimentos relevantes identificados em fontes confiáveis.

As notícias são referências.

Os acontecimentos são a matéria-prima.

Os capítulos diários são o produto final.

---

# Princípios Fundamentais

Todas as decisões do projeto devem respeitar os seguintes princípios:

* Automação sempre que possível.
* Simplicidade acima de complexidade.
* Clareza acima de otimizações prematuras.
* Baixo custo operacional.
* Arquitetura modular.
* Conteúdo como código.
* Fontes confiáveis.
* Transparência editorial.
* Evolução incremental.
* Reutilização antes de reescrita.

---

# Fluxo de Leitura Obrigatório

Antes de iniciar qualquer tarefa, leia os documentos nesta ordem:

1. PROJECT_STATE.md
2. DECISIONS.md
3. 00-product-vision.md
4. 01-prd.md
5. 02-system-architecture.md
6. 03-agents.md
7. 04-data-model.md
8. 05-project-structure.md

Somente após compreender esses documentos uma nova implementação deve ser iniciada.

---

# Processo de Desenvolvimento

Toda alteração deve seguir este fluxo:

1. Compreender o problema.
2. Verificar se já existe uma decisão registrada em DECISIONS.md.
3. Confirmar o estado atual do projeto em PROJECT_STATE.md.
4. Implementar a solução respeitando a arquitetura.
5. Atualizar a documentação, quando necessário.
6. Atualizar PROJECT_STATE.md.
7. Registrar uma nova decisão arquitetural em DECISIONS.md, caso a implementação introduza uma mudança permanente.

---

# Critérios para Novas Funcionalidades

Antes de implementar qualquer funcionalidade, responda às seguintes perguntas:

* Resolve um problema real do produto?
* Respeita a arquitetura existente?
* Introduz dependências realmente necessárias?
* Mantém o baixo custo operacional?
* Pode ser reutilizada no futuro?
* Está documentada?
* Pode ser testada de forma isolada?

Se qualquer resposta for negativa, a implementação deve ser reavaliada.

---

# Regras para Agentes de IA

Agentes de IA devem:

* Respeitar a arquitetura documentada.
* Não alterar decisões arquiteturais sem registro prévio.
* Não criar novas estruturas de diretórios sem justificativa.
* Não duplicar funcionalidades existentes.
* Não assumir regras de negócio que não estejam documentadas.
* Solicitar atualização da documentação sempre que identificarem inconsistências.

---

# Regras para Colaboradores

Todo colaborador deve:

* Ler a documentação antes de modificar o projeto.
* Manter o código consistente com os documentos oficiais.
* Evitar soluções temporárias sem registro.
* Priorizar legibilidade e simplicidade.
* Registrar decisões permanentes.

---

# Estrutura da Documentação

A documentação oficial está organizada da seguinte forma:

## Core

Documentos responsáveis por orientar todo o projeto.

* MANIFEST.md
* PROJECT_STATE.md
* DECISIONS.md

## Produto

Definem o propósito e os requisitos.

* 00-product-vision.md
* 01-prd.md

## Arquitetura

Definem o funcionamento interno.

* 02-system-architecture.md
* 03-agents.md
* 04-data-model.md
* 05-project-structure.md

## Desenvolvimento

Documentos técnicos utilizados durante a implementação.

* 06-editorial-guide.md
* 07-prompts.md
* 08-ui.md
* 09-design-system.md
* 10-automation.md
* 11-deployment.md

---

# Gestão de Mudanças

Toda mudança permanente deve seguir um destes caminhos:

## Ajuste de implementação

Não altera a documentação estrutural.

## Evolução arquitetural

Atualiza a documentação correspondente.

Registra uma nova decisão em DECISIONS.md.

Atualiza PROJECT_STATE.md.

---

# Definição de Concluído

Uma tarefa somente será considerada concluída quando:

* A implementação estiver funcional.
* A documentação estiver atualizada.
* O estado do projeto estiver atualizado.
* As decisões relevantes estiverem registradas.
* Os testes aplicáveis tiverem sido executados.
* Não existirem inconsistências conhecidas entre código e documentação.

---

# Escopo da IA

A IA auxilia na análise, implementação, documentação e revisão.

A responsabilidade pelas decisões finais de arquitetura, produto e publicação permanece com o mantenedor do projeto.

---

# Evolução da Documentação

A documentação deve evoluir junto com o software.

Documentos nunca devem ser abandonados.

Sempre que um documento deixar de refletir o funcionamento real do sistema, ele deve ser atualizado ou substituído.

---

# Princípio Final

O Novo Ciclo é um projeto orientado por documentação.

A documentação preserva a memória do projeto.

O código implementa essa memória.

Toda evolução deve fortalecer essa relação.

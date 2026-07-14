---
title: DECISIONS.md

---

# DECISIONS.md

# Registro de Decisões Arquiteturais

## Objetivo

Este documento registra todas as decisões arquiteturais permanentes do projeto Novo Ciclo.

Seu propósito é preservar o contexto das decisões tomadas ao longo do desenvolvimento, evitando que elas sejam perdidas com o tempo ou reavaliadas sem necessidade.

Sempre que uma decisão alterar a arquitetura, a estrutura do produto ou o fluxo principal do sistema, ela deve ser registrada neste documento.

---

# Como utilizar este documento

Cada decisão deve possuir:

* Identificador único.
* Status.
* Data.
* Contexto.
* Decisão.
* Alternativas consideradas.
* Consequências.

Os registros nunca devem ser removidos.

Caso uma decisão deixe de valer, ela deve ser marcada como **Substituída**, mantendo seu histórico.

---

# Status possíveis

* Proposta
* Aceita
* Substituída
* Descontinuada

---

# ADR-001

## Título

O Novo Ciclo será um produto orientado por documentação.

### Status

Aceita

### Data

10/07/2026

### Contexto

O projeto será desenvolvido durante vários anos utilizando IA e colaboração humana.

A memória da conversa não é suficiente para preservar decisões de longo prazo.

### Decisão

Toda informação estrutural do projeto será registrada em documentos versionados dentro do repositório.

A documentação será considerada a fonte oficial da verdade.

### Alternativas consideradas

* Utilizar apenas comentários no código.
* Depender da memória das conversas.
* Manter documentação externa.

### Consequências

* Maior consistência.
* Melhor continuidade entre sessões.
* Facilidade para troca de ferramentas de IA.

---

# ADR-002

## Título

Conteúdo como código.

### Status

Aceita

### Data

10/07/2026

### Contexto

O produto publica um capítulo diário e não necessita de edição em tempo real por múltiplos usuários.

### Decisão

Os capítulos serão armazenados em arquivos MDX versionados no Git.

### Alternativas consideradas

* CMS tradicional.
* Banco de dados.
* Headless CMS.

### Consequências

* Baixo custo.
* Histórico completo.
* Versionamento nativo.
* Deploy simplificado.

---

# ADR-003

## Título

Arquitetura baseada em agentes editoriais.

### Status

Aceita

### Data

10/07/2026

### Contexto

Uma única IA executando todas as etapas reduz a previsibilidade e dificulta testes.

### Decisão

O sistema será dividido em agentes especializados.

Cada agente possuirá uma única responsabilidade.

### Alternativas consideradas

* Um único agente.
* Pipeline procedural sem especialização.

### Consequências

* Maior modularidade.
* Melhor qualidade editorial.
* Facilidade para evolução.

---

# ADR-004

## Título

Os capítulos representam acontecimentos, não coleções de notícias.

### Status

Aceita

### Data

10/07/2026

### Contexto

Um agregador tradicional apenas lista manchetes.

O objetivo do Novo Ciclo é construir uma narrativa histórica.

### Decisão

Os agentes devem identificar acontecimentos e produzir capítulos sobre esses acontecimentos.

As notícias servem como referências.

### Alternativas consideradas

* Publicar listas de notícias.
* Gerar apenas resumos diários.

### Consequências

* Maior valor editorial.
* Conteúdo mais duradouro.
* Diferenciação em relação aos portais tradicionais.

---

# ADR-005

## Título

Identificação permanente dos capítulos.

### Status

Aceita

### Data

10/07/2026

### Contexto

Era necessário definir um padrão de identificação único e imutável para cada capítulo.

### Decisão

Todos os capítulos utilizarão o formato:

Dia {número do dia} de {duração total do ciclo} do ciclo da Seleção Brasileira para a Copa do Mundo de 2030.

A contagem regressiva para a Copa será exibida separadamente como informação contextual.

### Alternativas consideradas

* Exibir apenas os dias restantes.
* Atualizar ambos os números diariamente.
* Utilizar apenas a data como título.

### Consequências

* Identificador permanente.
* Melhor organização histórica.
* Maior clareza para o leitor.

---

# ADR-006

## Título

Baixo custo como princípio arquitetural.

### Status

Aceita

### Data

10/07/2026

### Contexto

O projeto deve permanecer sustentável mesmo com poucos recursos financeiros.

### Decisão

Priorizar tecnologias gratuitas ou de baixo custo sempre que não comprometerem a qualidade do produto.

### Alternativas consideradas

* Infraestrutura dedicada.
* Serviços gerenciados de alto custo.

### Consequências

* Menor custo operacional.
* Facilidade para escalar gradualmente.

---

# ADR-007

## Título

A IA possui responsabilidade editorial, não responsabilidade factual.

### Status

Aceita

### Data

10/07/2026

### Contexto

Modelos de linguagem podem produzir respostas incorretas quando utilizados como fonte de informação.

### Decisão

A IA será utilizada para organizar, classificar, relacionar e resumir conteúdos provenientes de fontes confiáveis.

Os fatos devem sempre estar apoiados por referências externas.

### Alternativas consideradas

* Permitir geração livre de conteúdo.
* Utilizar IA como fonte primária.

### Consequências

* Redução do risco de informações incorretas.
* Maior transparência editorial.
* Melhor rastreabilidade.

---

# ADR-008

## Título

Arquitetura preparada para múltiplos ciclos.

### Status

Aceita

### Data

10/07/2026

### Contexto

A plataforma poderá futuramente acompanhar outras competições ou equipes.

### Decisão

As regras de negócio serão desacopladas da Seleção Brasileira por meio de configurações de ciclo.

O Novo Ciclo será uma instância dessa arquitetura.

### Alternativas consideradas

* Implementação específica apenas para a Seleção Brasileira.

### Consequências

* Reutilização da plataforma.
* Facilidade para expansão.
* Menor acoplamento.

---

# Processo para novas decisões

Uma nova ADR deve ser criada quando houver mudanças em:

* arquitetura;
* modelo de dados;
* fluxo editorial;
* automação;
* estrutura do projeto;
* estratégia de publicação;
* infraestrutura;
* integrações permanentes.

Mudanças locais de implementação não exigem uma nova ADR.

---

# Princípio Final

Nenhuma decisão arquitetural importante deve permanecer apenas na memória de quem desenvolve o projeto.

Toda decisão permanente deve ser registrada, justificada e versionada para preservar a evolução do Novo Ciclo ao longo do tempo.

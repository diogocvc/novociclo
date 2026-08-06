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

# ADR-009

## Título

Filtro de relevância em camadas para o Researcher (escopo editorial).

### Status

Aceita

### Data

04/08/2026

### Contexto

O agregador passou a coletar de mais fontes (Placar, Band Esportes) e o somatório cego de pesos no Researcher permitiu a entrada de notícias fora do escopo do ciclo da Seleção Brasileira: jogadores de outras seleções na Copa do Mundo 2026, ex-jogadores em contexto de saúde e notícias de clube estrangeiro que citam um jogador da Seleção apenas como referência secundária.

Cinco notícias off-context no capítulo de 03/08 motivaram a revisão do filtro.

### Decisão

Estabelecer a regra editorial de relevância em camadas:

* **Sinais fortes** (seleção brasileira, eliminatórias, convocação/convocações, Copa 2030, CBF, Ancelotti) ⇒ inclui diretamente.
* **Jogador da Seleção como foco** ⇒ mantém notícia de clube estrangeiro (Vini Jr. → Arsenal/Real Madrid; Endrick → Roma).
* **Veto off-context** (clube estrangeiro, posicionamento secundário "concorrente de"/"disputar vaga com"/"rival de", URL `/futebol-internacional/` sem contexto forte) ⇒ exclui, exceto quando o jogador da Seleção é o foco.
* **Ex-jogador/saúde** ("estado de saúde", "ex-jogador", aposentado) ⇒ exclui mesmo contendo "seleção brasileira" no texto.

### Alternativas consideradas

* Exclusão cega por URL `/futebol-internacional/` — rejeitada por ser inconsistente entre fontes (ge/Placar/Band).
* Somatório cego de pesos por keyword — rejeitado por permitir falsos positivos e falsos negativos.

### Consequências

* Menos notícias fora do contexto editorial.
* Consistência de comportamento entre fontes.
* Ao remover notícias de um capítulo já gerado, o resumo e o corpo devem ser reescritos para a listagem final (o LLM escreve antes do filtro).

---

# ADR-010

## Título

Ampliação do filtro de relevância do Researcher (outras competições da Fifa, família/entretenimento, listas históricas e ex-jogadores/legado).

### Status

Aceita

### Data

04/08/2026

### Contexto

Cinco notícias off-context entraram no capítulo de 04/08: Copa do Mundo Feminina (outra competição da Fifa), "Filho de Neymar" (família/entretenimento), Neymar em lista de maiores goleiros (opinião/all-time), Roberto Carlos/ídolos na infância (nostalgia de ex-jogadores) e goleiro da Noruega que discutiu com Neymar (jogador de outra seleção citando um da Seleção como referência). O filtro em camadas do ADR-009 cobria apenas contexto de saúde/ex-jogador e posicionamento secundário de clube, sem tratar esses padrões.

### Decisão

Estender o filtro em camadas com cinco regras adicionais:

* **Outras competições da Fifa** (absoluto): keywords `copa do mundo feminina`, `copa feminina`, `mundial feminino`, `copa das nações` e padrões de URL `/feminina/`, `/copa-do-mundo-feminina/`, `/futebol-feminino/`.
* **Família/entretenimento** (absoluto): título iniciando com parentesco (`filho de`, `esposa de`, `irmão de`, `mãe de` etc.) + jogador da Seleção ⇒ exclui; URL `/entretenimento/` bloqueada.
* **Listas históricas/opinião** (relativo, após contexto forte): `lista de maiores goleiros da história`, `maiores jogadores da história`, `melhores goleiros da história` etc. ⇒ exclui, salvo contexto forte da Seleção.
* **Ex-jogadores/legado** (relativo): título iniciando com ex-jogador da Seleção (Roberto Carlos, Ronaldo, Ronaldinho, Kaká, Romário, Pelé, Zico, Sócrates, Rivellino, Garrincha…) ou keywords de nostalgia (`torciam`, `quando crianças`, `time do coração`) ⇒ exclui, salvo contexto forte.
* **Sujeito em oração relativa**: jogador da Seleção após `que …` no título deixa de ser o foco ("goleiro da Noruega que discutiu com Neymar"), sem afetar "Arteta conversou com Vini Jr." nem "Endrick é monitorado pela Roma, que estuda…".

### Alternativas consideradas

* Mover Neymar para a lista de ex-jogadores — rejeitado: mantido como jogador atual, com os vetos de família/listas cobrindo as notícias off-context.
* Adicionar clubes estrangeiros um a um (ex.: "RB Leipzig") — rejeitado: abordagem pontual; a regra de sujeito em oração relativa cobre o caso genericamente.
* Rodar cleanup em todos os capítulos — rejeitado nesta iteração; limpeza restrita ao capítulo de 04/08.

### Consequências

* Menos notícias fora do contexto editorial (família, entretenimento, outras competições e conteúdo de ex-jogadores).
* Comportamento consistente entre fontes (ge/Placar/Band).
* Ao remover notícias de um capítulo já gerado, o resumo e o corpo devem ser reescritos para a listagem final (mantém DE-6).

---

# ADR-011

## Título

Neymar tratado como ex-jogador da Seleção e listas/rankings como veto absoluto no filtro do Researcher.

### Status

Aceita

### Data

06/08/2026

### Contexto

Quatro notícias off-context entraram no capítulo de 05/08: três sobre polêmicas/comportamento pessoal de Neymar (beijo para torcedora, xingamentos, "tretas" e repercussão na imprensa europeia) e uma listicle de transferência de clube brasileiro com ranking dos jogadores mais caros ("Luiz Henrique no Flamengo?"). Neymar se aposentou da Seleção Brasileira após a Copa do Mundo de 2026, mas o filtro ainda o tratava como jogador atual (`SELEÇÃO_NAMES` + grupo SELEÇÃO com score 3), o que o tornava "foco" da notícia e impedia o veto off-context. A ADR-010 havia rejeitado mover Neymar para ex-jogadores sob a premissa de ele ser jogador atual — premissa que mudou.

### Decisão

* **Neymar como ex-jogador**: remover `neymar` do grupo SELEÇÃO e de `SELEÇÃO_NAMES`; adicionar a `FORMER_PLAYERS`.
* **Veto de ex-jogador sem relação direta** (antes do contexto forte): nova regra `hasFormerPlayerOffContext` — se o título cita ex-jogador e não contém contexto direto da Seleção (frase forte como `convocação`/`seleção brasileira`/`ancelotti` ou jogador atual Vini/Endrick/Rodrygo), exclui. Menção incidental de "seleção brasileira" no resumo não resgata conteúdo de ex-jogador. Ex.: "Polêmicas de Neymar", "Comportamento de Neymar", "Beijo para torcedora" excluídos; "Neymar é convocado" e "Seleção homenageia Neymar" mantidos.
* **Listas/rankings como veto absoluto**: ampliar `ALL_TIME_LIST_PHRASES` com `ranking dos jogadores mais caros`, `jogadores mais caros`, `veja o ranking` e mover o veto de listas para **antes** de `hasStrongSelecaoContext`, corrigindo o short-circuit em que menção a "seleção brasileira" no resumo deixava a listicle passar.

### Alternativas consideradas

* Vetos específicos de "polêmica"/"comportamento" sem tratar Neymar como ex-jogador — rejeitado: abordagem pontual; a aposentadoria de Neymar é a causa raiz e a regra de ex-jogador cobre o padrão genericamente.
* Manter listas/rankings como veto relativo — rejeitado: menção incidental de "seleção brasileira" no resumo (ex.: atacante "da seleção brasileira") fazia `hasStrongSelecaoContext` retornar antes do veto.

### Consequências

* Conteúdo de comportamento/entretenimento de ex-jogadores fora do escopo editorial não entra mais.
* Listicles/rankings de mercado (jogadores mais caros, maiores da história) excluídos mesmo com menção incidental à Seleção.
* Jogadores atuais (Vini Jr., Endrick, Rodrygo) seguem como foco de notícias de clube, conforme ADR-009.
* Ao remover notícias de um capítulo já gerado, o resumo e o corpo devem ser reescritos para a listagem final (mantém DE-6).

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

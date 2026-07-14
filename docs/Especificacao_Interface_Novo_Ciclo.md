# Especificação da Interface --- Web App **Novo Ciclo**

## Visão Geral

A interface apresenta um **web app editorial responsivo**, com uma
estética inspirada em jornais e revistas contemporâneas, combinando uma
linguagem institucional com elementos de dashboard. O layout utiliza uma
grade rígida, muito espaço em branco, tipografia de alto impacto e uma
paleta baseada nas cores da bandeira brasileira (verde, amarelo e azul),
reforçando o conceito da Copa do Mundo de 2030.

------------------------------------------------------------------------

# Especificação Geral

## Conceito visual

-   Estilo: Editorial + Dashboard
-   Personalidade: Minimalista, institucional, moderna e otimista.
-   Layout baseado em blocos (cards).
-   Grande uso de espaço negativo.
-   Bordas arredondadas suaves.
-   Hierarquia visual extremamente clara.

## Estrutura Desktop

Organização vertical:

``` text
Header
Countdown Banner
Featured Article
Weekly Navigation
Archive (Accordion)
Footer
```

------------------------------------------------------------------------

# Header

Altura aproximada: **88 px**

Distribuição:

``` text
LOGO

Rumo à Copa de 2030

                Manifesto
                Sobre
                Créditos
                Contato

                      Menu Circular
```

### Logo

-   Posicionado no canto esquerdo.
-   Formato:

``` text
NOVO
CICLO
```

-   Tipografia bold, caixa alta, preta.

### Navegação

Itens:

-   Manifesto
-   Sobre
-   Créditos
-   Contato

Características:

-   Caixa alta
-   Tracking levemente expandido
-   Fonte entre 12--14 px

### Botão Menu

-   Extremo direito
-   Círculo verde (\~48 px)
-   Ícone hambúrguer branco

------------------------------------------------------------------------

# Banner Superior (Countdown)

Principal elemento gráfico da página.

-   Altura aproximada: **160 px**
-   Border radius: **16 px**
-   Sem sombra

Estrutura:

``` text
┌──────────────────────────────────────────────┐
│ Verde Escuro │ Verde Claro │ Amarelo │ Azul │
└──────────────────────────────────────────────┘
```

## Área 1 --- Verde escuro

``` text
DIAS JÁ PASSARAM

487
```

Número ocupa quase toda a altura.

## Área 2 --- Verde claro

``` text
26,6%
```

Centralizado.

## Área 3 --- Amarelo

``` text
FALTAM

1339

DIAS PARA 2030
```

## Área 4 --- Azul

``` text
🏆

COPA DO MUNDO

2030

11 JUN 2030
```

------------------------------------------------------------------------

# Área Principal

Layout em duas colunas.

-   Texto: \~45%
-   Imagem: \~55%

## Coluna Esquerda

### Data

``` text
TERÇA, 20 DE MAIO DE 2025
```

Fonte pequena, verde.

### Headline

``` text
Pequenas escolhas,
grandes mudanças
```

-   Preto
-   Bold
-   Condensada
-   Aproximadamente 72--84 px

### Texto

> Todo novo ciclo começa com uma escolha. Não é sobre ter todas as
> respostas, mas sobre ter coragem para começar.

### CTA

``` text
LEITURA DE 6 MIN →
```

------------------------------------------------------------------------

## Coluna Direita

Imagem editorial em formato 16:9.

-   Vista aérea do Rio de Janeiro ao pôr do sol
-   Bordas arredondadas
-   Sem sombra

------------------------------------------------------------------------

# Navegação Semanal

Sete cards horizontais:

``` text
SEG TER QUA QUI SEX SÁB DOM
```

Cada card contém:

-   Dia
-   Número
-   Título
-   Seta →

### Card ativo

-   Fundo verde
-   Texto branco
-   Número em destaque

### Cards inativos

-   Fundo branco
-   Texto preto

------------------------------------------------------------------------

# Arquivo de Semanas

Título:

``` text
SEMANAS ANTERIORES
```

Lista em accordion:

``` text
Semana 20
12 MAI — 18 MAI
↓

Semana 19
↓

Semana 18
↓
```

Cada item possui divisor horizontal e chevron.

------------------------------------------------------------------------

# Footer

Esquerda:

``` text
NOVO CICLO

RUMO À COPA DO MUNDO DE 2030
```

Direita:

-   Instagram
-   Play

------------------------------------------------------------------------

# Layout Mobile

Largura aproximada: **390 px**

## Header

-   Logo
-   Botão menu

## Countdown

Empilhado verticalmente:

``` text
Verde

Amarelo

Azul
```

## Conteúdo

Fluxo:

``` text
Título
Texto
Tempo de leitura
Imagem
```

## Navegação semanal

Carrossel horizontal:

``` text
← SEG TER QUA QUI SEX →
```

Indicador de posição abaixo.

## Accordion

Mesmo comportamento do desktop, ocupando toda a largura.

------------------------------------------------------------------------

# Sistema Tipográfico

## Headline

-   Muito pesada
-   Condensada
-   Caixa baixa
-   Alto contraste

## Títulos

-   Sans-serif
-   Bold
-   Caixa alta

## Corpo

-   Sans-serif
-   Regular
-   Alta legibilidade

------------------------------------------------------------------------

# Paleta

-   Verde escuro: banner, card ativo e elementos institucionais
-   Verde claro: indicador de progresso
-   Amarelo: dias restantes
-   Azul: Copa 2030
-   Preto: tipografia principal
-   Branco: fundo

------------------------------------------------------------------------

# Componentes

-   Header responsivo
-   Logo
-   Navegação horizontal
-   Botão circular
-   Banner de métricas
-   Card editorial
-   Imagem destacada
-   CTA de leitura
-   Carrossel semanal
-   Cards de dia
-   Accordion
-   Footer
-   Ícones sociais

------------------------------------------------------------------------

# Responsividade

## Desktop (\>1024 px)

-   Duas colunas
-   Banner horizontal
-   Sete cards

## Tablet (768--1024 px)

-   Espaçamentos reduzidos
-   Título menor
-   Possível rolagem horizontal dos cards

## Mobile (\<768 px)

-   Menu hambúrguer
-   Banner vertical
-   Coluna única
-   Imagem abaixo do texto
-   Carrossel horizontal
-   Accordion em largura total

------------------------------------------------------------------------

# Princípios de UX

-   Hierarquia visual forte
-   Escaneabilidade elevada
-   Consistência no uso das cores
-   Responsividade preservando a hierarquia de informação

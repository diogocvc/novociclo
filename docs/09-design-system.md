---
title: 09-design-system
---

# 09 — Design System

## Objetivo

Este documento define o sistema de design do Novo Ciclo.

Todos os tokens, componentes e padrões visuais devem ser implementados de forma consistente em toda a interface.

O design system é a ponte entre a identidade visual definida no Design-Vision.md e a implementação técnica.

---

# Princípios

- **Consistência** — um mesmo token visual deve ter o mesmo significado em todo o sistema.
- **Simplicidade** — evitar variações desnecessárias de cor, tamanho ou espaçamento.
- **Acessibilidade** — contraste suficiente entre texto e fundo.
- **Editorial** — a tipografia é o elemento primário de hierarquia.

---

# Paleta de Cores

## Cores Primárias

| Nome | Token | Hex | Uso |
|---|---|---|---|
| Verde Principal | `--color-green-primary` | `#6E8746` | Banner (dias passados), card ativo, botão menu |
| Verde Claro | `--color-green-light` | `#BFD09C` | Banner (percentual), indicadores secundários |
| Azul Principal | `--color-blue-primary` | `#375E8C` | Banner (Copa 2030) |
| Azul Escuro | `--color-blue-dark` | `#2F3F7E` | Hover de elementos azuis |
| Amarelo | `--color-yellow` | `#D7B438` | Banner (dias restantes) |
| Vermelho Destaque | `--color-red` | `#B94B3C` | Uso extremamente pontual |

## Cores Neutras

| Nome | Token | Hex | Uso |
|---|---|---|---|
| Creme | `--color-cream` | `#F4EFE4` | Fundo predominante da página |
| Branco | `--color-white` | `#FFFFFF` | Fundo de cards, texto em banner |
| Preto Texto | `--color-text` | `#1E1E1E` | Tipografia principal |
| Cinza Claro | `--color-gray-light` | `#E8E4D8` | Bordas, divisores |
| Cinza Médio | `--color-gray-medium` | `#A09888` | Texto secundário |


## Aplicação

| Elemento | Cor |
|---|---|
| Fundo da página | Creme (`#F4EFE4`) |
| Texto principal | Preto Texto (`#1E1E1E`) |
| Fundo de cards | Branco (`#FFFFFF`) |
| Bordas e linhas | Cinza Claro (`#E8E4D8`) |
| Texto secundário | Cinza Médio (`#A09888`) |
| Data no cabeçalho | Verde Principal (`#6E8746`) |

---

# Tipografia

## Fontes

- **Headline / Títulos**: Sans-serif condensada (ex: Inter Tight, Oswald ou similar).
- **Corpo / Navegação**: Sans-serif (ex: Inter, Work Sans ou similar).

## Escala Tipográfica

| Nível | Tamanho | Peso | Line-Height | Tracking | Uso |
|---|---|---|---|---|---|
| Hero / Headline | 72–84 px | Bold (700) | 1.0 | -0.02em | Título principal do dia |
| H1 | 40–56 px | Bold (700) | 1.1 | -0.01em | Títulos de seção |
| H2 | 28–36 px | Semibold (600) | 1.2 | Normal | Subtítulos |
| H3 | 22–26 px | Semibold (600) | 1.3 | Normal | Títulos de cards |
| Body | 18–20 px | Regular (400) | 1.6 | Normal | Texto corrido |
| Caption | 14–16 px | Regular (400) | 1.5 | Normal | Metadados, datas |
| Small | 12–14 px | Regular (400) | 1.4 | +0.02em | Navegação, footer |

## Caixa

| Contexto | Caixa |
|---|---|
| Logo | Alta (caixa alta) |
| Navegação | Alta (caixa alta) |
| Headline | Baixa (caixa baixa) |
| Datas | Alta (caixa alta) |
| CTA | Alta (caixa alta) |
| Corpo | Mista (padrão) |
| Card título | Mista (padrão) |

---

# Espaçamento

## Escala

| Token | Valor |
|---|---|
| `--space-1` | 8 px |
| `--space-2` | 16 px |
| `--space-3` | 24 px |
| `--space-4` | 40 px |
| `--space-5` | 64 px |
| `--space-6` | 96 px |
| `--space-7` | 128 px |

## Aplicação

| Contexto | Espaçamento |
|---|---|
| Padding interno de cards | 24 px (`--space-3`) |
| Padding do header | 16–24 px (`--space-2` a `--space-3`) |
| Gap entre seções principais | 64 px (`--space-5`) |
| Gap entre seções no mobile | 40 px (`--space-4`) |
| Padding do container | 24 px (`--space-3`) |
| Gap entre cards semanais | 16 px (`--space-2`) |

---

# Bordas e Cantos

## Border Radius

| Token | Valor | Uso |
|---|---|---|
| `--radius-sm` | 4 px | Ícones, elementos pequenos |
| `--radius-md` | 8 px | Cards (default) |
| `--radius-lg` | 16 px | Banner principal |

## Bordas

- Largura: 1 px.
- Cor: `--color-gray-light` (`#E8E4D8`).
- Opacidade reduzida quando aplicável.
- Cards inativos: borda sutil.
- Cards ativos: sem borda (fundo sólido verde).

## Sombras

Não utilizar sombras decorativas.

A separação entre elementos deve acontecer através do espaço e das cores.

---

# Componentes

## Botões

### Primário (CTA)

- Fundo: Verde Principal (`#6E8746`).
- Texto: Branco.
- Padding: 16 px 32 px.
- Border-radius: 8 px.
- Caixa alta.
- Bold.
- Sem sombra.

### Secundário

- Contorno 1 px Verde Principal.
- Texto: Verde Principal.
- Padding: 16 px 32 px.
- Border-radius: 8 px.

### Terciário

- Apenas texto.
- Cor: Verde Principal.
- Sem fundo ou borda.

## Cards

### Card de Dia (Navegação Semanal)

| Propriedade | Ativo | Inativo |
|---|---|---|
| Fundo | Verde Principal | Branco |
| Texto | Branco | Preto |
| Borda | Nenhuma | 1 px Cinza Claro |
| Número do dia | Grande e bold | Normal |

### Card de Acontecimento

- Fundo: Branco.
- Padding: 24 px.
- Border-radius: 8 px.
- Título bold, corpo regular.
- Link de referência no rodapé.

## Banner (Countdown)

- Border-radius: 16 px.
- Quatro áreas coloridas sem separadores visuais.
- Texto branco em todas as áreas.
- Números grandes e impactantes.
- Sem sombra.

## Accordion

- Linha divisória: 1 px Cinza Claro.
- Padding: 16 px 0.
- Chevron animado na expansão.
- Conteúdo expandido: padding 8 px 0 16 px 0.

## Footer

- Padding: 40 px 0.
- Texto: Cinza Médio.
- Tamanho: 12 px.
- Links com hover para Verde Principal.

---

# Ícones

## Estilo

- Outline (traço fino).
- Tamanho: 20–24 px.
- Cor: herdada do contexto.
- Poucos ícones.
- Nunca ilustrativos.

## Ícones Necessários (versão inicial)

- Menu (hambúrguer).
- Seta para direita (CTA, cards).
- Chevron para baixo (accordion).
- Instagram.
- Play.
- Troféu (banner).

---

# Imagens

## Especificações

- Formato 16:9 (imagem principal do capítulo).
- Border-radius: 8 px.
- Sem sombra.
- Preferência por fotografia documental ou histórica.

## Diretrizes

- Grandes e com boa resolução.
- Poucas por página (1–2).
- Aparência orgânica.
- Evitar imagens artificiais ou genéricas.

---

# Grid

## Desktop

- 12 colunas.
- Container máx: 1200 px.
- Gutter: 24 px.

## Tablet

- 4 colunas.
- Gutter: 16 px.

## Mobile

- 1 coluna.
- Padding lateral: 16–24 px.
- Sem gutter.

---

# Animações

## Permitidas

- Fade (transições de estado).
- Slide (accordion, carrossel).
- Hover discreto (escurecimento ou mudança de cor).
- Chevron rotate (accordion).

## Proibidas

- Bounce.
- Efeitos elásticos.
- Parallax exagerado.
- Animações puramente decorativas.

## Duração

- Transições curtas: 150–200 ms.
- Animações de accordion: 250–300 ms.

---

# Responsividade

## Adaptações por Breakpoint

| Elemento | Desktop (> 1024) | Tablet (768–1024) | Mobile (< 768) |
|---|---|---|---|
| Grid | 12 colunas | 4 colunas | 1 coluna |
| Banner | Horizontal 160px | Horizontal reduzido | Vertical empilhado |
| Conteúdo | 2 colunas (45/55) | 2 colunas (50/50) | 1 coluna (vertical) |
| Navegação | 7 cards fixos | 7 cards (rolagem) | Carrossel horizontal |
| Headline | 72–84 px | 48–56 px | 36–42 px |
| Espaçamentos | 64 px | 40 px | 24–32 px |

---

# Tokens CSS

```css
:root {
  /* Colors */
  --color-green-primary: #6E8746;
  --color-green-light: #BFD09C;
  --color-blue-primary: #375E8C;
  --color-blue-dark: #2F3F7E;
  --color-yellow: #D7B438;
  --color-red: #B94B3C;
  --color-cream: #F4EFE4;
  --color-white: #FFFFFF;
  --color-text: #1E1E1E;
  --color-gray-light: #E8E4D8;
  --color-gray-medium: #A09888;

  /* Typography */
  --font-headline: 'Inter Tight', sans-serif;
  --font-body: 'Inter', sans-serif;

  /* Spacing */
  --space-1: 8px;
  --space-2: 16px;
  --space-3: 24px;
  --space-4: 40px;
  --space-5: 64px;
  --space-6: 96px;
  --space-7: 128px;

  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;

  /* Layout */
  --container-max: 1200px;
  --content-ideal: 820px;
}
```

---

# Princípio Fundamental

O design system do Novo Ciclo deve ser pequeno, consistente e fácil de manter.

Cada token existe para um propósito específico.

Nenhum valor visual deve existir fora do sistema de tokens.

# PLAN — Joselito Design System

> Estado del plan de trabajo. Se actualiza tras cada sesión.
> Estados: ⬜ pendiente · 🟡 en progreso · ✅ completado
> Orden de trabajo: **Tokens → Base (Foundations/Brand) → Componentes → Módulos → Templates**
>
> Última actualización: 2026-07-20 · Fase 1 (Tokens) COMPLETA ✅.

## Fase 0 — Setup del proyecto ✅
- ✅ Verificar instrucciones (puntos 1-4) y acceso Figma MCP
- ✅ Vincular carpeta local (`github-token.txt`)
- ✅ Scaffold: Vite + React 19 + TS + Tailwind v4 + GSAP + SVGR
- ✅ Storybook 10 (MDX + remark-gfm + a11y)
- ✅ GitHub Actions → GitHub Pages
- ✅ CONTEXT.md y PLAN.md · push inicial a `main`
- ⬜ Activar GitHub Pages (Settings → Pages → Source: GitHub Actions)

## Fase 1 — Tokens (primitivas → semánticos)
Colecciones en Figma: **Primitives** (133) · **Responsive** (132, 7 breakpoints) · **Semantic-Color** (276, 5 modos).
- ✅ Breakpoints (Responsive): XS-390, SM-480, M-768, LG-1024, XL-1440, XXL-1620, XXXL-1920 — tokens en `src/tokens/breakpoints.ts` + `@theme` Tailwind + selector Storybook + docs
- ✅ Colores primitivos (Primitives) → tokens/primitives.css (@theme)
- ✅ Colores semánticos (5 temas [data-theme]) → tokens/semantic.css
- ✅ Tipografías / estilos de texto (type-*, responsive) → tokens/typography.css + fonts.css
- ✅ Espaciados (fijos + responsive + radios) → tokens/spacing.css
- ✅ Grid 12 columnas (.grid-wrapper/.grid-12) → tokens/grid.css
- ✅ Effect styles (elevaciones + blur) → tokens/effects.css

## Fase 2 — Base: Foundations / Brand Assets [prioritarios]
- ✅ Aspect Ratio (9:16…16:9) → components/AspectRatio
- ✅ Icon (XXS-L, currentColor) + 109 iconos importados → components/Icon
- ⬜ Brand Logo (Joselito) + Logo Grid
- ⬜ Client Logos (Riu, UFV, Accenture, Allianz, BBVA… — set de logos de cliente)

## Fase 3 — Componentes
> Primero los base (buttons, fragments). Los `z_fragment_*` son subcomponentes base.
- ✅ UI01-Nav-Button → components/NavButton
- ✅ UI02-Button (Primary/Secondary/Terciary · XS-XL · estados) → components/Button
- ✅ UI03-Button-Icon → components/ButtonIcon
- ✅ UI04-Button-Action-Link → components/ActionLink
- ✅ UI05-Tabs (Primary/Secondary) → components/Tabs
- ✅ UI06-Input (M/L, estados Forms) → components/Input
- ✅ UI07-Listbox → components/Listbox
- ✅ UI08-Checkbox-List → components/CheckboxList
- ✅ UI09-Checkbox-Label → components/CheckboxLabel
- ✅ UI10-Checkboxes-Radios → components/Checkbox + components/Radio
- ✅ UI11-Form (Form + FormRow 1-3 col) → components/Form
- ✅ UI12-Tag (Transaction/New/Aseptic · L/XS) → components/Tag
- ✅ UI13-Accordion (simple/multiple, accesible) → components/Accordion
- ✅ UI14-Placeholder-Text → components/PlaceholderText
- ✅ Card Product → components/CardProduct
- ✅ Card Link → components/CardLink
- ✅ Card Carrusel → components/CardCarousel
- ✅ Title → components/Title
- ⬜ Fragments de lista: Table List Item, list_characteristic, list_BigNumbers, list-archive

## Fase 4 — Módulos (100% viewport, grid 12 col, versiones por breakpoint)
> Primero navegación (usada en todas las páginas).
- ⬜ Navigation (principal)
- ⬜ Menu
- ⬜ Navigation / Secondary menu
- ⬜ Navigation / Breadcrumb
- ⬜ Navigation / PreviousNext
- ⬜ Navigation / Footer
- ⬜ Hero / Homepage hero
- ⬜ Hero / Section hero
- ⬜ Hero / Section header
- ⬜ Content / Title
- ⬜ Content / Intro text
- ⬜ Content / Text only
- ⬜ Content / Image only
- ⬜ Content / Text + Image
- ⬜ List / Characteristics
- ⬜ List / Numbers
- ⬜ List / Timeline
- ⬜ List / Archive table
- ⬜ Cards / Links
- ⬜ Cards / Gallery
- ⬜ Cards / Product carousel
- ⬜ Cards / Showcase
- ⬜ Cards / Categories
- ⬜ Cards / Accordion
- ⬜ Banners / Section banner
- ⬜ Form (módulo)
- ⬜ Toast

## Fase 5 — Page Templates (Sprint 1)
- ⬜ Home
- ⬜ Navegación
- ⬜ Origen: Nuestra Historia, La Dehesa
- ⬜ Excelencia: Añadas, Curación, Manual de Corte
- ⬜ Compromisos: Sostenibilidad, Happy Pigs, Salud
- ⬜ Experiencias y eventos
- ⬜ Colecciones Premium

## Notas
- Librería Figma NO publicada → flujo `use_figma` (ver CONTEXT §7).
- Páginas WIP (Ale, Miguel) excluidas del plan hasta consolidarse.
- Sin valores hardcodeados: todo desde tokens/subcomponentes.

# PLAN — Joselito Design System

> Estado del plan de trabajo. Se actualiza tras cada sesión.
> Estados: ⬜ pendiente · 🟡 en progreso · ✅ completado
> Orden de trabajo: **Tokens → Base (Foundations/Brand) → Componentes → Módulos → Templates**
>
> Última actualización: 2026-07-20 · Listado generado automáticamente desde Figma (todos son *master*).

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
- ⬜ Breakpoints (Responsive): XS-375, SM-480, M-768, LG-1024, XL-1440, XXL-1620, XXXL-1920 — deben coincidir en Storybook
- ⬜ Colores primitivos (Primitives)
- ⬜ Colores semánticos (Semantic-Color → `[data-theme]`): Light-White, Light-Grey, Dark-Red-Primary, Dark-Black-Neutral, Light-Yellow
- ⬜ Tipografías / estilos de texto (responsive por breakpoint)
- ⬜ Espaciados
- ⬜ Grid 12 columnas (layout guide styles)
- ⬜ Effect styles

## Fase 2 — Base: Foundations / Brand Assets [prioritarios]
- ⬜ Aspect Ratio (9:16, 2:3, 3:4, 1:1, 4:3, 3:2, 16:9)
- ⬜ Icon Sizer (XXS, XS, S, M, L) + set de iconos (~140, recoloreables por `currentColor`)
- ⬜ Brand Logo (Joselito) + Logo Grid
- ⬜ Client Logos (Riu, UFV, Accenture, Allianz, BBVA… — set de logos de cliente)

## Fase 3 — Componentes
> Primero los base (buttons, fragments). Los `z_fragment_*` son subcomponentes base.
- ⬜ UI01-Nav-Button
- ⬜ UI02-Button
- ⬜ UI03-Button-Icon
- ⬜ UI04-Button-Action-Link
- ⬜ UI05-Tabs (base: z_fragment_tab_primary, z_fragment_tab_secondary)
- ⬜ UI06-Input
- ⬜ UI07-Listbox (base: z_fragment_listbox_Item_Dropdown)
- ⬜ UI08-Checkbox-List
- ⬜ UI09-Checkbox-Label
- ⬜ UI10-Checkboxes-Radios
- ⬜ UI11-Form (base: z_fragment_row_2_input, z_fragment_row_3_input)
- ⬜ UI12-Tag
- ⬜ UI13-Accordion (base: z_fragment_accordion)
- ⬜ UI14-Placeholder-Text
- ⬜ Card Product
- ⬜ Card Link
- ⬜ Card Carrusel
- ⬜ Title
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

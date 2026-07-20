# PLAN — Joselito Design System

> Estado del plan de trabajo. Se actualiza tras cada sesión.
> Estados: ⬜ pendiente · 🟡 en progreso · ✅ completado
>
> Última actualización: 2026-07-20

## Fase 0 — Setup del proyecto
- ✅ Verificar instrucciones (puntos 1-4) y acceso Figma MCP
- ✅ Vincular carpeta local (`github-token.txt` presente)
- ✅ Scaffold base: Vite + React 19 + TypeScript
- ✅ Tailwind CSS v4, GSAP, SVGR
- ✅ Storybook 10 (MDX + remark-gfm + a11y)
- ✅ Estructura de carpetas (tokens/components/modules/templates/assets)
- ✅ GitHub Actions → GitHub Pages
- ✅ CONTEXT.md y PLAN.md
- ⬜ Push inicial a GitHub y activar GitHub Pages (Settings → Pages → GitHub Actions)

## Fase 1 — Tokens (primero primitivas/globales, luego semánticos)
> Pendiente de leer las variables de Figma con `use_figma` + `get_variable_defs`.
- ⬜ Breakpoints (variables responsive) — deben coincidir en Storybook
- ⬜ Colores primitivos
- ⬜ Colores semánticos (con modos → `[data-theme]`)
- ⬜ Tipografías / estilos de texto (responsive por breakpoint)
- ⬜ Espaciados
- ⬜ Grid 12 columnas (layout guide styles de Figma)
- ⬜ Effect styles (sombras, etc.)

## Fase 2 — Componentes base (foundations / brand assets) [prioritarios]
- ⬜ Aspect ratio (foundations)
- ⬜ Icons (brand assets, recoloreables)
- ⬜ Brand Logo (brand assets)

## Fase 3 — Componentes
> Por identificar en Figma. ¿Están todos creados como *master*?
- ⬜ (Pendiente de identificar: botones, tags, inputs, tabs, toggles…)

## Fase 4 — Módulos (100% viewport, grid 12 col, versiones por breakpoint)
- ⬜ (Pendiente de identificar: header, footer, heros…)

## Fase 5 — Page Templates
- ⬜ (Pendiente)

## Notas / decisiones pendientes
- Confirmar con el usuario si todos los componentes/módulos están creados como *master* en Figma (determina si el plan se genera automáticamente o identificando uno a uno).
- Librería Figma NO publicada → flujo `use_figma` (ver CONTEXT §7).

# CONTEXT.md — Joselito

Léelo junto con `PLAN.md` al empezar cada sesión. Lo mantiene Claude al día al cerrar cada sesión.

## 1. Objetivo
Reproducir en código (react-storybook), pixel perfect, los diseños de Figma de Joselito, con documentación en `es`. No se inventa ni se interpreta: se lee de Figma y se replica.

## 2. Fuentes
- Configuración: `hanzo.config.json` (Figma, plan de Figma, repo, perfil de salida).
- Perfil del Figma: `.ai/figma-profile.json` (roles de página, colecciones, convenciones, nivel A/B/C).
- Estado del plan: `.ai/index.json` → `PLAN.md`. Digests de másters: `.ai/masters/`.

## 3. Stack y estructura
Perfil `react-storybook` (scaffold de la skill hanzo-design-to-code): React 19 · Vite 7 · Tailwind 4 (`@tailwindcss/vite`) · Storybook 10 (`addon-docs` + `remark-gfm`) · GSAP 3 · SVGR. Node 22.
Herramientas de la skill copiadas en `scripts/hanzo/` (+ `snippets/`). Atajos: `npm run plan|tokens|fonts|images|audit|dod|docs|drift|diff|grid`.
Estructura: `src/tokens` (generado) · `src/components` · `src/modules` · `src/templates` · `src/assets/{icons,logos,illustrations,images}` · `public/fonts` · `maps/` · `.ai/`.

## 4. Convenciones
- Tipografías: Google Fonts si existen; fonts-raw/ (WOFF2 local) solo si no (`npm run fonts`).
- Orden: Tokens → Componentes → Módulos → Page templates. Tokens antes que nada.
- Nada hardcodeado: todo desde tokens (`npm run audit`). Colores siempre vía tokens semánticos.
- Subtemas heredados: los elementos no fijan `data-theme` en su raíz salvo prop `theme`; el default se declara en `parameters.defaultTheme`.
- Responsive: cada modo de la colección responsive = un breakpoint CSS (mobile-first).
- Grid de columnas del sistema en módulos (`.wrapper` + `.grid-12`; `--grid-columns` cambia por breakpoint si el Figma lo define).

## 5. Definition of Done
Ver la skill (references/dod.md). Resumen: contrato `.meta.json` completo · todas las variantes del máster · solo tokens · docs generadas · `npm run dod -- <meta>` pasa · build OK · push a main y comprobado con `git ls-remote` · revisión visual humana en Pages (no bloquea).

## 6. Hitos activos (revisar al arrancar sesión)
- [ ] HITO de imágenes raster justo después de los iconos (`milestone:images` en PLAN.md).

## 7. Decisiones y notas
- 2026-10-06 — **Arranque desde cero sobre `main`** (decisión de Igor): se vació el contenido del proyecto anterior (Joselito sobre `Joselito-Library` xtL6cbqN…, flujo v1/v2) para testar la skill desde cero. El historial completo sigue en git (último commit del proyecto anterior: `37da1b1`).
- 2026-10-06 — Figma `Design-To-code` (`nANHdr2nKaFD6UCXAMND4s`): copia de Joselito basada en la plantilla Hanzo → `figma.source = hanzo-template`, nivel A. Librería no publicada → `use_figma` en solo lectura.
- 2026-10-06 — Plan Figma: se asume HanzoStudio (Pro, asiento Full) — `whoami` no indica el team del fichero; confirmar.
- Riesgo: los estilos de texto devuelven familias **Georgia** e **Inter** (no Euclid Circular B / SangBleu como el Joselito original, que están en `fonts-raw/`). Aclarar en el volcado de variables antes de `npm run fonts`.
- Semantic-Color: 4 subtemas (Light-White, Light-Grey, Dark-Red-Primary, Dark-Black-Neutral).
- Plan: dos másters generan la misma clave `component:accordion` (`Accordion` 57943:46123 y `accordion` 57943:46054) → revisar (colisión de slug en plan.mjs).
- Plan: dependencias sin máster en el fichero: `button` (M11), `Arrow`, `Arrow Dropdown`, `Main_Secondary-Link` (M20/M24), `*/Overrides/Stars/Star` (M28) → instancias de componentes remotos/borrados; revisar al construir esos módulos.
- Brand assets: logos de terceros (Riu, UFV), certificaciones, firmas y `Brand Logo` marcados "confirmar alcance".
- Templates (25 páginas de Sprints 1-4) **aún sin inventariar** (1 llamada MCP por página): se hará al llegar a la Fase 5.
- Mejora detectada en la skill: el scaffold react-storybook no crea `public/` y `build-storybook` falla por `staticDirs` hasta que existe (creado `public/fonts/.gitkeep`).

## 8. Sesiones
- 2026-10-06, Igor + Claude — Fase 0 (config, scaffold, permisos, git) + Fase 1 (perfil del Figma) + Fase 2 parcial (inventario de Foundations, Brand Assets, Components, Raw Modules → PLAN.md, 107 elementos). ~9 llamadas MCP. Build de Storybook pendiente de tokens. **Siguiente:** webfonts (aclarar familias) + volcado de variables → `npm run tokens`.

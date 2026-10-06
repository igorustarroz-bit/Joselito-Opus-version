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
- [ ] HITO de imágenes raster justo después de los iconos (`milestone:images` en PLAN.md). Ni la nube ni la shell local tienen red a figma.com (proxy 403) → vía navegador (navegar a las URLs de `download_assets` → Descargas → `npm run images -- --from ~/Downloads`).
- [ ] Aspect Ratio en curso (`[~]`): código, docs y DoD OK salvo la foto real (hash 99ad7255…), que se cablea al cerrar el HITO de imágenes; entonces marcar `foundation:aspect-ratio=done --fp`.

## 7. Decisiones y notas
- 2026-10-06 — **Arranque desde cero sobre `main`** (decisión de Igor): se vació el contenido del proyecto anterior (Joselito sobre `Joselito-Library` xtL6cbqN…, flujo v1/v2) para testar la skill desde cero. El historial completo sigue en git (último commit del proyecto anterior: `37da1b1`).
- 2026-10-06 — Figma `Design-To-code` (`nANHdr2nKaFD6UCXAMND4s`): copia de Joselito basada en la plantilla Hanzo → `figma.source = hanzo-template`, nivel A. Librería no publicada → `use_figma` en solo lectura.
- 2026-10-06 — Plan Figma: se asume HanzoStudio (Pro, asiento Full) — `whoami` no indica el team del fichero; confirmar.
- 2026-10-06 — Tipografías confirmadas por Igor: **Georgia** (títulos, fuente del sistema, no se carga) e **Inter** (resto, Google Fonts, solo corte 400). `fonts-raw/` (Euclid/SangBleu) no se usa en este proyecto. `fonts.overrides` fijado porque la shell local no tiene red a Google.
- Tokens: volcado verificado contra Figma por huella (Primitives/Responsive/Semantic-Color/estilos de texto). `CTA/03` no tiene la variable de peso ligada en Figma → sale `font-weight: 400` literal (avisar a diseño).
- Mejora detectada en la skill: `plan.mjs` solo aplica el último `--set` si se pasan varios en la misma llamada.
- Semantic-Color: 4 subtemas (Light-White, Light-Grey, Dark-Red-Primary, Dark-Black-Neutral).
- Plan: dos másters generan la misma clave `component:accordion` (`Accordion` 57943:46123 y `accordion` 57943:46054) → revisar (colisión de slug en plan.mjs).
- Plan: dependencias sin máster en el fichero: `button` (M11), `Arrow`, `Arrow Dropdown`, `Main_Secondary-Link` (M20/M24), `*/Overrides/Stars/Star` (M28) → instancias de componentes remotos/borrados; revisar al construir esos módulos.
- Brand assets: logos de terceros (Riu, UFV), certificaciones, firmas y `Brand Logo` marcados "confirmar alcance".
- Templates (25 páginas de Sprints 1-4) **aún sin inventariar** (1 llamada MCP por página): se hará al llegar a la Fase 5.
- Mejora detectada en la skill: el scaffold react-storybook no crea `public/` y `build-storybook` falla por `staticDirs` hasta que existe (creado `public/fonts/.gitkeep`).

## 8. Sesiones
- 2026-10-06, Igor + Claude — Fase 0 (config, scaffold, permisos, git) + Fase 1 (perfil del Figma) + Fase 2 parcial (inventario de Foundations, Brand Assets, Components, Raw Modules → PLAN.md, 107 elementos). ~9 llamadas MCP. Build de Storybook pendiente de tokens. Webfonts + volcado de variables (8 llamadas + 2 de verificación) → `npm run tokens` → build OK. Total sesión ≈ 19 llamadas MCP. **Siguiente:** Foundation `Aspect Ratio` → set de iconos → HITO de imágenes raster.
- 2026-10-06, Igor + Claude — Aspect Ratio construido (8 variantes, `src/components/AspectRatio`), digest en `.ai/masters/aspect-ratio.json`, 3:2 exacto (Figma 320×207). DoD OK salvo imagen real → `[~]`. +2 llamadas MCP. **Siguiente:** set de iconos (137) → HITO de imágenes.
- 2026-10-06, Igor + Claude — Set de iconos: 136 SVG exportados con `use_figma` (`exportAsync`, 6 lotes) y verificados por huella 136/136 → `src/assets/icons` (SVGO, `currentColor`) + componente `Icon` (Icon Sizer L/M/S/XS/XXS) + galería + `maps/icons.json`. Duplicados renombrados `-2` (map-pin, quotes, house); punto de `bag-items` → `--strokes-icons-accent-base`. +7 llamadas MCP (≈30 en la sesión). **Siguiente:** HITO de imágenes raster (vía navegador → Descargas).

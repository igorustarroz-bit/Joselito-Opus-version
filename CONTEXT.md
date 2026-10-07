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
- [x] HITO de imágenes raster — COMPLETADO 2026-10-06: 58 imágenes únicas de los másters (Components, Raw Modules, Brand Assets) → `src/assets/images` (WebP q82, 9,4 MB) + `maps/images.json`; SHA-1 = imageHash 58/58. Vía: `download_assets` (URLs MCP) → **Claude in Chrome** navegando a cada URL (descarga a ~/Downloads) → `npm run images -- --from <copia>`. El navegador integrado de la app solo permite la primera descarga (las siguientes se bloquean) y el `blob`+`click()` tampoco: usar Chrome.
- [ ] Imágenes de las páginas de templates (Sprints 1-4) aún sin inventariar: hacerlo (images.js por página) al empezar la Fase 5 y repetir la misma vía.

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
- Brand assets: **todos bajados como SVG** (decisión de Igor: "bájalos todos como los iconos") → `src/assets/logos` (22) + `maps/logos.json` + componente `BrandLogo`/`Logo`. Visa y Ekomi son raster (ya en `src/assets/images`).
- Vía rápida para SVG grandes: `download_assets` con `defaultFormat: svg` por nodo → Chrome navega a cada URL (descarga a ~/Downloads) → copiar y comprobar tamaño. Mucho más barato que trocear `exportAsync` con huellas. Ojo: el export incluye fondos del lienzo (#D1D1D1, #F7F7F7) y el borde del component set (#9747FF) → quitar esos `<rect>` antes de SVGO.
- Avisos a diseño (brand): logos en black y firmas en #E23636 sin variable; Logo UFV Light = Dark (idénticos); Riu/UFV son placeholders con el logo de Joselito.
- Templates (25 páginas de Sprints 1-4) **aún sin inventariar** (1 llamada MCP por página): se hará al llegar a la Fase 5.
- 2026-10-06 — **Focus de botones**: en Figma Focus = Default (sin indicador). Decisión de Igor: añadir contorno `:focus-visible` (1 px, token de stroke, offset FX-1) y avisar a diseño. Aplicar el mismo criterio a Button-Icon y Button.
- Botones: los estados de Button-Action-Link usan Texts/Neutral y Strokes-Icons/*, no los tokens Button/Link Primary/Hover|Focused|Disabled (que existen). Se replica el máster.
- Build de Storybook: `storybook-static/` no se puede vaciar sin permiso de borrado → `npm run build-storybook -- -o $HOME/sb-out` (plan B). Verificación visual con Playwright en el contenedor (tgz vía `.ai/tmp/`, ignorado en git).
- Mejora detectada en la skill: `docs-generator` no escapa `<…>` en los títulos de variantes del meta → MDX roto. Evitar etiquetas HTML en `variants[].title`.
- Mejora detectada en la skill: el scaffold react-storybook no crea `public/` y `build-storybook` falla por `staticDirs` hasta que existe (creado `public/fonts/.gitkeep`).

- 2026-10-07 — **Modo continuo** (decisión de Igor): construir componentes seguidos sin pedir confirmación, subiendo cada uno. Criterios aplicados: replicar el máster, foco :focus-visible con contorno, valores sin variable → token más cercano o suma de tokens (p. ej. 10 px = FX-2 + FX-0) y anotarlo en `notes` del meta.
- Lecturas de Figma: el digest completo de másters grandes supera los 20 kB del MCP → se usa `.ai/tmp/spec.js` (misma huella fp que digest.js + árbol compacto) y se guarda un digest compacto en `.ai/masters/`.
- Scripts de apoyo locales (ignorados en git, en `.ai/tmp/`): `push.sh` (commit con autor Igor + push con github-token.txt), `ship.sh` (DoD + build + plan + push), `commit.sh` (plan + commit sin push), `finish.py` (maps/components.json).
- La VM local no permite borrar sin permiso → hay que conceder el permiso de borrado de la carpeta al empezar la sesión, o git deja `.lock` y objetos temporales.
- `accordion` (elemento, 57943:46054) y `Accordion` (lista, 57943:46123) comparten clave de plan y slug: el digest de la lista es `.ai/masters/accordion-2.json` (override `figma.digest` en el meta, parche en `scripts/hanzo/dod-check.mjs`). En PLAN.md la lista sigue saliendo como pendiente aunque está hecha.
- Responsive de componentes: Alert usa container query (se adapta a su propio ancho); Go_Back y Card Product usan media query a 768 px.
- Mejoras detectadas en la skill: ver `.ai/tmp/notes-skill.md` (falso positivo "todo" en dod-check, MDX con < > { } en metas, slug CamelCase, límite 20 kB del digest).

## 8. Sesiones
- 2026-10-06, Igor + Claude — Fase 0 (config, scaffold, permisos, git) + Fase 1 (perfil del Figma) + Fase 2 parcial (inventario de Foundations, Brand Assets, Components, Raw Modules → PLAN.md, 107 elementos). ~9 llamadas MCP. Build de Storybook pendiente de tokens. Webfonts + volcado de variables (8 llamadas + 2 de verificación) → `npm run tokens` → build OK. Total sesión ≈ 19 llamadas MCP. **Siguiente:** Foundation `Aspect Ratio` → set de iconos → HITO de imágenes raster.
- 2026-10-06, Igor + Claude — Aspect Ratio construido (8 variantes, `src/components/AspectRatio`), digest en `.ai/masters/aspect-ratio.json`, 3:2 exacto (Figma 320×207). DoD OK salvo imagen real → `[~]`. +2 llamadas MCP. **Siguiente:** set de iconos (137) → HITO de imágenes.
- 2026-10-06, Igor + Claude — Set de iconos: 136 SVG exportados con `use_figma` (`exportAsync`, 6 lotes) y verificados por huella 136/136 → `src/assets/icons` (SVGO, `currentColor`) + componente `Icon` (Icon Sizer L/M/S/XS/XXS) + galería + `maps/icons.json`. Duplicados renombrados `-2` (map-pin, quotes, house); punto de `bag-items` → `--strokes-icons-accent-base`. +7 llamadas MCP (≈30 en la sesión). **Siguiente:** HITO de imágenes raster (vía navegador → Descargas).
- 2026-10-06, Igor + Claude — HITO de imágenes cerrado (58/58) y Aspect Ratio cableado con su foto real → `done`. +25 llamadas MCP (≈55 en la sesión). **Siguiente:** componentes base: Button-Action-Link → Button-Icon → Button.
- 2026-10-06, Igor + Claude — Brand assets: 22 SVG (Brand Logo, Logo Grid, Riu, UFV ×4, PEFC ×3, Junta CyL, 9 firmas) vía `download_assets` + Chrome, verificados por tamaño 22/22 → `src/assets/logos` + `BrandLogo` (Horizontal Yes/No, galería y firmas). Digest `.ai/masters/brand-logo.json` (fp aa50b476). DoD OK. Fase 2b cerrada. +23 llamadas MCP. **Siguiente:** componentes base: Button-Action-Link → Button-Icon → Button.
- 2026-10-06, Igor + Claude — **Button-Action-Link** (`src/components/ButtonActionLink`): 3 tamaños × 4 estados + iconos opcionales, `<a>`/`<button>`, estados nativos. Digest `.ai/masters/button-action-link.json` (fp b8ad2b00). Medidas verificadas con Playwright (61×22 · 53×18 · 53×16, como Figma). DoD OK. +3 llamadas MCP. **Siguiente:** Button-Icon → Button.
- 2026-10-07, Igor + Claude (modo continuo) — Componentes: Button-Icon, Button, Tag, NavButton, Title, Checkboxes-Radios, InputQuantity, Card Product, listbox_Item_Dropdown, Listbox, Input, menu-item-list, RowButtons, Checkbox-Label, Go_Back, Divider, Stepper_for_toast, accordion, Add_to_list, Alert, subnavigation-item, tab_primary, tab_secondary, Tabs, Checkbox-List, Accordion. Todos con DoD OK, build OK y push. ≈ 30 llamadas MCP. **Siguiente:** mobile_menu_accordion → 404_picture → Blocks → Card Carrusel…
- 2026-10-07 (cont.) — **Fase de componentes completada** (todos los del plan): además de los anteriores, mobile_menu_accordion, Block Address/Archive List/best price/Big Numbers, Card Carrusel, Card-Social-media, Card Link, Toast, 404_picture, InputAndButton, Input-Phone, Input-Code, row_2_input, row_3_input, Overlay, Placeholder-Text, Block Row Address, Sending Details, Form, Order Summary, Order by Day, Modal_Lightbox. Input ganó `action` y `emptyLabel`. ≈ 55 llamadas MCP en la sesión. **Siguiente:** módulos (M01-Navigation…).

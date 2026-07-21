# Assets workflow

Cómo se gestionan los assets del proyecto.

## Iconos y vectores (SVGR)

- Origen: página **Brand Assets** de Figma (set `Icons`). Ningún componente usa iconos fuera de esta lista.
- Formato: SVG importado como componente React vía `vite-plugin-svgr`.
- Color: mediante `currentColor` / token semántico — nunca color hardcodeado. El tamaño lo aporta `Icon Sizer` (XXS–L).
- Ubicación: `src/assets/icons/`. Import: `import Icon from './icon.svg?react'`.

## Logos

- `Brand Logo` y `Logo Grid` (propios de Joselito) → `src/assets/logos/`.
- Logos de terceros: pendientes de confirmar alcance (ver CONTEXT §10).

## Fotografías

- Formato **WebP**. Ubicación: `src/assets/images/`.
- Ratios controlados por el componente `Aspect Ratio`.

## Ilustraciones

- `src/assets/illustrations/` (SVG o WebP según origen).

## Webfonts

- Origen (licenciado, no se sube): `fonts-raw/` — Euclid Circular B (.ttf), SangBleu Empire (.otf).
- Adaptadas a web: `public/fonts/*.woff2`, declaradas con `@font-face` en `src/index.css` / tokens de tipografía.
- Objetivo: que cualquier usuario vea las tipografías sin tenerlas instaladas.

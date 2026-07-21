# CONTEXT.md — Joselito Design System (versión en código)

Documento de referencia del proyecto. Léelo (junto con `PLAN.md`) antes de empezar cada sesión.

## 1. Objetivo

Reproducir en código, **pixel perfect**, el design system de **Joselito** definido en Figma,
con su documentación en **español** en Storybook. Somos una agencia de diseño: no se
inventa ni se interpreta ningún diseño — se lee de Figma con `get_design_context` y se replica.

## 2. Fuentes

- **Figma (librería NO publicada):** `Joselito-Library`
  fileKey: `xtL6cbqN94yw7pAlr8k1NK`
- **Repo GitHub:** https://github.com/igorustarroz-bit/Joselito-Opus-version (rama `main`)
- **Carpeta local:** vinculada, con `github-token.txt` (ignorado) y `fonts-raw/`.

## 3. Cómo leer de Figma

- Librería no publicada → **no** usar `search_design_system` ni `get_metadata` sin nodeId.
- Descubrir páginas con `use_figma` (solo lectura): `figma.root.children`.
- Una página por llamada; para varias páginas, fan-out en paralelo.
- **`get_design_context` es la fuente de verdad** de cada token/componente/módulo (da React+Tailwind, tokens y captura). Traducir a nuestros tokens/estructura/responsive sin cambiar el diseño, y verificar el render contra la captura.
- **Code Connect: NO disponible** para este fichero (vive en HanzoStudio, plan Pro; Code Connect exige Org/Enterprise). Se usa solo `get_design_context`.

## 4. Stack

- **Framework:** React 19 + Vite 8 (`@vitejs/plugin-react`).
- **Estilos:** Tailwind CSS v4 (CSS-first, `@tailwindcss/vite`). La estética la define el Figma, no Tailwind.
- **Animaciones:** GSAP 3.
- **Documentación:** Storybook 10 (`@storybook/react-vite`) + `@storybook/addon-docs` (MDX) + `remark-gfm` (tablas).
- **Assets:** SVGR para iconos/vectores (color por `currentColor`/token), WebP para fotos. Ver `docs/assets-workflow.md`.
- **Webfonts:** almacenadas adaptadas a web en `public/fonts/` (accesibles sin la fuente instalada). Origen en `fonts-raw/` (no se sube).
- **Node:** >= 20 (probado en v22).

## 5. Estructura del repo

```
src/
  tokens/       # colores, tipografías, espaciados, breakpoints (desde variables Figma)
  components/   # botones, tags, inputs, tabs, toggles...
  modules/      # contenedores 100% ancho (grid 12 col), versiones por breakpoint
  templates/    # page templates (composición de módulos)
  assets/       # icons / logos / illustrations / images
public/fonts/   # webfonts adaptadas
docs/           # documentación de proceso (assets-workflow.md, etc.)
.storybook/     # config de Storybook
```

Comandos: `npm run dev` (Vite), `npm run storybook` (docs, :6006), `npm run build`, `npm run build-storybook`.

## 6. Convenciones

- Orden de trabajo: **Tokens → Componentes → Módulos → Page Templates**. Los tokens prioritarios siempre antes de cualquier componente.
- Componentes primero los que son base de otros (en Figma, los `z_fragment_*` son subcomponentes base).
- Nada de valores hardcodeados: todo desde tokens o subcomponentes. Cualquier valor fuera de tokens/estilos es un posible error → avisar.
- Colores aplicados vía **colores semánticos**. Subtemas = modos de `Semantic-Color`, expuestos como `data-theme` (un hijo puede sobreescribir al padre).
- Breakpoints = modos de la colección `Responsive`; deben coincidir en Storybook.
- Grid de **12 columnas** en todos los módulos.
- Documentación por elemento en Storybook: demos con `<Canvas>` (nunca `<Story>`), variantes en horizontal con `flex-wrap`, cajas de demo sin altura fija (dependen del contenido).

## 7. Sistema de tokens en Figma (colecciones de variables)

| Colección | Vars | Modos | Uso |
| --- | --- | --- | --- |
| **Primitives** | 134 | `Joselito` | Primitivas/globales (paleta base, escalas) |
| **Responsive** | 132 | XS-390, SM-480, M-768, LG-1024, XL-1440, XXL-1620, XXXL-1920 | Breakpoints y valores responsive |
| **Semantic-Color** | 276 | Light-White, Light-Grey, Dark-Red-Primary, Dark-Black-Neutral, Light-Yellow | Colores semánticos → `data-theme` |

## 8. Tipografías

- **Euclid Circular B** (sans) — 10 pesos/itálicas.
- **SangBleu Empire** (serif) — familia amplia (Empire, Kingdom, Republic, Sunrise, Versailles).
- Pendiente: convertir de `fonts-raw/` a `.woff2` en `public/fonts/` + `@font-face`. Se hará en la fase de tokens de tipografía.

## 9. Estado

Ver `PLAN.md`. Sesión de arranque completada: scaffold creado y verificado (Vite + Storybook build OK), acceso a Figma validado, plan generado.

## 10. Notas / decisiones pendientes

- **Brand Assets** contiene muchos logos de terceros (UFV, Riu, Regnum Christi, Accenture, BBVA, Santander, Microsoft, etc.) que parecen heredados de otra plantilla. Probablemente **fuera de alcance** para Joselito → confirmar con el equipo antes de programarlos. Sí son propios: `Brand Logo`, `Logo Grid`, set de `Icons`, `Icon Sizer`.
- Páginas `WIP Ale` y `WIP Miguel` en Figma: trabajo en curso ajeno → ignorar.

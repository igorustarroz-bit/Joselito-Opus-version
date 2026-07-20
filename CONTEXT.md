# CONTEXT — Joselito Design System

> Documento de contexto del proyecto. Léelo (junto con `PLAN.md`) antes de
> empezar cualquier sesión de trabajo. Se mantiene actualizado tras cada sesión.

## 1. Proyecto
- **Cliente:** Joselito
- **Tipo:** WEB
- **Idioma de documentación:** Español
- **Figma:** [Joselito-Library](https://www.figma.com/design/xtL6cbqN94yw7pAlr8k1NK/Joselito-Library?node-id=58363-34365) — *librería NO publicada*
- **Repositorio:** https://github.com/igorustarroz-bit/Joselito-Opus-version

## 2. Stack
- **Framework:** React 19 + Vite + TypeScript
- **Estilos:** Tailwind CSS v4 (`@tailwindcss/vite`). La estética la definen los Figmas, no Tailwind.
- **Animaciones:** GSAP
- **Documentación / catálogo:** Storybook 10 (`@storybook/react-vite`)
  - MDX con `@storybook/addon-docs` + `remark-gfm` (tablas GFM)
  - `@storybook/addon-a11y` para accesibilidad
- **Assets:** SVGR para iconos/vectores (`?react`, color por `currentColor`/token), WebP para fotos
- **Alias:** `@` → `src/`
- **Despliegue:** GitHub Pages vía GitHub Actions (`.github/workflows/deploy-storybook.yml`)

## 3. Estructura de carpetas
```
src/
  tokens/       Tokens: colores, tipografías, espaciados, breakpoints
  components/   Componentes base y compuestos
  modules/      Módulos (100% viewport, grid 12 columnas)
  templates/    Page templates
  assets/       icons · logos · illustrations · images
  styles/       tailwind.css (entrada; @theme = tokens)
.storybook/     Configuración de Storybook (main.ts, preview.tsx)
docs/           Documentación técnica (assets-workflow.md)
```

## 4. Convenciones
- **Sin valores hardcodeados:** todo debe venir de tokens/variables o subcomponentes. Cualquier valor fuera de los tokens definidos es potencialmente un error → avisar al usuario.
- **Orden de trabajo:** Tokens → Componentes → Módulos → Templates. Dentro de tokens: primero primitivas/globales, después semánticos.
- **Colores:** se aplican siempre vía colores **semánticos**.
- **Texto:** cada componente/módulo lleva uno de los estilos de texto definidos (responsive por breakpoint).
- **Espaciados:** aplicar variables de espaciado a todas las distancias coincidentes.
- **Grid:** sistema de 12 columnas (variables responsive de Figma = breakpoints CSS).
- **Modos (temas):** las variables Semantic-Color con sus modos → `[data-theme]`; un hijo puede sobreescribir el del padre.
- **Iconos:** ningún componente usa un icono fuera de la lista oficial (Brand Assets en Figma).

## 5. Componentes base prioritarios (foundations / brand assets)
Deben ir primero en el plan:
- **Aspect ratio** (sección *foundations*)
- **Icons** (sección *brand assets*; fáciles de recolorear)
- **Brand Logo** (sección *brand assets*; logo del cliente)

## 6. Documentación de cada elemento en Storybook (español)
- **Token/variable:** Intro · Demo · Tokens
- **Componente/módulo:** Intro · Demo · Anatomía · Subtemas · Comportamiento · Variantes y tamaños · Tokens · Propiedades · Accesibilidad · Componentes relacionados
- Cajas de demo: alto dependiente del contenido (no fijo). Variantes con `<Canvas>` (nunca `<Story>`), en horizontal con `flex-wrap`.

## 7. Figma MCP (librería NO publicada)
- No usar `search_design_system` ni `get_metadata` sin `nodeId` (cuelgan).
- Leer la skill `figma-use` antes de `use_figma` (solo lectura).
- `figma.root.children` → páginas; pedir hijos de UNA página por llamada.
- Con el `nodeId`: `get_screenshot`, `get_metadata`, `get_design_context`, `get_variable_defs`.

## 8. Tokens en Figma (colecciones)
- **Primitives** — 133 variables (modo: Joselito)
- **Responsive** — 132 variables · 7 breakpoints: `XS-390 · SM-480 · M-768 · LG-1024 · XL-1440 · XXL-1620 · XXXL-1920`
- **Semantic-Color** — 276 variables · 5 modos: `Light-White · Light-Grey · Dark-Red-Primary · Dark-Black-Neutral · Light-Yellow`

## 9. Inventario (todos son *master* en Figma)
- **Foundations:** Aspect Ratio.
- **Brand Assets:** Icon Sizer + ~140 iconos, Brand Logo, Logo Grid, logos de cliente.
- **Componentes (Components):** UI01–UI14 (Nav-Button, Button, Button-Icon, Button-Action-Link, Tabs, Input, Listbox, Checkbox-List, Checkbox-Label, Checkboxes-Radios, Form, Tag, Accordion, Placeholder-Text), Cards (Product, Link, Carrusel), Title y fragments de lista.
- **Módulos (Modules):** Navigation (+ Secondary menu, Breadcrumb, PreviousNext, Footer), Menu, Heros (Homepage/Section/Header), Content (Title/Intro/Text/Image/Text+Image), List (Characteristics/Numbers/Timeline/Archive table), Cards (Links/Gallery/Product carousel/Showcase/Categories/Accordion), Banner, Form, Toast.
- **Templates (Sprint 1):** Home, Navegación, Origen, Excelencia, Compromisos, Experiencias y eventos, Colecciones Premium.

## 10. Estado
Ver `PLAN.md`. Fase 0 (setup) completa y desplegable. Siguiente: Fase 1 — Tokens (breakpoints primero).

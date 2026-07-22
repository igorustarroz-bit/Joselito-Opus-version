# PLAN.md — Joselito Design System

Estado del plan de trabajo. Marca cada elemento: `[ ]` pendiente · `[~]` en progreso · `[x]` completado.
Orden obligatorio: **Tokens → Componentes → Módulos → Page Templates**.

Cada elemento, al programarse, se lee de Figma con `get_design_context`, se traduce a tokens/estructura/responsive sin cambiar el diseño, se documenta en Storybook y se verifica el render contra la captura.

---

## Fase 0 — Setup (arranque)

- [x] Vincular carpeta local + verificar `github-token.txt` y `fonts-raw/`
- [x] Scaffold: React 19 + Vite 8 + Tailwind v4 + GSAP + Storybook 10 (verificado con build)
- [x] Validar acceso a Figma MCP (librería no publicada → `use_figma`)
- [x] Generar `CONTEXT.md` y `PLAN.md`
- [x] Convertir fuentes `fonts-raw/` → `.woff2` en `public/fonts/` + `@font-face` (Euclid Circular B, SangBleu Empire) — otros cortes SangBleu (Kingdom/Republic/Sunrise/Versailles) pendientes de confirmar uso
- [x] Commit + push inicial a GitHub
- [x] Workflow de despliegue de Storybook a GitHub Pages (`.github/workflows/deploy.yml`)
- [ ] **Activar GitHub Pages en Settings → Pages → Source: GitHub Actions** (paso manual del usuario; sin esto el deploy falla)

## Fase 1 — Tokens / Foundations (PRIORITARIO, antes de cualquier componente)

- [x] **Primitives** (134 vars, modo `Joselito`) — paleta base y escalas → `src/tokens/primitives.css` (custom properties) + doc Storybook `Tokens/Primitives`
- [x] **Responsive** (132 vars, 7 breakpoints: XS-390, SM-480, M-768, LG-1024, XL-1440, XXL-1620, XXXL-1920) → breakpoints Tailwind + `src/tokens/responsive.css` + viewports Storybook + doc `Tokens/Responsive`. (Tipografías SZ/LH por breakpoint → paso Tipografía; tamaños de columna 1–12 → paso Grid)
- [x] **Semantic-Color** base (72 roles bg/text/stroke × 5 modos → `data-theme`) en `src/tokens/semantic-color.css` + selector de subtema en Storybook + doc. (Grupos Button/Forms → con sus componentes)
- [x] **Tipografía** — 29 estilos responsive (`.ts-*`) en `src/tokens/typography.css` + doc
- [x] **Espaciados** — escalas fija (`fx`) y responsive (`sp`) como utilidades Tailwind + doc
- [x] **Grid 12 columnas** — `.wrapper` + `.grid-12` con gutter/wrapper responsive + doc
- [x] **Effect styles** — Elevation On-Light/On-Dark + Blur en `src/tokens/effects.css` + doc
- [x] **Aspect Ratio** (foundation, 7 ratios) — componente React + story + doc

Docs por token (Storybook): Intro · Demo · Tokens.

## Fase 2 — Brand Assets

- [x] **Icons** — 132 iconos SVGR (`currentColor`) en `src/assets/icons` + componente `Icon` con carga automática + galería
- [x] **Icon Sizer** (XXS 12 · XS 16 · S 20 · M 24 · L 32) — integrado en el componente `Icon` (prop `size`)
- [x] **Brand Logo** (horizontal + isotipo, `currentColor`) — componente `BrandLogo` + doc
- [~] **Logo Grid** — es diagrama de construcción (guías), no componente de uso; documentado como referencia
- [ ] ⚠️ Logos de terceros (UFV, Riu, Accenture, BBVA...) — **confirmar alcance** antes de programar (probablemente fuera de alcance)

## Fase 3 — Componentes

Primero los `z_fragment_*` (base de otros), luego los `UI##`.

Bases / fragments:
- [x] z_fragment_tab_primary · z_fragment_tab_secondary → resueltos dentro de UI05-Tabs
- [x] z_fragment_listbox_Item_Dropdown → resuelto dentro de UI07-Listbox
- [x] z_fragment_row_2_input · z_fragment_row_3_input → resueltos dentro de UI11-Form
- [x] z_fragment_accordion → resuelto dentro de UI13-Accordion
- [ ] z_fragment-Table List Item · z_fragment_list_characteristic · z_fragment_list_BigNumbers · z_fragment-list-archive → piezas de los módulos List (se construyen con ellos)

Componentes UI:
- [x] UI01-Nav-Button — componente + estados + colores por subtema + doc
- [x] UI02-Button (Primary/Secondary/Terciary · XS-L · estados) — componente + CSS estados + colores 5 subtemas + doc
- [x] UI03-Button-Icon — componente cuadrado (3 tipos · XS-XL · estados) + doc
- [x] UI04-Button-Action-Link — componente (enlace subrayado, estados) + doc
- [x] UI05-Tabs — barra de pestañas (Primary/Secondary, estados) + doc
- [x] UI06-Input — campo (Big/Small, estados default/filled/error/validated/disabled) + doc
- [x] UI07-Listbox — lista de opciones desplegable (núcleo reutilizable) + doc
- [x] UI08-Checkbox-List — lista de casillas (vertical/horizontal) + doc
- [x] UI09-Checkbox-Label — casilla con etiqueta (m/s, indeterminado) + doc
- [x] UI10-Checkboxes-Radios — Checkbox + Radio (estados hover/disabled/selected) + doc
- [x] UI11-Form — contenedor de formulario (cabecera + campos + acciones) + doc
- [x] UI12-Tag — componente (transaction/new/aseptic · L/XS) + doc
- [x] UI13-Accordion — ítems desplegables (toggle Plus/Minus) + doc
- [x] UI14-Placeholder-Text — componente de texto/slot base + doc
- [x] Card Product — ficha de producto (compone AspectRatio, Button, Icon, ActionLink) + doc
- [x] Card Link — tarjeta-enlace (imagen + título/subtítulo superpuestos) + doc
- [x] Card Carrusel — tarjeta de carrusel (horizontal/vertical) + doc
- [x] Title — encabezado de sección (título + enlace opcional) + doc

Docs por componente (Storybook): Intro · Demo · Anatomía · Subtemas · Comportamiento · Variantes y tamaños · Tokens · Propiedades · Accesibilidad · Componentes relacionados.

## Fase 4 — Módulos (contenedores 100% ancho, grid 12 col, versiones Desktop/Mobile)

- [x] Navigation (header) — módulo header (enlaces + logo + acciones, light/dark, responsive) + doc
- [x] Navigation / Secondary menu — módulo fila de categorías (responsive, activo subrayado) + doc
- [x] Navigation / Breadcrumb — módulo enlace "volver" (responsive) + doc
- [x] Navigation / PreviousNext — módulo anterior/siguiente (responsive) + doc
- [x] Navigation / Footer — módulo footer **rehecho pixel-perfect** desde máster `58163:33397` (4 columnas + doble grupo, aside Empresa/Contacto/RRSS, newsletter, barra legal; acordeón en mobile) + doc. Pendiente: sustituir el placeholder `AspectRatio` por la ilustración real. Aviso: el máster trae la nota "Sing up for our newsletter" (typo de origen, replicado)
- [ ] Menu (mega-menú) — `id 58182:4350`
- [ ] Hero / Homepage hero — `id 58182:4353`
- [ ] Hero / Section hero — `id 58163:39435`
- [ ] Hero / Section header — `id 58163:39446`
- [x] Content / Intro text — módulo intro centrado (eyebrow + título + cuerpo + cajas + botón) + doc
- [ ] Content / Title — `id 58163:40029`
- [x] Content / Text only — módulo texto (columnas / split, responsive) + doc
- [ ] Content / Image only — `id 58163:40001`
- [ ] Content / Text + Image — `id 58363:34365`
- [ ] List — `id 58418:52924`
- [ ] List / Timeline — `id 58363:35241`
- [ ] List / Numbers — `id 58447:7252`
- [ ] List / Archive table — `id 58418:53062`
- [ ] Cards / Links — `id 58163:40143`
- [ ] Cards / Gallery — `id 58163:40311`
- [ ] Cards / Product carousel — `id 58163:83548`
- [ ] Cards / Showcase — `id 58182:4396`
- [ ] Cards / Categories — `id 58182:4401`
- [ ] Cards / Accordion — `id 58182:24099`
- [ ] Banners / Section banner — `id 58182:4380`
- [ ] Form (módulo) — `id 58195:43756`
- [x] Toast — módulo aviso compacto (imagen + título/descripción) + doc

## Fase 5 — Page Templates (SPRINT 1)

- [ ] Home
- [ ] Origen: Nuestra Historia, La Dehesa
- [ ] Excelencia: Añadas, Curación, Manual de Corte
- [ ] Compromisos: Sostenibilidad, Happy Pigs, Salud
- [ ] Experiencias y eventos
- [ ] Colecciones Premium

---

### Próximo paso sugerido
Convertir las fuentes y hacer el commit inicial del scaffold; después empezar la Fase 1 por **Primitives**.

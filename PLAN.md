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
- [x] **Activar GitHub Pages en Settings → Pages → Source: GitHub Actions** (hecho por el usuario)

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
- [x] Navigation / Footer — módulo footer **rehecho pixel-perfect** desde máster `58163:33397` (4 columnas + doble grupo, aside Empresa/Contacto/RRSS, newsletter, barra legal; acordeón en mobile) + doc. Ilustración real integrada (`src/assets/illustrations/footer-illustration.webp`, extraída del nodo `58182:4402`). Aviso: el máster trae la nota "Sing up for our newsletter" (typo de origen, replicado)
- [x] Menu (mega-menú) — módulo overlay **pixel-perfect** desde máster `58182:4350` (5 variantes: Desktop/Product = lista + imagen + destacado · Desktop/About = 4 tarjetas · Mobile Default/Product/About = cabecera con cierre + acordeón CaretDown↔CaretUp + pie CUENTA/CESTA/idioma). Reutiliza Icon, BrandLogo, AspectRatio, ActionLink. Nota: réplica de la inconsistencia del máster (ítem resaltado "Paletas Gran Reserva" vs destacado "Regalos…"); imágenes como placeholders Neutral-1 (el máster no trae assets). Pendiente: verificación visual del usuario en Storybook local (sin navegador headless en el entorno) + doc
- [x] Hero / Homepage hero — imagen a sangre + `Navigation` (subtema oscuro) + copy central (eyebrow + título SangBleu + `Button` primario) + `Toast` flotante; mobile con degradado y puntos de paginación. Máster `58182:4353`. Pendiente verificación visual en Pages + doc
- [x] Hero / Section hero — máster **`58508:35830`** (el id del plan estaba obsoleto). 6 variantes (Desktop/Mobile × Full bleed / Margins / Small image): eyebrow Body/03 + título SangBleu Title/04 + imagen (16:9 desktop → 1:1 mobile en full-bleed/margins; 3:4 pequeña en small-image, reutiliza AspectRatio). Verificado en Pages (estilos computados). Notas: gaps/paddings 80/54px hardcodeados en máster (no ligados a variable); título usa token `ts-title-4` (34px en XS vs 36px del máster)
- [x] Hero / Section header — máster **`58508:6679`** (id del plan 58163:39446 obsoleto). Módulo oscuro (`data-theme="dark-black-neutral"`), 4 variantes Desktop/Mobile × Big/Small: dos paneles (texto | imagen) lado a lado en desktop / apilados en mobile. Reutiliza ButtonIcon (atrás, secondary), Tag (aseptic) y AspectRatio (3:4 Big / 1:1 Small). `build-storybook` OK + push. Notas: gaps/paddings y ancho de imagen desktop (515px) hardcodeados en máster; botón atrás a 48px también en mobile (máster: 40px). Pendiente revisión visual del humano en Pages
- [x] Content / Intro text — módulo intro centrado (eyebrow + título + cuerpo + cajas + botón) + doc
- [x] Content / Title — etiqueta + título (SangBleu) + descripción + enlace (`ActionLink`); desktop fila título|aside, mobile apilado. Máster `58163:40029`. Nota: se omitió un botón con tokens ajenos (azul #0045ff). Pendiente verificación visual en Pages + doc
- [x] Content / Text only — módulo texto (columnas / split, responsive) + doc
- [x] Content / Image only — 1 imagen a sangre (fondo acento, botón play opcional) o 2 imágenes contiguas; `AspectRatio`. Máster `58163:40001`. Pendiente verificación visual en Pages + doc
- [x] Content / Text + Image — variantes half/left/right (etiqueta + título SangBleu + cuerpo + `Button` secondary + nota al pie en half); responsive apilado. Máster `58363:34365`. Pendiente verificación visual en Pages + doc
- [x] List — máster **`58468:60752`** (id del plan 58418:52924 obsoleto). Título centrado + ítems (título/descripción/número itálico); columnas con divisores en desktop, apilado con líneas en mobile. Espaciados con tokens `--sp-*`. `build-storybook` OK + push. Pendiente revisión visual en Pages
- [x] List / Timeline — máster `58363:35241` (6 variantes Desktop/Mobile × imagen Horizontal/Vertical/None). Banda art-directed: años gigantes de fondo (activo destacado), foto rotada y tarjeta blanca con nav (ButtonIcon). Fondo rojo (con imagen) u oscuro (None) por subtema. `build-storybook` OK + push. Aproximado en offsets/rotación decorativos — pendiente ajuste fino tras revisión en Pages
- [x] List / Numbers — máster `58447:7252` (Desktop/Mobile). Título + filas cifra grande (SangBleu Title/03) | descripción (Body/05), líneas divisorias; desktop en fila, mobile apilado. Fondo gris claro (light-grey). `build-storybook` OK + push. Pendiente revisión visual en Pages
- [x] List / Archive table — máster `58418:53062` (Desktop/Mobile · Default/Hover). Título + entradas fecha | titular (SangBleu 24px), líneas divisorias; desktop fila, mobile apilado; filas enlazables con realce hover. `build-storybook` OK + push. Miniatura del estado Hover pendiente. Pendiente revisión visual en Pages
- [x] Cards / Links — máster `58163:40143` (Desktop/Mobile). Cabecera (Title/04) + fila de CardLink (imagen 3:4 con overlay). Reutiliza Card Link. `build-storybook` OK + push. Pendiente revisión visual en Pages
- [x] Cards / Gallery — máster `58163:40311` (Desktop/Mobile · default/expanded). Cabecera + galería de CardProduct con ratio alterno 3:4/1:1 (escalonado); desktop slider horizontal, mobile 2 columnas. Reutiliza Card Product. `build-storybook` OK + push. Pendiente revisión visual en Pages
- [x] Cards / Product carousel — máster `58163:83548` (Desktop/Mobile). Cabecera (antetítulo + "Explorar todos") + carrusel de CardProduct con badge/chips/estrellas/CTA; desktop 3 centradas, mobile scroll horizontal. Reutiliza Card Product. **Auditado**: corregido spacing mobile (gap 32, padding 40/24/64, tarjeta 281, antetítulo Body/03). `build-storybook` OK + push
- [x] Cards / Showcase — máster `58182:4396` (Desktop Many/One · Mobile Many). Cabecera + carrusel de CardCarrusel (imagen 3:2 + título/desc/tags/CTA); type many (slides asomando) / one (única). Reutiliza Card Carrusel. **Auditado**: corregido mobile (tarjetas VERTICALES de 249px, padding 40/24/64) — antes salían horizontales a todo el ancho. `build-storybook` OK + push
- [x] Cards / Categories — máster `58182:4401` (Desktop/Mobile × RRSS/Instagram). Feed social. **Auditado y rehecho**: prop `variant` (rrss/instagram). RRSS desktop = iconos en cabecera + handles; RRSS mobile = iconos abajo centrados + sin handles; Instagram = sin iconos + pie "SÍGUENOS/@cuenta". Antes solo variaba el set de iconos (incorrecto). Reutiliza Icon + AspectRatio. `build-storybook` OK + push
- [x] Cards / Accordion — máster `58182:24099` (nodo 58182:24098). OJO: el nodo NO es un acordeón sino una **banda tipográfica** (palabras gigantes SangBleu rojo/blanco + fotos al fondo, subtema oscuro); construido fiel al nodo por decisión del equipo. El acordeón real está en `58512:9289` (pendiente si se quiere como módulo aparte). `build-storybook` OK + push. Aproximado en offsets de fotos. Pendiente revisión en Pages
- [x] Banners / Section banner — máster `58182:4380` (Desktop `58182:4378` / Mobile `58182:4379`). Cabecera (`Title`) + banner: imagen a sangre con velo `rgba(0,0,0,0.2)` y tarjeta blanca superpuesta (título SangBleu `Title/02` + cuerpo `Body/03` + botón terciary). Desktop: banner 720px, tarjeta 372px flotante a la derecha (`space-between`); mobile: apilado (imagen 4:3 → texto + botón, botón S). Reutiliza `Title`, `Button`. `build-storybook` OK + push. Notas: alto/ancho/paddings del banner y velo literales del máster; márgenes vía `--grid-wrapper`; imagen como placeholder. Pendiente revisión visual en Pages
- [x] Form (módulo) — máster `58195:43756` (Desktop `58195:43767` / Mobile `58195:43777`, layout text-left). Columna de texto (antetítulo `Body/06` + título SangBleu `Title/04` + cuerpo `Body/05`) + componente `Form` (UI11): cabecera + fila de 2 inputs + 2 inputs + casilla + acciones CANCEL/ACCEPT. Reutiliza `Form`, `Input`, `CheckboxList`. Desktop 2 columnas (≥1024px, texto flexible máx 648 | form 405, space-between); mobile apilado. `build-storybook` OK + push. Notas: omitido el botón azul `#0045ff` (tipografía ajena Neue Haas, fuera de tokens); párrafo mobile unificado a `Body/05` (el máster usaba fuente ajena); fila de acciones alineada a la izquierda (override del default del componente Form); paddings verticales literales del máster. Pendiente revisión visual en Pages
- [x] Toast — módulo aviso compacto (imagen + título/descripción) + doc

## Fase 4.5 — Imágenes (hito: aplicar a TODOS los módulos)

> **Regla (§13 «Imágenes»):** una vez construidos todos los módulos de la Fase 4,
> Claude DEBE proponer al usuario bajar las imágenes reales de Figma y aplicarlas de
> golpe sobre el componente `AspectRatio`. Este hito **no se salta**: es requisito
> antes de dar por cerrada la fase de módulos y de empezar los Page Templates.
> (El usuario puede pedir algunas imágenes antes si lo desea.)

- [ ] **Proponer y ejecutar la aplicación de imágenes a todos los módulos.**
  Estado actual: solo `footer-illustration.webp` está aplicada; el resto de módulos
  con `AspectRatio` usan placeholder (SectionBanner, Hero, SectionHero, SectionHeader,
  ContentImageOnly, ContentTextImage, Timeline, Menu, CardsShowcase, CardsCategories,
  CardsGallery/Product…). Flujo en `docs/assets-workflow.md`. El sandbox NO tiene red a
  figma.com → ruta recomendada: **Claude in Chrome** (fetch → Descargas → optimizar a
  WebP → `src/assets/images` → cablear cada módulo). Alternativa local:
  `npm run figma:asset` (requiere `figma-token.txt`, hoy ausente). Nota: algunos másters
  no traen asset real (p. ej. Menu, SectionBanner) → seguirán con placeholder.

## Fase 5 — Page Templates (SPRINT 1)

- [ ] Home
- [ ] Origen: Nuestra Historia, La Dehesa
- [ ] Excelencia: Añadas, Curación, Manual de Corte
- [ ] Compromisos: Sostenibilidad, Happy Pigs, Salud
- [ ] Experiencias y eventos
- [ ] Colecciones Premium

---

### Próximo paso sugerido
Fase 4 (Módulos) completa. **Antes de los Page Templates**, ejecutar la Fase 4.5:
proponer al usuario aplicar las imágenes reales a todos los módulos (§13). Después,
Fase 5 empezando por **Home**.

# Fase 3 — Tokens y webfonts

Tokens antes que cualquier componente. Los ficheros de tokens son **generados**: nunca se editan a
mano; si algo está mal, se corrige en Figma (o en la propuesta aprobada) y se regenera.

## 1. Volcado

- Pro/Org: `snippets/variables.js` → `.ai/figma/variables.json`. Si la respuesta es muy grande,
  trocea con `ONLY` (una colección por llamada; `INCLUDE_STYLES = false` salvo en la primera) y une
  los trozos en `collections`.
- Enterprise: `node scripts/hanzo/fetch-variables.mjs` (REST) + `snippets/variables.js` con `ONLY = []`
  para los estilos.
- Figma externo sin variables: `references/external-figma.md` (derive-tokens).

## 2. Breakpoints por rangos (antes de generar)

Los modos de la colección responsive se llaman por el ancho de su **frame de ejemplo** (`LG - 1024`,
`XL - 1440`…), pero la documentación de layout del Figma define **rangos** y cada frame es solo un
punto dentro de su rango. Los `@media` empiezan en el **inicio del rango**, nunca en el ancho del frame.

1. `snippets/layout-doc.js` sobre la doc de layout de Foundations (textos tipo "960px – 1279px") →
   `.ai/figma/layout-doc.json` (1 llamada; mejor el frame que la página entera).
2. `npm run breakpoints` → tabla Modo · Frame · Rango · Columnas, propuesta del mapa y avisos de
   **huecos y solapes** (p. ej. la doc dice "XL 1280–1599 / XXL 1620–1919": hueco 1600–1619, ¿errata?).
3. Enseña la tabla al usuario y confírmala. **Si el Figma no tiene doc de layout, pregunta los rangos**
   (no asumas "ancho del frame = inicio"): `npm run breakpoints -- --set "390=0,480=401,…"`.
4. `npm run breakpoints -- --write` → `hanzo.config.json → breakpoints` (`{ "<ancho frame>": <inicio> }`).

Referencia (plantilla Hanzo, confirmado en Joselito):

| Modo | Frame | Rango | Columnas |
|---|---|---|---|
| XS | 390 | – 400 | 6 |
| SM | 480 | 401 – 480 | 6 |
| M (tablet) | 768 | 481 – 959 | 8 |
| L / LG | 1024 | 960 – 1279 | 12 |
| XL | 1440 | 1280 – 1619 | 12 |
| XXL | 1620 | 1620 – 1919 | 12 |
| XXXL | 1920 | 1920 + | 12 |

Los viewports de Storybook siguen en el ancho del frame (buenos puntos de muestra); el toolbar
muestra "desde N px".

## 3. Generar

```
npm run tokens            # react-storybook → src/tokens/
npm run tokens -- --out css/tokens --no-tailwind   # html-static
npm run tokens -- --out assets --no-tailwind       # shopify
```

Genera `tokens.css` (primitivas en `:root`; responsive **mobile-first** con `@media (min-width: <inicio
de rango>)` a partir del modo más pequeño; subtemas en `[data-theme="<slug>"]`, el primero también en
`:root`), `typography.css` (`.ts-<estilo>`), `effects.css` (`.fx-<estilo>`), `tailwind-theme.css`
(`@theme inline`: solo colores **semánticos**, spacing, radius, fuentes y breakpoints con los
nombres de Figma `sm: m: lg: xl: xxl: xxxl:` **en el inicio de rango**), `tokens.json` (W3C DTCG) y
`tokens.meta.json` (breakpoints con `width` del frame y `min` del rango, grids, subtemas, estilos,
mapa de variables; lo usan Storybook, docs, auditoría y `dod-check`).

Revisa los avisos (alias sin resolver, estilos ligados a variables de librerías externas, modos sin
rango, rejilla elástica ≠ Figma) y cuéntaselos al usuario.

### Columnas elásticas (`hanzo.config.json → grid.fluid: true`, por defecto en proyectos nuevos)

`Layout/Cols Size/*` (`Ncols`, `gutterNcol`, `WrapperNCol`, `Ncols-KGutter`) y `Viewport-width/Size`
en Figma son px fijos del frame de ejemplo: solo cuadran en ese ancho exacto (a 1200 px una pieza
acaba a mitad de columna; con rangos, a 1280 se aplicarían valores de 1440 → desbordes). Con
`grid.fluid` no se emiten por modo: se definen **una vez** con `calc()` sobre la rejilla real
(`--grid-columns`, gutter y margen, que sí cambian por rango):

| Variable Figma | Fórmula |
|---|---|
| `Viewport-width/Size` | `--grid-width` |
| `Ncols` | `min(N·col + (N−1)·g, ancho − 2·margen)` (si N > columnas del rango → ancho completo) |
| `gutterNcol` | `Ncols + 2·g` |
| `WrapperNCol` | `margen + Ncols + g` |
| `Ncols-KGutter` | `Ncols − K·g` |

- **Validación automática:** el script evalúa cada fórmula en el ancho de cada modo y la compara con
  Figma; avisa si difiere > 1 px (en Joselito cuadraron las 22 variables en los 7 modos). Si hay
  avisos, `Cols Size` no es la rejilla de los grid styles: enséñalo al usuario antes de seguir.
- `@property --grid-width` (`<length>`) es **obligatorio**: sin registrar, `100cqw` se heredaría como
  texto y se resolvería contra el contenedor de cada descendiente (p. ej. una cabecera con container
  query daría anchos erróneos).
- `--grid-width` = `100vw` en `:root` y `100cqw` dentro de `[data-grid-scope]`. `100vw` incluye la
  barra de scroll en Windows (~15–17 px de error): la raíz de la app va dentro de un contenedor
  (`<div class="grid-root"><div data-grid-scope>…`; el scaffold ya lo trae en Storybook, la plantilla
  HTML y `theme.liquid`).
- **Sin tope de ancho**: ni `.wrapper` ni `--grid-width` se paran en 1920; la rejilla sigue creciendo.
- Solo las variables de rejilla son elásticas: espaciados, tipografía y márgenes siguen escalonados
  por breakpoint, como en Figma.

## 3b. Reglas al aplicarlos

- Breakpoints CSS = **inicio de rango** (`tokens.meta.json → breakpoints[].min`: 481, 960, 1280…),
  nunca el ancho del frame (768, 1024, 1440). `dod-check` lo comprueba.
- Colores **siempre** vía tokens semánticos (Tailwind solo expone los semánticos; `token-audit`
  avisa si se usa una primitiva).
- Cada texto lleva una clase `.ts-*` de su estilo de Figma (son responsive por sí mismas).
- Espaciados vía variables; si un valor no tiene token → avisar (posible error de diseño).
- Grid: `.wrapper` + `.grid-12` y colocación por `grid-column` (`references/build.md` §Columnas). El
  nº de columnas cambia por rango (`--grid-columns`: 6 en XS/SM, 8 en M, 12 desde L) → en móvil
  `grid-column: 1 / -1` o spans ≤ columnas de ese rango.
- Estilos de efecto centralizados en `.fx-*`.

## 4. Tipografías

Regla: **Google Fonts (online) si la familia está allí; `fonts-raw/` solo si no**. Las del sistema
(Georgia, Arial…) no se cargan.

`npm run fonts` (tras generar tokens) lee las familias y cortes de los estilos de texto de Figma y:
- consulta Google Fonts corte a corte → `fonts-google.css` con un único `@import` (se importa
  **el primero** de todo el CSS; un `@import` remoto en medio se descarta);
- convierte a WOFF2 solo lo que Google no tiene, desde `fonts-raw/` → `fonts.css` con `@font-face`;
- avisa de cortes que no estén en ningún sitio (pídelos al usuario).

Si la shell no tiene red para consultar Google, el script lo dice: decide con el usuario y fíjalo en
`hanzo.config.json → fonts.overrides` (`{ "Euclid Circular B": "raw", "Inter": "google" }`).
`fonts.source: "raw"` (o `--local`) fuerza todo self-hosted (p. ej. si el cliente no quiere
peticiones a Google por privacidad). `fonts-raw/` no se sube (licencias).

## 5. Documentar (Storybook / catálogo)

- **react-storybook:** el scaffold trae **una página por grupo** en Foundations, que leen
  `tokens.json` + `tokens.meta.json` (`src/docs/TokenDocs.jsx`) y se actualizan solas al regenerar:
  `Colors.mdx` (**Colores**, formato Wix Design System: buscador por nombre o valor; **Semánticos** con
  pestañas por subtema y el valor como `--primitiva → #hex`, agrupados por la ruta de Figma; **Primitivas**
  por familia; tablas Nombre · Valor · Vista con muestra de 48 px y cuadros para la transparencia),
  `Typography.mdx`, `Spacing.mdx` (espaciados —sin letter-spacing— y radios), `Effects.mdx` y
  `Layout.mdx` (breakpoints por rango y columnas). No se juntan en una sola página.
- **html-static / shopify:** página `docs/tokens.html|md` con las mismas secciones, generada leyendo
  `tokens.meta.json` (nunca valores copiados a mano).

## DoD de tokens

Volcado completo · breakpoints por rangos confirmados (`hanzo.config.json → breakpoints`) · rejilla elástica sin diferencias con Figma · generación sin avisos sin explicar · build OK · docs de cada grupo · viewports y
subtemas visibles en Storybook · fuentes cargando (sin fallback en las demos).

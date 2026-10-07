# Actualización de la skill `hanzo-design-to-code` — Storybook (Joselito, 7-oct-2026)

Todos los ajustes de Storybook que Igor pidió en Joselito, con el **código final exacto** para que cualquier
proyecto nuevo se construya igual. Esta carpeta replica la estructura de la skill: **copia cada fichero a la
misma ruta de la skill, sustituyendo el que haya**.

## Cómo aplicarlo a la skill

1. Copia `assets/`, `scripts/` y `references/` encima de la carpeta de la skill (mismas rutas).
2. **Borra** `assets/scaffold/react-storybook/src/docs/Tokens.mdx` de la skill (sustituido por 5 páginas).
3. En proyectos ya creados: `node <skill>/scripts/scaffold.mjs --update-scripts` para los scripts, copia a
   mano los ficheros de `_dot_storybook/` → `.storybook/` y `src/docs/` → `src/docs/` (borra `src/docs/Tokens.mdx`),
   cambia `{{CLIENT}}` por el cliente en `Welcome.mdx` y ejecuta `npm run docs` + `npm run build-storybook`.

Los únicos marcadores son `{{CLIENT}}` (Welcome.mdx; `theme.js` ya lo tenía). Nada es específico de Joselito.

## Qué cambia (y dónde está el código)

### Página Doc de cada elemento (`src/docs/doc-kit.css`, `DocKit.jsx`)
| Ajuste | Valor exacto |
|---|---|
| Título `.hzd-title` | Inter **300**, line-height **1.5**, 32 px → **46 px** desde 960 px |
| Titulares `.hzd-h` (h2/h3) | Inter **300**, line-height **1.5**; h2 22 → **26 px**, h3 16 → **20 px** desde 960 px; margen inferior **24 px** (h2) y **16 px** (h3) |
| Do / Don't | `--hzd-do: #167e4f`, `--hzd-dont: #b11d12` |
| Demo | lienzo **blanco**, borde 1 px `--hzd-line`, radio 8 px, sin sombra; «Show code / Copy code» **debajo** del lienzo (`margin-top: 4px`), en gris y acento al hover |
| Aislamiento de la demo | la doc no pisa la story: `.hzd a:not(.hzd-demo a)`, `.hzd p:not(.hzd-demo p)` y tipografía base del proyecto en `.hzd-demo .docs-story` (antes los enlaces de los módulos salían azules) |
| `argTypesFromMeta(meta, overrides)` | 2.º parámetro: argTypes propios de la story fusionados sin perder descripción ni tipo del meta |

### Stories por eje (`src/docs/axis.jsx`, nuevo)
- `axisStory(Component, [{ label, story?, args? }], { name })`: pinta todas las opciones de un eje juntas,
  reutilizando las stories de variante (args, render, decorators, subtema) o args propios.
- Fija `parameters.docs.source.code` (una línea JSX por opción) y **no pasa el contexto de Storybook como prop**:
  si se pasa, el «Show code» lo serializa entero y la página Doc se cuelga (pasó en 15 elementos).

### Toda la documentación (`.storybook/preview-head.html`)
- `.sbdocs.sbdocs-wrapper { padding: 6rem 4rem; }`
- Titulares de las páginas MDX (Welcome, Foundations…) iguales que DocKit: Inter 300, line-height 1.5,
  h1 32 → 46 px, h2 22 → 26 px, h3 16 → 20 px desde 960 px. Storybook 10 no pone `.sbdocs-hN`: se seleccionan
  por etiqueta con `:not(.hzd *)`.
- Inter con pesos **300**–700 (también en `manager-head.html`).

### Interfaz de Storybook (`.storybook/manager-head.html`, `manager.js`, `preview.jsx`)
- Botón «Columnas» (`data-hz-grid`) justo **a la izquierda de «Change viewport»** (orden por CSS).
- Barra lateral con las **sangrías de Wix Design System** (medidas en su Storybook): ítems desde x = 14 px
  (`#storybook-explorer-tree { padding-left: 2px }`), texto de hojas y desplegables a 36 px, hijos a 54 px
  (las hojas ya no reservan hueco para el icono oculto).
- `storySort`: Foundations empieza por Colores › Tipografía › Espaciados y radios › Efectos › Breakpoints y rejilla.
- El decorador marca `data-layout="fullscreen|padded"` en `.hz-story`.

### Foundations en páginas separadas (`src/docs/*.mdx` + `TokenDocs.jsx`)
- `Colors.mdx` → **Foundations/Colores** con el formato de Wix: buscador; **Semánticos** con pestañas por
  subtema y valor `--primitiva → #hex`; **Primitivas** por familia; tablas Nombre · Valor · Vista (muestra
  48 px, cuadros para transparencias). Lee `tokens.json` + `tokens.meta.json`.
- `Typography.mdx`, `Spacing.mdx` (espaciados sin letter-spacing + radios), `Effects.mdx`, `Layout.mdx`
  (breakpoints por rango + columnas).

### Scripts (`scripts/`) — fallos de la versión nueva de la skill
- `lib.mjs`: `meta` ya no es flag booleano → `figma-diff --meta <ruta>` volvía a fallar y con él el paso 4
  del DoD **en todos los elementos**.
- `grid-columns.mjs`: `--meta` sigue funcionando como flag (devuelve el posicional si se lo come).
- `dod-check.mjs`: `max-width: 959.98px` (fin del rango anterior) ya no da error de breakpoint; override
  `figma.digest` en el meta para dos másters con el mismo slug.
- `plan.mjs`: claves que solo difieren en mayúsculas (accordion / Accordion) se desambiguan con el nodeId.

### Referencias (`references/`)
- `output-react-storybook.md`: barra lateral, Foundations, sangrías, titulares, demos, botón Columnas,
  `axisStory` (con ejemplo), `argTypesFromMeta(meta, overrides)` y verificación de páginas Doc.
- `docs.md`: Do/Don't propuestos marcados como pendientes de diseño; estilos de la doc.
- `tokens.md` §5: una página por grupo en Foundations.

# Fase 6 — Documentación: el contrato `<Nombre>.meta.json`

Cada elemento (componente, módulo, template) tiene un `meta.json` junto a su código. Es a la vez:
el **contrato** que comprueba `dod-check`, la base de la **documentación** que genera
`docs-generator` y el puente para **detectar cambios** con `figma-diff`. Se escribe en el idioma de
`docsLang` (los nombres de props, en el idioma del código).

## Formato

```json
{
  "name": "Tag",
  "kind": "component",
  "title": "Tag",
  "figma": { "nodeId": "49723:4763", "name": "Tag", "fp": "a0e4d1b9" },
  "description": "Etiqueta corta para estados de producto (nuevo, oferta…).",
  "defaultStory": "Default",
  "variantAxes": { "Size": ["L", "XS", "XL"], "Type": ["Transaction", "New", "Aseptic"] },
  "codeOnlyAxes": [],
  "variants": [ { "story": "New", "title": "Type=New" }, { "story": "Transaction", "title": "Type=Transaction" } ],
  "axes": [
    { "name": "Type", "prop": "type", "story": "Types", "description": "Tres usos según el estado del producto.",
      "options": [ { "value": "New", "description": "producto recién llegado." }, { "value": "Transaction", "description": "oferta o descuento." } ] },
    { "name": "Size", "prop": "size", "story": "Sizes", "description": "`L` por defecto; `XS` solo en tarjetas.", "options": ["XL", "L", "XS"] }
  ],
  "usage": { "intro": "Marca un producto con un estado corto.", "do": ["Una etiqueta por tarjeta."], "dont": ["No la uses como botón: usa `Button`."] },
  "useCases": [ { "title": "En Card Product", "description": "Arriba a la izquierda de la imagen.", "story": "InCard" } ],
  "changelog": [ { "date": "2026-10-07", "version": "", "changes": ["Primera versión"] } ],
  "props": [
    { "name": "size", "figma": "Size", "description": "Tamaño", "default": "L", "control": "select" },
    { "name": "removable", "figma": "-> Remove", "description": "Muestra la X", "default": false, "control": "boolean" }
  ],
  "tokens": { "color": [{ "token": "--texts-base", "usage": "texto" }], "spacing": ["--layout-spacers-responsive-2"] },
  "subthemes": { "default": "light-white", "supported": ["light-white", "dark-black-neutral"], "notes": "" },
  "anatomy": ["Contenedor", "Texto", "Icono X (opcional)"],
  "behavior": ["Al pulsar la X emite onRemove"],
  "content": [{ "field": "Texto", "maxChars": 16, "notes": "1–2 palabras" }],
  "a11y": ["La X es un botón con aria-label"],
  "related": ["Card Product"],
  "layout": {
    "type": "Columnas (Left/Right) · A sangre (Half)",
    "grid": "12 columnas desde 960 px (rango L); en móvil y tablet se apila a ancho completo.",
    "columns": [
      { "variant": "Left · Horizontal", "story": "LeftHorizontal", "piece": "Imagen 4:3", "selector": ".m07-content__media", "columns": "1–6" },
      { "variant": "Left · Horizontal", "story": "LeftHorizontal", "piece": "Texto", "selector": ".m07-content__text", "columns": "8–12 (7 libre)" }
    ],
    "noColumns": ["Half-Left", "Half-Right"]
  },
  "images": [],
  "placeholders": [],
  "notes": ["Padding sin variable en Figma (8 px) → --layout-spacers-responsive-2; avisado a diseño"],
  "codePath": "src/components/Tag/Tag.jsx"
}
```

- `figma.fp` = huella del digest con el que se construyó (detecta cambios).
- `variantAxes`: ejes de variante implementados con sus valores (los de dispositivo no: el
  responsive se cubre con breakpoints). `figma-diff` compara con el máster.
- `props[].figma`: nombre de la propiedad en Figma (para propiedades booleanas, de texto, slot o swap).
- `variants[]`: una story/demo por combinación relevante (al menos una por valor de cada eje); en
  sets enormes (Button 60 variantes), una story por eje con todas sus opciones en una cuadrícula.
- `layout` (**módulos**, obligatorio): `type` = tipología de «Módulos por layout» (Columnas, Líquido,
  A sangre, Mezcla; se pueden combinar por variante); `grid` = una frase sobre la rejilla por rango;
  `columns` = una fila por pieza y variante de escritorio con sus columnas (inicio–fin y libres);
  `noColumns` = variantes sin rejilla (a sangre/líquido). `story` + `selector` (opcionales) permiten
  medirla en Storybook con `npm run layout`. El borrador sale de `npm run grid -- … --meta`.
- `axes` (**obligatorio si hay `variantAxes`**): las variantes **por eje**, como en la referencia de
  Wix: una entrada por eje (Type, Size, State…) con `description` (para qué sirve el eje),
  `options` (valor + descripción opcional de cuándo usar cada uno) y `story`: **una story que pinta
  todas las opciones del eje juntas** (fila con flex-wrap, mismo resto de args). Si una opción necesita
  su propio lienzo (módulos), `options[].story`. Los estados (hover, focus, disabled…) son un eje más.
  `variants[]` sigue sirviendo para `dod-check`/`figma-diff` y como respaldo si un meta no tiene `axes`.
- `usage`: `intro` + tarjetas **Do / Don't**. Sácalo de la página de documentación de Figma; si no
  hay, propónlo tú y **pide OK a diseño** (es guía, no se inventa en silencio): empieza `intro` por
  `_Propuesta pendiente de OK de diseño._` y añade `{ what: "Uso (Do / Don't)", why: "propuesta pendiente de
  revisar con diseño" }` a `placeholders`; al aprobarlo se quitan las dos marcas. `dod-check` avisa si falta.
- `useCases`: el elemento en contextos reales (`title`, `description`, `story` opcional).
- `changelog`: una entrada por cambio publicado (`date`, `version` opcional, `changes[]`). La primera,
  al construirlo; las siguientes, en la fase de cambios (`references/changes.md`). Se ve en la pestaña Cambios.
- `content`: la **guía de contenido** de la página de documentación del módulo (límite de caracteres).
- `images`: hashes usados (`maps/images.json`). `placeholders`: `{ what, why }` por cada hueco.

## Generar

```
npm run docs                       # todos los meta.json
node scripts/hanzo/docs-generator.mjs src/components/Tag/Tag.meta.json --lang en   # uno solo
```

**react-storybook** — el `.mdx` generado es mínimo: importa el `meta.json` y monta `<DocPage>`
(`src/docs/DocKit.jsx`). La página **lee el meta.json en vivo**: si cambias textos, ejes o Do/Don't,
no hace falta regenerar (sí si cambian nombre, rutas o enlaces). Estructura (referencia: Wix Design System):

- **Cabecera**: tipo (Componente / Módulo / Template), título, descripción y enlaces **Ver en Figma**
  (nodo, desde `hanzo.config.json → figma.files`) y **Ver código** (`github.repo` + `codePath`).
- **Pestaña Resumen**: Demo · Uso (Do / Don't) · Anatomía · Variantes (un bloque por eje: explicación a
  la izquierda y todas las opciones juntas a la derecha; en módulos y templates, apilado a ancho completo) ·
  Layout y columnas (módulos) · Comportamiento · Subtemas · Guía de contenido · Accesibilidad ·
  Casos de uso · Relacionados · Pendientes. Las secciones vacías no se pintan.
- **Pestaña Código**: Import (con copiar) · Propiedades (Nombre · Tipo · Por defecto · Descripción +
  nombre en Figma) · Playground (Demo + Controls) · Tokens · Ficheros.
- **Pestaña Cambios**: `meta.changelog`.

Cada demo lleva «Show code» / «Copy code» **debajo** del lienzo (blanco, borde de 1 px). Tipografía de Storybook y de
la doc: **Inter**; titulares light, line-height 1.5 (h1 46 px en escritorio). Do en `#167e4f`, Don't en `#b11d12`.
Las stories por eje: `axisStory` (`src/docs/axis.jsx`, ver `references/output-react-storybook.md`).

**html-static / shopify** — misma información en una sola página (Intro · Demo · Uso · Anatomía ·
Subtemas · Comportamiento · Layout y columnas · Variantes (por eje) · Tokens · Propiedades · Guía de
contenido · Accesibilidad · Relacionados · Casos de uso · Pendientes · Cambios).

- Tokens: ver `references/tokens.md` §5 (bloques que leen `tokens.meta.json`).
- Nunca edites el `.mdx`/`.html` generado ni `DocKit.jsx` por elemento: edita el meta.json (y regenera si hace falta). Texto adicional largo
  → campo `description` o `behavior` (admiten Markdown).

## Para el equipo de desarrollo

La doc publicada en Pages es el punto de acceso para desarrollo: nombre del componente en código
(`codePath`), props, tokens y subtemas. En React, la pestaña **Código** tiene el import y el
Playground con `Controls` vivos (tipos, descripciones y controles salen del meta vía `argTypesFromMeta`).

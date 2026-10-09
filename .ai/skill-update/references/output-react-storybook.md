# Perfil de salida: React + Tailwind + GSAP + Storybook

Perfil por defecto. Usa siempre las últimas versiones estables (el scaffold trae rangos probados:
React 19, Vite 7, Tailwind 4 vía `@tailwindcss/vite`, Storybook 10 con `addon-docs` + `remark-gfm`).

## Scaffold

```
node <skill>/scripts/scaffold.mjs --profile react-storybook
npm install
npm run fonts          # Google Fonts → fonts-google.css · fonts-raw → public/fonts + fonts.css
npm run tokens         # tras guardar .ai/figma/variables.json
npm run build-storybook
```

Crea: `package.json` (scripts `tokens|fonts|images|plan|audit|dod|docs|breakpoints|layout|overflow` apuntando a
`scripts/hanzo/`), `vite.config.js` (react, tailwind, svgr, `base: './'`), `.storybook/`
(viewports, subtemas y overlay de columnas leídos de `tokens.meta.json`), `src/index.css` (orden de imports),
`src/styles/grid.css`, `.github/workflows/deploy.yml` (Storybook → Pages en cada push a main),
`.gitignore` (tokens, fuentes de origen, `storybook-static`), `CONTEXT.md`, `CHANGELOG.md`.

## Estructura

```
src/tokens/        generado (no editar)
src/components/<Nombre>/<Nombre>.jsx · .css (opcional) · .stories.jsx · .meta.json · .mdx (generado)
src/docs/DocKit.jsx · doc-kit.css   página de documentación (cabecera + pestañas); no se toca por elemento
src/modules/<Mxx-Nombre>/…      mismo esquema
src/templates/<Pagina>/…        composición de módulos
src/assets/{icons,logos,illustrations,images}   SVGR (?react) / WebP
public/fonts/
maps/components.json · maps/images.json
```

## Convenciones de código

- Estilos con utilidades de Tailwind **del tema** (`bg-backgrounds-base`, `text-texts-base`,
  `p-layout-spacers-responsive-6`, `rounded-layout-corners-l`, `xl:col-span-6`) o CSS con `var(--…)`.
  Prohibido: arbitrarias con literal (`p-[24px]`), paleta por defecto (`bg-red-500`). La estética
  la define Figma, no Tailwind.
- Tipografía con las clases `.ts-*`.
- Subtemas: el componente no fija `data-theme` salvo prop `theme`.
- GSAP con `useGSAP` / `gsap.context` y limpieza al desmontar.
- Iconos: `import Icon from '@/assets/icons/arrow-right.svg?react'`; color con `currentColor`.

## Storybook

- **Barra lateral, siempre en este orden:** Welcome › Foundations › Brand Assets › Components › Modules ›
  Templates; alfabético dentro de cada grupo; dentro de cada elemento: Doc, Default y el resto
  (`storySort` en `.storybook/preview.jsx`). **Foundations** empieza por las páginas de tokens, una por
  grupo y en este orden: `Foundations/Colores` · `Foundations/Tipografía` · `Foundations/Espaciados y
  radios` · `Foundations/Efectos` · `Foundations/Layout` (`src/docs/Colors.mdx`,
  `Typography.mdx`, `Spacing.mdx`, `Effects.mdx`, `Layout.mdx`; los bloques salen de `TokenDocs.jsx`), y
  después los foundations construidos (Aspect Ratio…). Títulos: `Foundations/<Nombre>`,
  `Brand Assets/<Nombre>`, `Components/<Nombre>`, `Modules/<Mxx Nombre>`, `Templates/<Nombre>`, con el
  nombre tal cual en Figma (mismas mayúsculas y separadores en todo el proyecto).
- **Logo del cliente** arriba de la barra lateral y como favicon: `public/brand-logo.svg` (provisional
  con el nombre hasta el paso de vectores de Brand Assets, `references/images.md` §A.6). Recorta el
  `viewBox` al contenido del logo (si no, sale diminuto con `max-height: 32px`) y usa un color fijo en
  vez de `currentColor` (un `<img>` no hereda color).
- Barra lateral **solo con las flechas** de desplegar (sin iconos de tipo) y **sangrías de Wix Design
  System**: ítems desde x = 14 px, texto de hojas y desplegables alineado a 36 px, hijos de un elemento a
  54 px (`.storybook/manager-head.html`: `#storybook-explorer-tree { padding-left: 2px }` + ocultar el hueco
  del icono de las hojas). No lo cambies por proyecto.
- **Tipografía de Storybook: Inter** (interfaz y páginas de doc: `.storybook/theme.js` +
  `manager-head.html`/`preview-head.html` con Google Fonts, pesos 300–700). Las stories usan las fuentes del proyecto.
- **Páginas de documentación** (todas, DocKit y MDX): contenedor `.sbdocs-wrapper` con `padding: 6rem 4rem` y `.sbdocs-content` sin `max-width` (todo el ancho);
  titulares en **Inter light (300) y line-height 1.5**: h1 32 → **46 px**, h2 22 → 26 px, h3 16 → 20 px desde
  960 px; margen inferior 24 px (h1/h2) y 16 px (h3/h4). DocKit lo trae en `doc-kit.css` y los MDX en
  `preview-head.html` (Storybook 10 no pone clases `.sbdocs-hN` en los títulos del MDX: se seleccionan por
  etiqueta, `:not(.hzd *)`).
- **Demos en la página Doc:** lienzo blanco con borde fino de 1 px, sin sombra; «Show code / Copy code»
  **debajo** del lienzo (Storybook los monta con margin-top −40 px encima de la story y en módulos a sangre
  tapaban el contenido). La story no hereda nada de la doc: `doc-kit.css` excluye las demos de sus reglas
  (`.hzd a:not(.hzd-demo a)`…) y devuelve la tipografía base del proyecto en `.hzd-demo .docs-story`
  (si no, los enlaces de los módulos salían azules).
- **Botón «Columnas»** en la barra, justo a la **izquierda de «Change viewport»** (orden con CSS en
  `manager-head.html`; el botón lleva `data-hz-grid`).
- Cada elemento: página **Doc** (MDX generado que monta `<DocPage>`, ver `references/docs.md`) +
  story **Default** + **una story por eje** que pinta todas sus opciones juntas (`AxisType`, `AxisSize`,
  `AxisState`…; el nombre va en `meta.axes[].story`) + las de casos de uso. En sets enormes, igual: una por eje.
  Las stories por eje se hacen **siempre** con `axisStory` (`@/docs/axis`): reutiliza las stories de
  variante (sus args, render, decorators y subtema) o args propios por opción, y fija el «Show code».
  ⚠ Nunca pases el contexto de Storybook (`ctx`) como prop a un componente dentro de una story: el
  generador de «Show code» lo serializa entero y **bloquea la página Doc**.
- Módulos y ejes `Device`: sin story por eje; cada opción apunta a su story (`axes[].options[].story`),
  porque cada una necesita su lienzo.
- Default export de las stories con `argTypes: argTypesFromMeta(meta, overrides?)` (de `@/docs/DocKit`):
  Controls muestra tipo, descripción y el control correcto (select, radio, boolean, text) — sin él salen
  "unknown" y JSON. `overrides` = los argTypes propios de la story (control, options de constantes del
  código…): se fusionan sin perder la descripción ni el tipo del meta. `props[].control: "none"` o nombres
  de prop compuestos ("checked / onChange") → `false`. Ejemplo:

```jsx
import Button, { TYPES, SIZES } from './Button';
import meta from './Button.meta.json';
import { argTypesFromMeta } from '@/docs/DocKit';
import { axisStory } from '@/docs/axis';

export default {
  title: 'Components/Button', component: Button,
  argTypes: argTypesFromMeta(meta, { type: { control: 'inline-radio', options: TYPES } }),
  args: { text: 'Button', type: 'Primary', size: 'L' },
};
export const Default = {};
export const PrimaryDefault = { args: { type: 'Primary' } };
export const SecondaryDefault = { args: { type: 'Secondary' } };
export const PrimaryHover = { args: { type: 'Primary', state: 'Hover' } };

/** Eje «Type»: todas las opciones juntas (página Doc → Variantes). */
export const AxisType = axisStory(Button, [
  { label: 'Primary', story: PrimaryDefault },
  { label: 'Secondary', story: SecondaryDefault },
], { name: 'Eje · Type' });
/** Eje «Size»: valores sin story propia → args. */
export const AxisSize = axisStory(Button, SIZES.map((s) => ({ label: s, args: { size: s } })), { name: 'Eje · Size' });
```

- `props[].control`: `select` | `radio` | `boolean` | `text` | `number` | `json` | `false` (oculto);
  las opciones salen de `props[].options` o de `variantAxes[props[].figma]`.
- Demos con altura según contenido (nunca fija).
- Componentes propios dentro de un MDX (fuera de `<Canvas>`): envuélvelos en `<Unstyled>` o los
  estilos de la doc de Storybook pisarán tipografías y tamaños.
- Subtema por defecto: `parameters: { defaultTheme: '<slug>' }` en la meta (o en la story si las
  variantes difieren). **Nunca `globals` por story**: bloquea el toolbar. El toolbar tiene "Auto"
  (usa el `defaultTheme`) y una entrada por subtema; el decorador pinta `data-theme` en el wrapper.
- Módulos con `parameters: { layout: 'fullscreen' }` y viewport por defecto según la variante.
- El decorador envuelve cada story en un contenedor (`container-type: inline-size`) + `[data-grid-scope]`:
  las columnas elásticas miden el lienzo real (también en las páginas Doc, más estrechas).
- Botón de icono **«Columnas»** en la barra (toggle on/off, atajo Alt+G; `.storybook/manager.js` +
  `globalTypes.grid` + `.storybook/grid-overlay.css`): pinta las franjas de la
  rejilla encima de la story (12, o 6/8 en móvil/tablet). Para capturas: `iframe.html?id=<story>&globals=grid:on`.
- En la app (fuera de Storybook), la raíz va igual: `<div class="grid-root"><div data-grid-scope>…`.

## Verificación

Módulos, tras el build: `npm run layout -- <meta>` (Playwright: mide en qué columna empieza y
acaba cada pieza de `meta.layout.columns` con `story` + `selector` a varios anchos — deben salir
enteros y iguales a lo declarado en todos, no solo en 1440) y, al cerrar la fase de módulos,
`npm run overflow` (todas las stories de módulos en todos los rangos; avisa de `scrollWidth >
clientWidth` y del primer elemento que se sale). Requiere `npx playwright install chromium` una vez.

Páginas Doc: ábrelas tras el build (todas en `iframe.html?id=<id>--doc&viewMode=docs`) y comprueba que pintan
`.hzd` sin errores: un cuelgue (hilo principal bloqueado) casi siempre es una story que pasa objetos
enormes como props (ver ⚠ de `axisStory`).

`npm run build-storybook` en la propia carpeta (con permiso de borrado) — sin errores ni
referencias a stories inexistentes. Plan B sin permiso: `npm run build-storybook -- -o <dir-externo>`.
`storybook-static/` y `*.log` en `.gitignore`. Pages despliega solo tras el push; no esperes al workflow.

# Joselito — Design System

Librería de componentes del proyecto **Joselito** (WEB), traducida desde Figma a código.

**Stack:** React 19 · Vite · TypeScript · Tailwind CSS v4 · GSAP · Storybook 10 · SVGR.

## Scripts

| Comando | Descripción |
| --- | --- |
| `npm run dev` | App de desarrollo (Vite) |
| `npm run storybook` | Storybook en local (`:6006`) |
| `npm run build-storybook` | Build estático de Storybook |
| `npm run build` | Build de la app |
| `npm run lint` | Linter (oxlint) |

## Estructura

```
src/
  tokens/       Colores, tipografías, espaciados, breakpoints
  components/   Botones, tags, inputs, tabs, toggles…
  modules/      Header, footer, heros (100% viewport, grid 12 col)
  templates/    Page templates
  assets/       icons · logos · illustrations · images
  styles/       Entrada de Tailwind (@theme = tokens)
```

## Documentación de contexto

- [`CONTEXT.md`](./CONTEXT.md) — stack, convenciones y decisiones.
- [`PLAN.md`](./PLAN.md) — estado del plan de trabajo.
- [`docs/assets-workflow.md`](./docs/assets-workflow.md) — flujo de assets.

## Despliegue

Storybook se publica en GitHub Pages vía GitHub Actions en cada push a `main`.

> ⚠️ El archivo `github-token.txt` nunca se sube (está en `.gitignore`).

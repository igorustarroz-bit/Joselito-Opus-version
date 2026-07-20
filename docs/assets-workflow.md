# Flujo de assets

Ubicación: `src/assets/` con subcarpetas `icons/`, `logos/`, `illustrations/`, `images/`.

## Vectores e iconos (SVG)
- Se importan como componentes React vía **SVGR** (`?react`).
- El color se controla con `currentColor` / tokens de color, nunca hardcodeado.
- Ningún componente usará un icono fuera de la lista oficial (sección *Brand Assets* de Figma).

## Fotos
- Formato **WebP**.
- Nombres en kebab-case y descriptivos.

## Logos
- El *Brand Logo* del cliente vive en `src/assets/logos/` (proviene de *Brand Assets* en Figma).

## Fuentes web
- Las webfonts se almacenan en el proyecto en su versión adaptada para web,
  accesibles para cualquier usuario sin la fuente instalada.

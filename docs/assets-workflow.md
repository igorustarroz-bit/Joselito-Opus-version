# Assets workflow

Cómo se extraen y gestionan los assets del proyecto (iconos, logos, ilustraciones, fotos).

## TL;DR — cómo extraer un asset de Figma

Dos vías, ambas gratuitas y sin cuentas caras (basta con el plan Pro que ya tenemos):

1. **Script REST (recomendado, automatizable).** Corre en tu máquina, sin Claude en medio:

   ```bash
   # Icono/vector -> SVG optimizado en src/assets/icons
   npm run figma:asset -- 49026:6525 --format=svg --name=ArrowRight

   # Ilustración/foto (fill raster) -> WebP en src/assets/illustrations
   npm run figma:asset -- 58182:4402 --mode=fill --webp \
     --out=src/assets/illustrations --name=footer-illustration
   ```

2. **MCP de Figma dentro de Claude/Cowork (para el flujo pixel-perfect).** Al leer un nodo,
   Claude ya usa `get_design_context` (fuente de verdad) y puede llamar a `download_assets`
   para traer el render + las imágenes fuente. Útil mientras construimos un módulo. Ojo: el
   sandbox de Claude **no tiene salida de red a figma.com**, así que la *descarga de bytes*
   de un asset raster se hace con el script REST en tu equipo; los SVG (texto) sí se pueden
   traer en sesión.

> **Por qué NO usamos la REST API "a pelo" en gratis:** desde el 17-nov-2025 el endpoint
> `GET images` (Tier 1) está limitado por asiento. Con asiento **View/Collab** son **~6
> peticiones al MES** en cualquier plan; los 10-20/min solo existen con asiento **Dev/Full**
> en Pro/Org/Enterprise. Como tenemos asiento Full en Pro, el script funciona bien **siempre
> que el fichero viva en un team de pago** (HanzoStudio). Si el fichero está en el team
> Starter, mejor usar el MCP o exportar a mano.

## Configuración previa (una vez)

- **Token de Figma:** crea `figma-token.txt` en la raíz del repo con tu token personal de
  Figma (Settings → Security → Personal access tokens, scope `File content: read`). Está en
  `.gitignore`, igual que `github-token.txt` — **nunca se sube**. Alternativa: env `FIGMA_TOKEN`.
- **Dependencias:** `sharp` (WebP) y `svgo` (optimizar SVG) ya están en devDependencies.
  Si hace falta: `npm i -D sharp svgo`.
- **fileKey del proyecto:** `xtL6cbqN94yw7pAlr8k1NK` (Joselito-Library). Ya es el default del
  script; se puede sobreescribir con `--file=` o `FIGMA_FILE_KEY`.

## Scripts

### `scripts/figma-assets.mjs` — extraer de Figma

```
node scripts/figma-assets.mjs <nodeId> [opciones]
```

| Opción            | Descripción                                                                 |
| ----------------- | --------------------------------------------------------------------------- |
| `--file=<key>`    | fileKey del fichero Figma. Default: el del proyecto.                         |
| `--mode=render`   | Exporta el **nodo** como imagen (default).                                   |
| `--mode=fill`     | Baja las imágenes **raster originales** (fills) del subárbol, sin recomprimir. |
| `--format=svg`    | Formato en modo render: `svg` (default), `png`, `jpg`, `pdf`.                |
| `--scale=<n>`     | Escala del render raster (1-4). Default: 2.                                  |
| `--webp`          | Convierte el resultado raster a WebP.                                        |
| `--out=<dir>`     | Carpeta destino. Default por formato (ver abajo).                           |
| `--name=<base>`   | Nombre base del fichero. Default: el nodeId.                                 |
| `--quality=<n>`   | Calidad WebP 1-100. Default: 82.                                            |
| `--no-optimize`   | No pasar SVGO a los SVG.                                                     |

El nodeId se saca de la URL de Figma (`?node-id=58182-4402` → `58182:4402`) o de
`get_metadata` / `get_design_context`.

### `scripts/to-webp.mjs` — convertir a WebP

Para fotos exportadas a mano (desktop o plugin):

```
node scripts/to-webp.mjs <archivo-o-carpeta> [--quality=82] [--out=<dir>] [--keep]
```

## Convenciones por tipo de asset

### Iconos y vectores (SVGR)

- Origen: página **Brand Assets** de Figma (set `Icons`). Ningún componente usa iconos fuera
  de esta lista.
- Extracción: `figma:asset <nodeId> --format=svg` → optimizado con SVGO (conserva `viewBox`,
  quita `width`/`height`).
- Formato: SVG importado como componente React vía `vite-plugin-svgr`.
- Color: mediante `currentColor` / token semántico — nunca color hardcodeado. El tamaño lo
  aporta `Icon Sizer` (XXS–L).
- Ubicación: `src/assets/icons/`. Import: `import Icon from './icon.svg?react'`.

### Logos

- `Brand Logo` y `Logo Grid` (propios de Joselito) → `src/assets/logos/`.
- Logos de terceros: pendientes de confirmar alcance (ver CONTEXT §10).

### Ilustraciones

- `src/assets/illustrations/`. Si es vector → SVG; si es fill raster → WebP
  (`--mode=fill --webp`).

### Fotografías

- Formato **WebP**. Ubicación: `src/assets/images/`.
- Ratios controlados por el componente `Aspect Ratio`.

### Webfonts

- Origen (licenciado, no se sube): `fonts-raw/` — Euclid Circular B (.ttf), SangBleu Empire (.otf).
- Adaptadas a web: `public/fonts/*.woff2`, declaradas con `@font-face` en `src/index.css` /
  tokens de tipografía.
- Objetivo: que cualquier usuario vea las tipografías sin tenerlas instaladas.

## Fallback manual (sin script)

- **Export nativo del desktop:** selecciona el nodo → panel Export → SVG (iconos) / PNG (fotos)
  → luego `npm run to-webp`.
- **Plugins gratis de la comunidad:** *Figma Exporter* o *Free Compressed PDF and Image
  Exporter* (soporta WebP y SVG) para export masivo.

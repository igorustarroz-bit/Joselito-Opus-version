/**
 * Breakpoints — Joselito Design System
 *
 * Origen: Figma → colección "Responsive" → `Layout/Viewport-width`.
 * Cada breakpoint es un modo de las variables responsive y define el
 * ancho mínimo (min-width) de su rango.
 *
 * ⚠️ Estos valores deben coincidir exactamente con:
 *   - los `--breakpoint-*` de `src/styles/tailwind.css` (variantes de Tailwind)
 *   - el selector global de breakpoint en `.storybook/preview.tsx`
 */
export interface Breakpoint {
  /** Nombre del token (usado como variante Tailwind, p. ej. `m:flex`) */
  name: string;
  /** Etiqueta como aparece en Figma */
  label: string;
  /** Ancho mínimo en px (min-width) */
  min: number;
}

export const breakpoints: readonly Breakpoint[] = [
  { name: 'xs', label: 'XS', min: 390 },
  { name: 'sm', label: 'SM', min: 480 },
  { name: 'm', label: 'M', min: 768 },
  { name: 'lg', label: 'LG', min: 1024 },
  { name: 'xl', label: 'XL', min: 1440 },
  { name: 'xxl', label: 'XXL', min: 1620 },
  { name: 'xxxl', label: 'XXXL', min: 1920 },
] as const;

/** Mapa nombre → min-width (px) */
export const breakpointsMap = Object.fromEntries(
  breakpoints.map((b) => [b.name, b.min]),
) as Record<string, number>;

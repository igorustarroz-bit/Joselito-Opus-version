/**
 * Icon — sistema de iconos del proyecto (Brand Assets de Figma).
 * Carga automáticamente todos los SVG de src/assets/icons vía import.meta.glob (SVGR).
 * Color por `currentColor` (hereda del texto o vía prop `color`).
 * Tamaños del Icon Sizer: XXS 12 · XS 16 · S 20 · M 24 · L 32 (o número px).
 * Ningún componente debe usar iconos fuera de esta lista.
 */
const modules = import.meta.glob('../../assets/icons/*.svg', { query: '?react', eager: true });

// name (sin extensión) -> componente SVGR
export const icons = Object.fromEntries(
  Object.entries(modules).map(([path, mod]) => {
    const name = path.split('/').pop().replace('.svg', '');
    return [name, mod.default];
  }),
);

export const ICON_NAMES = Object.keys(icons).sort();

export const ICON_SIZES = { XXS: 12, XS: 16, S: 20, M: 24, L: 32 };

export default function Icon({ name, size = 'M', color, className = '', title, ...rest }) {
  const Svg = icons[name];
  if (!Svg) {
    if (import.meta.env?.DEV) console.warn(`[Icon] "${name}" no existe en el set de iconos.`);
    return null;
  }
  const px = typeof size === 'number' ? size : (ICON_SIZES[size] ?? ICON_SIZES.M);
  return (
    <Svg
      width={px}
      height={px}
      className={className}
      style={{ color, display: 'inline-block', flexShrink: 0, ...rest.style }}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
      {...rest}
    />
  );
}

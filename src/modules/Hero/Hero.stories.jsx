import Hero from './Hero.jsx';

const meta = {
  title: 'Módulos/Hero · Homepage hero',
  component: Hero,
  parameters: { layout: 'fullscreen' },
};
export default meta;

/** Desktop (1440×860) — imagen a sangre, copy central y Toast abajo-derecha. */
export const Desktop = {
  parameters: { viewport: { value: 'xl' } },
};

/** Mobile (390×800) — degradado inferior, Toast y puntos de paginación centrados. */
export const Mobile = {
  parameters: { viewport: { value: 'xs' } },
};

/** Sin Toast ni puntos: hero limpio con solo el copy central. */
export const SoloCopy = {
  name: 'Solo copy',
  args: { toast: null, dots: 0 },
  parameters: { viewport: { value: 'xl' } },
};

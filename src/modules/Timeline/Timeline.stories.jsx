import Timeline from './Timeline.jsx';

const meta = {
  title: 'Módulos/List · Timeline',
  component: Timeline,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    image: { control: 'inline-radio', options: ['horizontal', 'vertical', 'none'] },
  },
  args: {
    eyebrow: 'El legado de Joselito',
    link: 'Ver todos',
    years: [1920, 1868, 1948, 1964, 1972],
    activeYear: 1948,
    image: 'horizontal',
  },
};
export default meta;

/** Desktop · imagen horizontal (fondo rojo). */
export const Horizontal = {
  globals: { theme: 'dark-red-primary' },
  parameters: { viewport: { value: 'xl' } },
};

/** Desktop · imagen vertical (fondo rojo). */
export const Vertical = {
  args: { image: 'vertical' },
  globals: { theme: 'dark-red-primary' },
  parameters: { viewport: { value: 'xl' } },
};

/** Desktop · sin imagen (fondo oscuro). */
export const SinImagen = {
  name: 'Sin imagen',
  args: { image: 'none' },
  globals: { theme: 'dark-black-neutral' },
  parameters: { viewport: { value: 'xl' } },
};

/** Mobile · imagen horizontal. */
export const Mobile = {
  args: { image: 'horizontal' },
  globals: { theme: 'dark-red-primary' },
  parameters: { viewport: { value: 'xs' } },
};

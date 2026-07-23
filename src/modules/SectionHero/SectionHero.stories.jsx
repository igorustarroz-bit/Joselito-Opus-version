import SectionHero from './SectionHero.jsx';

const meta = {
  title: 'Módulos/Hero · Section hero',
  component: SectionHero,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    layout: {
      control: 'inline-radio',
      options: ['full-bleed', 'margins', 'small-image'],
    },
  },
  args: {
    eyebrow: 'COLECCIONES JOSELITO',
    title: 'Selecciones exclusivas para los paladares más exigentes',
    layout: 'full-bleed',
  },
};
export default meta;

/** Full bleed — imagen a sangre (16:9 desktop). Texto arriba, imagen debajo. */
export const FullBleed = {
  name: 'Full bleed',
  args: { layout: 'full-bleed' },
  parameters: { viewport: { value: 'xl' } },
};

/** Margins — imagen dentro de los márgenes + borde inferior. */
export const Margins = {
  args: { layout: 'margins' },
  parameters: { viewport: { value: 'xl' } },
};

/** Small image — imagen pequeña 3:4 arriba, texto debajo + borde inferior. */
export const SmallImage = {
  name: 'Small image',
  args: { layout: 'small-image' },
  parameters: { viewport: { value: 'xl' } },
};

/** Mobile — ratio de imagen 1:1 y tipografía reducida (Full bleed). */
export const MobileFullBleed = {
  name: 'Mobile · Full bleed',
  args: { layout: 'full-bleed' },
  parameters: { viewport: { value: 'xs' } },
};

/** Mobile — Small image (gap reducido a 54px). */
export const MobileSmallImage = {
  name: 'Mobile · Small image',
  args: { layout: 'small-image' },
  parameters: { viewport: { value: 'xs' } },
};

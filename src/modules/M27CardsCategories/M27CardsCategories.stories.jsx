import M27CardsCategories from './M27CardsCategories';

export default {
  title: 'Modules/M27-Cards-Categories',
  component: M27CardsCategories,
  parameters: { layout: 'fullscreen', defaultTheme: 'light-white' },
  args: { showTitle: true, showArrows: true },
};

export const Default = {};
/** Device=Desktop: tarjetas de 4 columnas y flechas. */
export const Desktop = {};
/** Device=Mobile (ver con el viewport XS). */
export const Mobile = {};
/** Show Arrows=false. */
export const SinFlechas = { args: { showArrows: false } };

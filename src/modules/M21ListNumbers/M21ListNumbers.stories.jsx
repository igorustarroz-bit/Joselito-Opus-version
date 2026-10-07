import M21ListNumbers from './M21ListNumbers';

export default {
  title: 'Modules/M21-List-Numbers',
  component: M21ListNumbers,
  parameters: { layout: 'fullscreen', defaultTheme: 'light-white' },
  args: { showTitle: true },
};

export const Default = {};
/** Device=Desktop: tres columnas con separadores verticales. */
export const Desktop = {};
/** Device=Mobile (ver con el viewport XS): apiladas. */
export const Mobile = {};

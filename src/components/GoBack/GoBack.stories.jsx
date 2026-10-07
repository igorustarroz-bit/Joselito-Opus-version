import GoBack from './GoBack';

export default {
  title: 'Components/Go_Back',
  component: GoBack,
  parameters: { defaultTheme: 'light-white' },
  args: { text: 'TIENDAS Y RESTAURANTES', href: '#' },
};

export const Default = {};
/** Device=Desktop (≥ 481 px): Button-Icon S, separación FX-6. */
export const Desktop = {};
/** Device=Mobile (< 481 px, ver con el viewport XS): Button-Icon XS, separación FX-5. */
export const Mobile = {};

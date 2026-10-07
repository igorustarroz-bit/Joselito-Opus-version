import M31NavigationPreviousNext from './M31NavigationPreviousNext';

export default {
  title: 'Modules/M31-Navigation-PreviousNext',
  component: M31NavigationPreviousNext,
  parameters: { layout: 'fullscreen', defaultTheme: 'light-white' },
  argTypes: { previous: { control: 'object' }, next: { control: 'object' } },
};

export const Default = {};
/** Device=Desktop: dos mitades en fila. */
export const Desktop = {};
/** Device=Mobile (ver con el viewport XS): enlaces apilados. */
export const Mobile = {};
/** Solo enlace siguiente (primera ficha). */
export const OnlyNext = { args: { previous: null } };

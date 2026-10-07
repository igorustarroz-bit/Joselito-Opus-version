import M14HeroSectionheader, { PROPERTIES } from './M14HeroSectionheader';

export default {
  title: 'Modules/M14-Hero-Sectionheader',
  component: M14HeroSectionheader,
  parameters: { layout: 'fullscreen' },
  args: { property: 'Tiendas y Restaurantes', showLabels: true, showButton: true, showToast: false },
  argTypes: { property: { control: 'inline-radio', options: PROPERTIES } },
};

export const Default = {};
/** Property=Tiendas y Restaurantes (Dark - Red - Primary): dirección, enlaces y tres botones. Mobile: ver con el viewport XS. */
export const TiendasYRestaurantes = {};
/** Property=Experiencias (Dark - Black - Neutral). */
export const Experiencias = { args: { property: 'Experiencias' } };
/** Property=Cocinero (Light - Grey) con firma. */
export const Cocinero = { args: { property: 'Cocinero' } };
/** Show toast: Toast sobre la imagen. */
export const ConToast = { args: { property: 'Experiencias', showToast: true } };

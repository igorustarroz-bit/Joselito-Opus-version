import CardsAccordion from './CardsAccordion.jsx';

const meta = {
  title: 'Módulos/Cards · Accordion',
  component: CardsAccordion,
  parameters: { layout: 'fullscreen', defaultTheme: 'dark-black-neutral' },
};
export default meta;

/** Desktop — banda tipográfica sobre fondo oscuro. */
export const Desktop = { parameters: { viewport: { value: 'xl' } } };

/** Mobile — tipografía reducida. */
export const Mobile = { parameters: { viewport: { value: 'xs' } } };

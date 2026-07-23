import CardsProductCarousel from './CardsProductCarousel.jsx';

const meta = {
  title: 'Módulos/Cards · Product carousel',
  component: CardsProductCarousel,
  parameters: { layout: 'fullscreen' },
};
export default meta;

/** Desktop — tres fichas centradas. */
export const Desktop = { parameters: { viewport: { value: 'xl' } } };

/** Mobile — carrusel con scroll horizontal. */
export const Mobile = { parameters: { viewport: { value: 'xs' } } };

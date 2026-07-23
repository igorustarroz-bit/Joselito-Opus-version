import CardsProductCarousel from './CardsProductCarousel.jsx';

const meta = {
  title: 'Módulos/Cards · Product carousel',
  component: CardsProductCarousel,
  parameters: { layout: 'fullscreen' },
};
export default meta;

/** Default — vista por defecto, fluida (sin viewport fijo) para comprobar el responsive. */
export const Default = {};

/** Desktop — tres fichas centradas. */
export const Desktop = { parameters: { viewport: { value: 'xl' } } };

/** Mobile — carrusel con scroll horizontal. */
export const Mobile = { parameters: { viewport: { value: 'xs' } } };

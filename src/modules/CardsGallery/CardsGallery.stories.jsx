import CardsGallery from './CardsGallery.jsx';

const meta = {
  title: 'Módulos/Cards · Gallery',
  component: CardsGallery,
  parameters: { layout: 'fullscreen' },
};
export default meta;

/** Default — vista por defecto, fluida (sin viewport fijo) para comprobar el responsive. */
export const Default = {};

/** Desktop — slider horizontal con ratio de imagen alterno. */
export const Desktop = { parameters: { viewport: { value: 'xl' } } };

/** Mobile — dos columnas. */
export const Mobile = { parameters: { viewport: { value: 'xs' } } };

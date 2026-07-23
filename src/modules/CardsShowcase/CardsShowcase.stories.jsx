import CardsShowcase from './CardsShowcase.jsx';

const meta = {
  title: 'Módulos/Cards · Showcase',
  component: CardsShowcase,
  parameters: { layout: 'fullscreen' },
  argTypes: { type: { control: 'inline-radio', options: ['many', 'one'] } },
  args: { type: 'many' },
};
export default meta;

/** Default — vista por defecto, fluida (sin viewport fijo) para comprobar el responsive. */
export const Default = {};

/** Desktop · Many — carrusel con slides asomando. */
export const Many = { parameters: { viewport: { value: 'xl' } } };

/** Desktop · One — una sola tarjeta a todo el ancho. */
export const One = { args: { type: 'one' }, parameters: { viewport: { value: 'xl' } } };

/** Mobile — tarjetas a todo el ancho con scroll. */
export const Mobile = { parameters: { viewport: { value: 'xs' } } };

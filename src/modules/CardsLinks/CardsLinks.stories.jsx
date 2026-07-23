import CardsLinks from './CardsLinks.jsx';

const meta = {
  title: 'Módulos/Cards · Links',
  component: CardsLinks,
  parameters: { layout: 'fullscreen' },
};
export default meta;

/** Default — vista por defecto, fluida (sin viewport fijo) para comprobar el responsive. */
export const Default = {};

/** Desktop — dos tarjetas grandes en fila. */
export const Desktop = { parameters: { viewport: { value: 'xl' } } };

/** Mobile — dos tarjetas más pequeñas en fila. */
export const Mobile = { parameters: { viewport: { value: 'xs' } } };

/** Tres tarjetas. */
export const TresTarjetas = {
  name: 'Tres tarjetas',
  args: {
    items: [
      { title: 'Jamón Gran Reserva', subtitle: 'Desde 380€' },
      { title: 'Paleta Ibérica', subtitle: 'Desde 240€' },
      { title: 'Lomo de bellota', subtitle: 'Desde 90€' },
    ],
  },
  parameters: { viewport: { value: 'xl' } },
};

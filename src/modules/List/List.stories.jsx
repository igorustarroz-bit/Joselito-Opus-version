import List from './List.jsx';

const meta = {
  title: 'Módulos/List',
  component: List,
  parameters: { layout: 'fullscreen' },
};
export default meta;

/** Default — vista por defecto, fluida (sin viewport fijo) para comprobar el responsive. */
export const Default = {};

/** Desktop — 4 ítems en columnas con divisores verticales. */
export const Desktop = { parameters: { viewport: { value: 'xl' } } };

/** Mobile — ítems apilados con líneas horizontales. */
export const Mobile = { parameters: { viewport: { value: 'xs' } } };

/** Tres ítems (sin el cuarto). */
export const TresItems = {
  name: 'Tres ítems',
  args: {
    items: [
      { title: 'Mejor precio garantizado', description: 'Selección entre Jamón Joselito Gran Reserva o Joselito Vintage.' },
      { title: 'Servicio Maestro Cortador', description: 'Lorem ipsum dolor sit amet consectetur. Leo proin nisi in neque.' },
      { title: 'Notas de cata', description: 'Notas de cata que certifican la autenticidad e identifican la añada.' },
    ],
  },
  parameters: { viewport: { value: 'xl' } },
};

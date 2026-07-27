import LaDehesa from './LaDehesa.jsx';

const meta = {
  title: 'Plantillas/Origen/La Dehesa',
  component: LaDehesa,
  parameters: { layout: 'fullscreen' },
};
export default meta;

/** Default — vista fluida (sin viewport fijo) para comprobar el responsive de la página completa. */
export const Default = {};

/** Desktop (1440) — composición según el máster `58443:45016`. */
export const Desktop = {
  parameters: { viewport: { value: 'xl' } },
};

/** Mobile (390) — misma composición; cada módulo aplica su versión responsive (máster `58443:45028`). */
export const Mobile = {
  parameters: { viewport: { value: 'xs' } },
};

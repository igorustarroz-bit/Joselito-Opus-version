import NuestraHistoria from './NuestraHistoria.jsx';

const meta = {
  title: 'Plantillas/Origen/Nuestra Historia',
  component: NuestraHistoria,
  parameters: { layout: 'fullscreen' },
};
export default meta;

/** Default — vista fluida (sin viewport fijo) para comprobar el responsive de la página completa. */
export const Default = {};

/** Desktop (1440) — composición según el máster `58367:40833`. */
export const Desktop = {
  parameters: { viewport: { value: 'xl' } },
};

/** Mobile (390) — misma composición; cada módulo aplica su versión responsive (máster `58367:41051`). */
export const Mobile = {
  parameters: { viewport: { value: 'xs' } },
};

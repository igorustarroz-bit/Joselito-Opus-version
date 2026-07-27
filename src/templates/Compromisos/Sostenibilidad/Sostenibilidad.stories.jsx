import Sostenibilidad from './Sostenibilidad.jsx';

const meta = {
  title: 'Plantillas/Compromisos/Sostenibilidad',
  component: Sostenibilidad,
  parameters: { layout: 'fullscreen' },
};
export default meta;

/** Default — vista fluida (sin viewport fijo) para comprobar el responsive. */
export const Default = {};

/** Desktop (1440) — composición según el máster `58590:81784`. */
export const Desktop = { parameters: { viewport: { value: 'xl' } } };

/** Mobile (390) — misma composición; cada módulo aplica su versión responsive. */
export const Mobile = { parameters: { viewport: { value: 'xs' } } };

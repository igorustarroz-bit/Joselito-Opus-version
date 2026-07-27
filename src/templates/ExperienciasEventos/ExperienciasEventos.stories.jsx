import ExperienciasEventos from './ExperienciasEventos.jsx';

const meta = {
  title: 'Plantillas/Experiencias y eventos',
  component: ExperienciasEventos,
  parameters: { layout: 'fullscreen' },
};
export default meta;

/** Default — vista fluida (sin viewport fijo) para comprobar el responsive. */
export const Default = {};

/** Desktop (1440) — composición según el máster `58509:40298`. */
export const Desktop = { parameters: { viewport: { value: 'xl' } } };

/** Mobile (390) — misma composición; cada módulo aplica su versión responsive. */
export const Mobile = { parameters: { viewport: { value: 'xs' } } };

import Anadas from './Anadas.jsx';

const meta = {
  title: 'Plantillas/Excelencia/Añadas',
  component: Anadas,
  parameters: { layout: 'fullscreen' },
};
export default meta;

/** Default — vista fluida (sin viewport fijo) para comprobar el responsive de la página completa. */
export const Default = {};

/** Desktop (1440) — composición según el máster `58590:82913` (versión más a la izquierda). */
export const Desktop = {
  parameters: { viewport: { value: 'xl' } },
};

/** Mobile (390) — misma composición; cada módulo aplica su versión responsive (máster `58479:62962`). */
export const Mobile = {
  parameters: { viewport: { value: 'xs' } },
};

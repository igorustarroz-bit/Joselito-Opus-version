import ManualDeCorte from './ManualDeCorte.jsx';

const meta = {
  title: 'Plantillas/Excelencia/Manual de Corte',
  component: ManualDeCorte,
  parameters: { layout: 'fullscreen' },
};
export default meta;

/** Default — vista fluida (sin viewport fijo) para comprobar el responsive. */
export const Default = {};

/** Desktop (1440) — composición según el máster `58479:69902` (versión más a la izquierda). */
export const Desktop = {
  parameters: { viewport: { value: 'xl' } },
};

/** Mobile (390) — misma composición; cada módulo aplica su versión responsive. */
export const Mobile = {
  parameters: { viewport: { value: 'xs' } },
};

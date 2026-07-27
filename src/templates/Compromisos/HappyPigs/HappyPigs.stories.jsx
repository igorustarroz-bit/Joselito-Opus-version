import HappyPigs from './HappyPigs.jsx';

const meta = {
  title: 'Plantillas/Compromisos/Happy Pigs',
  component: HappyPigs,
  parameters: { layout: 'fullscreen' },
};
export default meta;

/** Default — vista fluida (sin viewport fijo) para comprobar el responsive. */
export const Default = {};

/** Desktop (1440) — composición según el máster `58512:66765`. */
export const Desktop = { parameters: { viewport: { value: 'xl' } } };

/** Mobile (390) — misma composición; cada módulo aplica su versión responsive. */
export const Mobile = { parameters: { viewport: { value: 'xs' } } };

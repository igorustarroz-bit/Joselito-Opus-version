import Home from './Home.jsx';

const meta = {
  title: 'Plantillas/Home',
  component: Home,
  parameters: { layout: 'fullscreen' },
};
export default meta;

/** Default — vista fluida (sin viewport fijo) para comprobar el responsive de la página completa. */
export const Default = {};

/** Desktop (1440) — composición de módulos según el máster `58196:24000`. */
export const Desktop = {
  parameters: { viewport: { value: 'xl' } },
};

/** Mobile (390) — misma composición; cada módulo aplica su versión responsive (máster `58153:29609`). */
export const Mobile = {
  parameters: { viewport: { value: 'xs' } },
};

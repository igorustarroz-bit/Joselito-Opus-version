import M39GraphRight from './M39GraphRight';
import { RENDERER_NAMES } from '../../components/Chart/Chart';

import meta from './M39GraphRight.meta.json';
import { argTypesFromMeta } from '@/docs/DocKit';

export default {
  title: 'Modules/M39-Graph Right',
  component: M39GraphRight,
  parameters: { layout: 'fullscreen', defaultTheme: 'light-white' },
  argTypes: argTypesFromMeta(meta, { renderer: { control: 'inline-radio', options: RENDERER_NAMES }, chart: { control: false } }),
};

export const Default = {};
/** Device=desktop (desde 960 px): pasa el ratón por las barras. */
export const Desktop = {};
/** Device=mobile (ver con el viewport XS): apilado, gráfica a ancho completo. */
export const Mobile = {};
/** La misma gráfica pintada con ECharts (motor alternativo). */
export const ECharts = { args: { renderer: 'echarts' }, name: 'Motor ECharts' };

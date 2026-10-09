import { useState } from 'react';
import Chart, { RENDERER_NAMES } from './Chart';
import { m39Spec } from '../../modules/M39GraphRight/m39-graph.spec';

import meta from './Chart.meta.json';
import { argTypesFromMeta } from '@/docs/DocKit';
import { axisStory } from '@/docs/axis';

/** Remonta la gráfica para volver a ver la animación de construcción. */
function Replay(args) {
  const [k, setK] = useState(0);
  return (
    <div style={{ maxWidth: 540 }}>
      <Chart key={k} {...args} />
      <button type="button" className="ts-body-01" style={{ marginTop: 'var(--spacers-fixed-fx-4)' }} onClick={() => setK(k + 1)}>Repetir animación</button>
    </div>
  );
}

export default {
  title: 'Components/Graph',
  component: Chart,
  parameters: { defaultTheme: 'light-white' },
  args: { spec: m39Spec, renderer: 'd3' },
  argTypes: argTypesFromMeta(meta, { renderer: { control: 'inline-radio', options: RENDERER_NAMES }, spec: { control: 'object' } }),
  render: (args) => <Replay {...args} />,
};

export const Default = {};
export const D3 = { args: { renderer: 'd3' }, name: 'Motor D3' };
export const ECharts = { args: { renderer: 'echarts' }, name: 'Motor ECharts' };

/** Comparativa: el mismo ChartSpec con los dos motores. */
export const AxisRenderer = axisStory(Chart, [
  { label: 'D3', story: D3 },
  { label: 'ECharts', story: ECharts },
], { name: 'Eje · Motor (comparativa)' });

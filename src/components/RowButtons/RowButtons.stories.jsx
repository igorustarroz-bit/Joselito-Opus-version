import RowButtons from './RowButtons';

import meta from './RowButtons.meta.json';
import { argTypesFromMeta } from '@/docs/DocKit';
import { axisStory } from '@/docs/axis';

export default {
  title: 'Components/RowButtons',
  component: RowButtons, argTypes: argTypesFromMeta(meta),
  parameters: { defaultTheme: 'light-white' },
  args: { vertical: false, primaryText: 'Button', secondaryText: 'Button' },
};

export const Default = {};
export const VerticalNo = { args: { vertical: false } };
export const VerticalYes = { args: { vertical: true }, decorators: [(Story) => <div style={{ width: 162 }}><Story /></div>] };

/** Eje «Vertical»: todas las opciones juntas (página Doc → Variantes). */
export const AxisVertical = axisStory(RowButtons, [
  { label: "Yes", story: VerticalYes },
  { label: "No", story: VerticalNo },
], { name: "Eje · Vertical" });

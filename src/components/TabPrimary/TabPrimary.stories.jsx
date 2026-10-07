import TabPrimary, { STATES } from './TabPrimary';

import meta from './TabPrimary.meta.json';
import { argTypesFromMeta } from '@/docs/DocKit';
import { axisStory } from '@/docs/axis';

export default {
  title: 'Components/tab_primary',
  component: TabPrimary,
  parameters: { defaultTheme: 'light-white' },
  args: { text: 'item', showIconLeft: true, showIconRight: true },
  argTypes: argTypesFromMeta(meta, { state: { control: 'select', options: [undefined, ...STATES] } }),
};

export const Default = {};
export const TypeDefault = {};
export const TypeHover = { args: { state: 'Hover' } };
export const TypeFocus = { args: { state: 'Focus' } };
export const TypeSelected = { args: { selected: true } };
export const TypeDisabled = { args: { disabled: true } };

/** Eje «Active»: todas las opciones juntas (página Doc → Variantes). */
export const AxisActive = axisStory(TabPrimary, [
  { label: "No", story: TypeDefault },
  { label: "Yes", story: TypeSelected },
], { name: "Eje · Active" });

/** Eje «Type»: todas las opciones juntas (página Doc → Variantes). */
export const AxisType = axisStory(TabPrimary, [
  { label: "Default", story: TypeDefault },
  { label: "Hover", story: TypeHover },
  { label: "Focus", story: TypeFocus },
  { label: "Selected", story: TypeSelected },
  { label: "Disabled", story: TypeDisabled },
], { name: "Eje · Type" });

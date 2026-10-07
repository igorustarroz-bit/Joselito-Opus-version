import SubnavItem from './SubnavItem';

import meta from './SubnavItem.meta.json';
import { argTypesFromMeta } from '@/docs/DocKit';
import { axisStory } from '@/docs/axis';

export default { title: 'Components/subnavigation-item', component: SubnavItem, argTypes: argTypesFromMeta(meta), parameters: { defaultTheme: 'light-white' }, args: { text: 'Tienda', selected: false } };

export const Default = {};
export const SelectedNo = { args: { selected: false } };
export const SelectedYes = { args: { selected: true } };
export const ConIconoYCaret = { args: { showIcon: true, showCaret: true } };

/** Eje «Selected»: todas las opciones juntas (página Doc → Variantes). */
export const AxisSelected = axisStory(SubnavItem, [
  { label: "No", story: SelectedNo },
  { label: "Yes", story: SelectedYes },
], { name: "Eje · Selected" });

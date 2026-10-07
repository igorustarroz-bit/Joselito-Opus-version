import CheckboxList from './CheckboxList';

import meta from './CheckboxList.meta.json';
import { argTypesFromMeta } from '@/docs/DocKit';
import { axisStory } from '@/docs/axis';

export default { title: 'Components/Checkbox-List', component: CheckboxList, argTypes: argTypesFromMeta(meta), parameters: { defaultTheme: 'light-white' }, args: { items: ['Jamón', 'Paleta', 'Embutidos'] } };

export const Default = {};
export const VerticalYes = { args: { vertical: true } };
export const VerticalNo = { args: { vertical: false } };

/** Eje «Vertical»: todas las opciones juntas (página Doc → Variantes). */
export const AxisVertical = axisStory(CheckboxList, [
  { label: "Yes", story: VerticalYes },
  { label: "No", story: VerticalNo },
], { name: "Eje · Vertical" });

import AddToList from './AddToList';

import meta from './AddToList.meta.json';
import { argTypesFromMeta } from '@/docs/DocKit';
import { axisStory } from '@/docs/axis';

export default { title: 'Components/Add_to_list', component: AddToList, argTypes: argTypesFromMeta(meta), parameters: { defaultTheme: 'light-white' } };

export const Default = {};
export const AddedNo = { args: { defaultAdded: false } };
export const AddedYes = { args: { defaultAdded: true } };

/** Eje «Added»: todas las opciones juntas (página Doc → Variantes). */
export const AxisAdded = axisStory(AddToList, [
  { label: "No", story: AddedNo },
  { label: "Yes", story: AddedYes },
], { name: "Eje · Added" });

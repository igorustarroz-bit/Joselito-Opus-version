import ListboxItem, { SELECTIONS, STATUSES } from './ListboxItem';
import photo from '../../assets/images/card-product.webp';

import meta from './ListboxItem.meta.json';
import { argTypesFromMeta } from '@/docs/DocKit';
import { axisStory } from '@/docs/axis';

export default {
  title: 'Components/listbox_Item_Dropdown',
  component: ListboxItem,
  parameters: { defaultTheme: 'light-white' },
  args: { text: 'Label', description: 'Description', showDescription: false, showImage: false, selection: 'Radio Button', showControl: true },
  argTypes: argTypesFromMeta(meta, { selection: { control: 'inline-radio', options: SELECTIONS }, status: { control: 'select', options: [undefined, ...STATUSES] }, image: { control: false } }),
  decorators: [(Story) => <div style={{ width: 314 }}><Story /></div>],
};

export const Default = {};
export const RadioDefault = { args: { selection: 'Radio Button', status: 'Default' } };
export const RadioHover = { args: { selection: 'Radio Button', status: 'Hover' } };
export const RadioSelected = { args: { selection: 'Radio Button', status: 'Selected' } };
export const CheckboxDefault = { args: { selection: 'Checkbox', status: 'Default' } };
export const CheckboxHover = { args: { selection: 'Checkbox', status: 'Hover' } };
export const CheckboxSelected = { args: { selection: 'Checkbox', status: 'Selected' } };
export const Delete = { args: { selection: 'Delete' } };
/** -> Image + -> Description activados. */
export const ConImagenYDescripcion = { args: { showImage: true, image: photo, showDescription: true } };

/** Eje «Size»: todas las opciones juntas (página Doc → Variantes). */
export const AxisSize = axisStory(ListboxItem, [
  { label: "Medium", args: {} },
], { name: "Eje · Size" });

/** Eje «Status»: todas las opciones juntas (página Doc → Variantes). */
export const AxisStatus = axisStory(ListboxItem, [
  { label: "Default", story: RadioDefault },
  { label: "Hover", story: RadioHover },
  { label: "Selected", story: RadioSelected },
], { name: "Eje · Status" });

/** Eje «Selection»: todas las opciones juntas (página Doc → Variantes). */
export const AxisSelection = axisStory(ListboxItem, [
  { label: "Radio Button", story: RadioDefault },
  { label: "Checkbox", story: CheckboxDefault },
  { label: "Delete", story: Delete },
], { name: "Eje · Selection" });

/** Eje «Selected»: todas las opciones juntas (página Doc → Variantes). */
export const AxisSelected = axisStory(ListboxItem, [
  { label: "No", args: {"status":"Default"} },
  { label: "Yes", story: RadioSelected },
], { name: "Eje · Selected" });

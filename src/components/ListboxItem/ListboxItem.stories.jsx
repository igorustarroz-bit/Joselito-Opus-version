import ListboxItem, { SELECTIONS, STATUSES } from './ListboxItem';
import photo from '../../assets/images/card-product.webp';

export default {
  title: 'Components/listbox_Item_Dropdown',
  component: ListboxItem,
  parameters: { defaultTheme: 'light-white' },
  args: { text: 'Label', description: 'Description', showDescription: false, showImage: false, selection: 'Radio Button', showControl: true },
  argTypes: { selection: { control: 'inline-radio', options: SELECTIONS }, status: { control: 'select', options: [undefined, ...STATUSES] }, image: { control: false } },
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

import Tag, { TYPES, SIZES } from './Tag';

import meta from './Tag.meta.json';
import { argTypesFromMeta } from '@/docs/DocKit';
import { axisStory } from '@/docs/axis';

export default {
  title: 'Components/Tag',
  component: Tag,
  parameters: { defaultTheme: 'light-white' },
  args: { type: 'Transaction', size: 'L', removable: false },
  argTypes: argTypesFromMeta(meta, {
    type: { control: 'inline-radio', options: TYPES },
    size: { control: 'inline-radio', options: SIZES },
    text: { control: 'text' },
  }),
};

export const Default = {};

export const TransactionXL = { args: { type: 'Transaction', size: 'XL' } };
export const TransactionL = { args: { type: 'Transaction', size: 'L' } };
export const TransactionXS = { args: { type: 'Transaction', size: 'XS' } };
export const NewXL = { args: { type: 'New', size: 'XL' } };
export const NewL = { args: { type: 'New', size: 'L' } };
export const NewXS = { args: { type: 'New', size: 'XS' } };
export const AsepticXL = { args: { type: 'Aseptic', size: 'XL' } };
export const AsepticL = { args: { type: 'Aseptic', size: 'L' } };
export const AsepticXS = { args: { type: 'Aseptic', size: 'XS' } };

/** "-> Remove" en Figma: X para quitar la etiqueta (filtros). Con `onRemove` la X es un botón. */
export const ConRemove = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 'var(--layout-spacers-responsive-2)', alignItems: 'center' }}>
      {SIZES.map((s) => <Tag key={s} {...args} size={s} removable onRemove={() => {}} />)}
    </div>
  ),
};

/** Eje «Size»: todas las opciones juntas (página Doc → Variantes). */
export const AxisSize = axisStory(Tag, [
  { label: "L", story: TransactionL },
  { label: "XS", story: TransactionXS },
  { label: "XL", story: TransactionXL },
], { name: "Eje · Size" });

/** Eje «Type»: todas las opciones juntas (página Doc → Variantes). */
export const AxisType = axisStory(Tag, [
  { label: "Transaction", story: TransactionL },
  { label: "New", story: NewL },
  { label: "Aseptic", story: AsepticL },
], { name: "Eje · Type" });

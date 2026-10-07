import Icon, { SIZES, ICON_NAMES } from './Icon';

import meta from './Icon.meta.json';
import { argTypesFromMeta } from '@/docs/DocKit';
import { axisStory } from '@/docs/axis';

export default {
  title: 'Brand Assets/Icon',
  component: Icon,
  args: { name: 'star', size: 'M' },
  argTypes: argTypesFromMeta(meta, { size: { control: 'select', options: SIZES }, name: { control: 'select', options: ICON_NAMES } }),
};

export const Default = {};
export const SizeL = { args: { size: 'L' } };
export const SizeM = { args: { size: 'M' } };
export const SizeS = { args: { size: 'S' } };
export const SizeXS = { args: { size: 'XS' } };
export const SizeXXS = { args: { size: 'XXS' } };

/** Galería con los 136 iconos de Figma (Brand Assets › Icons). */
export const Galeria = {
  args: { size: 'L' },
  render: (args) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 16 }}>
      {ICON_NAMES.map((n) => (
        <figure key={n} style={{ margin: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <Icon {...args} name={n} />
          <figcaption className="ts-body-01" style={{ textAlign: 'center', wordBreak: 'break-word' }}>{n}</figcaption>
        </figure>
      ))}
    </div>
  ),
};

/** Eje «Size»: todas las opciones juntas (página Doc → Variantes). */
export const AxisSize = axisStory(Icon, [
  { label: "L", story: SizeL },
  { label: "M", story: SizeM },
  { label: "S", story: SizeS },
  { label: "XS", story: SizeXS },
  { label: "XXS", story: SizeXXS },
], { name: "Eje · Size" });

import Icon, { SIZES, ICON_NAMES } from './Icon';

export default {
  title: 'Brand Assets/Icon',
  component: Icon,
  args: { name: 'star', size: 'M' },
  argTypes: { size: { control: 'select', options: SIZES }, name: { control: 'select', options: ICON_NAMES } },
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

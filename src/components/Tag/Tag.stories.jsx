import Tag from './Tag.jsx';

const meta = {
  title: 'Componentes/UI12-Tag',
  component: Tag,
  argTypes: {
    type: { control: 'radio', options: ['transaction', 'new', 'aseptic'] },
    size: { control: 'radio', options: ['l', 'xs'] },
    children: { control: 'text' },
  },
  args: { children: 'Label', type: 'transaction', size: 'l' },
};
export default meta;

export const Default = {};

export const Tipos = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Tag type="transaction">Label</Tag>
      <Tag type="new">Nuevo</Tag>
      <Tag type="aseptic">Label</Tag>
    </div>
  ),
};

export const Tamaños = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Tag size="l">Large</Tag>
      <Tag size="xs">XS</Tag>
    </div>
  ),
};

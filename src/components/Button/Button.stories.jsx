import Button from './Button.jsx';

const meta = {
  title: 'Componentes/UI02-Button',
  component: Button,
  argTypes: {
    type: { control: 'radio', options: ['primary', 'secondary', 'terciary'] },
    size: { control: 'radio', options: ['xs', 's', 'm', 'l'] },
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
    iconLeft: { control: 'text' },
    iconRight: { control: 'text' },
    children: { control: 'text' },
  },
  args: { children: 'Button', type: 'primary', size: 'm' },
};
export default meta;

export const Default = {};

export const Tipos = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <Button type="primary">Primary</Button>
      <Button type="secondary">Secondary</Button>
      <Button type="terciary">Terciary</Button>
    </div>
  ),
};

export const Tamaños = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
      {['xs', 's', 'm', 'l'].map((s) => <Button key={s} size={s}>{s.toUpperCase()}</Button>)}
    </div>
  ),
};

export const ConIconos = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <Button iconLeft="CalendarBlank">Con icono</Button>
      <Button iconRight="ArrowRight">Siguiente</Button>
      <Button type="terciary" iconLeft="Plus" iconRight="ArrowRight">Ambos</Button>
    </div>
  ),
};

export const Estados = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, max-content)', gap: 16 }}>
      {['primary', 'secondary', 'terciary'].map((t) => (
        <>
          <Button key={t + 'd'} type={t}>Default</Button>
          <Button key={t + 's'} type={t} selected>Selected</Button>
          <Button key={t + 'x'} type={t} disabled>Disabled</Button>
        </>
      ))}
    </div>
  ),
};

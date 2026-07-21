import ActionLink from './ActionLink.jsx';

const meta = {
  title: 'Componentes/UI04-Action-Link',
  component: ActionLink,
  argTypes: {
    disabled: { control: 'boolean' },
    iconLeft: { control: 'text' },
    iconRight: { control: 'text' },
    children: { control: 'text' },
  },
  args: { children: 'Descubrir más' },
};
export default meta;

export const Default = {};

export const ConIconos = {
  render: () => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
      <ActionLink iconRight="ArrowRight">Siguiente</ActionLink>
      <ActionLink iconLeft="Star">Destacado</ActionLink>
    </div>
  ),
};

export const Estados = {
  render: () => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
      <ActionLink>Default</ActionLink>
      <ActionLink disabled>Disabled</ActionLink>
    </div>
  ),
};

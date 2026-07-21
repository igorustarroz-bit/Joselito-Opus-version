import NavButton from './NavButton.jsx';

const meta = {
  title: 'Componentes/UI01-Nav-Button',
  component: NavButton,
  argTypes: {
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
    iconLeft: { control: 'text' },
    iconRight: { control: 'text' },
    children: { control: 'text' },
  },
  args: { children: 'Nav', iconRight: 'CaretDown' },
};
export default meta;

export const Default = {};

export const Estados = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <NavButton>Default</NavButton>
      <NavButton selected>Selected</NavButton>
      <NavButton disabled>Disabled</NavButton>
      <NavButton iconLeft="Globe" iconRight={undefined}>Con icono</NavButton>
    </div>
  ),
};

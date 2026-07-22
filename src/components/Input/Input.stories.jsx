import Input from './Input.jsx';

const meta = {
  title: 'Componentes/UI06-Input',
  component: Input,
  argTypes: {
    size: { control: 'radio', options: ['big', 'small'] },
    state: { control: 'select', options: ['default', 'filled', 'error', 'validated', 'disabled'] },
    label: { control: 'text' },
    message: { control: 'text' },
    actionIcon: { control: 'text' },
  },
  args: { label: 'Label', message: 'Message', size: 'big' },
};
export default meta;

export const Default = { render: (a) => <div style={{ width: 320 }}><Input {...a} /></div> };

export const ConAccion = {
  render: () => <div style={{ width: 320 }}><Input label="Email" actionIcon="ArrowRight" message="Introduce tu email" /></div>,
};

export const Estados = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
      <Input label="Default" message="Message" />
      <Input label="Error" state="error" message="Hay un error" />
      <Input label="Validado" state="validated" message="Correcto" />
      <Input label="Deshabilitado" state="disabled" message="No editable" />
    </div>
  ),
};

export const Tamaños = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
      <Input size="big" label="Big" message="72px" />
      <Input size="small" label="Small" message="56px" />
    </div>
  ),
};

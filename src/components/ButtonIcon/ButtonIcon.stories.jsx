import ButtonIcon from './ButtonIcon.jsx';

const meta = {
  title: 'Componentes/UI03-Button-Icon',
  component: ButtonIcon,
  argTypes: {
    type: { control: 'radio', options: ['primary', 'secondary', 'terciary'] },
    size: { control: 'radio', options: ['xs', 's', 'm', 'l', 'xl'] },
    icon: { control: 'text' },
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: { icon: 'ArrowRight', type: 'primary', size: 'm' },
};
export default meta;

export const Default = {};

export const Tipos = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <ButtonIcon type="primary" icon="ArrowRight" />
      <ButtonIcon type="secondary" icon="Plus" />
      <ButtonIcon type="terciary" icon="HeartStraight" />
    </div>
  ),
};

export const Tamaños = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      {['xs', 's', 'm', 'l', 'xl'].map((s) => <ButtonIcon key={s} size={s} icon="ArrowRight" />)}
    </div>
  ),
};

export const Estados = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <ButtonIcon icon="ArrowRight" />
      <ButtonIcon icon="ArrowRight" selected />
      <ButtonIcon icon="ArrowRight" disabled />
    </div>
  ),
};

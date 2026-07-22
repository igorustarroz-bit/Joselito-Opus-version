import { useState } from 'react';
import Checkbox from './Checkbox.jsx';

const meta = {
  title: 'Componentes/UI09-Checkbox-Label',
  component: Checkbox,
  argTypes: {
    size: { control: 'radio', options: ['m', 's'] },
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: { label: 'Label', size: 'm', checked: false },
};
export default meta;

export const Default = {
  render: (a) => {
    const [c, setC] = useState(a.checked);
    return <Checkbox {...a} checked={c} onChange={(e) => setC(e.target.checked)} />;
  },
};

export const Estados = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Checkbox label="Default" />
      <Checkbox label="Selected" checked />
      <Checkbox label="Undefined" indeterminate />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Disabled selected" checked disabled />
    </div>
  ),
};

export const Tamaños = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Checkbox size="m" label="Medium (label Body/03)" checked />
      <Checkbox size="s" label="Small (label Body/02)" checked />
    </div>
  ),
};

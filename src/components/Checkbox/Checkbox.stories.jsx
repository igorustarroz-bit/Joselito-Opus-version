import { useState } from 'react';
import Checkbox from './Checkbox.jsx';
import Radio from './Radio.jsx';

const meta = {
  title: 'Componentes/UI10-Checkbox-Radio',
  component: Checkbox,
  argTypes: { checked: { control: 'boolean' }, disabled: { control: 'boolean' }, label: { control: 'text' } },
  args: { label: 'Opción', checked: false },
};
export default meta;

export const CheckboxDefault = {
  render: (a) => {
    const [c, setC] = useState(a.checked);
    return <Checkbox {...a} checked={c} onChange={(e) => setC(e.target.checked)} />;
  },
};

export const Checkboxes = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Checkbox label="No marcado" />
      <Checkbox label="Marcado" checked />
      <Checkbox label="Deshabilitado" disabled />
      <Checkbox label="Marcado + deshabilitado" checked disabled />
    </div>
  ),
};

export const Radios = {
  render: () => {
    const [v, setV] = useState('a');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Radio name="g" label="Opción A" checked={v === 'a'} onChange={() => setV('a')} />
        <Radio name="g" label="Opción B" checked={v === 'b'} onChange={() => setV('b')} />
        <Radio label="Deshabilitado" disabled />
        <Radio label="Marcado + deshabilitado" checked disabled />
      </div>
    );
  },
};

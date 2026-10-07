import InputPhone, { STATES } from './InputPhone';

export default {
  title: 'Components/Input-Phone',
  component: InputPhone,
  parameters: { defaultTheme: 'light-white' },
  args: { size: 'Big', label: 'Teléfono', inputLabel: 'Phone Num', info: 'Message', showInfo: true },
  argTypes: { size: { control: 'inline-radio', options: ['Big', 'Small'] }, state: { control: 'select', options: [undefined, ...STATES] } },
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
};

export const Default = {};
const grid = (size) => (args) => (
  <div style={{ display: 'grid', gap: 'var(--layout-spacers-responsive-6)' }}>
    {STATES.map((s) => <InputPhone key={s} {...args} size={size} state={s} defaultValue={['Filled', 'Focused', 'Error', 'Validated'].includes(s) ? '686 123 456' : ''} />)}
  </div>
);
export const Big = { render: grid('Big') };
export const Small = { render: grid('Small') };

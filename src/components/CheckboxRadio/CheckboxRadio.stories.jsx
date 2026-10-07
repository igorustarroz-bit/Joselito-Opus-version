import CheckboxRadio, { TYPES, STATES, TONES } from './CheckboxRadio';

export default {
  title: 'Components/Checkboxes-Radios',
  component: CheckboxRadio,
  parameters: { defaultTheme: 'light-white' },
  args: { type: 'Checkboxes', tone: 'Light', 'aria-label': 'Opción' },
  argTypes: {
    type: { control: 'inline-radio', options: TYPES },
    tone: { control: 'inline-radio', options: TONES },
    state: { control: 'select', options: [undefined, ...STATES] },
  },
};

export const Default = {};

const row = (type, tone) => (args) => (
  <div style={{ display: 'flex', gap: 'var(--layout-spacers-responsive-4)', alignItems: 'center' }}>
    {STATES.map((s) => <CheckboxRadio key={s} {...args} type={type} tone={tone} state={s} aria-label={s} />)}
  </div>
);

/** Not Selected · Hover · Selected · Selected Disabled · Disabled */
export const CheckboxesLight = { render: row('Checkboxes', 'Light') };
export const CheckboxesDark = { render: row('Checkboxes', 'Dark'), parameters: { defaultTheme: 'dark-black-neutral' } };
export const RadioLight = { render: row('Radio', 'Light') };
export const RadioDark = { render: row('Radio', 'Dark'), parameters: { defaultTheme: 'dark-black-neutral' } };

/** Interactivo: grupo de radios con el mismo `name`. */
export const GrupoRadios = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 'var(--layout-spacers-responsive-4)' }}>
      {['a', 'b', 'c'].map((v, i) => <CheckboxRadio key={v} {...args} type="Radio" name="demo" value={v} defaultChecked={i === 0} aria-label={`Opción ${v}`} />)}
    </div>
  ),
};

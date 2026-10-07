import CheckboxLabel, { SIZES, STATES } from './CheckboxLabel';

export default {
  title: 'Components/Checkbox-Label',
  component: CheckboxLabel,
  parameters: { defaultTheme: 'light-white' },
  args: { text: 'Label', size: 'Medium', showLabel: true },
  argTypes: { size: { control: 'inline-radio', options: SIZES }, state: { control: 'select', options: [undefined, ...STATES] } },
};

export const Default = {};
const row = (size) => (args) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--layout-spacers-responsive-6)' }}>
    {STATES.map((s) => <CheckboxLabel key={s} {...args} size={size} state={s} text={s} />)}
  </div>
);
/** Default · Hover · Selected · Undefined · Disabled · Disabled Selected */
export const Medium = { render: row('Medium') };
export const Small = { render: row('Small') };
/** Interactivo. */
export const Interactivo = { args: { text: 'Acepto la política de privacidad' } };

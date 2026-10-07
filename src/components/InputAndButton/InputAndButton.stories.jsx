import InputAndButton, { STATES } from './InputAndButton';

export default {
  title: 'Components/InputAndButton',
  component: InputAndButton,
  parameters: { defaultTheme: 'light-white' },
  args: { size: 'Big', label: 'Label', info: 'Message', showInfo: true, showButton: true },
  argTypes: { size: { control: 'inline-radio', options: ['Big', 'Small'] }, state: { control: 'select', options: [undefined, ...STATES] } },
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
};

export const Default = {};
const grid = (size) => (args) => (
  <div style={{ display: 'grid', gap: 'var(--layout-spacers-responsive-6)' }}>
    {STATES.map((s) => <InputAndButton key={s} {...args} size={size} state={s} label={`Label · ${s}`} defaultValue={['Filled', 'Focused', 'Error', 'Validated'].includes(s) ? 'Input text' : ''} />)}
  </div>
);
/** Size=Big: Default · Hover · Focused · Filled · Error · Validated · Disabled */
export const Big = { render: grid('Big') };
export const Small = { render: grid('Small') };
/** Newsletter: correo + enviar. */
export const Newsletter = { args: { label: 'Tu correo electrónico', inputType: 'email', info: 'Te enviaremos novedades de Joselito' } };

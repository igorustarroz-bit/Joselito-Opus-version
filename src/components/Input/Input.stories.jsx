import Input, { TYPES, SIZES, STATES } from './Input';

const OPTIONS = [{ label: 'Jamón' }, { label: 'Paleta' }, { label: 'Embutidos' }, { label: 'Lotes' }];

export default {
  title: 'Components/Input',
  component: Input,
  parameters: { defaultTheme: 'light-white' },
  args: { type: 'Default', size: 'Big', label: 'Label', info: 'Message', showInfo: true, showIcon: false, options: OPTIONS },
  argTypes: { type: { control: 'inline-radio', options: TYPES }, size: { control: 'inline-radio', options: SIZES }, state: { control: 'select', options: [undefined, ...STATES] } },
  decorators: [(Story) => <div style={{ width: 320, minHeight: 120 }}><Story /></div>],
};

export const Default = {};

const grid = (type, size) => (args) => (
  <div style={{ display: 'grid', gap: 'var(--layout-spacers-responsive-6)' }}>
    {STATES.map((s) => <Input key={s} {...args} type={type} size={size} state={s} label={`Label · ${s}`}
      defaultValue={['Filled', 'Focused', 'Error', 'Validated'].includes(s) ? (type === 'Dropdown' ? 'Jamón' : 'Input text') : ''} />)}
  </div>
);

/** Type=Default, Size=Big: Default · Hover · Focused · Filled · Error · Validated · Disabled */
export const DefaultBig = { render: grid('Default', 'Big') };
export const DefaultSmall = { render: grid('Default', 'Small') };
export const DropdownBig = { render: grid('Dropdown', 'Big') };
export const DropdownSmall = { render: grid('Dropdown', 'Small') };

/** Interactivo: escribe para ver la etiqueta flotante. */
export const Interactivo = { args: { info: 'Escribe tu correo', inputType: 'email', label: 'Correo electrónico' } };
/** Desplegable interactivo: abre el Listbox (Esc o clic fuera para cerrar). */
export const DesplegableAbierto = { args: { type: 'Dropdown', label: 'Categoría' }, decorators: [(Story) => <div style={{ minHeight: 360 }}><Story /></div>] };
/** Show Icon (CalendarBlank). */
export const ConIcono = { args: { showIcon: true, label: 'Fecha' } };

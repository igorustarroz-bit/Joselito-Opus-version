import Row2Input from './Row2Input';

export default { title: 'Components/row_2_input', component: Row2Input, parameters: { defaultTheme: 'light-white' }, decorators: [(Story) => <div style={{ width: 792, maxWidth: '100%' }}><Story /></div>] };

export const Default = {};
export const NombreApellidos = { args: { fields: [{ label: 'Nombre' }, { label: 'Apellidos' }] } };

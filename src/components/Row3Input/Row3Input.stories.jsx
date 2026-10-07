import Row3Input from './Row3Input';

export default { title: 'Components/row_3_input', component: Row3Input, parameters: { defaultTheme: 'light-white' }, decorators: [(Story) => <div style={{ width: 792, maxWidth: '100%' }}><Story /></div>] };

export const Default = {};
export const CodigoPostalCiudadPais = { args: { fields: [{ label: 'Código postal' }, { label: 'Ciudad' }, { label: 'País', type: 'Dropdown', options: [{ label: 'España' }, { label: 'Portugal' }, { label: 'Francia' }] }] } };

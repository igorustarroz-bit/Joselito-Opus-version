import Row2Input from './Row2Input';

import meta from './Row2Input.meta.json';
import { argTypesFromMeta } from '@/docs/DocKit';

export default { title: 'Components/row_2_input', component: Row2Input, argTypes: argTypesFromMeta(meta), parameters: { defaultTheme: 'light-white' }, decorators: [(Story) => <div style={{ width: 792, maxWidth: '100%' }}><Story /></div>] };

export const Default = {};
export const NombreApellidos = { args: { fields: [{ label: 'Nombre' }, { label: 'Apellidos' }] } };

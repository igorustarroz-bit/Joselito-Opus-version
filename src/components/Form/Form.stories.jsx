import Form from './Form';
import Row2Input from '../Row2Input/Row2Input';
import Input from '../Input/Input';

import meta from './Form.meta.json';
import { argTypesFromMeta } from '@/docs/DocKit';

export default { title: 'Components/Form', component: Form, argTypes: argTypesFromMeta(meta), parameters: { defaultTheme: 'light-white' }, decorators: [(Story) => <div style={{ width: 502, maxWidth: '100%' }}><Story /></div>] };

export const Default = {};
/** Ejemplo real: datos de contacto. */
export const Contacto = {
  args: { title: 'Datos de contacto', description: 'Completa tus datos para continuar.', checkboxes: ['Acepto la política de privacidad'], primaryText: 'Continuar', secondaryText: 'Cancelar' },
  render: (args) => (
    <Form {...args}>
      <Row2Input fields={[{ label: 'Nombre' }, { label: 'Apellidos' }]} />
      <Input label="Correo electrónico" inputType="email" showInfo={false} />
    </Form>
  ),
};
/** Show Client: cliente identificado. */
export const ConCliente = { args: { showClient: true } };

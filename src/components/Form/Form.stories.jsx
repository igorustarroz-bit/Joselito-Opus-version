import Form from './Form.jsx';
import Input from '../Input/Input.jsx';
import CheckboxList from '../CheckboxList/CheckboxList.jsx';

const meta = {
  title: 'Componentes/UI11-Form',
  component: Form,
  args: { title: 'Título del formulario', description: 'Descripción', primaryLabel: 'Aceptar', secondaryLabel: 'Cancelar' },
};
export default meta;

export const Default = {
  render: (a) => (
    <div style={{ width: 502 }}>
      <Form {...a}>
        <Input label="Nombre" actionIcon="ArrowRight" />
        <Input label="Email" actionIcon="ArrowRight" />
        <CheckboxList items={[{ label: 'Acepto los términos' }]} />
      </Form>
    </div>
  ),
};

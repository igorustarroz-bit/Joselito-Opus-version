import type { Meta, StoryObj } from '@storybook/react-vite';
import { Form, FormRow } from './Form';
import { Input } from '../Input';
import { CheckboxLabel } from '../CheckboxLabel';
import { Button } from '../Button';

const meta = {
  title: 'Componentes/Form',
  component: Form,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Form>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 640 }}>
      <Form onSubmit={(e) => e.preventDefault()}>
        <FormRow columns={2}>
          <Input label="Nombre" placeholder="Tu nombre" />
          <Input label="Apellidos" placeholder="Tus apellidos" />
        </FormRow>
        <FormRow>
          <Input label="Correo electrónico" type="email" placeholder="tucorreo@ejemplo.com" message="No lo compartiremos." />
        </FormRow>
        <FormRow columns={3}>
          <Input label="Ciudad" placeholder="Ciudad" />
          <Input label="CP" placeholder="00000" />
          <Input label="País" placeholder="País" />
        </FormRow>
        <FormRow>
          <CheckboxLabel title="Acepto la política de privacidad" description="He leído y acepto el tratamiento de mis datos." />
        </FormRow>
        <FormRow>
          <Button htmlType="submit">Enviar</Button>
        </FormRow>
      </Form>
    </div>
  ),
};

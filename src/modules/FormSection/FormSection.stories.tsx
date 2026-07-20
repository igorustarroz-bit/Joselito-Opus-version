import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormSection } from './FormSection';
import { FormRow } from '../../components/Form';
import { Input } from '../../components/Input';
import { CheckboxLabel } from '../../components/CheckboxLabel';
import { Button } from '../../components/Button';
const meta = { title: 'Módulos/FormSection', component: FormSection, parameters: { layout: 'fullscreen' },
  args: { heading: 'Contacto', description: 'Escríbenos y te responderemos lo antes posible.', children: null } } satisfies Meta<typeof FormSection>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: (args) => (
    <FormSection {...args} onSubmit={(e)=>e.preventDefault()}>
      <FormRow columns={2}>
        <Input label="Nombre" placeholder="Tu nombre" />
        <Input label="Email" type="email" placeholder="tucorreo@ejemplo.com" />
      </FormRow>
      <FormRow><Input label="Mensaje" placeholder="¿En qué podemos ayudarte?" /></FormRow>
      <FormRow><CheckboxLabel title="Acepto la política de privacidad" /></FormRow>
      <FormRow><Button htmlType="submit">Enviar</Button></FormRow>
    </FormSection>
  ),
};

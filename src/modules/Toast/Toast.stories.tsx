import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toast } from './Toast';

const meta = {
  title: 'Módulos/Toast',
  component: Toast,
  parameters: { layout: 'padded' },
  argTypes: { variant: { control: 'inline-radio', options: ['info','success','error','warning'] } },
  args: { variant: 'success', title: 'Añadido a la cesta', children: 'Jamón de bellota 100% ibérico.', onClose: () => {} },
} satisfies Meta<typeof Toast>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: (args) => <div style={{ maxWidth: 420 }}><Toast {...args} /></div> };
export const Variantes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 420 }}>
      <Toast {...args} variant="info" title="Información" >Tu pedido está en preparación.</Toast>
      <Toast {...args} variant="success" title="Correcto" >Pago realizado con éxito.</Toast>
      <Toast {...args} variant="error" title="Error" >No se pudo procesar el pago.</Toast>
      <Toast {...args} variant="warning" title="Aviso" >Quedan pocas unidades.</Toast>
    </div>
  ),
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { CheckboxLabel } from './CheckboxLabel';

const meta = {
  title: 'Componentes/CheckboxLabel',
  component: CheckboxLabel,
  parameters: { layout: 'padded' },
  args: { title: 'Recibir novedades', description: 'Te enviaremos ofertas y lanzamientos ocasionalmente.' },
} satisfies Meta<typeof CheckboxLabel>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: (args) => <div style={{ maxWidth: 420 }}><CheckboxLabel {...args} /></div> };

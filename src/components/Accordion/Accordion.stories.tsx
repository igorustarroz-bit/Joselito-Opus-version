import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion } from './Accordion';

const items = [
  { id: 'a', title: '¿Qué es el jamón de bellota 100% ibérico?', content: 'Procede de cerdos 100% ibéricos criados en libertad y alimentados con bellota durante la montanera.' },
  { id: 'b', title: '¿Cómo se conserva?', content: 'En un lugar fresco y seco. Una vez empezado, cúbrelo con su propia grasa y un paño de algodón.' },
  { id: 'c', title: '¿Cuál es la curación mínima?', content: 'La curación varía según la pieza, alcanzando habitualmente entre 36 y 48 meses.' },
];

const meta = {
  title: 'Componentes/Accordion',
  component: Accordion,
  parameters: { layout: 'padded' },
  args: { items, multiple: false },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <div style={{ maxWidth: 640 }}><Accordion {...args} /></div>,
};

export const MultipleAbierto: Story = {
  args: { multiple: true, defaultOpen: ['a'] },
  render: (args) => <div style={{ maxWidth: 640 }}><Accordion {...args} /></div>,
};

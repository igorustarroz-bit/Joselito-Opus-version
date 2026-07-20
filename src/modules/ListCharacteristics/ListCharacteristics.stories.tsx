import type { Meta, StoryObj } from '@storybook/react-vite';
import { ListCharacteristics } from './ListCharacteristics';

const items = [
  { icon: 'Recycle' as const, title: 'Sostenibilidad', description: 'Gestión responsable de la dehesa y su ecosistema.' },
  { icon: 'HandHeart' as const, title: 'Bienestar animal', description: 'Cerdos criados en libertad y sin estrés.' },
  { icon: 'Certificate' as const, title: 'Certificación', description: '100% ibérico de bellota garantizado.' },
];

const meta = {
  title: 'Módulos/ListCharacteristics',
  component: ListCharacteristics,
  parameters: { layout: 'fullscreen' },
  argTypes: { columns: { control: 'inline-radio', options: [2,3,4] } },
  args: { heading: 'Nuestros compromisos', items, columns: 3 },
} satisfies Meta<typeof ListCharacteristics>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

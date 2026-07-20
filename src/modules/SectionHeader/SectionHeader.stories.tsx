import type { Meta, StoryObj } from '@storybook/react-vite';
import { SectionHeader } from './SectionHeader';

const meta = {
  title: 'Módulos/SectionHeader',
  component: SectionHeader,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    align: { control: 'inline-radio', options: ['left', 'center'] },
    theme: { control: 'select', options: ['light-white','light-grey','dark-red-primary','dark-black-neutral','light-yellow'] },
  },
  args: { eyebrow: 'Excelencia', title: 'Un proceso paciente', description: 'Cada pieza se cura de forma natural durante años hasta alcanzar su punto óptimo.', align: 'center', theme: 'light-white' },
} satisfies Meta<typeof SectionHeader>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Izquierda: Story = { args: { align: 'left', theme: 'light-grey' } };

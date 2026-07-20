import type { Meta, StoryObj } from '@storybook/react-vite';
import { ListTimeline } from './ListTimeline';

const items = [
  { marker: '1868', title: 'Los orígenes', description: 'Comienza la historia de Joselito en Guijuelo.' },
  { marker: '1980', title: 'Expansión', description: 'El nombre de Joselito cruza fronteras.' },
  { marker: 'Hoy', title: 'Referente mundial', description: 'Reconocido como el mejor jamón del mundo.' },
];

const meta = {
  title: 'Módulos/ListTimeline',
  component: ListTimeline,
  parameters: { layout: 'fullscreen' },
  args: { heading: 'Nuestra historia', items },
} satisfies Meta<typeof ListTimeline>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

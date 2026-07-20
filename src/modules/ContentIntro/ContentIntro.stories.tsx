import type { Meta, StoryObj } from '@storybook/react-vite';
import { ContentIntro } from './ContentIntro';
const meta = { title: 'Módulos/ContentIntro', component: ContentIntro, parameters: { layout: 'fullscreen' },
  args: { eyebrow: 'Desde 1868', children: 'Cinco generaciones dedicadas a elaborar el mejor jamón del mundo, con el mismo respeto por la tradición y la naturaleza.' } } satisfies Meta<typeof ContentIntro>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = {};

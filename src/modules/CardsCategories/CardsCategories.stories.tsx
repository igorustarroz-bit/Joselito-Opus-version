import type { Meta, StoryObj } from '@storybook/react-vite';
import { CardsCategories } from './CardsCategories';

const img = (c1: string, c2: string) => <div style={{ width:'100%', height:'100%', background:`linear-gradient(135deg,${c1},${c2})` }} />;
const items = [
  { image: img('#481815','#e23f36'), label: 'Jamón' },
  { image: img('#373a2c','#9ba084'), label: 'Paleta' },
  { image: img('#7a5706','#f9d999'), label: 'Embutidos' },
];

const meta = {
  title: 'Módulos/CardsCategories',
  component: CardsCategories,
  parameters: { layout: 'fullscreen' },
  argTypes: { columns: { control: 'inline-radio', options: [2,3,4] } },
  args: { heading: 'Categorías', items, columns: 3 },
} satisfies Meta<typeof CardsCategories>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

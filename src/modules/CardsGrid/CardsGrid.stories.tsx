import type { Meta, StoryObj } from '@storybook/react-vite';
import { CardsGrid } from './CardsGrid';
import { CardLink } from '../../components/CardLink';

const img = <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg,#e23f36,#481815)' }} />;
const cards = ['Nuestra historia', 'La dehesa', 'La curación', 'Manual de corte', 'Sostenibilidad', 'Experiencias'];

const meta = {
  title: 'Módulos/CardsGrid',
  component: CardsGrid,
  parameters: { layout: 'fullscreen' },
  argTypes: { columns: { control: 'inline-radio', options: [2,3,4] } },
  args: { title: 'Descubre Joselito', columns: 3, children: null },
} satisfies Meta<typeof CardsGrid>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <CardsGrid {...args}>
      {cards.map((c) => <CardLink key={c} eyebrow="Marca" title={c} description="Un pilar de nuestra excelencia." image={img} />)}
    </CardsGrid>
  ),
};

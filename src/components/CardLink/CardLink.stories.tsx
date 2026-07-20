import type { Meta, StoryObj } from '@storybook/react-vite';
import { CardLink } from './CardLink';

const img = <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg,#e23f36,#481815)' }} />;

const meta = {
  title: 'Componentes/CardLink',
  component: CardLink,
  parameters: { layout: 'padded' },
  args: { eyebrow: 'Origen', title: 'Nuestra dehesa', description: 'Cómo criamos a nuestros cerdos en libertad.', image: img },
} satisfies Meta<typeof CardLink>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: (args) => <div style={{ maxWidth: 360 }}><CardLink {...args} /></div> };
export const Grid: Story = {
  render: (args) => (
    <div className="grid-12" style={{ maxWidth: 1100 }}>
      <div style={{ gridColumn: 'span 4' }}><CardLink {...args} /></div>
      <div style={{ gridColumn: 'span 4' }}><CardLink {...args} title="La curación" eyebrow="Excelencia" /></div>
      <div style={{ gridColumn: 'span 4' }}><CardLink {...args} title="Manual de corte" eyebrow="Guía" /></div>
    </div>
  ),
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { Title } from './Title';

const meta = {
  title: 'Componentes/Title',
  component: Title,
  parameters: { layout: 'padded' },
  argTypes: { level: { control: { type: 'range', min: 1, max: 8, step: 1 } } },
  args: { level: 4, children: 'Joselito' },
} satisfies Meta<typeof Title>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Escala: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {[8,7,6,5,4,3,2,1].map((l) => <Title key={l} level={l as 1}>Title {l}</Title>)}
    </div>
  ),
};

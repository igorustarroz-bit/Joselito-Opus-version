import type { Meta, StoryObj } from '@storybook/react-vite';
import { SectionHeader } from './SectionHeader';

const meta = {
  title: 'Módulos/SectionHeader',
  component: SectionHeader,
  parameters: { layout: 'fullscreen' },
  argTypes: { theme: { control: 'select', options: ['light-white','light-grey','dark-red-primary','dark-black-neutral','light-yellow'] } },
  args: {
    backLabel: 'Sección anterior',
    title: 'Section title',
    description: 'Lorem ipsum dolor sit amet consectetur. Diam volutpat magna risus ut ullamcorper eget. Vestibulum adipiscing volutpat eget rhoncus.',
    theme: 'light-white',
  },
} satisfies Meta<typeof SectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const SinBarra: Story = { args: { backLabel: undefined } };

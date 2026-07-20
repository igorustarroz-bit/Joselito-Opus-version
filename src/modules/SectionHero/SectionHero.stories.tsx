import type { Meta, StoryObj } from '@storybook/react-vite';
import { SectionHero } from './SectionHero';

const meta = {
  title: 'Módulos/SectionHero',
  component: SectionHero,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    theme: { control: 'select', options: ['light-white', 'light-grey', 'dark-red-primary', 'dark-black-neutral', 'light-yellow'] },
  },
  args: { eyebrow: 'Section title', title: 'Lorem ipsum dolor sit amet consectetur.', theme: 'dark-red-primary' },
} satisfies Meta<typeof SectionHero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Blanco: Story = { args: { theme: 'light-white' } };
export const Neutro: Story = { args: { theme: 'dark-black-neutral' } };

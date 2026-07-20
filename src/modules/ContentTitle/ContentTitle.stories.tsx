import type { Meta, StoryObj } from '@storybook/react-vite';
import { ContentTitle } from './ContentTitle';

const meta = {
  title: 'Módulos/ContentTitle',
  component: ContentTitle,
  parameters: { layout: 'fullscreen' },
  argTypes: { theme: { control: 'select', options: ['light-white','light-grey','dark-red-primary','dark-black-neutral','light-yellow'] } },
  args: {
    label: 'This is a label',
    title: 'Lorem ipsum accumsan eleifend',
    description: 'Lorem ipsum dolor sit amet consectetur. Nibh lacus erat urna molestie.',
    linkLabel: 'Link',
    theme: 'light-white',
  },
} satisfies Meta<typeof ContentTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const SoloTitulo: Story = { args: { label: undefined, description: undefined, linkLabel: undefined } };

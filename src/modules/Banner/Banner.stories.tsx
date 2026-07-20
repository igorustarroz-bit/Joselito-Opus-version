import type { Meta, StoryObj } from '@storybook/react-vite';
import { Banner } from './Banner';

const meta = {
  title: 'Módulos/Banner',
  component: Banner,
  parameters: { layout: 'fullscreen' },
  argTypes: { theme: { control: 'select', options: ['light-white','light-grey','dark-red-primary','dark-black-neutral','light-yellow'] } },
  args: {
    title: 'Descubre nuestras colecciones premium',
    description: 'Ediciones limitadas de nuestro mejor jamón, seleccionadas para las mejores ocasiones.',
    actions: [{ label: 'Ver colecciones' }, { label: 'Contactar', variant: 'secondary' }],
    theme: 'dark-red-primary',
  },
} satisfies Meta<typeof Banner>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Neutro: Story = { args: { theme: 'dark-black-neutral' } };

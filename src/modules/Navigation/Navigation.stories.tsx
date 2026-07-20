import type { Meta, StoryObj } from '@storybook/react-vite';
import { Navigation } from './Navigation';
import { ButtonIcon } from '../../components/ButtonIcon';
import { Icon } from '../../components/Icon';

const items = [
  { label: 'Productos', selected: true }, { label: 'Origen' }, { label: 'Excelencia' }, { label: 'Contacto' },
];
const actions = <><ButtonIcon variant="terciary" size="s" label="Buscar" icon={<Icon name="MagnifyingGlass" size="s" />} /><ButtonIcon variant="terciary" size="s" label="Cesta" icon={<Icon name="Bag" size="s" />} /></>;

const meta = {
  title: 'Módulos/Navigation',
  component: Navigation,
  parameters: { layout: 'fullscreen' },
  argTypes: { theme: { control: 'select', options: ['light-white','light-grey','dark-red-primary','dark-black-neutral','light-yellow'] } },
  args: { brand: 'JOSELITO', items, actions, theme: 'light-white' },
} satisfies Meta<typeof Navigation>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Oscuro: Story = { args: { theme: 'dark-black-neutral' } };

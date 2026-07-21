import type { Meta, StoryObj } from '@storybook/react-vite';
import { ListCharacteristics } from './ListCharacteristics';

const items = [
  { num: '01', title: 'Sostenibilidad', text: 'Gestión responsable de la dehesa y su ecosistema.' },
  { num: '02', title: 'Bienestar animal', text: 'Cerdos criados en libertad y sin estrés.' },
  { num: '03', title: 'Certificación', text: '100% ibérico de bellota garantizado.' },
];

const meta = {
  title: 'Módulos/ListCharacteristics',
  component: ListCharacteristics,
  parameters: { layout: 'fullscreen' },
  argTypes: { columns: { control: 'inline-radio', options: [2,3,4] }, theme: { control: 'select', options: ['light-white','light-grey','dark-red-primary','dark-black-neutral','light-yellow'] } },
  args: { heading: 'This is a title', items, columns: 3, theme: 'light-grey' },
} satisfies Meta<typeof ListCharacteristics>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

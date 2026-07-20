import type { Meta, StoryObj } from '@storybook/react-vite';
import { ListArchiveTable } from './ListArchiveTable';

const meta = {
  title: 'Módulos/ListArchiveTable',
  component: ListArchiveTable,
  parameters: { layout: 'fullscreen' },
  argTypes: { action: { control: 'inline-radio', options: ['download','link','none'] } },
  args: {
    columns: ['Añada', 'Descripción', 'Curación'],
    rows: [
      { cells: ['2019', 'Añada excepcional', '48 meses'], href: '#' },
      { cells: ['2018', 'Gran cosecha de bellota', '46 meses'], href: '#' },
      { cells: ['2017', 'Clima ideal de montanera', '44 meses'], href: '#' },
    ],
    action: 'download',
  },
} satisfies Meta<typeof ListArchiveTable>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

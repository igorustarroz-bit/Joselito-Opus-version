import type { Meta, StoryObj } from '@storybook/react-vite';
import { ContentText } from './ContentText';
const body = <><p style={{margin:0}}>La dehesa es un ecosistema único donde nuestros cerdos crecen en libertad.</p><p style={{margin:0}}>Su alimentación a base de bellota durante la montanera define el sabor inconfundible de Joselito.</p></>;
const meta = { title: 'Módulos/ContentText', component: ContentText, parameters: { layout: 'fullscreen' },
  argTypes: { columns: { control: 'inline-radio', options: [1,2] } },
  args: { title: 'La dehesa', children: body, columns: 1 } } satisfies Meta<typeof ContentText>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const DosColumnas: Story = { args: { columns: 2 } };

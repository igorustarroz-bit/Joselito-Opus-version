import type { Meta, StoryObj } from '@storybook/react-vite';
import { ContentText } from './ContentText';

const body = (
  <>
    <p style={{ margin: 0 }}>Lorem ipsum dolor sit amet consectetur. Leo proin nisi in neque hendrerit. Egestas nulla tortor pulvinar eget malesuada diam.</p>
    <p style={{ margin: 0 }}>Aenean auctor elementum gravida sit odio et eu. Sed sit diam nibh arcu facilisis nunc orci hac in.</p>
  </>
);

const meta = {
  title: 'Módulos/ContentText',
  component: ContentText,
  parameters: { layout: 'fullscreen' },
  argTypes: { variant: { control: 'inline-radio', options: ['split', '1-column', '2-column'] } },
  args: { label: 'Lorem ipsum', title: 'Lorem ipsum dolor sit amet consectetur.', children: body, variant: 'split' },
} satisfies Meta<typeof ContentText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Split: Story = {};
export const UnaColumna: Story = { args: { variant: '1-column' } };
export const DosColumnas: Story = { args: { variant: '2-column' } };

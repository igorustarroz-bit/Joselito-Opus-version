import type { Meta, StoryObj } from '@storybook/react-vite';
import { ListTimeline } from './ListTimeline';

const img = (src: string) => <img src={src} alt="" />;
const entries = [
  { year: '1920', title: 'Los orígenes en Guijuelo', description: 'Lorem ipsum dolor sit amet consectetur. Neque pretium a ipsum venenatis dignissim quam lectus ultrices volutpat.', image: img('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&q=60&sat=-100') },
  { year: '1948', title: 'La dehesa y el cerdo ibérico', description: 'Massa placerat pretium risus sagittis habitant cras. A odio tristique cursus rutrum placerat odio sit morbi habitasse.', image: img('https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=900&q=60&sat=-100') },
  { year: '1968', title: 'Reconocimiento internacional', description: 'Enim pretium a ipsum venenatis dignissim quam lectus ultrices volutpat placerat pretium risus sagittis.', image: img('https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?w=900&q=60&sat=-100') },
  { year: '1972', title: 'Un referente mundial', description: 'Lorem ipsum dolor sit amet consectetur. Neque pretium a ipsum venenatis dignissim quam lectus ultrices.', image: img('https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=900&q=60&sat=-100') },
];

const meta = {
  title: 'Módulos/ListTimeline',
  component: ListTimeline,
  parameters: { layout: 'fullscreen' },
  argTypes: { theme: { control: 'select', options: ['dark-red-primary','dark-black-neutral','light-white','light-grey','light-yellow'] } },
  args: { topTitle: 'El legado de Joselito', seeAll: { label: 'Ver todos', href: '#' }, entries, defaultIndex: 1, theme: 'dark-red-primary' },
} satisfies Meta<typeof ListTimeline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

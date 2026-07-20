import type { Meta, StoryObj } from '@storybook/react-vite';
import { BrandLogo } from '@/components/BrandLogo';
import { Footer } from './Footer';
import { Icon } from '../../components/Icon';

const columns = [
  { title: 'Productos', links: [{ label: 'Jamón' }, { label: 'Paleta' }, { label: 'Lomo' }, { label: 'Embutidos' }] },
  { title: 'Joselito', links: [{ label: 'Origen' }, { label: 'Excelencia' }, { label: 'Sostenibilidad' }] },
  { title: 'Ayuda', links: [{ label: 'Contacto' }, { label: 'Envíos' }, { label: 'FAQ' }] },
];
const social = <><a href="#" aria-label="Facebook"><Icon name="FacebookLogo" size="m" /></a><a href="#" aria-label="Chat"><Icon name="Chat" size="m" /></a><a href="#" aria-label="Email"><Icon name="Envelope" size="m" /></a></>;

const meta = {
  title: 'Módulos/Footer',
  component: Footer,
  parameters: { layout: 'fullscreen' },
  argTypes: { theme: { control: 'select', options: ['light-white','light-grey','dark-red-primary','dark-black-neutral','light-yellow'] } },
  args: { brand: <BrandLogo variant="isotype" height={48} />, columns, social, copyright: '© 2026 Joselito. Todos los derechos reservados.', theme: 'dark-black-neutral' },
} satisfies Meta<typeof Footer>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Claro: Story = { args: { theme: 'light-grey' } };

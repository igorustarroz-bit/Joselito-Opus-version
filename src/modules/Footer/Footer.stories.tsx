import type { Meta, StoryObj } from '@storybook/react-vite';
import { Footer } from './Footer';
import { BrandLogo } from '../../components/BrandLogo';
import { Icon } from '../../components/Icon';

const columns = [
  { title: 'Productos', links: [{ label: 'Jamones de Gran Reserva' }, { label: 'Paletas de Gran Reserva' }, { label: 'Embutidos' }, { label: 'Loncheados' }, { label: 'Regalos' }] },
  { title: 'Sobre Joselito', links: [{ label: 'Nuestra historia' }, { label: 'La Dehesa' }, { label: 'Curación' }, { label: 'Añadas' }, { label: 'Sostenibilidad' }] },
  { title: 'Restaurantes y tiendas', links: [{ label: 'Joselito’s Velázquez' }, { label: 'Joselito’s Las Rozas' }, { label: 'Joselito’s Bernabeu' }] },
  { title: 'Atención al cliente', links: [{ label: 'Envíos y devoluciones' }, { label: 'Seguimiento del pedido' }, { label: 'Contacto y soporte' }, { label: 'Aviso legal' }] },
];
const secondaryColumns = [
  { title: 'Empresa', links: [{ label: 'Prensa y noticias' }, { label: 'Equipo y empleo' }, { label: 'Investigación y patentes' }] },
  { title: 'Contacto', links: [{ label: '(+34) 923 580 375' }, { label: 'store@joselito.com' }] },
];
const social = <><a href="#" aria-label="X"><Icon name="X" size="m" /></a><a href="#" aria-label="Facebook"><Icon name="FacebookLogo" size="m" /></a><a href="#" aria-label="Chat"><Icon name="Chat" size="m" /></a></>;
const legal = [{ label: 'Condiciones de compra' }, { label: 'Uso del sitio' }, { label: 'Calidad' }, { label: 'Canal ético' }];

const meta = {
  title: 'Módulos/Footer',
  component: Footer,
  parameters: { layout: 'fullscreen' },
  argTypes: { theme: { control: 'select', options: ['light-white','light-grey','dark-red-primary','dark-black-neutral','light-yellow'] } },
  args: {
    columns,
    newsletter: { title: 'Historias, novedades y experiencias para disfrutar del universo Joselito.', label: 'Suscríbete a nuestra newsletter', placeholder: 'Email' },
    brand: <BrandLogo variant="isotype" height={140} />,
    secondaryColumns, social, legal,
    copyright: '© 1868 - 2026 Cárnicas Joselito S.A.',
    language: 'English',
    theme: 'light-white',
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Oscuro: Story = { args: { theme: 'dark-black-neutral' } };

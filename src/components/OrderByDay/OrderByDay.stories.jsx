import OrderByDay from './OrderByDay';
import photo from '../../assets/images/card-product.webp';

const products = Array.from({ length: 4 }, () => ({ image: photo }));
export default { title: 'Components/Order by Day', component: OrderByDay, parameters: { defaultTheme: 'light-white' }, args: { products, href: '#' } };

export const Default = { decorators: [(Story) => <div style={{ width: 774, maxWidth: '100%' }}><Story /></div>] };
export const DesktopHorizontal = { decorators: [(Story) => <div style={{ width: 774, maxWidth: '100%' }}><Story /></div>] };
/** Device=Mobile: las tarjetas se desplazan en horizontal (por debajo de 768 px). */
export const MobileHorizontal = { decorators: [(Story) => <div style={{ width: 390 }}><Story /></div>] };

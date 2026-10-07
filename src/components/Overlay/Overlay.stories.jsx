import Overlay from './Overlay';

export default { title: 'Components/Overlay', component: Overlay, parameters: { defaultTheme: 'light-white' }, args: { fixed: false },
  decorators: [(Story) => <div style={{ position: 'relative', width: 390, height: 844, maxWidth: '100%' }}><Story /></div>] };

/** Dentro de un contenedor de 390 × 844 (como el máster). */
export const Default = {};

import Overlay from './Overlay';

import meta from './Overlay.meta.json';
import { argTypesFromMeta } from '@/docs/DocKit';

export default { title: 'Components/Overlay', component: Overlay, argTypes: argTypesFromMeta(meta), parameters: { defaultTheme: 'light-white' }, args: { fixed: false },
  decorators: [(Story) => <div style={{ position: 'relative', width: 390, height: 844, maxWidth: '100%' }}><Story /></div>] };

/** Dentro de un contenedor de 390 × 844 (como el máster). */
export const Default = {};

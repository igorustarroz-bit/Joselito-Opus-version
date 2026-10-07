import SendingDetails from './SendingDetails';

import meta from './SendingDetails.meta.json';
import { argTypesFromMeta } from '@/docs/DocKit';

export default { title: 'Components/Sending Details', component: SendingDetails, argTypes: argTypesFromMeta(meta), parameters: { defaultTheme: 'light-white' } };

export const Default = { decorators: [(Story) => <div style={{ width: 693, maxWidth: '100%' }}><Story /></div>] };
/** Device=Desktop: dos columnas cuando el bloque mide 600 px o más. */
export const Desktop = { decorators: [(Story) => <div style={{ width: 693, maxWidth: '100%' }}><Story /></div>] };
/** Device=Mobile: una columna. */
export const Mobile = { decorators: [(Story) => <div style={{ width: 390, maxWidth: '100%' }}><Story /></div>] };

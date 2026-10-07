import Toast from './Toast';

import meta from './Toast.meta.json';
import { argTypesFromMeta } from '@/docs/DocKit';

export default { title: 'Components/Toast', component: Toast, argTypes: argTypesFromMeta(meta), parameters: { defaultTheme: 'light-grey' }, decorators: [(Story) => <div style={{ width: 343, maxWidth: '100%' }}><Story /></div>] };

export const Default = {};
/** Segundo aviso de tres. */
export const SegundoPaso = { args: { current: 1 } };

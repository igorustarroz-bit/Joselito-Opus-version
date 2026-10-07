import BlockBestPrice from './BlockBestPrice';

import meta from './BlockBestPrice.meta.json';
import { argTypesFromMeta } from '@/docs/DocKit';

export default { title: 'Components/Block best price', component: BlockBestPrice, argTypes: argTypesFromMeta(meta), parameters: { defaultTheme: 'light-white' }, decorators: [(Story) => <div style={{ width: 428, maxWidth: '100%' }}><Story /></div>] };

export const Default = {};

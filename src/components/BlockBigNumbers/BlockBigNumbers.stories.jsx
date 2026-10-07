import BlockBigNumbers from './BlockBigNumbers';

import meta from './BlockBigNumbers.meta.json';
import { argTypesFromMeta } from '@/docs/DocKit';

export default { title: 'Components/Block Big Numbers', component: BlockBigNumbers, argTypes: argTypesFromMeta(meta), parameters: { defaultTheme: 'light-white' }, decorators: [(Story) => <div style={{ width: 316, maxWidth: '100%' }}><Story /></div>] };

export const Default = {};

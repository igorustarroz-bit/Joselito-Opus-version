import CardLink from './CardLink';

import meta from './CardLink.meta.json';
import { argTypesFromMeta } from '@/docs/DocKit';

export default { title: 'Components/Card Link', component: CardLink, argTypes: argTypesFromMeta(meta), parameters: { defaultTheme: 'light-white' }, decorators: [(Story) => <div style={{ width: 432, maxWidth: '100%' }}><Story /></div>] };

export const Default = {};

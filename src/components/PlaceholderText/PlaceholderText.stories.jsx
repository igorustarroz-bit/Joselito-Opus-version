import PlaceholderText from './PlaceholderText';

import meta from './PlaceholderText.meta.json';
import { argTypesFromMeta } from '@/docs/DocKit';

export default { title: 'Components/Placeholder-Text', component: PlaceholderText, argTypes: argTypesFromMeta(meta), parameters: { defaultTheme: 'light-white' }, args: { text: 'Text' } };

export const Default = {};

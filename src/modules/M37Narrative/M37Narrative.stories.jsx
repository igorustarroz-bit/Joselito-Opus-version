import M37Narrative from './M37Narrative';

import meta from './M37Narrative.meta.json';
import { argTypesFromMeta } from '@/docs/DocKit';

export default {
  title: 'Modules/M37-narrative',
  component: M37Narrative,
  parameters: { layout: 'fullscreen', defaultTheme: 'light-white' },
  argTypes: argTypesFromMeta(meta, { steps: { control: false } }),
};

export const Default = {};
/** Device=desktop (desde 960 px). Pulsa «Siguiente» o un número para cambiar de paso. */
export const Desktop = {};
/** Device=mobile (ver con el viewport XS): apilado con la foto a sangre al final. */
export const Mobile = {};
/** Paso 03 activo al cargar. */
export const Step3 = { args: { initialStep: 2 }, name: 'Paso 03 activo' };

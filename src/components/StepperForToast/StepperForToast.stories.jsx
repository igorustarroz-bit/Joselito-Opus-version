import StepperForToast, { STATUSES } from './StepperForToast';

import meta from './StepperForToast.meta.json';
import { argTypesFromMeta } from '@/docs/DocKit';
import { axisStory } from '@/docs/axis';

export default {
  title: 'Components/Stepper_for_toast',
  component: StepperForToast,
  parameters: { defaultTheme: 'light-white' },
  args: { status: 'In progress' },
  argTypes: argTypesFromMeta(meta, { status: { control: 'inline-radio', options: STATUSES }, progress: { control: { type: 'range', min: 0, max: 1, step: 0.05 } } }),
};

export const Default = {};
export const InProgress = { args: { status: 'In progress' } };
export const NotSelected = { args: { status: 'Not selected' } };
export const Completed = { args: { status: 'Completed' } };

/** Eje «Property 1»: todas las opciones juntas (página Doc → Variantes). */
export const AxisProperty1 = axisStory(StepperForToast, [
  { label: "In progress", story: InProgress },
  { label: "Completed", story: Completed },
  { label: "Not selected", story: NotSelected },
], { name: "Eje · Property 1" });

import StepperForToast, { STATUSES } from './StepperForToast';

export default {
  title: 'Components/Stepper_for_toast',
  component: StepperForToast,
  parameters: { defaultTheme: 'light-white' },
  args: { status: 'In progress' },
  argTypes: { status: { control: 'inline-radio', options: STATUSES }, progress: { control: { type: 'range', min: 0, max: 1, step: 0.05 } } },
};

export const Default = {};
export const InProgress = { args: { status: 'In progress' } };
export const NotSelected = { args: { status: 'Not selected' } };
export const Completed = { args: { status: 'Completed' } };

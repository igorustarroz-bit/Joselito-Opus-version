import RowButtons from './RowButtons';

export default {
  title: 'Components/RowButtons',
  component: RowButtons,
  parameters: { defaultTheme: 'light-white' },
  args: { vertical: false, primaryText: 'Button', secondaryText: 'Button' },
};

export const Default = {};
export const VerticalNo = { args: { vertical: false } };
export const VerticalYes = { args: { vertical: true }, decorators: [(Story) => <div style={{ width: 162 }}><Story /></div>] };

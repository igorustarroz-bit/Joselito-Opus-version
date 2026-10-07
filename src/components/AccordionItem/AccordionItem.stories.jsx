import AccordionItem from './AccordionItem';

export default {
  title: 'Components/accordion (elemento)',
  component: AccordionItem,
  parameters: { defaultTheme: 'light-white' },
  args: { title: 'item', subtitle: 'Text', showSubtitle: false },
  decorators: [(Story) => <div style={{ width: 368, maxWidth: '100%' }}><Story /></div>],
};

export const Default = {};
export const OpenNo = { args: { defaultOpen: false } };
export const OpenYes = { args: { defaultOpen: true } };
/** Show Subtitle activado. */
export const ConSubtitulo = { args: { showSubtitle: true } };

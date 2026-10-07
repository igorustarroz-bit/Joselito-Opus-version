import M28CardsAccordion, { TYPES } from './M28CardsAccordion';

export default {
  title: 'Modules/M28-Cards-Accordion',
  component: M28CardsAccordion,
  parameters: { layout: 'fullscreen' },
  args: { type: 'Carrousel' },
  argTypes: { type: { control: 'inline-radio', options: TYPES } },
};

export const Default = {};
/** Type=Carrousel (Dark - Black - Neutral; Desktop y Mobile con el viewport XS). */
export const Carrousel = {};
/** Type=Accordion (Light - White): pulsa una pestaña para abrirla. */
export const Accordion = { args: { type: 'Accordion' } };

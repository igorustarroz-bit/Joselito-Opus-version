import { useState } from 'react';
import M09ContentStackTextImage, { IMAGES, MODES } from './M09ContentStackTextImage';

import meta from './M09ContentStackTextImage.meta.json';
import { argTypesFromMeta } from '@/docs/DocKit';

export default {
  title: 'Modules/M09-ContentStack-Text+ Image',
  component: M09ContentStackTextImage,
  parameters: { layout: 'fullscreen', defaultTheme: 'light-white' },
  args: { image: 'Vertical', showButton: true, showDescription: true, showNumber: true },
  argTypes: argTypesFromMeta(meta, { image: { control: 'inline-radio', options: IMAGES }, mode: { control: 'inline-radio', options: MODES } }),
};

export const Default = { args: { mode: 'Expanded' } };
/** Image=Vertical · Mode=Expanded (Desktop y Mobile: ver con el viewport XS). */
export const VerticalExpanded = { args: { mode: 'Expanded' } };
/** Image=Horizontal · Mode=Expanded. */
export const HorizontalExpanded = { args: { mode: 'Expanded', image: 'Horizontal' } };
/** Image=None · Mode=Collapsed. */
export const Collapsed = { args: { mode: 'Collapsed', image: 'None', number: '02' } };
/** Image=None · Mode=Collapsed Hover: subtema Dark - Red - Primary. */
export const CollapsedHover = { args: { mode: 'Collapsed Hover', image: 'None', number: '02' } };

/** Uso real: una pila donde solo un elemento está desplegado. */
export const Stack = {
  render: (args) => {
    const [open, setOpen] = useState(0);
    const titles = ['Salazón', 'Lavado', 'Secado', 'Bodega'];
    return titles.map((t, i) => (
      <M09ContentStackTextImage key={t} {...args} title={t} number={String(i + 1).padStart(2, '0')}
        expanded={open === i} onToggle={(v) => setOpen(v ? i : -1)} />
    ));
  },
};

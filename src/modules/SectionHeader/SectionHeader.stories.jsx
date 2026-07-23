import SectionHeader from './SectionHeader.jsx';

const meta = {
  title: 'Módulos/Hero · Section header',
  component: SectionHeader,
  // Subtema por defecto (overridable con el toolbar).
  parameters: { layout: 'fullscreen', defaultTheme: 'dark-black-neutral' },
  argTypes: {
    type: { control: 'inline-radio', options: ['big', 'small'] },
    showLabels: { control: 'boolean' },
  },
  args: {
    eyebrow: 'COLECCIONES JOSELITO',
    title: 'Etsuro\nSotoo',
    description: 'Volutpat eget sit eget quis laoreet tortor laoreet. Enim arcu morbi mauris urna fusce.',
    type: 'big',
    labels: ['PREMIUM', '2018'],
    showLabels: true,
  },
};
export default meta;

/** Default — vista por defecto, fluida (sin viewport fijo) para comprobar el responsive. */
export const Default = {};

/** Desktop · Big — título Title/07 e imagen 3:4. */
export const Big = {
  parameters: { viewport: { value: 'xl' } },
};

/** Desktop · Small — título Title/06 e imagen 1:1. */
export const Small = {
  args: {
    type: 'small',
    title: 'Eventos\ny bodas',
    description: 'Lorem ipsum dolor sit amet consectetur. Erat lectus et sed et. Nunc lacus mauris cursus egestas urna morbi.',
  },
  parameters: { viewport: { value: 'xl' } },
};

/** Mobile · Big — paneles apilados, imagen 3:4. */
export const MobileBig = {
  name: 'Mobile · Big',
  args: { title: 'Etsuro Sotoo' },
  parameters: { viewport: { value: 'xs' } },
};

/** Mobile · Small — apilado, imagen 1:1. */
export const MobileSmall = {
  name: 'Mobile · Small',
  args: {
    type: 'small',
    title: 'Eventos y bodas',
    description: 'Lorem ipsum dolor sit amet consectetur. Erat lectus et sed et. Nunc lacus mauris cursus egestas urna morbi.',
  },
  parameters: { viewport: { value: 'xs' } },
};

/** Sin etiquetas (showLabels=false). */
export const SinEtiquetas = {
  name: 'Sin etiquetas',
  args: { showLabels: false },
  parameters: { viewport: { value: 'xl' } },
};

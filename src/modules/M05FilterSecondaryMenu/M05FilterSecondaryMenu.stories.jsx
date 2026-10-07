import M05FilterSecondaryMenu, { STATUSES } from './M05FilterSecondaryMenu';

export default {
  title: 'Modules/M05-Filter-Secondary Menu',
  component: M05FilterSecondaryMenu,
  parameters: { layout: 'fullscreen', defaultTheme: 'light-white' },
  args: { status: 'Default', count: 84 },
  argTypes: { status: { control: 'inline-radio', options: STATUSES } },
};

const tall = (Story) => <div style={{ display: 'flex', height: 780 }}><Story /></div>;
export const Default = {};
/** Status=Default · Filtros Aplicados=No (Desktop y Mobile: ver con el viewport XS). Pulsa Filtrar para abrir el panel. */
export const FiltersNo = {};
/** Status=Default · Filtros Aplicados=Yes: etiquetas con X, Borrar y accesos en color de enlace. */
export const FiltersYes = { args: { defaultApplied: ['LABEL', 'LABEL 2'] } };
/** Status=Desplegado · Filtros Aplicados=No: Aplicar desactivado. */
export const PanelNo = { args: { status: 'Desplegado' }, decorators: [tall] };
/** Status=Desplegado · Filtros Aplicados=Yes: opción marcada, Borrar y Aplicar. */
export const PanelYes = { args: { status: 'Desplegado', defaultApplied: ['100€ - 200€'] }, decorators: [tall] };

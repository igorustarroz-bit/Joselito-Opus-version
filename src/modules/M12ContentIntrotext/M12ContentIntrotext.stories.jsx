import M12ContentIntrotext from './M12ContentIntrotext';

export default {
  title: 'Modules/M12-Content-Introtext',
  component: M12ContentIntrotext,
  parameters: { layout: 'fullscreen', defaultTheme: 'light-white' },
  args: { showLabel: true, showTitle: true, showBody: true, showBoxes: true, showButton: true },
};

export const Default = {};
/** Device=Desktop (desde 1024 px): cajas en fila. */
export const Desktop = {};
/** Device=Mobile (ver con el viewport XS): cajas apiladas. */
export const Mobile = {};
/** Solo título y enlace. */
export const Minimal = { args: { showBody: false, showBoxes: false } };

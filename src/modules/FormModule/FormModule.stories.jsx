import FormModule from './FormModule.jsx';

const meta = {
  title: 'Módulos/Form',
  component: FormModule,
  parameters: { layout: 'fullscreen' },
};
export default meta;

/** Desktop — texto a la izquierda y formulario a la derecha. */
export const Desktop = { parameters: { viewport: { value: 'xl' } } };

/** Mobile — texto arriba, formulario debajo a ancho completo. */
export const Mobile = { parameters: { viewport: { value: 'xs' } } };

/** Contenido personalizado (etiquetas y textos reales). */
export const ContenidoPersonalizado = {
  name: 'Contenido personalizado',
  args: {
    eyebrow: 'Contacto',
    title: 'Reserva tu experiencia',
    body: 'Déjanos tus datos y nuestro equipo se pondrá en contacto contigo para organizar una visita a nuestras bodegas de Guijuelo.',
    formTitle: 'Solicita información',
    formDescription: 'Todos los campos son obligatorios.',
    fields: [
      { label: 'Nombre' },
      { label: 'Apellidos' },
      { label: 'Email' },
      { label: 'Teléfono' },
    ],
    checkboxLabel: 'Acepto la política de privacidad',
    primaryLabel: 'ENVIAR',
    secondaryLabel: 'CANCELAR',
  },
  parameters: { viewport: { value: 'xl' } },
};

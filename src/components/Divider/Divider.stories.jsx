import Divider from './Divider';

export default { title: 'Components/Divider', component: Divider, parameters: { defaultTheme: 'light-white' } };

export const Default = {};
/** Entre dos bloques de texto. */
export const EntreContenido = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--layout-spacers-responsive-6)' }}>
      <p className="ts-body-03" style={{ margin: 0 }}>Bloque superior</p>
      <Divider />
      <p className="ts-body-03" style={{ margin: 0 }}>Bloque inferior</p>
    </div>
  ),
};

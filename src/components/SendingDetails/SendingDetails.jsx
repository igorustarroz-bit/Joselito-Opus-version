import BlockAddress from '../BlockAddress/BlockAddress';
import './SendingDetails.css';

const ADDR = 'Barbara Martínez\nCalle Serrano, 41, 3.º Izda.\n28001 Madrid\nEspaña';
// Contenido del máster (los títulos de pago y fecha repiten "Dirección de facturación" en Figma)
const DEFAULT_BLOCKS = [
  { title: 'Dirección de envío', text: ADDR, showCreditCard: false },
  { title: 'Dirección de facturación', text: ADDR, showCreditCard: false },
  { title: 'Dirección de facturación', showText: false, showCreditCard: true },
  { title: 'Dirección de facturación', text: '31 de julio – 1 de agosto de 2025', showCreditCard: false },
];

/** Resumen de envío del pedido: título (Title/01) y bloques Block Address en dos columnas (una en móvil). */
export default function SendingDetails({ title = 'Detalles del envío', blocks = DEFAULT_BLOCKS, children, theme, className = '', ...rest }) {
  return (
    <section className={['sending-details', className].filter(Boolean).join(' ')} data-theme={theme} {...rest}>
      <h2 className="sending-details__title ts-title-01">{title}</h2>
      <div className="sending-details__grid">
        {children ?? blocks.map((b, i) => <BlockAddress key={i} {...b} />)}
      </div>
    </section>
  );
}

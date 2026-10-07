import visa from '../../assets/images/block-address.webp';
import './BlockAddress.css';

/**
 * Bloque de dirección (checkout / pedido): título, dirección en varias líneas y tarjeta de pago
 * opcional (logo + "Visa ···· 4242"). Borde superior de 1 px y padding vertical FX-6.
 */
export default function BlockAddress({
  title = 'Dirección de facturación',
  text = 'Barbara Martínez\nCalle Serrano, 41, 3.º Izda.\n28001 Madrid\nEspaña',
  showText = true,
  card = 'Visa ···· 4242',
  showCreditCard = true,
  cardLogo = visa,
  cardLogoAlt = 'Visa',
  theme,
  className = '',
  ...rest
}) {
  return (
    <div className={['block-address', className].filter(Boolean).join(' ')} data-theme={theme} {...rest}>
      <p className="block-address__title ts-body-03">{title}</p>
      {showText && <p className="block-address__text ts-body-02">{text}</p>}
      {showCreditCard && (
        <p className="block-address__card">
          <img className="block-address__logo" src={cardLogo} alt={cardLogoAlt} width="40" height="40" />
          <span className="ts-body-03">{card}</span>
        </p>
      )}
    </div>
  );
}

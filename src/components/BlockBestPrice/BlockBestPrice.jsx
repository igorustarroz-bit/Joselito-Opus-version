import './BlockBestPrice.css';

/** Bloque "Mejor precio garantizado": título Labels/02 y texto Body/03 dentro de un marco de 1 px. */
export default function BlockBestPrice({
  title = 'Mejor precio garantizado',
  text = 'Selección entre Jamón Joselito Gran Reserva o Joselito Vintage.Selección entre Jamón Joselito Gran Reserva o Joselito Vintage.',
  theme,
  className = '',
  ...rest
}) {
  return (
    <div className={['block-best-price', className].filter(Boolean).join(' ')} data-theme={theme} {...rest}>
      <p className="block-best-price__title ts-labels-02">{title}</p>
      <p className="block-best-price__text ts-body-03">{text}</p>
    </div>
  );
}

import './Divider.css';

/** Línea divisoria horizontal de 1 px (Strokes-Icons/Neutral 3) a ancho completo. */
export default function Divider({ theme, className = '', ...rest }) {
  return <hr className={['divider', className].filter(Boolean).join(' ')} data-theme={theme} {...rest} />;
}

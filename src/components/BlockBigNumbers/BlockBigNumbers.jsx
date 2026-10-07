import './BlockBigNumbers.css';

/** Cifra destacada con su explicación: número grande (Title/03) y texto Body/04. */
export default function BlockBigNumbers({ number = '24%  Vitamina B', text = 'de la cantidad diaria recomendada.', theme, className = '', ...rest }) {
  return (
    <div className={['block-big-numbers', className].filter(Boolean).join(' ')} data-theme={theme} {...rest}>
      <p className="block-big-numbers__number ts-title-03">{number}</p>
      <p className="block-big-numbers__text ts-body-04">{text}</p>
    </div>
  );
}

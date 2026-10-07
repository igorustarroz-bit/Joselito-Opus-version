import BlockBigNumbers from '../../components/BlockBigNumbers/BlockBigNumbers';
import Title from '../../components/Title/Title';
import './M21ListNumbers.css';

const ITEMS = [
  { number: '100.000+', text: 'hectáreas gestionadas' },
  { number: '+500.000', text: 'árboles reforestados desde 2023' },
  { number: '+/-3', text: 'hectáreas para cada cerdo' },
];

/**
 * Cifras destacadas: cabecera y tres Block Big Numbers en columnas separadas por líneas verticales que
 * llegan de arriba abajo (escritorio) o apiladas con separadores horizontales (móvil).
 */
export default function M21ListNumbers({ showTitle = true, eyebrow = '100 g de Jamón Joselito aportan', items = ITEMS, theme, className = '', ...rest }) {
  return (
    <section className={['m21-numbers', className].filter(Boolean).join(' ')} data-theme={theme} {...rest} style={{ '--m21-cols': items.length, ...rest.style }}>
      {showTitle && <Title className="m21-numbers__title" eyebrow={eyebrow} showTitle={false} showLink={false} />}
      <ul className="m21-numbers__list">
        {items.map((it, i) => <li key={i} style={{ '--m21-col': i + 1 }}><BlockBigNumbers number={it.number} text={it.text} /></li>)}
      </ul>
    </section>
  );
}

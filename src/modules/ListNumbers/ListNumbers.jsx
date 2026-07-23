import './ListNumbers.css';

/**
 * Módulo List / Numbers — cifras destacadas a 100% de ancho. Máster Figma
 * 58447:7252 (variantes Desktop 58447:7251 / Mobile 58447:7250).
 *
 * Un título de sección (SangBleu) y una lista de filas, cada una con una cifra
 * grande (SangBleu, Title/03) y una descripción (Body/05), separadas por líneas.
 * En desktop cifra y descripción van en fila (cifra a la izquierda, texto a la
 * derecha); en mobile se apilan. Pensado para subtema gris claro.
 *
 * Subtema: el módulo HEREDA el subtema del contenedor. Su default (`light-grey`)
 * se fija en Storybook con `globals.theme` (el toolbar puede cambiarlo). En
 * producción, colócalo bajo un `data-theme` o pásale la prop `theme`.
 *
 * Nota de máster: la línea superior aparece también sobre la primera fila
 * (fiel a desktop); espaciados con tokens responsive `--sp-*`.
 */
const DEFAULT_ITEMS = [
  { value: '100.000 +', label: 'hectáreas gestionadas.' },
  { value: '+500.000', label: 'árboles reforestados desde 2023.' },
  { value: '+/- 3', label: 'hectáreas para cada cerdo.' },
];

export default function ListNumbers({
  title = 'Nuestra huella en cifras',
  items = DEFAULT_ITEMS,
  theme,
  className = '',
  ...rest
}) {
  return (
    <section className={`jl-numbers ${className}`.trim()} data-theme={theme || undefined} {...rest}>
      {title && (
        <div className="jl-numbers__head">
          <h2 className="jl-numbers__title">{title}</h2>
        </div>
      )}
      <div className="jl-numbers__rows">
        {items.map((it, i) => (
          <div className="jl-numbers__row" key={i}>
            <span className="jl-numbers__value ts-title-3">{it.value}</span>
            {it.label && <p className="jl-numbers__label ts-body-5">{it.label}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

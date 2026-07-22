import './TextOnly.css';

/**
 * Módulo Content/Text only — bloque de texto a 100% ancho.
 * variant "columns": label (Body/06) + título (SangBleu Title/04) + cuerpo (Body/05)
 *   en una o dos columnas. variant "split": título a la izquierda, cuerpo a la derecha.
 * `columns` es un array de arrays de párrafos (cada sub-array = una columna).
 */
export default function TextOnly({
  label,
  title = 'Lorem ipsum dolor sit amet consectetur.',
  columns = [['Lorem ipsum dolor sit amet consectetur.']],
  variant = 'columns',
  className = '',
  ...rest
}) {
  const multi = columns.length > 1;
  if (variant === 'split') {
    return (
      <section className={`jl-textonly jl-textonly--split ${className}`} {...rest}>
        <div className="jl-textonly__inner">
          {label && <p className="jl-textonly__label ts-body-6">{label}</p>}
          <div className="jl-textonly__row">
            <p className="jl-textonly__title ts-title-4">{title}</p>
            <div className="jl-textonly__body">
              <div className="jl-textonly__col ts-body-5">
                {columns.flat().map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className={`jl-textonly ${className}`} {...rest}>
      <div className="jl-textonly__inner">
        <div className="jl-textonly__head">
          {label && <p className="jl-textonly__label ts-body-6">{label}</p>}
          <p className="jl-textonly__title ts-title-4">{title}</p>
        </div>
        <div className={`jl-textonly__body ${multi ? 'jl-textonly__body--multi' : ''}`}>
          {columns.map((col, i) => (
            <div className="jl-textonly__col ts-body-5" key={i}>
              {col.map((p, j) => <p key={j}>{p}</p>)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

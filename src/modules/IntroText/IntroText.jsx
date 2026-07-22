import './IntroText.css';
import Button from '../../components/Button/Button.jsx';

/**
 * Módulo Content/Intro text — bloque introductorio centrado a 100% de ancho.
 * Eyebrow (Body/03), título (SangBleu Title/03), cuerpo (Body/04), cajas de datos
 * opcionales y un botón. Responsive.
 */
export default function IntroText({
  eyebrow = 'Un legado único',
  title = 'Seis generaciones y más de 150 años de historia han convertido el tiempo en el mayor valor de Joselito',
  body,
  boxes = [],
  buttonText,
  onButton,
  className = '',
  ...rest
}) {
  return (
    <section className={`jl-introtext ${className}`} {...rest}>
      <div className="jl-introtext__inner">
        {eyebrow && <p className="jl-introtext__eyebrow ts-body-3">{eyebrow}</p>}
        <div className="jl-introtext__group">
          <p className="jl-introtext__title ts-title-3">{title}</p>
          {body && <p className="jl-introtext__body ts-body-4">{body}</p>}
          {boxes.length > 0 && (
            <div className="jl-introtext__boxes">
              {boxes.map((b, i) => (
                <div className="jl-introtext__box" key={i}>
                  <span className="jl-introtext__box-label ts-body-4">{b.label}</span>
                  <span className="jl-introtext__box-value ts-body-4">{b.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {buttonText && <Button type="primary" size="m" onClick={onButton}>{buttonText}</Button>}
    </section>
  );
}

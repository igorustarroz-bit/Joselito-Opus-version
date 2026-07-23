import './CardsAccordion.css';
import Button from '../../components/Button/Button.jsx';

/**
 * Módulo Cards / Accordion — máster Figma 58182:24099. Subtema oscuro.
 *
 * OJO: pese al nombre "Accordion", NO es un acordeón. Es una banda tipográfica
 * decorativa. Además, desktop y mobile son estructuralmente distintos:
 *  - Desktop (58182:24098): palabras gigantes (SangBleu, Title/08) repetidas
 *    alternando rojo de marca y blanco, con fotos dispersas al fondo. Sin texto/CTA.
 *  - Mobile (58182:24097): eyebrow + 3 palabras + descripción + atributos + botón
 *    (terciary). Sin fotos.
 *
 * El rojo es el rojo de marca (`--color-primary-50`): en el subtema oscuro ningún
 * token semántico de texto lo devuelve (accent-base → blanco), así que se usa la
 * primitiva de marca directamente.
 *
 * Subtema oscuro por defecto (parameters.defaultTheme en Storybook); hereda del
 * contenedor. Nota: offsets de fotos en desktop aproximados.
 */
const DESKTOP_LINES = [
  { text: 'Reserva' },
  { text: 'Vintage' },
  { text: 'Millésime', light: true },
  { text: 'Reserva' },
  { text: 'Vintage' },
];
const MOBILE_LINES = [
  { text: 'Reserva' },
  { text: 'Millésime', light: true },
  { text: 'Vintage' },
];

export default function CardsAccordion({
  eyebrow = 'AÑOS DE CURACIÓN',
  desktopLines = DESKTOP_LINES,
  mobileLines = MOBILE_LINES,
  description = 'Los jamones Gran Reserva expresan el sabor Joselito en su forma más armoniosa: jugosos, suaves y de aromas delicados.',
  attributes = ['Complejidad', 'Equilibrio', 'Dulzura'],
  duration = '4 a 6 años de curación',
  cta = 'Descubrir',
  images = [],
  theme,
  className = '',
  ...rest
}) {
  const Word = ({ l }) => (
    <span className={`jl-typeband__word${l.light ? ' jl-typeband__word--light' : ''}`}>{l.text}</span>
  );

  return (
    <section className={`jl-typeband ${className}`.trim()} data-theme={theme || undefined} {...rest}>
      {/* ---- Desktop: banda con fotos ---- */}
      <div className="jl-typeband__desktop">
        <div className="jl-typeband__photos" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <div key={i} className={`jl-typeband__photo jl-typeband__photo--${i + 1}`}>
              {images[i] ? <img src={images[i]} alt="" /> : null}
            </div>
          ))}
        </div>
        <div className="jl-typeband__words">
          {desktopLines.map((l, i) => <Word key={i} l={l} />)}
        </div>
      </div>

      {/* ---- Mobile: eyebrow + palabras + contenido + CTA ---- */}
      <div className="jl-typeband__mobile">
        {eyebrow && <p className="jl-typeband__eyebrow ts-body-2">{eyebrow}</p>}
        <div className="jl-typeband__words jl-typeband__words--mobile">
          {mobileLines.map((l, i) => <Word key={i} l={l} />)}
        </div>
        <div className="jl-typeband__content">
          {description && <p className="jl-typeband__desc ts-body-3">{description}</p>}
          {(attributes?.length > 0 || duration) && (
            <div className="jl-typeband__meta">
              {attributes?.length > 0 && (
                <p className="jl-typeband__attrs">
                  {attributes.map((a, i) => (
                    <span key={i}>
                      <span className="jl-typeband__attr">{a}</span>
                      {i < attributes.length - 1 && <span className="jl-typeband__dot" aria-hidden="true"> · </span>}
                    </span>
                  ))}
                </p>
              )}
              {duration && <p className="jl-typeband__duration">{duration}</p>}
            </div>
          )}
          {cta && <Button type="terciary" size="s">{cta}</Button>}
        </div>
      </div>
    </section>
  );
}

import './CardsAccordion.css';

/**
 * Módulo Cards / Accordion — máster Figma 58182:24099 (nodo 58182:24098).
 *
 * OJO: pese al nombre "Accordion", el máster de este nodo es una **banda
 * tipográfica** decorativa (no un acordeón): fondo oscuro con palabras gigantes
 * (SangBleu, Title/08) repetidas alternando rojo de marca y blanco, con fotos
 * dispersas al fondo. Se construye fiel al nodo (decisión del equipo).
 *
 * Subtema oscuro: hereda del contenedor; su default se fija en Storybook con
 * parameters.defaultTheme.
 *
 * Nota de máster: módulo muy art-directed (posiciones absolutas, opacidades). Aquí
 * se reproduce el lenguaje visual de forma fiel pero **aproximada** en offsets de
 * las fotos; sin `images`, se muestran placeholders.
 */
const DEFAULT_LINES = [
  { text: 'Reserva' },
  { text: 'Vintage' },
  { text: 'Millésime', light: true },
  { text: 'Reserva' },
  { text: 'Vintage' },
];

export default function CardsAccordion({
  lines = DEFAULT_LINES,
  images = [],
  theme,
  className = '',
  ...rest
}) {
  return (
    <section
      className={`jl-typeband ${className}`.trim()}
      data-theme={theme || undefined}
      {...rest}
    >
      <div className="jl-typeband__photos" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <div key={i} className={`jl-typeband__photo jl-typeband__photo--${i + 1}`}>
            {images[i] ? <img src={images[i]} alt="" /> : null}
          </div>
        ))}
      </div>
      <div className="jl-typeband__words">
        {lines.map((l, i) => (
          <span
            key={i}
            className={`jl-typeband__word${l.light ? ' jl-typeband__word--light' : ''}`}
          >
            {l.text}
          </span>
        ))}
      </div>
    </section>
  );
}

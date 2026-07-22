import './ContentTitle.css';
import ActionLink from '../../components/ActionLink/ActionLink.jsx';

/**
 * Módulo Content / Title — cabecera de sección de contenido, a 100% de ancho.
 * Etiqueta opcional (Body/06), título (SangBleu, Title/04) y, a la derecha en
 * desktop / debajo en mobile, descripción (Body/05) + enlace de acción.
 * Máster Figma 58163:40029.
 *
 * Nota: el máster incluye un botón con tokens ajenos al sistema Joselito
 * (azul #0045ff, Neue Haas Grotesk), heredado de otra plantilla. Se omite por
 * estar fuera del design system; el elemento de acción real es el enlace.
 */
export default function ContentTitle({
  label = 'This is a label',
  title = 'Lorem ipsum accumsan eleifend',
  description = 'Lorem ipsum dolor sit amet consectetur. Nibh lacus erat urna molestie.',
  link = 'LINK',
  linkHref = '#',
  className = '',
  ...rest
}) {
  const hasAside = description || link;
  return (
    <section className={`jl-ctitle ${className}`} {...rest}>
      {label && <p className="jl-ctitle__label ts-body-6">{label}</p>}
      <div className="jl-ctitle__row">
        <h2 className="jl-ctitle__title ts-title-4">{title}</h2>
        {hasAside && (
          <div className="jl-ctitle__aside">
            {description && <p className="jl-ctitle__desc ts-body-5">{description}</p>}
            {link && <ActionLink href={linkHref}>{link}</ActionLink>}
          </div>
        )}
      </div>
    </section>
  );
}

import { Fragment } from 'react';
import './SectionHeader.css';
import ButtonIcon from '../../components/ButtonIcon/ButtonIcon.jsx';
import Tag from '../../components/Tag/Tag.jsx';
import AspectRatio from '../../components/AspectRatio/AspectRatio.jsx';
import portraitImg from '../../assets/images/section-header-portrait.webp';
import squareImg from '../../assets/images/section-header-square.webp';

/**
 * Módulo Hero / Section header — cabecera de sección a 100% de ancho, pensado
 * para subtema OSCURO. Máster Figma 58508:6679.
 *
 * Subtema: el módulo HEREDA el subtema del contenedor (colores por tokens). Su
 * default (`dark-black-neutral`) se fija en Storybook con `globals.theme`, de modo
 * que el toolbar puede cambiarlo. En producción, coloca el módulo bajo un
 * contenedor con `data-theme` o pásale la prop `theme` para fijarlo.
 *
 * Dos paneles: bloque de texto (botón atrás + eyebrow arriba; título SangBleu +
 * descripción + etiquetas abajo) y una imagen. En desktop van lado a lado (texto
 * a la izquierda con borde derecho, imagen a la derecha); en mobile se apilan
 * (texto arriba con borde inferior, imagen debajo).
 *
 * Variantes (prop `type`):
 *  - `big`: título Title/07 e imagen en proporción 3:4.
 *  - `small`: título Title/06 e imagen 1:1.
 *
 * Reutiliza UI03-Button-Icon (flecha atrás, secondary), UI12-Tag (aseptic) y el
 * foundation AspectRatio. El título admite saltos de línea con `\n`.
 *
 * Notas de máster: gaps/paddings (56/48/40/32/24/16/8) y el ancho de imagen en
 * desktop (515px) están hardcodeados en el máster (no ligados a variable), así
 * que se replican como valores fijos; los márgenes laterales usan `--grid-wrapper`.
 * El botón atrás usa tamaño `m` (48px) también en mobile (el máster lo reduce a
 * 40px). Sin imagen, el área multimedia muestra un placeholder.
 */
export default function SectionHeader({
  eyebrow = 'COLECCIONES JOSELITO',
  title = 'Etsuro Sotoo',
  description = 'Volutpat eget sit eget quis laoreet tortor laoreet. Enim arcu morbi mauris urna fusce.',
  type = 'big',
  labels = ['PREMIUM', '2018'],
  showLabels = true,
  image,
  alt = '',
  onBack,
  theme,
  className = '',
  ...rest
}) {
  const lines = String(title).split('\n');
  const imgSrc = image ?? (type === 'big' ? portraitImg : squareImg);
  return (
    <section
      className={`jl-sheader jl-sheader--${type} ${className}`.trim()}
      data-theme={theme || undefined}
      {...rest}
    >
      <div className="jl-sheader__text">
        <div className="jl-sheader__top">
          <ButtonIcon
            icon="ArrowLeft"
            type="secondary"
            size="m"
            label="Volver"
            className="jl-sheader__back"
            onClick={onBack}
          />
          {eyebrow && <p className="jl-sheader__eyebrow ts-body-2">{eyebrow}</p>}
        </div>

        <div className="jl-sheader__body">
          <div className="jl-sheader__titles">
            {title && (
              <h2 className={`jl-sheader__title ${type === 'big' ? 'ts-title-7' : 'ts-title-6'}`}>
                {lines.map((line, i) => (
                  <Fragment key={i}>
                    {line}
                    {i < lines.length - 1 && <br aria-hidden="true" />}
                  </Fragment>
                ))}
              </h2>
            )}
            {description && <p className="jl-sheader__desc ts-body-4">{description}</p>}
          </div>

          {showLabels && labels?.length > 0 && (
            <div className="jl-sheader__labels">
              {labels.map((l, i) => (
                <Tag key={i} type="aseptic" size="l">{l}</Tag>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="jl-sheader__media">
        <AspectRatio ratio={type === 'big' ? '3:4' : '1:1'} className="jl-sheader__ar">
          {imgSrc ? <img src={imgSrc} alt={alt} /> : null}
        </AspectRatio>
      </div>
    </section>
  );
}

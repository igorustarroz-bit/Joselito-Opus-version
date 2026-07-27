import './ContentStack.css';
import { useState } from 'react';
import Button from '../../components/Button/Button.jsx';
import AspectRatio from '../../components/AspectRatio/AspectRatio.jsx';
import fillerImg from '../../assets/images/generic-filler.webp';

/**
 * Módulo Content Stack / Text + Image — máster Figma (component set `58468:60216`).
 *
 * Acordeón a 100% de ancho: una lista de pasos donde UN elemento está abierto
 * (Mode=Expanded) y el resto colapsados (Mode=Collapsed). Al pulsar una fila
 * colapsada, esa pasa a abierta (una sola abierta a la vez).
 *
 *  - Fila colapsada (`58468:60253`, 130px): título (SangBleu `Title/03`) a la
 *    izquierda + número itálico (neutro claro) a la derecha; borde inferior.
 *  - Fila abierta (`58468:60217`): dos columnas — texto (título + descripción
 *    `Body/04` + botón `secondary` opcional; número itálico abajo) e imagen
 *    vertical `3:4` (AspectRatio). En mobile se apila (imagen debajo del texto).
 *
 * Toggles del máster por elemento: `number`, `description`, `cta` e `image`.
 * Subtema claro por defecto; hereda del contenedor (colores por tokens).
 *
 * Responsive contrastado contra el máster: mobile (58468:60235) apila texto → imagen →
 * número (padding 40/24); desktop (58468:60217) usa dos columnas (texto | imagen 3:4) con
 * el número anclado abajo-izquierda.
 */
const DEFAULT_ITEMS = [
  {
    number: '01',
    title: 'Salazón',
    description:
      'Un leve proceso de salado permite la estabilización de las enzimas y la perfecta conservación de las piezas. Los Jamones y Paletas Joselito se caracterizan por su baja salinidad, llegando a ser considerados dulces.',
    cta: 'Saber más',
    image: fillerImg,
  },
  { number: '02', title: 'Lavado', description: 'Las piezas se lavan con agua para retirar el exceso de sal antes de pasar al asentamiento.', image: fillerImg },
  { number: '03', title: 'Asentamiento', description: 'La sal se distribuye de forma homogénea por toda la pieza durante un reposo en frío.', image: fillerImg },
  { number: '04', title: 'Secado', description: 'La pieza pierde humedad de manera natural y desarrolla parte de su aroma característico.', image: fillerImg },
  { number: '05', title: 'Curación en bodega', description: 'El tiempo y el microclima de la bodega culminan la maduración del jamón Joselito.', image: fillerImg },
];

export default function ContentStack({
  items = DEFAULT_ITEMS,
  defaultActive = 0,
  ratio = '3:4',
  theme,
  className = '',
  ...rest
}) {
  const [active, setActive] = useState(defaultActive);

  return (
    <section className={`jl-cstack ${className}`.trim()} data-theme={theme || undefined} {...rest}>
      {items.map((item, i) => {
        const isOpen = i === active;
        return (
          <div className="jl-cstack__item" data-open={isOpen} key={item.number ?? i}>
            {/* Capa expandida (texto + imagen + número). Persistente: no se remonta al
                cambiar, así el alto puede animarse (grid-template-rows 0fr↔1fr). */}
            <div className="jl-cstack__wrap jl-cstack__wrap--open" inert={!isOpen || undefined}>
              <div className="jl-cstack__wrapinner">
                <div className="jl-cstack__expanded">
                  {/* Orden DOM: texto → imagen → número. Mobile apila en ese orden; desktop
                      recoloca con grid (texto arriba-izq, número abajo-izq, imagen derecha). */}
                  <div className="jl-cstack__group">
                    <div className="jl-cstack__titletext">
                      <span className="jl-cstack__title ts-title-3">{item.title}</span>
                      {item.description && <p className="jl-cstack__desc ts-body-4">{item.description}</p>}
                    </div>
                    {item.cta && <Button type="secondary" size="s">{item.cta}</Button>}
                  </div>
                  {item.image && (
                    <AspectRatio ratio={item.ratio || ratio} className="jl-cstack__media">
                      <img src={item.image} alt={item.alt || ''} />
                    </AspectRatio>
                  )}
                  {item.number && <span className="jl-cstack__num ts-title-3">{item.number}</span>}
                </div>
              </div>
            </div>
            {/* Capa colapsada (abre al pulsar) */}
            <button
              type="button"
              className="jl-cstack__wrap jl-cstack__wrap--collapsed"
              aria-expanded={isOpen}
              aria-label={item.title}
              tabIndex={isOpen ? -1 : 0}
              inert={isOpen || undefined}
              onClick={() => setActive(i)}
            >
              <div className="jl-cstack__wrapinner">
                <div className="jl-cstack__row">
                  <span className="jl-cstack__title ts-title-3">{item.title}</span>
                  {item.number && <span className="jl-cstack__num ts-title-3">{item.number}</span>}
                </div>
              </div>
            </button>
          </div>
        );
      })}
    </section>
  );
}

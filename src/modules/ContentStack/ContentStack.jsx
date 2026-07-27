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
 * Nota: el máster define variantes Desktop y Mobile; la versión mobile aquí está
 * inferida (apilado), pendiente de contraste fino contra el máster mobile.
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
          <div className="jl-cstack__item" key={item.number ?? i}>
            {isOpen ? (
              <div className="jl-cstack__expanded">
                <div className="jl-cstack__col">
                  <div className="jl-cstack__group">
                    <div className="jl-cstack__titletext">
                      <button
                        type="button"
                        className="jl-cstack__head"
                        aria-expanded="true"
                        onClick={() => setActive(i)}
                      >
                        <span className="jl-cstack__title ts-title-3">{item.title}</span>
                      </button>
                      {item.description && <p className="jl-cstack__desc ts-body-4">{item.description}</p>}
                    </div>
                    {item.cta && <Button type="secondary" size="s">{item.cta}</Button>}
                  </div>
                  {item.number && <span className="jl-cstack__num ts-title-3">{item.number}</span>}
                </div>
                {item.image && (
                  <AspectRatio ratio={item.ratio || ratio} className="jl-cstack__media">
                    <img src={item.image} alt={item.alt || ''} />
                  </AspectRatio>
                )}
              </div>
            ) : (
              <button
                type="button"
                className="jl-cstack__row"
                aria-expanded="false"
                onClick={() => setActive(i)}
              >
                <span className="jl-cstack__title ts-title-3">{item.title}</span>
                {item.number && <span className="jl-cstack__num ts-title-3">{item.number}</span>}
              </button>
            )}
          </div>
        );
      })}
    </section>
  );
}

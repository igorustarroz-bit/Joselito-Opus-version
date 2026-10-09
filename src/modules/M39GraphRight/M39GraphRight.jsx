import Chart from '../../components/Chart/Chart';
import { m39Spec } from './m39-graph.spec';
import './M39GraphRight.css';

/**
 * M39 · Graph Right. Título y párrafo a la izquierda y una gráfica (componente Chart, motor D3 por defecto)
 * a la derecha. La gráfica es interactiva (tooltip y resaltado al pasar el ratón) y se construye con
 * animación al entrar en pantalla. Escritorio (desde 960 px): texto 1–4 · gráfica 8–12. Móvil: apilado.
 */
export default function M39GraphRight({
  title = 'Lorem ipsum dolor sit amet',
  text = 'Joselito ofrece, a través de sus Entidades Emisoras, una amplia gama de tarjetas que van acompañadas de las marcas internacionales de mayor aceptación. Los beneficios añadidos a las tarjetas Joselito, las convierten en uno de los medios de pago más útiles del mercado.',
  chart = m39Spec, renderer, theme, className = '', ...rest
}) {
  return (
    <section className={['m39-graph', className].filter(Boolean).join(' ')} data-theme={theme} {...rest}>
      {title && <h2 className="m39-graph__title ts-title-04">{title}</h2>}
      {text && <p className="m39-graph__text ts-body-02">{text}</p>}
      <div className="m39-graph__chart"><Chart spec={chart} renderer={renderer} /></div>
    </section>
  );
}

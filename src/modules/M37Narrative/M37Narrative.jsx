import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import AspectRatio from '../../components/AspectRatio/AspectRatio';
import Button from '../../components/Button/Button';
import photo from '../../assets/images/aspect-ratio.webp';
import photo2 from '../../assets/images/m23-cards-gallery-2.webp';
import photo3 from '../../assets/images/m23-cards-gallery-3.webp';
import photo4 from '../../assets/images/m23-cards-gallery-4.webp';
import photo5 from '../../assets/images/m23-cards-gallery-5.webp';
import photo6 from '../../assets/images/m14-hero-sectionheader-2.webp';
import './M37Narrative.css';

const TEXT = 'Joselito ofrece, a través de sus Entidades Emisoras, una amplia gama de tarjetas que van acompañadas de las marcas internacionales de mayor aceptación. Los beneficios añadidos a las tarjetas Joselito, las convierten en uno de los medios de pago más útiles del mercado.';

/** Pasos por defecto: el 01 es el contenido real del máster; 02–06 son placeholders (anotados en el meta). */
export const DEFAULT_STEPS = [photo, photo2, photo3, photo4, photo5, photo6].map((image) => ({ text: TEXT, image, imageAlt: '' }));

/**
 * M37 · Narrative. Relato por pasos: título fijo, paginador 01–06, párrafo y botón «Siguiente».
 * Cada paso tiene su texto y su foto (2:3); el paginador y el botón cambian de paso (tras el último vuelve al primero).
 * Escritorio (desde 960 px): título 1–6 arriba; paginador, texto (1–4) y botón abajo a la izquierda; foto 9–12.
 * Móvil y tablet: título → paginador → texto → botón → foto a sangre.
 */
export default function M37Narrative({
  title = 'Lorem ipsum dolor sit amet', steps = DEFAULT_STEPS, initialStep = 0, buttonText = 'Siguente',
  onStepChange, theme, className = '', ...rest
}) {
  const [active, setActive] = useState(Math.min(initialStep, steps.length - 1));
  const root = useRef(null);
  const first = useRef(true);
  const step = steps[active] || {};

  // Transición suave al cambiar de paso (respeta prefers-reduced-motion)
  useLayoutEffect(() => {
    if (first.current) { first.current = false; return undefined; }
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo('.m37-narrative__text, .m37-narrative__media img', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.45, ease: 'power1.out' });
    }, root);
    return () => ctx.revert();
  }, [active]);

  const go = (i) => { const n = (i + steps.length) % steps.length; setActive(n); onStepChange?.(n); };
  const pad = (i) => String(i + 1).padStart(2, '0');

  return (
    <section ref={root} className={['m37-narrative', className].filter(Boolean).join(' ')} data-theme={theme} aria-roledescription="relato por pasos" {...rest}>
      {title && <h2 className="m37-narrative__title ts-title-04">{title}</h2>}
      <ol className="m37-narrative__pager" aria-label="Pasos">
        {steps.map((_, i) => (
          <li key={i}>
            <button type="button" className={['m37-narrative__num ts-body-02', i === active && 'is-selected'].filter(Boolean).join(' ')}
              aria-current={i === active ? 'step' : undefined} aria-label={`Paso ${i + 1} de ${steps.length}`} onClick={() => go(i)}>
              {pad(i)}
            </button>
          </li>
        ))}
      </ol>
      <p className="m37-narrative__text ts-body-02" aria-live="polite">{step.text}</p>
      <div className="m37-narrative__cta">
        <Button className="m37-narrative__btn m37-narrative__btn--xs" size="XS" text={buttonText} showIconRight onClick={() => go(active + 1)} />
        <Button className="m37-narrative__btn m37-narrative__btn--l" size="L" text={buttonText} showIconRight onClick={() => go(active + 1)} />
      </div>
      <AspectRatio className="m37-narrative__media" size="2:3" src={step.image} alt={step.imageAlt || ''} />
    </section>
  );
}

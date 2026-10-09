import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '../../components/Button/Button';
import Overlay from '../../components/Overlay/Overlay';
import photo from '../../assets/images/m23-cards-gallery.webp';
import './M38ScrolledBigText.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * M38 · Scrolled big text. Foto de fondo a sangre con velo, un titular gigante (Title/08) que no cabe en el
 * módulo y, al lado, párrafo + botón. Al hacer scroll el módulo se queda anclado y el titular se desplaza
 * (hacia arriba en escritorio, hacia la izquierda en móvil) hasta verse entero; después la página sigue.
 * Con prefers-reduced-motion (o sin JS) el titular queda recortado como en Figma.
 */
export default function M38ScrolledBigText({
  title = 'El campo es lo más bello en la viña del señor',
  text = 'Joselito ofrece, a través de sus Entidades Emisoras, una amplia gama de tarjetas que van acompañadas de las marcas internacionales de mayor aceptación. Los beneficios añadidos a las tarjetas Joselito, las convierten en uno de los medios de pago más útiles del mercado.',
  buttonText = 'Conoce más', buttonHref, image = photo, imageAlt = '', scrub = true,
  theme = 'dark-black-neutral', className = '', ...rest
}) {
  const root = useRef(null);
  const titleRef = useRef(null);

  useLayoutEffect(() => {
    if (!scrub || !root.current || !titleRef.current) return undefined;
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const box = root.current; const t = titleRef.current;
      // Lo que sobra del titular respecto al área útil del módulo (padding incluido)
      const over = () => {
        const b = box.getBoundingClientRect(); const r = t.getBoundingClientRect(); const cs = getComputedStyle(box);
        return {
          x: Math.max(0, r.right - (b.right - parseFloat(cs.paddingRight))),
          y: Math.max(0, r.bottom - (b.bottom - parseFloat(cs.paddingBottom))),
        };
      };
      const tween = gsap.to(t, {
        x: () => -over().x, y: () => -over().y, ease: 'none',
        scrollTrigger: {
          trigger: box, start: 'top top', end: () => `+=${Math.max(over().x, over().y) * 1.5}`,
          pin: true, scrub: true, invalidateOnRefresh: true,
        },
      });
      return () => tween.scrollTrigger?.kill();
    });
    return () => mm.revert();
  }, [scrub, title]);

  return (
    <section ref={root} className={['m38-bigtext', className].filter(Boolean).join(' ')} data-theme={theme} {...rest}>
      <img className="m38-bigtext__bg" src={image} alt={imageAlt} />
      <Overlay className="m38-bigtext__veil" fixed={false} aria-hidden="true" />
      <h2 ref={titleRef} className="m38-bigtext__title ts-title-08">{title}</h2>
      <div className="m38-bigtext__aside">
        {text && <p className="m38-bigtext__text ts-body-02">{text}</p>}
        {buttonText && (
          <div className="m38-bigtext__cta" data-theme="light-white">
            <Button size="L" text={buttonText} href={buttonHref} showIconRight />
          </div>
        )}
      </div>
    </section>
  );
}

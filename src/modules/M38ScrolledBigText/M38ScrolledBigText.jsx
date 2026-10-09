import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '../../components/Button/Button';
import Overlay from '../../components/Overlay/Overlay';
import photo from '../../assets/images/m23-cards-gallery.webp';
import './M38ScrolledBigText.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * M38 · Scrolled big text. Foto de fondo fija (cubre la pantalla y no se mueve con el scroll: el módulo hace de
 * ventana, como background-attachment: fixed + cover) con velo, un titular gigante (Title/08) y, al lado,
 * párrafo + botón. Mide como mínimo 1200 px. Si el titular no cabe (móvil, por la derecha), se desliza con el
 * scroll hasta verse entero; con prefers-reduced-motion (o sin JS) queda recortado como en Figma.
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
      // Titular: si no cabe (móvil: por la derecha), se desliza hasta verse entero mientras el módulo
      // sube desde el borde inferior hasta el superior de la pantalla. Sin anclaje.
      const overX = () => {
        const b = box.getBoundingClientRect(); const cs = getComputedStyle(box);
        return Math.max(0, t.offsetLeft + t.offsetWidth - (b.width - parseFloat(cs.paddingRight)));
      };
      const slide = gsap.to(t, {
        x: () => -overX(), ease: 'none',
        scrollTrigger: { trigger: box, start: 'top bottom', end: 'top top', scrub: true, invalidateOnRefresh: true },
      });
      return () => { slide.scrollTrigger?.kill(); };
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

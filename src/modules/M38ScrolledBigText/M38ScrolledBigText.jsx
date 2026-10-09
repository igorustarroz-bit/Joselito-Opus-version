import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '../../components/Button/Button';
import Overlay from '../../components/Overlay/Overlay';
import photo from '../../assets/images/m23-cards-gallery.webp';
import './M38ScrolledBigText.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * M38 · Scrolled big text. Foto de fondo a sangre en parallax con velo, un titular gigante (Title/08) y, al lado,
 * párrafo + botón. Mide como mínimo 1200 px. Sin anclaje: mientras el módulo cruza la pantalla el fondo va más
 * lento que el scroll y, si el titular no cabe (móvil, por la derecha), se desliza hasta verse entero.
 * Con prefers-reduced-motion (o sin JS) todo queda estático y el titular recortado como en Figma.
 */
export default function M38ScrolledBigText({
  title = 'El campo es lo más bello en la viña del señor',
  text = 'Joselito ofrece, a través de sus Entidades Emisoras, una amplia gama de tarjetas que van acompañadas de las marcas internacionales de mayor aceptación. Los beneficios añadidos a las tarjetas Joselito, las convierten en uno de los medios de pago más útiles del mercado.',
  buttonText = 'Conoce más', buttonHref, image = photo, imageAlt = '', scrub = true,
  theme = 'dark-black-neutral', className = '', ...rest
}) {
  const root = useRef(null);
  const titleRef = useRef(null);
  const bgRef = useRef(null);

  useLayoutEffect(() => {
    if (!scrub || !root.current || !titleRef.current) return undefined;
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const box = root.current; const t = titleRef.current; const bg = bgRef.current;
      // Fondo en parallax: va más lento que el scroll mientras el módulo cruza la pantalla
      const para = gsap.fromTo(bg, { yPercent: -8 }, {
        yPercent: 8, ease: 'none',
        scrollTrigger: { trigger: box, start: 'top bottom', end: 'bottom top', scrub: true },
      });
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
      return () => { para.scrollTrigger?.kill(); slide.scrollTrigger?.kill(); };
    });
    return () => mm.revert();
  }, [scrub, title]);

  return (
    <section ref={root} className={['m38-bigtext', className].filter(Boolean).join(' ')} data-theme={theme} {...rest}>
      <img ref={bgRef} className="m38-bigtext__bg" src={image} alt={imageAlt} />
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

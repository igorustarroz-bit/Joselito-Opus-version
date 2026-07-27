import './Home.css';

import Hero from '../../modules/Hero/Hero.jsx';
import IntroText from '../../modules/IntroText/IntroText.jsx';
import CardsGallery from '../../modules/CardsGallery/CardsGallery.jsx';
import SectionBanner from '../../modules/SectionBanner/SectionBanner.jsx';
import CardsAccordion from '../../modules/CardsAccordion/CardsAccordion.jsx';
import CardsProductCarousel from '../../modules/CardsProductCarousel/CardsProductCarousel.jsx';
import CardsShowcase from '../../modules/CardsShowcase/CardsShowcase.jsx';
import CardsCategories from '../../modules/CardsCategories/CardsCategories.jsx';
import Footer from '../../modules/Footer/Footer.jsx';
import heroImg from '../../assets/images/tpl-home-hero.webp';

/**
 * Page Template — Home. Máster Figma: página "↳ Home 🟢" (58080:18441),
 * frame desktop `58196:24000` (1440×9614) y mobile `58153:29609` (390×8605).
 *
 * COMPOSICIÓN (de arriba abajo, tal cual el máster):
 *   1. Hero / Homepage hero  ...... instancia de módulo (Navigation + copy + Toast, subtema oscuro propio)
 *   2. Content / Intro text  ...... instancia de módulo (Light-White)
 *   3. Title + 3 fichas      ...... ⚠️ sección a medida del máster → mapeada a `CardsGallery`
 *   4. Banners / Section banner ... instancia de módulo (Light-White)
 *   5. Banda "Reserva·Vintage·Millésime" ⚠️ sección a medida → mapeada a `CardsAccordion` (Dark-Red-Primary)
 *   6. Carrusel de expertos  ...... ⚠️ sección a medida → mapeada a `CardsProductCarousel` (Dark-Black-Neutral)
 *   7. Cards / Accordion     ...... instancia de módulo (Dark-Black-Neutral, banda tipográfica)
 *   8. Cards / Showcase      ...... instancia de módulo (Light-White)
 *   9. Banners / Section banner ... instancia de módulo (Light-White)
 *  10. Cards / Categories    ...... instancia de módulo (Light-White, feed social)
 *  11. Navigation / Footer   ...... instancia de módulo
 *
 * Nota de mapeo (Instrucciones §13, decisión del equipo 2026-07-27): el máster de
 * Home incluye 3 franjas construidas a medida en Figma (no son instancias de un
 * módulo guardado). Por decisión del equipo, el template las compone con el módulo
 * más cercano (marcadas ⚠️ arriba) en lugar de replicarlas pixel-perfect. Son
 * aproximaciones conocidas, pendientes de revisión visual en Pages.
 *
 * Subtemas: cada módulo pinta su propio `background: var(--bg-base)` y hereda el
 * subtema del contenedor. Las franjas oscuras/rojas se fuerzan con la prop `theme`
 * (SectionBanner/CardsAccordion la exponen) o envolviéndolas en `data-theme`
 * (CardsProductCarousel no la expone). El resto quedan en Light-White (default).
 */
export default function Home({ className = '', ...rest }) {
  return (
    <div className={`jl-tmpl-home ${className}`.trim()} {...rest}>
      {/* 1 — Hero (subtema oscuro autogestionado por el propio módulo) */}
      <Hero image={heroImg} />

      {/* 2 — Intro text */}
      <IntroText />

      {/* 3 — ⚠️ Title + 3 fichas → CardsGallery */}
      <CardsGallery />

      {/* 4 — Section banner */}
      <SectionBanner />

      {/* 5 — ⚠️ Banda "Reserva·Vintage·Millésime" → CardsAccordion en rojo de marca */}
      <CardsAccordion theme="dark-red-primary" />

      {/* 6 — ⚠️ Carrusel de expertos → CardsProductCarousel sobre fondo oscuro */}
      <div data-theme="dark-black-neutral">
        <CardsProductCarousel />
      </div>

      {/* 7 — Cards / Accordion (banda tipográfica, subtema oscuro) */}
      <CardsAccordion theme="dark-black-neutral" />

      {/* 8 — Cards / Showcase */}
      <CardsShowcase />

      {/* 9 — Section banner (2ª aparición) */}
      <SectionBanner />

      {/* 10 — Cards / Categories (feed social) */}
      <CardsCategories />

      {/* 11 — Footer */}
      <Footer />
    </div>
  );
}

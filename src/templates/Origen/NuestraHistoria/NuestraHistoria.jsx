import './NuestraHistoria.css';

import Navigation from '../../../modules/Navigation/Navigation.jsx';
import SectionHero from '../../../modules/SectionHero/SectionHero.jsx';
import IntroText from '../../../modules/IntroText/IntroText.jsx';
import ContentTextImage from '../../../modules/ContentTextImage/ContentTextImage.jsx';
import Timeline from '../../../modules/Timeline/Timeline.jsx';
import SectionBanner from '../../../modules/SectionBanner/SectionBanner.jsx';
import Footer from '../../../modules/Footer/Footer.jsx';
import heroImg from '../../../assets/images/tpl-nh-hero.webp';

/**
 * Page Template — Origen · Nuestra Historia.
 * Máster Figma: página "↳ Origen…" (58080:16503), frame desktop `58367:40833`
 * (1440×6241) y mobile `58367:41051` (390×5516).
 *
 * COMPOSICIÓN (de arriba abajo, todas instancias de módulos ya construidos —
 * sin secciones a medida):
 *   1. Navigation ................. header (subtema claro)
 *   2. Hero / Section hero ........ variante `full-bleed`, título sobre imagen (claro)
 *   3. Content / Intro text ....... intro centrado (claro)
 *   4. Content / Text + Image ..... `type="right"` (texto izq · imagen der) (claro)
 *   5. List / Timeline ............ banda con año destacado + foto horizontal (Dark-Red-Primary)
 *   6. Content / Text + Image ..... `type="left"` (imagen izq · texto der) (claro)
 *   7. Banners / Section banner ... imagen a sangre + tarjeta (claro)
 *   8. Navigation / Footer ........ footer
 *
 * Subtemas: los módulos heredan Light-White salvo el Timeline, que se fuerza a
 * `dark-red-primary` con su prop `theme` (banda roja con foto). El contenido
 * proviene de los defaults de cada módulo (cableados desde sus propios másters).
 */
export default function NuestraHistoria({ className = '', ...rest }) {
  return (
    <div className={`jl-tmpl-historia ${className}`.trim()} {...rest}>
      {/* 1 — Navigation */}
      <Navigation />

      {/* 2 — Section hero (full-bleed) */}
      <SectionHero image={heroImg} />

      {/* 3 — Intro text */}
      <IntroText />

      {/* 4 — Text + Image: texto izquierda, imagen derecha */}
      <ContentTextImage type="right" />

      {/* 5 — Timeline (banda roja con foto horizontal) */}
      <Timeline theme="dark-red-primary" />

      {/* 6 — Text + Image: imagen izquierda, texto derecha */}
      <ContentTextImage type="left" />

      {/* 7 — Section banner */}
      <SectionBanner />

      {/* 8 — Footer */}
      <Footer />
    </div>
  );
}

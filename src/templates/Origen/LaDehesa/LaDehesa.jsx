import './LaDehesa.css';

import Navigation from '../../../modules/Navigation/Navigation.jsx';
import SectionHero from '../../../modules/SectionHero/SectionHero.jsx';
import ContentImageOnly from '../../../modules/ContentImageOnly/ContentImageOnly.jsx';
import IntroText from '../../../modules/IntroText/IntroText.jsx';
import CardsCategories from '../../../modules/CardsCategories/CardsCategories.jsx';
import Footer from '../../../modules/Footer/Footer.jsx';
import heroImg from '../../../assets/images/tpl-dehesa-hero.webp';
import io1Img from '../../../assets/images/tpl-dehesa-io1.webp';
import io2Img from '../../../assets/images/tpl-dehesa-io2.webp';

/**
 * Page Template — Origen · La Dehesa.
 * Máster Figma: página "↳ Origen…" (58080:16503), frame desktop `58443:45016`
 * (1440×6564) y mobile `58443:45028` (390×6094).
 *
 * COMPOSICIÓN (de arriba abajo):
 *   1. Navigation .................. header (subtema claro)
 *   2. Hero / Section hero ......... variante `small-image` (título + imagen pequeña) (claro)
 *   3. Content / Image only ........ 1 imagen a sangre (claro)
 *   4. Content / Intro text ........ intro centrado (claro)
 *   5. Imagen grande + card ⚠️ ...... sección a medida → mapeada a `ContentImageOnly count={2}`
 *   6. Content / Intro text ........ intro centrado (claro)
 *   7. Content / Image only ........ 1 imagen a sangre con botón de vídeo (claro)
 *   8. Feed social ⚠️ .............. sección a medida → mapeada a `CardsCategories` (instagram)
 *   9. Navigation / Footer ......... footer
 *
 * Nota de mapeo (decisión del equipo, Instrucciones §13): el máster incluye 2 franjas
 * a medida (marcadas ⚠️) que no son instancias de un módulo guardado. Se componen con
 * el módulo más cercano en vez de replicarlas pixel-perfect. Aproximaciones conocidas,
 * pendientes de revisión visual en Pages.
 *
 * Subtemas: toda la página va en Light-White; los módulos heredan el subtema del
 * contenedor. El contenido proviene de los defaults de cada módulo.
 */
export default function LaDehesa({ className = '', ...rest }) {
  return (
    <div className={`jl-tmpl-dehesa ${className}`.trim()} {...rest}>
      {/* 1 — Navigation */}
      <Navigation />

      {/* 2 — Section hero (small image) */}
      <SectionHero layout="small-image" image={heroImg} />

      {/* 3 — Image only (1 imagen a sangre) */}
      <ContentImageOnly count={1} image={io1Img} />

      {/* 4 — Intro text */}
      <IntroText />

      {/* 5 — ⚠️ Imagen grande + card pequeña → ContentImageOnly (2 imágenes) */}
      <ContentImageOnly count={2} />

      {/* 6 — Intro text (2ª aparición) */}
      <IntroText />

      {/* 7 — Image only con botón de vídeo */}
      <ContentImageOnly count={1} video image={io2Img} />

      {/* 8 — ⚠️ Feed social → CardsCategories (variante instagram) */}
      <CardsCategories variant="instagram" />

      {/* 9 — Footer */}
      <Footer />
    </div>
  );
}

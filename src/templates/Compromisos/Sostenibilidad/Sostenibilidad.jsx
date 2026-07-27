import './Sostenibilidad.css';

import Navigation from '../../../modules/Navigation/Navigation.jsx';
import SectionHero from '../../../modules/SectionHero/SectionHero.jsx';
import ContentImageOnly from '../../../modules/ContentImageOnly/ContentImageOnly.jsx';
import IntroText from '../../../modules/IntroText/IntroText.jsx';
import ListNumbers from '../../../modules/ListNumbers/ListNumbers.jsx';
import ContentTextImage from '../../../modules/ContentTextImage/ContentTextImage.jsx';
import CardsShowcase from '../../../modules/CardsShowcase/CardsShowcase.jsx';
import Footer from '../../../modules/Footer/Footer.jsx';

/**
 * Page Template — Compromisos · Sostenibilidad.
 * Máster Figma: página "↳ Compromisos…" (58080:18443), versión más a la izquierda:
 * desktop `58590:81784` (1440×5989) y mobile `58512:66756` (390×6510).
 *
 * COMPOSICIÓN (de arriba abajo, todas instancias de módulos):
 *   1. Navigation ................. header (claro)
 *   2. Hero / Section hero ........ `layout="small-image"` (claro)
 *   3. Content / Image only ....... 1 imagen a sangre (claro)
 *   4. Content / Intro text ....... intro centrado (claro)
 *   5. List / Numbers ............. cifras destacadas (claro)
 *   6. Content / Text + Image ..... `type="left"` con label, sin CTA (claro)
 *   7. Content / Text + Image ..... `type="right"` con label, sin CTA (claro)
 *   8. Cards / Showcase ........... `type="many"` (claro)
 *   9. Navigation / Footer ........ footer
 *
 * Toda la página en Light-White. Contenido por defecto de cada módulo (ilustrativo).
 */
export default function Sostenibilidad({ className = '', ...rest }) {
  return (
    <div className={`jl-tmpl-sostenibilidad ${className}`.trim()} {...rest}>
      <Navigation />
      <SectionHero layout="small-image" />
      <ContentImageOnly count={1} />
      <IntroText />
      <ListNumbers />
      <ContentTextImage type="left" cta={null} />
      <ContentTextImage type="right" cta={null} />
      <CardsShowcase type="many" />
      <Footer />
    </div>
  );
}

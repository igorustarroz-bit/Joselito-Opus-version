import './HappyPigs.css';

import Navigation from '../../../modules/Navigation/Navigation.jsx';
import SectionHero from '../../../modules/SectionHero/SectionHero.jsx';
import ContentTextImage from '../../../modules/ContentTextImage/ContentTextImage.jsx';
import CardsShowcase from '../../../modules/CardsShowcase/CardsShowcase.jsx';
import Footer from '../../../modules/Footer/Footer.jsx';
import heroImg from '../../../assets/images/tpl-happypigs-hero.webp';

/**
 * Page Template — Compromisos · Happy Pigs.
 * Máster Figma: página "↳ Compromisos…" (58080:18443), versión más a la izquierda:
 * desktop `58512:66765` (1440×5081) y mobile `58512:66773` (390×4604).
 *
 * COMPOSICIÓN (de arriba abajo, todas instancias de módulos):
 *   1. Navigation ................. header (claro)
 *   2. Hero / Section hero ........ `layout="full-bleed"` (claro)
 *   3. Content / Text + Image ..... `type="right"`, sin label ni CTA (claro)
 *   4. Content / Text + Image ..... `type="left"`, sin label ni CTA (claro)
 *   5. Content / Text + Image ..... `type="right"`, sin label ni CTA (claro)
 *   6. Cards / Showcase ........... `type="many"` (claro)
 *   7. Navigation / Footer ........ footer
 *
 * Toda la página en Light-White. Contenido por defecto de cada módulo (ilustrativo).
 */
export default function HappyPigs({ className = '', ...rest }) {
  return (
    <div className={`jl-tmpl-happypigs ${className}`.trim()} {...rest}>
      <Navigation />
      <SectionHero layout="full-bleed" image={heroImg} />
      <ContentTextImage type="right" label={null} cta={null} />
      <ContentTextImage type="left" label={null} cta={null} />
      <ContentTextImage type="right" label={null} cta={null} />
      <CardsShowcase type="many" />
      <Footer />
    </div>
  );
}

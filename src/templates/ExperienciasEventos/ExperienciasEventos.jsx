import './ExperienciasEventos.css';

import Navigation from '../../modules/Navigation/Navigation.jsx';
import SectionHero from '../../modules/SectionHero/SectionHero.jsx';
import ContentTextImage from '../../modules/ContentTextImage/ContentTextImage.jsx';
import IntroText from '../../modules/IntroText/IntroText.jsx';
import CardsShowcase from '../../modules/CardsShowcase/CardsShowcase.jsx';
import Footer from '../../modules/Footer/Footer.jsx';
import heroImg from '../../assets/images/tpl-exp-hero.webp';

/**
 * Page Template — Experiencias y eventos.
 * Máster Figma: página "↳ Experiencias y eventos 🟢" (58080:26824), versión más a la
 * izquierda: desktop `58509:40298` (1440×6335) y mobile `58509:40307` (390×6085).
 *
 * COMPOSICIÓN (de arriba abajo):
 *   1. Navigation ................. header (claro)
 *   2. Hero / Section hero ........ `layout="full-bleed"` (claro)
 *   3. Content / Text + Image ..... `type="right"` con CTA (Eventos y bodas) (claro)
 *   4. Content / Text + Image ..... `type="left"` con CTA (Cotos y maridajes) (claro)
 *   5. Content / Text + Image ..... `type="right"` con CTA (Alianzas culinarias) (claro)
 *   6. Content / Intro text ....... intro centrado (claro)
 *   7. Cards / Showcase ........... `type="many"` (claro)
 *   8. Navigation / Footer ........ footer
 *
 * Toda la página en Light-White.
 *
 * Nota (Instrucciones §13): en el máster las 3 franjas Text+Image usan una imagen en
 * formato retrato (~3:4) y un botón tamaño M; el módulo `ContentTextImage` (left/right)
 * renderiza la imagen 4:3 y un botón `secondary` S. Diferencia conocida de la variante,
 * anotada; el resto (estructura, orden, textos) coincide.
 */
export default function ExperienciasEventos({ className = '', ...rest }) {
  return (
    <div className={`jl-tmpl-experiencias ${className}`.trim()} {...rest}>
      <Navigation />
      <SectionHero layout="full-bleed" image={heroImg} />
      <ContentTextImage type="right" label={null} />
      <ContentTextImage type="left" label={null} />
      <ContentTextImage type="right" label={null} />
      <IntroText />
      <CardsShowcase type="many" />
      <Footer />
    </div>
  );
}

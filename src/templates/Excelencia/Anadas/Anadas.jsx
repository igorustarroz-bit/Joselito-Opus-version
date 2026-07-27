import './Anadas.css';

import Navigation from '../../../modules/Navigation/Navigation.jsx';
import SectionHero from '../../../modules/SectionHero/SectionHero.jsx';
import IntroText from '../../../modules/IntroText/IntroText.jsx';
import ProductAccordion from '../../../modules/ProductAccordion/ProductAccordion.jsx';
import ContentTextImage from '../../../modules/ContentTextImage/ContentTextImage.jsx';
import Timeline from '../../../modules/Timeline/Timeline.jsx';
import CardsShowcase from '../../../modules/CardsShowcase/CardsShowcase.jsx';
import Footer from '../../../modules/Footer/Footer.jsx';

/**
 * Page Template — Excelencia · Añadas.
 * Máster Figma: página "↳ Excelencia…" (58080:18442). Se usa la versión más a la
 * izquierda del grupo Añadas: frame desktop `58590:82913` (1440×6971) y su mobile
 * `58479:62962` (390×6407). (La página está 🟠 en progreso en Figma con varias
 * iteraciones; por indicación del equipo se toma siempre la de más a la izquierda.)
 *
 * COMPOSICIÓN (de arriba abajo):
 *   1. Navigation ................. header (claro)
 *   2. Hero / Section hero ........ `layout="full-bleed"` (claro)
 *   3. Content / Intro text ....... intro centrado (claro)
 *   4. Cards / Accordion .......... acordeón de producto (ProductAccordion) · Dark-Black-Neutral
 *   5. Content / Text + Image ..... `type="right"`, sin label ni CTA (claro)
 *   6. Content / Text + Image ⚠️ ... `type="left"`, sin label ni CTA, sobre Dark-Red-Primary
 *   7. List / Timeline ............ `image="none"`, Dark-Black-Neutral
 *   8. Cards / Showcase ........... `type="many"` (claro)
 *   9. Navigation / Footer ........ footer
 *
 * Notas de mapeo (decisión del equipo, Instrucciones §13):
 *  - Franja 4: acordeón de producto real (variante `Type="Accordion"` del máster
 *    `58512:9289`), ya construido como módulo `ProductAccordion`.
 *  - Franja 6: sección construida a medida en el máster (imagen izq + texto der sobre
 *    fondo rojo); se compone con `ContentTextImage type="left"` envuelto en
 *    `data-theme="dark-red-primary"`. `ContentTextImage` no expone prop `theme`, por eso
 *    el wrapper.
 */
export default function Anadas({ className = '', ...rest }) {
  return (
    <div className={`jl-tmpl-anadas ${className}`.trim()} {...rest}>
      {/* 1 — Navigation */}
      <Navigation />

      {/* 2 — Section hero (full-bleed) */}
      <SectionHero layout="full-bleed" />

      {/* 3 — Intro text */}
      <IntroText />

      {/* 4 — Cards / Accordion (acordeón de producto real, subtema oscuro) */}
      <ProductAccordion theme="dark-black-neutral" />

      {/* 5 — Text + Image: imagen derecha, sin label ni CTA */}
      <ContentTextImage type="right" label={null} cta={null} />

      {/* 6 — ⚠️ Text + Image: imagen izquierda, texto derecha, sobre fondo rojo */}
      <div data-theme="dark-red-primary">
        <ContentTextImage type="left" label={null} cta={null} />
      </div>

      {/* 7 — Timeline sin imagen, subtema oscuro */}
      <Timeline image="none" theme="dark-black-neutral" />

      {/* 8 — Cards / Showcase */}
      <CardsShowcase type="many" />

      {/* 9 — Footer */}
      <Footer />
    </div>
  );
}

import './Curacion.css';

import Navigation from '../../../modules/Navigation/Navigation.jsx';
import SectionHero from '../../../modules/SectionHero/SectionHero.jsx';
import IntroText from '../../../modules/IntroText/IntroText.jsx';
import ContentStack from '../../../modules/ContentStack/ContentStack.jsx';
import CardsShowcase from '../../../modules/CardsShowcase/CardsShowcase.jsx';
import Footer from '../../../modules/Footer/Footer.jsx';

/**
 * Page Template — Excelencia · Curación.
 * Máster Figma: página "↳ Excelencia…" (58080:18442), versión más a la izquierda del
 * grupo Curación: desktop `58479:64263` (1440×4884) y mobile `58479:64777`.
 *
 * COMPOSICIÓN (de arriba abajo, todas instancias de módulos):
 *   1. Navigation ................. header (claro)
 *   2. Hero / Section hero ........ `layout="full-bleed"` (claro)
 *   3. Content / Intro text ....... intro centrado (claro)
 *   4. Content Stack .............. acordeón de 5 pasos (Salazón abierto + colapsados) (claro)
 *   5. Cards / Showcase ........... `type="many"` (claro)
 *   6. Navigation / Footer ........ footer
 *
 * Toda la página en Light-White. El contenido del acordeón usa los defaults del módulo
 * `ContentStack` (ilustrativos); en el máster las imágenes de las filas son placeholders.
 */
export default function Curacion({ className = '', ...rest }) {
  return (
    <div className={`jl-tmpl-curacion ${className}`.trim()} {...rest}>
      {/* 1 — Navigation */}
      <Navigation />

      {/* 2 — Section hero (full-bleed) */}
      <SectionHero layout="full-bleed" />

      {/* 3 — Intro text */}
      <IntroText />

      {/* 4 — Content Stack (acordeón de pasos de curación) */}
      <ContentStack />

      {/* 5 — Cards / Showcase */}
      <CardsShowcase type="many" />

      {/* 6 — Footer */}
      <Footer />
    </div>
  );
}

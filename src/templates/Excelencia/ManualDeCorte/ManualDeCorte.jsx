import './ManualDeCorte.css';

import Navigation from '../../../modules/Navigation/Navigation.jsx';
import SectionHero from '../../../modules/SectionHero/SectionHero.jsx';
import SecondaryMenu from '../../../modules/SecondaryMenu/SecondaryMenu.jsx';
import IntroText from '../../../modules/IntroText/IntroText.jsx';
import ContentStack from '../../../modules/ContentStack/ContentStack.jsx';
import PreviousNext from '../../../modules/PreviousNext/PreviousNext.jsx';
import CardsShowcase from '../../../modules/CardsShowcase/CardsShowcase.jsx';
import Footer from '../../../modules/Footer/Footer.jsx';

/**
 * Page Template — Excelencia · Manual de Corte.
 * Máster Figma: página "↳ Excelencia…" (58080:18442), versión más a la izquierda del
 * grupo Manual de Corte: desktop `58479:69902` (1440×4682) y mobile `58479:70412`.
 *
 * COMPOSICIÓN (de arriba abajo):
 *   1. Navigation ................. header (claro)
 *   2. Hero / Section hero ........ `layout="small-image"` (claro)
 *   3. Fila de navegación ⚠️ ....... sección a medida → mapeada a `SecondaryMenu`
 *   4. Content / Intro text ....... intro centrado (claro)
 *   5. Content Stack .............. acordeón de pasos (2ª fila abierta) (claro)
 *   6. Navigation / PreviousNext .. anterior / siguiente (claro)
 *   7. Cards / Showcase ........... `type="many"` (claro)
 *   8. Navigation / Footer ........ footer
 *
 * Toda la página en Light-White.
 *
 * Nota de mapeo (decisión del equipo, Instrucciones §13): la franja 3 es una fila de
 * enlaces construida a medida en el máster (no es instancia de un módulo guardado); se
 * aproxima con `SecondaryMenu` (fila de categorías con activo subrayado).
 */
export default function ManualDeCorte({ className = '', ...rest }) {
  return (
    <div className={`jl-tmpl-manualcorte ${className}`.trim()} {...rest}>
      {/* 1 — Navigation */}
      <Navigation />

      {/* 2 — Section hero (small image) */}
      <SectionHero layout="small-image" />

      {/* 3 — ⚠️ Fila de navegación → SecondaryMenu */}
      <SecondaryMenu />

      {/* 4 — Intro text */}
      <IntroText />

      {/* 5 — Content Stack (2ª fila abierta) */}
      <ContentStack defaultActive={1} />

      {/* 6 — Previous / Next */}
      <PreviousNext />

      {/* 7 — Cards / Showcase */}
      <CardsShowcase type="many" />

      {/* 8 — Footer */}
      <Footer />
    </div>
  );
}

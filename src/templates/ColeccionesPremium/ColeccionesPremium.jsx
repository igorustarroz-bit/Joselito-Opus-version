import './ColeccionesPremium.css';

import Navigation from '../../modules/Navigation/Navigation.jsx';
import SectionHero from '../../modules/SectionHero/SectionHero.jsx';
import IntroText from '../../modules/IntroText/IntroText.jsx';
import List from '../../modules/List/List.jsx';
import CardsShowcase from '../../modules/CardsShowcase/CardsShowcase.jsx';
import Footer from '../../modules/Footer/Footer.jsx';

/**
 * Page Template — Colecciones Premium.
 * Máster Figma: página "↳ Colecciones Premium 🟢" (58080:28565), versión más a la
 * izquierda: desktop `58508:36015` (1440×4909) y mobile `58508:36047` (390×4737).
 *
 * COMPOSICIÓN (de arriba abajo):
 *   1. Navigation ................. header (claro)
 *   2. Hero / Section hero ........ `layout="full-bleed"` (claro)
 *   3. Content / Intro text ....... intro centrado (claro)
 *   4. Índice de colecciones ⚠️ .... sección a medida → mapeada a `List`
 *   5. Cards / Showcase ........... `type="many"` (claro)
 *   6. Navigation / Footer ........ footer
 *
 * Toda la página en Light-White.
 *
 * Nota de mapeo (decisión del equipo, Instrucciones §13): la franja 4 es un índice
 * art-directed (Title + lista tipográfica de ~12 nombres de colección con 2 imágenes
 * flotantes) construido a medida en el máster; se aproxima con el módulo `List`
 * (título + ítems). Aproximación conocida, pendiente de revisión visual en Pages.
 */
export default function ColeccionesPremium({ className = '', ...rest }) {
  return (
    <div className={`jl-tmpl-colecciones ${className}`.trim()} {...rest}>
      <Navigation />
      <SectionHero layout="full-bleed" />
      <IntroText />
      {/* ⚠️ Índice de colecciones a medida → List */}
      <List />
      <CardsShowcase type="many" />
      <Footer />
    </div>
  );
}

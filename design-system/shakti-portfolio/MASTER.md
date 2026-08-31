# Shakti Portfolio — Design System

## Thesis

An engineering field journal: editorial enough to feel authored, technical enough to feel credible, and built around evidence rather than generic résumé cards.

## Content hierarchy

1. Current role and positioning
2. Deployed products with real interfaces
3. Engineering systems with architecture evidence
4. Working principles
5. Employment and education
6. Toolkit, achievements, and direct contact

## Visual language

- Near-black field (`#0B0C0A`) with subtle drafting-grid lines.
- Paper white (`#F2F1E8`) for primary text; muted olive-grey (`#A6AA9E`) for supporting copy.
- Signal colors have roles: lime for action/current state, cyan for system evidence, ember for product/release state.
- Use borders and open space for grouping. Avoid glass cards, gradients as decoration, fake terminal windows, and skill-percentage meters.
- Large product screenshots are evidence, not decoration.

## Typography

- Display: Newsreader with Georgia fallback. Use for the hero and section/project headings.
- Body/UI: variable Inter with Segoe UI and Arial fallbacks.
- Base body size: 17px desktop, 16px narrow mobile; line-height 1.6 or greater.
- Prose measure: 55–70 characters. Use fluid heading sizes and balanced wrapping.
- Labels use the body face at small sizes with uppercase tracking; never use small muted text for essential information.

## Interaction and 3D

- The hero constellation represents connected software boundaries; it is not a full-page background.
- Use BufferGeometry points, fewer than 200 particles, DPR capped at 1.4, and no animation under reduced motion.
- Core content must remain complete when WebGL, JavaScript, remote sites, or animation fail.
- Motion is limited to subtle pointer response, image scale, and control feedback. No scroll hijacking or hidden-before-scroll content.

## Accessibility and responsive rules

- WCAG 2.2 AA contrast, semantic section/heading order, visible focus, and a skip link.
- Frequent controls are at least 44px tall; links do not depend on hover.
- Test at 375px, 768px, 1024px, and 1440px, plus 200% text zoom and reduced motion.
- Product layouts stack in reading order. Do not remove essential content on narrow screens.
- External claims must be traceable to a live product, repository, user-provided employment fact, or résumé evidence.

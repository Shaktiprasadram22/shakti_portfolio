---
name: Shakti Prasad Ram Portfolio
description: A hand-painted software release hoarding for public products, systems, and engineering proof.
conceptSeed: 27f331d9
direction: Painted Release Hoarding
---

# Design system

## Creative north star

The portfolio behaves like a painted theatrical release hoarding. Shakti is introduced through a diagonal “system blade”; each shipped product is a full-width act; architecture is exposed as fight choreography; experience becomes billing; and the close reads like a final title card. The direction is expressive, but every metric, link, role, and system claim remains literal and inspectable.

## Visual language

- Cinnabar `#A73228`: release fields, calls to action, seals, and active states.
- Bleached sky `#F3ECE1`: the principal paper and reading ground.
- Aged paper `#E5DBC6`: secondary physical surface.
- Ink wash `#2B2B2B`: type, architecture, and the closing contrast field.
- Brush gold `#D4AF37`: blade edges, proof, and authored highlights.
- Stone mist `#C7C1B6` and mountain haze `#8E948E`: scenery and secondary copy.

Dry polygonal brush strokes, imperfect rotations, registration lines, painted seals, ink mountains, and flat poster billing create the world. There are no generic rounded cards, glass panels, gradient type, or terminal cosplay.

## Typography

Knewave is the display voice. It appears only in hero language, release names, major section statements, seals, and selected system names. Barlow carries all narrative, controls, labels, data, and proof. Display type is capped at `6rem`; body copy stays at 16px or larger with short measures. Two font families are the hard maximum.

## Layout and story

Desktop uses a fixed 92px ink title rail. The first viewport pairs an oversized brush statement with the progressive 3D blade and ends in a cinnabar factual billing band. The three public products receive individual poster acts instead of equal-size cards. A GitHub “wanted wall” then lets visitors switch among five repositories and inspect each architecture flow, stack, and repository evidence; Northstar’s feature-flag platform leads the slate. The deeper architecture section uses a second ARIA tab choreography board, followed by four method movements, an employment/education billing record, a technique ledger, and a cinnabar contact title card.

At 900px the rail becomes a top bar and all content returns to a single reading axis. At 680px the top bar becomes two rows, WebGL is not requested, release layouts stack, and every proof/link remains present. Native page scrolling is never pinned, hijacked, or tied to scene animation.

## Spatial artifact and motion

The diagonal software blade is the only genuine 3D object. Its three selectable disciplines are Releases, Systems, and Proof. React Three Fiber runs with `frameloop="demand"`, desktop DPR is capped at 1.2, and pointer drag only invalidates frames while the damped transform is settling. Touch drag is ignored so vertical scrolling stays native. Mobile, reduced-motion, and unavailable-WebGL contexts receive the complete CSS blade composition and semantic controls.

The only authored content transition is the short architecture-panel reveal. `prefers-reduced-motion` removes it, disables smooth behavior, and prevents the WebGL bundle from being requested.

## Interaction and accessibility

All actions have at least a 44px target. The GitHub archive and systems selector are ARIA tablists with Arrow, Home, and End support. Focus is high-contrast. The blade controls use ordinary buttons, `aria-pressed`, and a polite live description. Product images have descriptive alt text; decorative landscape and title lettering are hidden from assistive technology.

## Raster provenance

No generated or reference imagery ships in the interface. The three shipping rasters are first-party captures of the named public releases and are labeled as such beside the image:

- `public/work/pdfforfree.png` — captured from `https://pdfforfree.in`.
- `public/work/gocalculator.png` — captured from `https://gocalculator.in`.
- `public/work/myarcade.png` — captured from `https://myarcade.in`.

Ink landscapes, seals, brush marks, and the blade are code-native SVG, CSS, and Three.js geometry. The downloaded Wuxia board and hero remain inside `.impeccable/mocks/reference/` as non-shipping quality references.

## Finish verdict

Reviewed in Firefox at desktop and mobile dimensions. Result: zero Axe violations, no horizontal overflow from 320px through 1440px, keyboard tab behavior confirmed, reduced-motion fallback confirmed, and no long tasks during wheel scrolling. All project tests and lint pass.

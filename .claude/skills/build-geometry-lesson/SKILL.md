---
name: build-geometry-lesson
description: Build (or extend) a kid-friendly interactive geometry lesson page for the shreshta site under Mathematics/geometry/, following the established design system and a hard-won verification checklist. Use when adding a new geometry topic (e.g. symmetry, congruence, perimeter & area, constructions) or extending an existing lesson page with a new section.
---

# Build Geometry Lesson

You are building (or extending) one page in an ongoing kid-friendly (~10 year old) interactive
geometry mini-site: a static HTML/CSS/JS site, no frameworks, no build step, at repo
`C:\Users\ADMIN\Documents\GitHub\shreshta`. Existing topic pages live under `Mathematics/geometry/`
(e.g. `lines-and-relationships/`, `angles-explained/`, `angle-pairs/`, `triangles/`, `circles/`,
`quadrilaterals/`, `polygons/`, `three-d-shapes/`), each a single self-contained `index.html`.

## Args

`args` may contain: a topic name (e.g. "Symmetry", "Congruence", "Perimeter & Area"), a bullet-list
content outline (definitions/subtopics to cover), and optionally a note on what's already covered
elsewhere (so you don't duplicate another page's content) or what to explicitly defer. If args is
empty or vague, ask the user for the topic name and outline before proceeding — don't guess scope.

## Step 0: study conventions before writing anything

Read `Mathematics/geometry/triangles/index.html` in full first. Reuse its exact `<style>` block
(CSS variables, `.section`, `.stage`, `.caption`, `.info-box`, `.tabbar`/`.tab-btn`, `.chip`/
`.chip-row`, `.btnrow`, `button.action`, `.realworld`, `.contrast-card`, quiz classes, nav-top
back/home buttons) verbatim as the starting point — do not invent a different visual language.
Reuse its shared JS helpers verbatim where relevant: `svgPoint`, `makeDraggable` (pointer events,
not mouse events), `angleFromPoint`, `pointOnCircle`, `arcPathBetween`, `clamp`, `dist`,
`distToSegment`, `angleAt` (law-of-cosines vertex angle), `pointInTriangle`-style same-side tests.

The mascot ("Ray the Ruler") lives at `Mathematics/geometry/shared/images/mascot.png`, referenced
as `../shared/images/mascot.png` inside `<img onerror="this.remove()">` (graceful emoji fallback
if the file doesn't exist — that's fine, the user generates images separately).

Do **not** reference or copy content/styling from any *other* pre-existing folder unless the user
names it explicitly (this repo has legacy folders, e.g. `angles/`, that predate this design system
and should not be treated as a reference).

## File layout

- `Mathematics/geometry/<topic-slug>/index.html` (+ an `images/` subfolder, even if empty — real-world
  callout images go there, `onerror` fallback covers the case they're never generated)
- If the slug you want is already taken by an unrelated legacy folder, pick a distinct slug (e.g.
  `angles-explained` when `angles/` was already a practice-game system) and give the hub cards
  clearly distinct titles — flag this naming choice to the user rather than silently overwriting.
- Add a new `.lesson-card` to `Mathematics/geometry/index.html` (the hub) pointing to the new page.
  Never let a delegated agent touch this shared file — wire it up yourself after the page is built
  and verified, to avoid merge conflicts across parallel work.

## Content scoping

- 5-7 focused sections, one concept per section (don't cram multiple definitions into a single
  dense paragraph — if a section covers two related-but-distinct ideas, e.g. "Regular vs Irregular"
  AND "Convex vs Concave", give each its own clearly labeled definition box before the interactive
  content, not one run-on sentence).
- End with a quiz: 6-11 questions depending on how much ground the page covers, using the exact
  quiz JS/CSS pattern from `triangles/index.html` (scoring badge, explain box on answer, "Play
  Again" flow at the end).
- An orange `.info-box` "🔮 Coming soon" callout is the established pattern for explicitly deferring
  a subtopic to a future page — use it rather than silently dropping something the user mentioned.
- A teal `.info-box` "Recap" callout near the end is the established pattern for a one-paragraph
  summary of the whole page.

## Interactivity patterns already proven on this site

- **Drag-a-point widget**: SVG + `makeDraggable`, live caption/label updates, snapping to "nice"
  values (right angles, equal lengths) within a small tolerance so exact states feel reachable.
- **Click-detective**: click anywhere on a fixed diagram, get told which region (interior/exterior/
  boundary) you landed in, with a Reset button so a child can try repeatedly.
- **Tabbed "Explore" widget**: one shared draggable shape, multiple tabs each showing a different
  lens on the *same* live geometry (e.g. triangles' Classify / Angle Sum / Exterior Angle /
  Perimeter tabs driven by one draggable vertex) — cheaper and more cohesive than separate widgets
  per concept when the concepts share the same underlying shape.
- **Contrast galleries**: side-by-side ✅/❌ pairs (adjacent vs not-adjacent, regular vs irregular,
  simple vs self-intersecting) generated from real coordinates via shared helpers, not hand-guessed
  SVG paths — a "why" caption under each card should name the specific reason, not just a label.
- **"Add one more" widgets**: a button that incrementally adds rays/rings/sides (concurrent lines,
  concentric circles, an n-gon builder) with live-updating counts/formulas and a Reset button.
- **CSS 3D rotating solids**: see the dedicated subsection below — this one has extra failure modes.

## The verification checklist — non-negotiable, run every item

This codebase has a real track record of hand-authored SVG/JS/CSS bugs that looked fine on paper.
Do not skip any of these, and do not just eyeball the math — script the checks.

1. **Syntax-check the actual script** before calling anything done:
   ```
   node -e "
   const fs = require('fs');
   const html = fs.readFileSync('PATH_TO_FILE','utf8');
   const m = html.match(/<script>([\s\S]*)<\/script>/);
   try { new Function(m[1]); console.log('JS parses OK'); }
   catch(e) { console.log('JS SYNTAX ERROR:', e.message); }
   "
   ```
   A single raw ASCII apostrophe inside a single-quoted JS string (e.g. `'that's a...'`) is a
   syntax error that silently breaks *every* widget on the page, not just the one string. Use
   template literals (backticks), a typographic `'` (U+2019), or just avoid the contraction.
2. **Duplicate IDs**: `grep -o 'id="[^"]*"' PATH | sort | uniq -c | sort -rn | head -10` — every
   count must be 1.
3. **Tag balance**: for `section`, `svg`, `div`, `g` (and `table`/`tr` if used), open-count must
   equal close-count.
4. **Numeric drag-range sweep** — for every draggable widget, write a small Node script that walks
   the *entire* reachable range (not just the rest position) and asserts every computed label/
   handle/arc position stays inside that SVG's `viewBox`. This is the single most common bug class
   here: an angle swinging past 90°/180° routinely pushes a coordinate negative or past the far
   edge, clipping the element. Caught repeatedly: an adjacent-angles arm swinging to negative x at
   its max angle; a supplementary-angle dial clipped at exactly 90°; a triangle vertex placed too
   close to a canvas edge.
5. **Diff hardcoded markup against JS constants** representing the same point — a static decorative
   line or label can silently drift out of sync with the JS geometry it's supposed to align with
   (found once: a dashed side-extension line drawn 20px short of the vertex it extends from).
6. **Multi-shape/multi-vertex sweeps for polygons**: if the page has an n-gon builder or similar,
   verify the governing formulas by hand for a few small n (e.g. diagonal count `n(n-3)/2` and
   interior angle sum `(n-2)×180°` for n=4,5,6) before trusting the live display.

### Extra checks specific to CSS 3D rotating solids

If the topic needs actual 3D solids (as opposed to flat SVG diagrams), expect this to be
meaningfully harder than the 2D widgets above:

- A `.scene` wrapper sized exactly to its object gives **zero clearance** for the object's own
  rotation — a spinning cube/cuboid visually projects wider/taller than its resting size at
  diagonal angles and overlaps content below it unless the wrapper viewport is enlarged. Verify by
  simulating the real `rotateX`/`rotateY` + perspective-projection math against every vertex across
  a full 360° sweep, and check the max screen-space extent fits the wrapper's buffer.
- Faces of *different sizes* within one 3D object (a cuboid's side faces vs its top/bottom faces)
  must each be individually centered (`left`/`top` offsets) so their default CSS rotation pivot
  (their own center) lines up with the object's true center — otherwise mismatched-size faces fly
  apart on rotation. A same-size-faced object (a cube) can coincidentally work without this and
  mask the bug.
- For genuinely tilted/arbitrary triangular faces (pyramid/tetrahedron sides, or N-sided cone/
  cylinder approximations), named `rotate()` compositions get intractable fast — instead compute a
  `matrix3d()` per face via a general "map a flat local triangle onto any 3 target 3D points" rigid
  transform, and verify it by simulating the *entire* CSS pipeline (bounding box → clip-path % →
  matrix3d translation) in Node — not just the abstract rotation math.
- Because building 3D solids this way generates DOM elements at runtime rather than static markup,
  **actually execute the extracted script** against a minimal hand-rolled DOM stub
  (`document.createElement`/`getElementById`/`appendChild` returning plain objects with a `.style`
  object and a no-op `addEventListener`/`querySelectorAll`) to catch runtime errors and NaN/
  degenerate face dimensions that a syntax-only check can't see. This repo has no jsdom installed;
  a ~15-20 line stub covering just what the script actually calls is enough.
- A uniformly-shaded sphere looks identical from every angle — there is nothing dishonest about
  *not* building a full rotating mesh for it; a static shaded circle (optionally with a roaming
  highlight for liveliness) plus an honest caption ("it has no separate faces to reveal") is the
  correct choice, not a shortcut.

## Process: build directly, or delegate to parallel agents

Both are valid depending on how much is being added:

- **One topic, or an addition to an existing page**: build it yourself, interactively — this lets
  you catch bugs live rather than in a separate review pass, which has generally produced faster,
  tighter results for single pages.
- **Several independent topics at once**: launch one background Agent per topic (each topic is a
  separate file with no merge conflicts), giving each agent the *entire* content of this skill
  (conventions, content scoping, interactivity patterns, and — critically — the full verification
  checklist) plus `triangles/index.html` as the concrete structural reference to read first. Tell
  each agent explicitly not to touch the shared hub `index.html`. After each agent reports back,
  **independently re-verify its self-report** rather than trusting it: re-run the syntax check
  yourself, grep for duplicate IDs yourself, and spot-check at least one or two of its claimed
  geometry/formula fixes numerically. In practice every agent's self-report has held up under this
  spot-checking so far, but it's still worth doing, and double-check your own prompt's file
  references too (a wrong reference-file pointer in the prompt is a mistake on the orchestrating
  side, not the agent's).

### Prompt template for a delegated agent (or for yourself, as a checklist)

```
You are building one page in an ongoing kid-friendly (~10 year old) interactive geometry
mini-site, a static HTML/CSS/JS site (no frameworks, no build step) at repo
C:\Users\ADMIN\Documents\GitHub\shreshta. Read Mathematics/geometry/triangles/index.html in full
first and reuse its exact CSS/JS conventions verbatim — do not invent a different visual language.
The mascot lives at Mathematics/geometry/shared/images/mascot.png, referenced as
../shared/images/mascot.png with an onerror fallback.

Build Mathematics/geometry/<TOPIC-SLUG>/index.html (mkdir it + an images/ subfolder first).
Cover: <BULLET LIST OF CONCEPTS, ONE PER SECTION>. Pick genuinely interactive widgets for each
(drag-a-point, click-detective, tabbed explore, contrast gallery, add-one-more) — see the
"Interactivity patterns" list in the build-geometry-lesson skill for the proven repertoire.
End with a 6-11 question quiz using the exact pattern from triangles/index.html.

Run the full verification checklist from the build-geometry-lesson skill before finishing:
syntax-check the script, check for duplicate IDs, check tag balance, numerically sweep every
draggable widget's full range against its viewBox, diff hardcoded coordinates against JS
constants, and avoid raw apostrophes inside single-quoted JS strings. [If the topic needs CSS 3D
solids, also apply the "Extra checks specific to CSS 3D rotating solids" section.]

Do NOT edit Mathematics/geometry/index.html (the hub) — that gets wired up separately. Do NOT
reference any other pre-existing folder besides triangles/index.html unless told to.

Report back: what sections you built, the actual verification command outputs (not just "passed"),
and any real bugs you found and fixed during self-review.
```

## After the page is built and verified

1. Add the hub card in `Mathematics/geometry/index.html`, matching the existing `.lesson-card`
   markup pattern (emoji, title, one-sentence description).
2. Consider updating project memory with anything genuinely new learned this round (a new bug
   class, a naming decision, a scope deferral) — this file itself should stay the canonical
   process reference; memory is for repo/topic-specific facts, not a duplicate of this checklist.

# History Section — Status

_Last updated: 2026-09-06_

## Where things stand

Building an interactive "Story of India" history series under `History/`, separate from the
existing `Introduction_to_History/` (mind-map style, already done, untouched).

**Done:**
- `History/Jainism_and_Mahavira/index.html` — **added 2026-10-13**: "Mahavira's Path", an 11-station interactive quest built from the school textbook pages 68–72 (word-box blanks, riddles, number puzzles, timeline ordering, vow/sect sorting, unscrambles, reflection questions). Quiz-style with stars, unlike the Story of India chapters. `Mahavira_Path_Worksheet.pdf` in the same folder is the printable version with an answer key. Linked from the hub's topic grid and from the timeline's closing Tantu box.
- `History/Curriculum_Framework.md` — full 25-chapter list, the 8-lens framework (who ruled /
  where / how did people live / what did they believe / what did they think-write / what did
  they invent / what did they create / who did they interact with), and the continuity-thread
  approach. Read this first for the overall plan.
- `History/Chapter_01_Prehistoric_India/index.html` — Chapter 1, fully built and
  browser-tested (thread progress bar, all hotspot reveals, the cotton-spin interaction, the
  branching reflection — all verified working, no console errors).
- `History/index.html` — **Timeline added (2026-10-10)** under the Story of India cards
  (`#timeline`): Tantu intro, a "squeeze it into one day" clock, era jump chips, and 11
  expandable phase cards (Lower/Middle/Upper Palaeolithic, Mesolithic, Neolithic, Chalcolithic,
  Early/Mature/Late Harappan, Early Vedic, Later Vedic) using the 8-lens headings plus a
  "🧵 Thread to today" box. Ends with a hand-off to Mahajanapadas. Extend it when later chapters are built.
- `History/Timeline/01_Lower_Palaeolithic/index.html` — **first timeline stop page (2026-10-10)**: 5-act story
  (Tantu), clickable SVG map of 9 sites (coastline/rivers from Natural Earth, deliberately no modern borders,
  grey reference cities), hand-axe knapping interaction, toolkit cards, "history detectives", reflection.
  The hub timeline card 1 now links here. Pattern for future stops: `History/Timeline/NN_Name/index.html`.
- `Timeline/02_Middle_Palaeolithic/` (8 sites; Levallois "tortoise-core" interaction; Toba ash dig) and
  `Timeline/03_Upper_Palaeolithic/` (7 sites incl. Sri Lanka; eggshell-bead necklace; rock-wall painting) built 2026-10-10,
  same shell/map as stop 1. Hub cards 1–3 link to pages; stops chain prev/next. Next: 04_Mesolithic (Stop 3's next pill is still locked).
- `History/index.html` — hub page updated with a new "The Story of India" section. Chapter 1
  card links live; Chapter 2 shown as a locked "coming soon" placeholder card.

**Key decisions (see bottom of Curriculum_Framework.md for full note):**
- History chapters are **narrative/story-driven**, not quiz-driven like the Mathematics
  chapters — click-to-reveal story beats and hotspots, no scored quiz.
- Recurring mascot **Tantu the Thread-Weaver** (तंतु = "thread") narrates every chapter and
  embodies the continuity theme as a literal thread motif (progress bar + narrative device).
  Keep using Tantu in future chapters for consistency.
- Chapter 1's climax (spinning cotton into thread at Neolithic Mehrgarh) is a real historical
  anchor for the "weaving fabric of India" idea — future chapters should keep finding a similar
  concrete moment where possible, not just narrate abstractly.

## Next up

- **Chapter 2: The Harappan Civilization** (c. 3300–1300 BCE) — next in the chapter list.
  Folder should be `History/Chapter_02_Harappan_Civilization/index.html`, following the same
  story format as Chapter 1 (no quiz, Tantu narrates, hotspot reveals).
  - Update `History/index.html`: unlock the Chapter 2 card (currently a greyed-out placeholder)
    and add a new locked placeholder for Chapter 3.
  - Update Chapter 1's "next chapter" button (currently `🔒 Chapter 2... (Coming soon)`,
    disabled) to link to the real Chapter 2 page once it exists.
- Continuity-checkpoint device (what changed/survived/absorbed/reinvented) hasn't been built
  yet as an actual page feature — first real chance to use it is after ~chapter 4-5 per the
  framework doc.

## How to test locally

Chrome's file:// access is flaky for this repo — start a local server instead:
```
cd shreshta && python -m http.server 8791
```
then browse `http://localhost:8791/History/...`. Stop the server when done
(`Stop-Process` on the PID bound to port 8791, or Ctrl+C if run in foreground).

## Time Tunnels (added 2026-10-10)
Between stops, kids go through a "Time Tunnel" page instead of jumping: `Timeline/Tunnel_1_to_2/`, `Timeline/Tunnel_2_to_3/`.
Each has a time slider (+ autoplay) that drives: a map where sites change state per stage (old / new / both / faded,
plus overlays like Toba ash, migration route, Sri Lanka land bridge), a tool shape that morphs, an India-vs-World
two-lane timeline, "Meanwhile in India / around the world" feeds, a "why did it change?" reveal, and an unscored
"what changed / what stayed" checkpoint (this is the curriculum's continuity device). Stop pages' next/back pills go
via the tunnels; the hub timeline shows tunnel links between cards. Build a Tunnel_3_to_4 when Stop 4 is made.

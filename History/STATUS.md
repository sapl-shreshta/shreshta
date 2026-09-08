# History Section — Status

_Last updated: 2026-09-06_

## Where things stand

Building an interactive "Story of India" history series under `History/`, separate from the
existing `Introduction_to_History/` (mind-map style, already done, untouched).

**Done:**
- `History/Curriculum_Framework.md` — full 25-chapter list, the 8-lens framework (who ruled /
  where / how did people live / what did they believe / what did they think-write / what did
  they invent / what did they create / who did they interact with), and the continuity-thread
  approach. Read this first for the overall plan.
- `History/Chapter_01_Prehistoric_India/index.html` — Chapter 1, fully built and
  browser-tested (thread progress bar, all hotspot reveals, the cotton-spin interaction, the
  branching reflection — all verified working, no console errors).
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

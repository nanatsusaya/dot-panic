# 0022 — Who watches

- **Status:** Proposed
- **Date:** 2026-09-20
- **Deciders:** Daniel Wagner
- **Ticket:** [#272](https://github.com/nanatsusaya/dot-panic/issues/272)
- **Depends on:** [0001](0001-purpose-scope-and-success.md) §3.1 (*it reads as
  a flock* is judged by watching, and no command decides it), §6 (the ranked
  failures; the third is *passes its checks and looks wrong on screen*) ·
  [0002](0002-overall-architecture.md) §5 (the View draws exactly the world it
  is handed and computes nothing) · [0009](0009-toolchain.md) §7 (three
  dependencies, and the count is the rule) · [0010](0010-testing-strategy.md)
  §2 (the three registers), §5 (nothing in the repository measures a running
  page), §6 (the View is watched, and three techniques are not attempted), §8
  (a watched result is recorded in the change that produced it) ·
  [0012](0012-how-software-gets-developed.md) §5 (watch-first in the View; the
  expected picture is written into the ticket first) ·
  [0019](0019-fidelity-to-the-method.md) §2 (a rule this project invented is
  project layer, never an adaptation)
- **Supersedes / amends:** amends [0010](0010-testing-strategy.md) §2 and §8,
  recorded there as its A3
- **Amended:** no

## Context

**Watching is decided; who does it is not.** 0001 §3.1 fixes that the flock
reading as a flock is *judged by watching* and that no command decides it. 0010
§2 names the register — *a person looks at the screen and judges* — and §8 says
the judgment is recorded in the change's *Watched* section with what was
watched, on what, and what was seen. Nothing in either record, and nothing in the
method's catalog, says the person must be the decider. It became him by
circumstance: the session's built-in browser pane composites nothing, so
`requestAnimationFrame` never fires there and a screenshot fails outright, and
the [method log](../method-log.md) of 2026-08-06 records the answer — *when the
agent cannot watch, the decider watches*. Every watched criterion since has been
closed by his eyes, and every motion pass has waited for him to sit down.

**On 2026-09-20 he declined to go on being the instrument.** His words: *ich hab
keine Lust mehr, dass ich mir deine verschiedenen dot-Darstellungen selbst
anschaue und es bewerte* — and the question whether the machine could be set up
so that the agent watches its own work and judges it. The same day showed both
that it can and where it stops:

- An agent drove the page in the decider's own Chrome, which composites: ~120
  `requestAnimationFrame` calls a second, screenshots on demand. It read some
  fifteen frames over three minutes and three scenes — the flock undisturbed, a
  pointer drawn through a group, a group pushed into a corner — and judged reach
  0.03 a flock: groups that form, cross the frame and break.
- A hover from the automation produces **one** `pointermove`, and 0007's decay
  makes one event a flicker; the flock did not react to the agent's cursor at
  all until a script fed `pointermove` at frame rate to the same listener the
  Shell has. The decider noticed this before the agent did.
- The decider then watched once and rejected the state: the dots inside a group
  *zappeln und zittern*, and against a real flock of fish or starlings the
  motion lacks their elegance. Stills show grouping and cannot show internal
  motion; measured afterwards, neighbors move relative to one another at ~0.8
  of their own speed and local polarization reads 0.7 where starling flocks
  measure 0.84–0.99 (Table S1 of the reference below). The agent's verdict was
  true about shape and wrong about the thing 0001 §3.1 is for.

So the case for this record is not that an agent's eye is as good as his. It is
that an agent's watching is *possible*, that it caught what it was pointed at
and missed what it was not, and that the difference has to be written down
before an agent's judgment is allowed to close a criterion — otherwise the next
session either keeps waiting for him or decides on its own what a watch is.

**What this is not.** It is not an adaptation: the watched register is this
project's own invention (0019 §2), and the catalog's E2 — *judgment stays a
review responsibility* — is untouched, because review is still the decider's
and an agent watching is not a check. It is not a change to 0001 §3.1, which
says what watching decides and is silent on who. And it does not choose a
number: what to do about the wriggling is #216's.

## Decision

### 1. The watched register admits an agent, and the record says whose eyes

0010 §2's *a person looks at the screen and judges* becomes *a watcher — a
person or an agent — looks at the screen and judges*, and §8's *a judgment by a
person* follows it. The *Watched* section of a change names the watcher: the
decider, or the agent and which browser. A *Watched* section that does not say
whose eyes is incomplete, and review sends it back.

**Checkable by reading:** every *Watched* section written after this record
names a watcher.

### 2. What an agent's watch is

An agent's watch counts toward a criterion only when all of these hold:

1. **The page, moving.** The Shell's loop runs in a browser that composites —
   the decider's Chrome under the agent's control, or any other that fires
   `requestAnimationFrame` — and what is read is that page, not a drawing of
   the Core.
2. **A sequence, not a still.** At least one uninterrupted minute of frames
   read in order, at intervals no longer than ten seconds. One frame shows
   where the dots are; it shows nothing about how they got there, and the
   verdict of 2026-09-20 turned on exactly that.
3. **Three scenes, each time.** The flock undisturbed; a pointer drawn slowly
   through a group and then withdrawn; a group pushed toward an edge or corner
   and held there. The second and third exist because #264's two criteria and
   0006 §7's rejected end state are about arranged situations that occur on
   their own a fraction of a percent of the time.
4. **A pointer that streams.** Where the pointer is part of the scene it is fed
   at frame rate, because one event is not a pointer under 0007's decay. How
   that is done is outside the repository (§4) and the *Watched* section says
   what it was.
5. **Written against the expectation.** 0012 §5's rule is unchanged: the
   expected picture stands in the ticket before the work starts, and the
   *Watched* section reads what was seen against it — including what was
   looked for and not seen.

A watch missing any of the five is described in the *Watched* section as what it
was — a look at stills, a look with no pointer — and closes nothing.

### 3. The decider looks once, at the end, and his word prevails

A ticket that carries one of 0001 §3's criteria is not Done until the decider
has watched the state the agent calls good enough — once, at the page, in his
own browser. Intermediate states, and passes that move a number without claiming
the criterion, need no look from him. His verdict overrides the agent's, and a
state he rejects is recorded on the change with his words, as
[PR #269](https://github.com/nanatsusaya/dot-panic/pull/269#issuecomment-5752123820)
was.

This is his call of 2026-09-20 — *ich schau es mir am Ende an, wenn du es für
gut empfindest* — and it is the whole of what stays his: the acceptance, not the
loop.

### 4. Measurement is not watching, and nothing about it lives in the repository

Numbers read from the Core — polarization, turn rate, relative speed, group
counts, contact sheets rendered from a world — are the **measured** register of
0010 §2. They choose between candidates and they say why a state fails; they
close no watched criterion, which is what
[PR #269](https://github.com/nanatsusaya/dot-panic/pull/269) already said of its
own contact sheet and what 2026-09-20 confirmed the hard way.

The instrument — the browser, the script that streams a pointer, the script
that renders or measures a world — is outside the repository. Nothing is added
to 0009 §7's three, nothing renders the page under test (0010 §6), and nothing
under `tests/` reads the View. If a helper ever wants in, it arrives on a
ticket of its own and is decided there; this record does not pre-authorize it.

### 5. The three amended sentences, and the two records left alone

0010 §2's watched bullet and §8's opening sentence change as §1 says, and 0010's
*Amendments* carries them as A3 with the authorization. 0001 §3.1 is untouched.
0012 §5 is untouched — *watch-first* and *the expected picture is written into
the ticket before the work starts* are what §2.5 above depends on.

## Consequences

**Positive.**

- A motion pass no longer waits for the decider's evening. The agent moves a
  number, watches it under §2, and the decider sees one state instead of five.
- The watch is reproducible in a way an evening at the page is not: the same
  three scenes, the same minute, written down each time — so two *Watched*
  sections from different sessions can be read against each other.
- The four watches owed on #216 and #264 since August have an instrument again.

**Negative, and real.**

- **This record authorizes the thing that failed the day it was written.** The
  agent's verdict on 0.03 was wrong on the point that matters, and §2 raises
  the bar without making the eye a visitor's. A state the agent calls good and
  the decider rejects will happen again; §3 is the answer and it is a person's
  patience, not a mechanism.
- **The instrument is the decider's Chrome.** While the agent watches, a tab in
  his browser is being driven, and his own cursor over it changes what is
  measured — it did, on 2026-09-20. A browser of the agent's own that composites
  would remove this; none exists in this session today.
- **A streamed pointer is not a hit-tested one.** A script that dispatches
  `pointermove` reaches the Shell's listener and bypasses the browser's own
  hit-testing and `isTrusted`; the Shell checks neither, so the two are the same
  today, and they stop being the same the day it does. The *Watched* section
  naming the method is what lets a later reader notice.
- **Two more sentences depend on a person reading them.** §2's five conditions
  and §3's one look are checked by review and by nobody else — the class 0011 §6
  and 0016 §6 already count.
- **A session without a compositing browser is back to 2026-08-06**, and this
  record does not change that. It says what an agent's watch is when one is
  available, not that one is.

## Alternatives considered

- **Keep the decider the only watcher** — rejected because he declined it on
  2026-09-20, and because it made one person's evening the rate of every motion
  pass.
- **Frames rendered from the Core as the watch** — rejected by §4; they showed
  groups with lanes on 2026-08-12 and could not show the wriggling that failed
  the same state on 2026-09-20.
- **A metric that closes the criterion** — polarization above some threshold —
  rejected by 0001 §3.1 and the catalog's E2: a number people optimize against
  improves while the thing it stands for does not. Measurement chooses between
  candidates (§4); it does not accept one.
- **A headless browser in the repository** — rejected by 0010 §5 and §6 and
  0009 §7, for the reasons given there; nothing here reopens them.
- **The built-in browser pane** — rejected because it composites nothing, which
  the method log of 2026-08-06 records and 2026-09-20 re-confirmed.

## Open questions

- **O1 — Is the decider's one look (§3) required, or may he waive it per
  ticket?** Default: required for a ticket that carries a 0001 §3 criterion,
  and waivable only by a comment on that ticket saying so — silence is not a
  waiver.
- **O2 — Does the agent's watch have to run in the decider's Chrome, or in any
  browser that composites?** Default: any browser that composites, named in the
  *Watched* section; his Chrome is what exists today, and §2 is written so that
  it is not what the rule depends on.
- **O3 — Do the three scenes of §2.3 stand as written, or should the corner
  scene be dropped once #264 closes?** Default: they stand; 0006 §7's rejected
  end state does not close with #264, and a corner is where the next number's
  failure will show first.

## References

- [0010](0010-testing-strategy.md) §2, §5, §6, §8, read 2026-09-20 — the
  register, the two refusals this record keeps, and where a watch is recorded.
- [Method log, 2026-08-06](../method-log.md) — *When the agent cannot watch,
  the decider watches*, and the entry below it on the pane compositing nothing.
  Read 2026-09-20.
- agent-project-rules,
  [G1](https://github.com/nanatsusaya/agent-project-rules/blob/main/method/rules.md#g1),
  [G3](https://github.com/nanatsusaya/agent-project-rules/blob/main/method/rules.md#g3),
  [E2](https://github.com/nanatsusaya/agent-project-rules/blob/main/method/rules.md#e2),
  at `55e567c`, read 2026-09-20 — the human is the gate; the gate reviews
  direction and coherence; a check asserts presence, not quality, and judgment
  stays a review responsibility.
- [PR #269, comment of 2026-09-20](https://github.com/nanatsusaya/dot-panic/pull/269#issuecomment-5752123820)
  — the decider's verdict on 0.03, the measurement behind it, and the alignment
  sweep.
- A. Cavagna, A. Cimarelli, I. Giardina, G. Parisi, R. Santagati, F. Stefanini,
  M. Viale, *Scale-free correlations in starling flocks*, PNAS 107 (2010);
  [arXiv:0911.4393](https://arxiv.org/abs/0911.4393), Table S1 — polarization
  of 24 flocking events, 0.844 to 0.995. Read 2026-09-20 from the arXiv PDF,
  for the comparison in *Context* and nowhere else.

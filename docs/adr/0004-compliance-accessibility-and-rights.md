# 0004 — Compliance, accessibility and rights

- **Status:** Proposed
- **Date:** 2026-08-02
- **Deciders:** Daniel Wagner
- **Ticket:** [#8](https://github.com/nanatsusaya/dot-panic/issues/8), including
  both comments that widened its scope
- **Depends on:** [0001](0001-purpose-scope-and-success.md) §2 (this is an
  example project, published to be read), §3.3 (motion is continuous), §3.4
  (Baseline widely available), §4 (the page carries a flock, an imprint and an
  explanation), R3 (a settings surface was left to its own record) ·
  [0002](0002-overall-architecture.md) §6 (the imprint and the explanation are
  outside the application) ·
  [0003](0003-security-and-privacy-by-design.md) §4 (nothing is stored on the
  visitor's device), §5 (no network request after load), §7 (the imprint is
  readable on the page, lives here, and appears in exactly one place)
- **Supersedes:** nothing

## Context

Two unrelated subjects share this record, and they share it for one reason: both
are **obligations rather than preferences**. What the law requires of a page like
this, and what a page made entirely of motion owes the people who cannot look at
motion.

The first turns entirely on one fact, which the decider supplied before this was
written: **the page is private and non-commercial — no advertising, no revenue.**
Every legal conclusion below follows from that, and none of them survives if it
changes.

The ticket requires legal claims to be read from primary sources and cited. Each
statute quoted below was fetched and read on 2026-08-02, and the reasoning from
the quoted words is left visible so a reader can disagree with it rather than
having to trust it. **This is a reading of statute text and not legal advice**;
what that limit costs is in *Consequences*.

**Repository state at the time of writing.** No code, no page, no host, no
toolchain. Four records accepted. `LICENSE` already contains an MIT license,
chosen in conversation and never recorded as a decision — which is why the
ticket describes the license as unrecorded rather than absent.

**What is not open here.** What the flock actually does under reduced motion is
0006. What the pause control looks like and how the page is drawn is 0005. Which
host serves the page is 0011, and §8 constrains it. The mechanisms 0003 fixed are
pointed at, never restated.

## Decision

### 1. The imprint obligation is § 18 MStV, and § 5 DDG does not apply

**§ 5 DDG** binds providers of *"geschäftsmäßige, in der Regel gegen Entgelt
angebotene digitale Dienste"*. This page is neither: no revenue, no advertising,
nothing offered against payment. **None of § 5's catalog applies** — no register
entry, no VAT number, no supervisory authority, and no required email address.

**§ 18 Abs. 1 MStV** is the one that binds, and it is much shorter:

> Anbieter von Telemedien, die nicht ausschließlich persönlichen oder familiären
> Zwecken dienen, haben folgende Informationen leicht erkennbar, unmittelbar
> erreichbar und ständig verfügbar zu halten: 1. Name und Anschrift […]

**The personal-or-family exception does not apply**, on the supervising
authorities' own criteria. The Landesanstalt für Medien NRW gives the exempt case
as *"eine Seite mit Urlaubsbildern der Familie Müller"*, and the line the
guidance draws is whether an offering addresses friends and family or a broad
public. This page is published without restriction, to be read by people judging
a method (0001 §2).

**The counter-argument is real, and it belongs here rather than in a footnote.**
The same authority describes the obligation as catching offerings with *"eine
gewisse meinungsbildende Kraft und Breitenwirkung"*, and a page of moving dots
has neither. That is an argument about what the rule is **for**. The statute's
own text asks the narrower question — personal or family purposes, or not — and
the narrower question is the one this section answers.

So the imprint must carry **Name und Anschrift**, and that is the whole of what
it must carry. It also carries an email address, which is voluntary — R1. Which
postal address, or whether the page publishes one at all, is **O2**.

The three delivery words are already satisfied more strictly than they ask.
0003 §7 puts the imprint on the page itself, readable without following any
link, which was decided for a different reason and happens to exceed *leicht
erkennbar, unmittelbar erreichbar und ständig verfügbar*.

### 2. The obligation attaches to the page, not to the repository

The imprint goes on the page. **The repository carries no imprint file.** What it
carries is what the decider's other projects carry: a README and the conventional
security and conduct notes. Creating those here is ordinary work with its own
ticket, not this record's.

The reason is which thing is published as a service. The page is offered to
anyone who opens the URL. The repository is source, hosted on someone else's
platform, and reached by people who went looking for it.

**This record does not settle whether a public repository is itself a Telemedium
under § 18.** It settles what this project does, and the decider decided it. The
asymmetry with §1 is deliberate and worth seeing: if §1's reading is wrong, an
address is published that need not have been, and that cannot be taken back. If
this one is wrong, the remedy is a file.

### 3. This record names the values; it does not contain them

**Neither value is written into this record**, and that is not squeamishness:
0003 §7 puts the imprint in exactly one place and names a decision record as
somewhere it does not appear. That place is the page. Everything else, this
record included, points at it.

The email address exists already — the method repository publishes it in its code
of conduct, and R1 makes it this project's contact address as well.

**The postal address exists nowhere, and the decider has said it will not be his
own.** Nothing in §1 requires that it is. An *Anschrift* has to be one at which
service can be effected — a Postfach does not qualify — and it does not have to
be where somebody lives. Which address, or whether the page carries one at all,
is **O2**, and the first increment is blocked until that is answered.

### 4. `prefers-reduced-motion: reduce` is honored, and it is a hard requirement

The media feature is Baseline widely available — across browsers since January
2020 — so 0001 §3.4 permits it.

**Honored** means: where the setting is `reduce`, the page presents no sustained
automatic motion. What it presents instead belongs to 0006.

**This is a requirement of every motion change from here on, not a feature that
may be deferred.** A change that adds or alters motion is not done until it also
behaves correctly under `reduce`. Deferring it would defer it forever, and on a
page whose entire content is motion it is not a refinement — it is whether the
page works at all for the people it affects most.

### 5. The page carries a control that stops the motion

**WCAG 2.2 Success Criterion 2.2.2 *Pause, Stop, Hide*, Level A**, applies. Its
three conditions are each met by decisions already accepted:

> For any moving, blinking or scrolling information that (1) starts
> automatically, (2) lasts more than five seconds, and (3) is presented in
> parallel with other content, there is a mechanism for the user to pause, stop,
> or hide it unless the movement, blinking, or scrolling is part of an activity
> where it is essential

Starts automatically — yes, there is nothing to start it. Lasts more than five
seconds — 0001 §3.3 makes it never stop. Presented in parallel with other
content — 0001 §4 puts an imprint and an explanation on the same page.

**The essential exception is available and is not taken.** It would be easy to
argue that motion is what this page is. But the visitor who needs the motion
stopped is precisely the visitor trying to read the text beside it, and reading
an imprint is not an activity in which moving dots are essential.

So the page has a **mechanism to pause, stop or hide the motion, operable
without a pointing device.** What it looks like is 0005's; what the flock does
while stopped is 0006's.

**§4 does not cover this and the two are not interchangeable.** A browser or
operating-system setting is not a mechanism on the page, and most visitors have
never set one. Both are required, for different people.

This is the question 0001 R3 left open — whether the page carries a settings
surface — and it is answered by an obligation rather than by anyone wanting one.

### 6. No consent banner and no cookie notice

**§ 25 Abs. 1 TDDDG** requires consent for *"die Speicherung von Informationen in
der Endeinrichtung des Endnutzers oder der Zugriff auf Informationen, die bereits
in der Endeinrichtung gespeichert sind"*.

0003 §4 stores nothing and reads nothing: no cookie, no `localStorage`, no
`sessionStorage`, no IndexedDB, no Cache Storage, no service worker. The
provision is never triggered, so the exceptions in § 25 Abs. 2 are never reached
either.

**No banner, no notice, no consent surface**, and nothing on the page asks the
visitor a question it has no reason to ask.

### 7. The page publishes personal data; it collects none

The ticket asks for this in writing rather than left to be worked out. An imprint
is a **publication** of personal data, not a collection of it. The only personal
data anywhere on this page is the operator's own, published because § 18 MStV
requires it.

There is nothing to distinguish it from, because 0003 §4 and §5 left no
collection anywhere: the page stores nothing and, once loaded, sends nothing.

### 8. What a host records is 0011's, and 0011 must say so

Serving a page necessarily involves the host seeing a request. Access logs and
addresses at that layer are the host's processing, not the page's, and this
record does not reach them because the host is not chosen.

**This constrains 0011**: whichever host it picks, it states what that host
records and what follows from it. Named here so that it arrives as a question
0011 has to answer rather than as something nobody noticed.

### 9. The Barrierefreiheitsstärkungsgesetz does not apply

**§ 1 BFSG** binds products and services offered to consumers after 28 June 2025,
and its service list is commercial throughout: telecommunications services,
banking services for consumers, e-books, electronic commerce services, and
certain passenger transport. A page with no contract, no payment and no consumer
relationship is none of them.

Obligations that attach to public bodies are not examined, because this is not
one.

**§4 and §5 therefore rest on 0001 §2 and on WCAG, not on a statute.** Said
plainly, because "it is required by law" is the reason people expect, and it is
not the reason here.

### 10. Accessibility beyond motion: what is in, and what is deliberately out

**In.**

- §4 and §5, above.
- **The imprint and the explanation are text in the document, never drawn.**
  0002 §6 already puts them outside the application; this is the reason that
  matters. Text baked into a canvas cannot be read by a screen reader, resized,
  or selected, and §1's *leicht erkennbar* is about a person finding it.

**Out, deliberately, each for a reason.**

- **Keyboard operation of the flock.** There is nothing to operate. 0001 §5 rules
  out a goal, a score and a win condition, so the flock has no state a visitor
  can change. The control in §5 is keyboard-operable; the dots are not a control.
- **A screen-reader description of the flock's state.** It conveys no
  information. Describing where the dots are would invent content that the
  sighted visitor does not receive either.
- **Contrast requirements on the dots.** WCAG's contrast criteria are about text
  and about user-interface components. The flock is neither, and 0005 owns color.

### 11. The license is MIT, and it covers everything in this repository

Recorded rather than assumed. `LICENSE` already holds it; what was missing was
the decision and the statement of what it covers.

**It covers the code and `docs/` alike.** One license, so that nobody has to ask
whether a code block inside a decision record is code or documentation.

The method repository declares `(MIT AND CC-BY-4.0)`, which suits a work that is
prose with checks attached to it. Here the documentation exists to explain code
sitting beside it in the same repository, and a boundary between them would be
drawn arbitrarily and argued about later.

### 12. The flocking model is reimplemented from its published description

The model is Reynolds' (1987). It is read from the published paper and
reimplemented; **no third-party source is copied.** Stated so that a later reader
does not have to reconstruct where it came from.

An algorithm described in a published paper is not itself the paper. If 0013
decides the Core is taken from a package instead, that package's license becomes
a question — and it is 0013's, not this record's.

## Consequences

**Positive.**

- **The imprint is smaller than the one most pages copy.** § 5 DDG's catalog is
  what people reproduce, and reproducing it here would publish more personal data
  than any statute asks for.
- No banner, no cookie notice and no consent surface, because 0003 left nothing
  to consent to. §6 costs one paragraph to establish and removes a whole page
  element.
- 0006 inherits reduced motion as a constraint rather than a preference, before
  any motion exists to retrofit it into.
- 0005 knows before it chooses a rendering technology that the imprint and the
  explanation are document text, and that a control has to fit somewhere.

**Negative, and these are real.**

- **§5 puts a control on a page that 0001 described as a toy with nothing to
  operate.** 0001 R3 left that surface open for its own record; this is that
  record, and it opens it for an obligation rather than because anyone wanted a
  button. The first thing on the page besides the flock will be a way to stop it.
- **§4 and §5 make every motion change more expensive**, permanently. Two more
  criteria on every ticket that touches movement, for a page with no users yet.
- **§3 blocks the first increment on a value that does not exist yet.** The
  postal address is in neither repository, will not be the decider's own, and
  cannot be derived. O2 sits on the path to there being a page at all.
- **The email address will exist in two repositories.** 0003 §7 keeps the imprint
  to one place so that changing an address is one edit; §2 then puts conventional
  contact notes in this repository, as the decider's other projects have. A
  reporting channel in a security or conduct file is not the imprint, and the
  value is still the same string in more than one file. Whoever changes that
  address changes it in several places, and nothing will remind them.
- **The load-bearing legal reading is that § 18's personal-or-family exception
  does not apply.** The quotes are primary, the supervising authorities' own
  examples point the same way, and the counter-argument is stated in §1 — and it
  is still a reading by someone who is not a lawyer. **The two ways of being
  wrong do not cost the same.** Publishing an address that was not required
  cannot be taken back. Not publishing one that was required is a defect, and a
  defect can be fixed by fixing it.
- **MIT on `docs/` is unusual.** Documentation is more often CC BY, and the
  method repository does exactly that. One license was chosen to remove a
  boundary question, not because MIT fits prose well.

## Alternatives considered

- **Copy a conventional commercial imprint.** Rejected because it publishes more
  personal data than § 18 requires, for obligations under § 5 DDG that do not
  reach this page.
- **Put an imprint file in the repository as well.** Rejected by the decider: the
  service published to the public is the page, and a repository is served by the
  conventional README and security notes, as in this decider's other projects.
- **Treat `prefers-reduced-motion` as satisfying SC 2.2.2.** Rejected because an
  operating-system setting is not a mechanism on the page, and the visitors it
  would leave out are the ones who never found the setting.
- **Take SC 2.2.2's essential exception.** Rejected because the activity that
  matters is reading the text beside the flock, and moving dots are not essential
  to it.
- **Defer reduced motion until there is a flock to apply it to.** Rejected
  because it is exactly the change that keeps being deferred, and 0001 §6 ranks
  *the toy is never finished* above *it looks wrong on screen* — a page that is
  finished and unusable for some visitors is worse than both.
- **Split the license, MIT for code and CC BY 4.0 for `docs/`, as the method
  repository does.** Rejected by the decider in favor of one license for
  everything.
- **Put the imprint behind a link, as most pages do.** Rejected because 0003 §7
  already decided the stricter thing for its own reasons, and § 18's *unmittelbar
  erreichbar* is satisfied either way.
- **Write a privacy policy anyway, describing that nothing is processed.**
  Rejected as a page element that exists to look diligent. §7 says it in this
  record, and the explanation 0001 §4 already puts on the page is where a visitor
  would read it.

## Open questions

**O2 — Which postal address does the imprint carry, if any?**

The decider has said it will not be his own. §1 does not require that it is: an
*Anschrift* must be one at which service can be effected — the Landesanstalt für
Medien NRW states plainly that *"Postfach reicht nicht aus (nicht ladungsfähig)"*
— but nothing requires it to be a home. The same guidance names the alternatives
itself: authorizing a trusted person to accept service, or a commercial
service-address provider.

- **(a) A service address that is not his own** — a trusted person, or a paid
  provider. **Recommended**, because it is the only option that satisfies both
  the obligation as §1 reads it and the decider's constraint, instead of trading
  one against the other. It costs money, or it costs asking somebody.
- **(b) Name and email, and no address at all.** The record would then say
  plainly that the page departs from its own reading of § 18 and why — a
  departure recorded is not the same as one nobody noticed. The argument for it
  is the one already in §1: a toy with no opinion-forming reach is not what the
  rule was written to catch. The argument against it is that the statute asks a
  narrower question than the rule's purpose does, and §1 answers the statute's.
- **(c) No public page.** Removes the obligation by removing the thing. It
  contradicts 0001 §3 and §4 and would need a record superseding them. Listed
  because a question about publishing should show what not publishing costs.

## Resolved questions

**R1 — The imprint carries an email address, and it is the one the method
repository already publishes.**

The draft asked whether anything beyond *Name und Anschrift* belongs in the
imprint, and it asked the question on a false finding: it reported that the
method repository carries no contact address at all. **It does.** The address is
in that repository's code of conduct, has been public the whole time, and the
draft's search missed it by looking for a pattern one character too specific.
Recorded rather than quietly fixed, because the finding was the reason the
question was framed as a choice with no default.

The decision is a **normal imprint on the page** — name, address, email — with
the same address the method repository uses, so that a person who encounters
either project reaches the same place. § 18 requires none of the email; nothing
forbids it either, and a postal address with no electronic channel invites paper
mail about a toy.

**§2 is the other half of the same answer.** The repository gets no imprint. It
gets what a repository gets, and that is a separate piece of work.

## References

- [§ 5 DDG — Allgemeine Informationspflichten](https://www.gesetze-im-internet.de/ddg/__5.html),
  Bundesministerium der Justiz — the *geschäftsmäßig, in der Regel gegen Entgelt*
  scope that §1 turns on. Read 2026-08-02.
- [§ 18 MStV — Informationspflichten und Auskunftsrechte](https://lxgesetze.de/mstv/18)
  — the obligation that does apply, and its personal-or-family exception. Read
  2026-08-02.
- [*Transparenz im Internet*, Landesanstalt für Medien NRW](https://www.medienanstalt-nrw.de/aufsicht/transparenz-im-internet.html)
  — the supervising authority's own account of the personal-or-family exception,
  and that a Postfach is not a sufficient *Anschrift*. Read 2026-08-02.
- [*Impressumspflicht*, Medienanstalt Hamburg / Schleswig-Holstein](https://www.ma-hsh.de/aufsicht/impressumspflicht.html)
  — the same obligation from a second authority. Read 2026-08-02.
- [§ 25 TDDDG — Schutz der Privatsphäre bei Endeinrichtungen](https://www.gesetze-im-internet.de/ttdsg/__25.html),
  Bundesministerium der Justiz — the consent trigger §6 shows is never reached.
  Read 2026-08-02.
- [§ 1 BFSG — Anwendungsbereich](https://www.gesetze-im-internet.de/bfsg/__1.html),
  Bundesministerium der Justiz — the covered product and service list in §9. Read
  2026-08-02.
- [WCAG 2.2, Success Criterion 2.2.2 *Pause, Stop, Hide*](https://www.w3.org/TR/WCAG22/),
  W3C — quoted in §5. Read 2026-08-02.
- [`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion),
  MDN — Baseline widely available, across browsers since January 2020. Read
  2026-08-02.
- Craig W. Reynolds, *Flocks, Herds, and Schools: A Distributed Behavioral
  Model*, Computer Graphics **21(4)** (SIGGRAPH '87 Conference Proceedings),
  pages 25–34 — [the paper](https://www.red3d.com/cwr/papers/1987/boids.html).
  The model named in §12. Read 2026-08-02.
- [`CODE_OF_CONDUCT.md`](https://github.com/nanatsusaya/agent-driven-development/blob/main/CODE_OF_CONDUCT.md),
  agent-driven-development — where the email address in R1 is already published.
  Read 2026-08-02.
- [0001](0001-purpose-scope-and-success.md) — purpose, scope and success,
  including R3 on a settings surface. Read 2026-08-02.
- [0003](0003-security-and-privacy-by-design.md) — what the page stores and
  sends, and the one place the imprint appears. Read 2026-08-02.
- [Ticket #8](https://github.com/nanatsusaya/dot-panic/issues/8) — the scope this
  record is written against, and the correction after 0003 was accepted. Read
  2026-08-02.

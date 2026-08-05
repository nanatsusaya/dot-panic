# 0017 — The page's language

- **Status:** Accepted
- **Date:** 2026-08-05
- **Deciders:** Daniel Wagner
- **Ticket:** [#121](https://github.com/nanatsusaya/dot-panic/issues/121)
- **Depends on:** [0001](0001-purpose-scope-and-success.md) §2 (who the page is
  for), [0003](0003-security-and-privacy-by-design.md) §7 (the imprint appears
  in one place), [0004](0004-compliance-accessibility-and-rights.md) §1 (what
  § 18 MStV asks for), §3 (a record names the values and does not contain them),
  §10 (*leicht erkennbar* is about a person finding it),
  [0014](0014-page-layout.md) §4 (the dialog), §6 (the control names the
  imprint)
- **Supersedes:** nothing
- **Amended:** no

## Context

Nothing decides what language the page is written in.
[#77](https://github.com/nanatsusaya/dot-panic/issues/77) says so in its own
criteria — *German or English matching whatever the rest of the page settles
on* — and [#95](https://github.com/nanatsusaya/dot-panic/issues/95) and
[#96](https://github.com/nanatsusaya/dot-panic/issues/96) both build containers
that need text in them.

**The page does not exist yet.** No `index.html`, no directory of the three
parts, no toolchain. Deciding this before there is anything to write it into is
the point: the first page ticket would otherwise settle it by typing, and the
change that noticed would then touch copy, one control's label and three
tickets' watch criteria at once.

**It is not a matter of taste, and 0014 §6 is why.** That section requires the
control opening the dialog to name the imprint, and takes its reason from 0004
§10 — behind a control, the label is the whole of whether a person finds the
imprint. So the language of one label carries a piece of the obligation 0004 §1
establishes. That is what makes this the decider's rather than an author's.

**What the statute asks for is narrower than the convention.** 0004 §1 quotes
§ 18 Abs. 1 MStV, and what it requires is *Name und Anschrift*. No heading is
required, and the word *Impressum* is convention rather than law.

## Decision

### 1. The page is in English

Everything committed in this repository is English, and 0001 §2 makes the
audience people who read it to judge a method. A page in a different language
from the repository it is published out of would be the one artifact out of step
for the reader who arrived from that repository.

### 2. The imprint's control and its heading carry the German word

`Impressum`, on the control 0014 §6 requires and on the section heading it
opens. Not a translation, not *Legal notice*, not a symbol.

**This is §1's own reason applied to one visitor.** The word is what a German
reader looks for, and 0004 §10 says *leicht erkennbar* is about a person finding
it. An English page whose imprint is labeled in English asks the person the
obligation exists for to work out where it is.

**It is the whole of the exception.** Nothing else on the page switches
language, and a second German word is a decision this record did not make.

### 3. `lang` is `en` on the document and `de` on §2's word

Two attributes, and no third.

`en` rather than `en-US`. American spelling is this repository's regime, checked
against this repository's documents; the page is a different artifact and no
record extends the regime to it.

**Checkable by reading:** the document element carries `lang="en"`, and every
element carrying `lang="de"` contains nothing but the word §2 fixes.

### 4. The canonical copy lives in the page source

What a visitor reads is written once, in the page. Every ticket and every record
points at it instead of restating it.

That is 0004 §3's rule — *this record names the values; it does not contain
them* — applied to the sentences as it was to the address, and it is what keeps
0003 §7's *the imprint appears in one place* true of the wording and not only of
the address. **So this record carries no page copy**, and neither does a ticket
that builds a container for it.

## Consequences

- **The page gains its exception in the place hardest to defend.** One German
  word on an English page reads as an oversight, and §2 is the only thing that
  says otherwise. Somebody who finds it and tidies it away removes a piece of
  what 0004 §1 asks for.
- **`lang` is on neither of 0004 §10's lists.** That section enumerates what
  accessibility is in and what is deliberately out, and this attribute is in
  neither — it was not considered there. §3 fixes it as a property of the
  language decision rather than as an accessibility addition, and touches
  neither list. If §10 is ever reopened, this is the row to reconcile.
- **Nothing checks §1, §2 or §4.** §3 is decidable by reading two attributes.
  Whether the prose is actually English, whether the label says `Impressum`, and
  whether a sentence has been restated into a ticket are carried by review.
- **It costs a record for four short sections.** A seventeenth record for a
  decision this small reads as ceremony, which 0001 §6 ranks as the first
  failure. R5 is why it was taken anyway.

## Alternatives considered

- **A German page.** Rejected because 0001 §2's audience arrives from an English
  repository to judge a method, and the toy is secondary to that.
- **English throughout, the imprint's label included.** Rejected because 0014 §6
  makes that label the whole of *leicht erkennbar*, and the word a German reader
  looks for is the German one.
- **A bilingual page.** Rejected because it doubles every sentence 0014 §4's
  dialog carries, and no reader of this project needs both.
- **`lang="en-US"`.** Rejected because the American regime belongs to this
  repository's documents; extending it to the page would be a rule nothing
  decided.
- **Recording this inside [0014](0014-page-layout.md).** Rejected in R5.

## Resolved questions

**R1 — English.** The recommendation, and the argument for it is the audience
rather than the operator: 0001 §2 puts the page in front of people judging a
method out of an English repository.

**R2 — The German word stays, on the control and its heading.** The
recommendation. The alternative was not *German page or English page* but
whether the one element the obligation runs through should be readable by the
reader the obligation protects. §2 keeps it there and confines it.

**R3 — `lang="en"` and `lang="de"`.** The recommendation. It follows from R1 and
R2 once they are answered; the only choice left in it was the region subtag, and
the reason not to carry one is that the American regime is checked against
documents in this repository and says nothing about the page.

**R4 — The copy lives in the page source.** The recommendation, on 0004 §3's
precedent. It also decides something by omission that is worth naming: a record
that quotes page copy has made itself a second place the wording lives, and the
next edit to the page makes it wrong.

**R5 — A record, not an addition to an accepted one.** The recommendation, and
the closest call of the five. An addition to 0014 would have been an amendment
to an accepted record with nothing in it reversed, and it would have made 0014
the authority for something wider than it decides — the question reaches 0014,
0004 and three tickets. The argument against was stated with the
recommendation and is in *Consequences*: a seventeenth record for this much is
ceremony, and ceremony is 0001 §6's first failure.

All five answered on 2026-08-05 against
[#121](https://github.com/nanatsusaya/dot-panic/issues/121): *"wir folgen deiner
empfehlung bei allen fünf."*

## References

- [0001](0001-purpose-scope-and-success.md) — purpose, scope and success. Read
  2026-08-05.
- [0003](0003-security-and-privacy-by-design.md) — where the imprint appears.
  Read 2026-08-05.
- [0004](0004-compliance-accessibility-and-rights.md) — the imprint obligation,
  the values it names but does not carry, and the accessibility lists. Read
  2026-08-05.
- [0014](0014-page-layout.md) — the dialog and the control that opens it. Read
  2026-08-05.
- [Ticket #121](https://github.com/nanatsusaya/dot-panic/issues/121), and
  [#77](https://github.com/nanatsusaya/dot-panic/issues/77), whose criteria named
  the gap. Read 2026-08-05.

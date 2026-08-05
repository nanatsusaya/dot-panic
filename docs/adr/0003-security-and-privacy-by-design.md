# 0003 — Security and privacy by design

- **Status:** Accepted
- **Date:** 2026-08-02
- **Deciders:** Daniel Wagner
- **Ticket:** [#7](https://github.com/nanatsusaya/dot-panic/issues/7), including
  the comment that widened its scope after 0001 was accepted
- **Depends on:** [0001](0001-purpose-scope-and-success.md) §2 (the
  documentation and a well-written implementation come before the product), §4
  (the page carries a flock, an imprint and an explanation), §5 (nothing is
  remembered between visits) ·
  [0002](0002-overall-architecture.md) §3 (the identifiers the Core may not
  name), §6 (the imprint and the explanation are outside the application)
- **Supersedes:** nothing
- **Amended:** 2026-08-05 — A1

## Context

[#7](https://github.com/nanatsusaya/dot-panic/issues/7) opens by saying that a
static page with no accounts, no input fields and no backend has a small attack
surface, and that *small* is an assumption nobody has written down. Both halves
are right, and the second one matters more than it looks: the things worth
deciding here are almost all prohibitions, and a prohibition is cheap to state
before anything exists and expensive to retrofit after something has been added.

Each of them is a thing that arrives one at a time and individually reasonably —
a font from a content delivery network because it looks better, an analytics
snippet because the visitor count would be interesting, a `localStorage` key
because it saves a line. Nobody decides to build a page that reports its
visitors to four companies. It is arrived at.

**What changed while the ticket sat.** 0001 §4 puts an imprint on the page, and
an imprint carries a real name and a postal address. The ticket's later comment
read that as falsifying the small-attack-surface argument. It does not — see the
paragraph after next — but it does mean this record has to say where that text
lives, which the ticket as first written had no reason to ask.

**Repository state at the time of writing.** No code, no page, no runtime, no
deployment, no host chosen. Three records accepted. The repository is public.
`method.json` declares `"authorities": { "secrets": null }`, on the grounds that
a static toy has nothing to protect.

**Two parties, kept apart — conflating them is what made the first draft of this
record wrong.** The person responsible for a published project is attached to it
by name: this repository's history, the account that owns it and the imprint all
carry that identity, deliberately, because that is what being responsible for
something public means. **Visitors are the opposite case.** Nothing about them
is recorded anywhere, in the repository or on the page — not an address, not a
cookie, not a count.

Every prohibition below is about the second party. The first needs no protection
here, because it is published on purpose, and
[P1](https://github.com/nanatsusaya/agent-driven-development/blob/main/method/rules.md#p1)
protects data whose exposure would be a loss. R1 records where the first draft
went wrong about this, and what it nearly cost.

**What is not open here.** Which rendering technology is used is 0005; this
record states what is forbidden, never what is used. Where the page is hosted
and how it gets there is 0011; §6 constrains it and says so out loud. Whether an
imprint is legally required, and what it must contain, is 0004; this record owns
only where that text lives and what touches it.

## Decision

### 1. What is worth protecting

A threat model over an empty asset list is theater, so the list is written out
even though it is short:

1. **The visitor's device.** The page runs code on a machine that is not ours.
   This is the only asset here that was never ours to begin with, and it is the
   reason the rest of this record is as strict as it is.
2. **The fact that a visit happened, and anything learnable from it.** Somebody
   looking at a toy has no reason to expect it recorded anywhere. §3 to §5 make
   that structurally impossible rather than promised.
3. **The integrity of what is served and of the history.** 0001 §2 makes this
   repository a thing people read in order to judge a method. A defaced page or
   a tampered history damages precisely what the project exists for.
4. **One credential, once it exists: whatever 0011 needs in order to deploy**
   (§8). It does not exist yet, and it is the only thing here that could be
   stolen.

Not assets, because they do not exist and 0001 §5 keeps it that way: accounts,
visitor content, session state, a database, an API key for anything the page
calls.

**The imprint is deliberately not on this list.** It is the operator's own
identity, published on purpose — §7. Something published on purpose cannot be
protected from disclosure, and treating it as though it could is how a record
ends up guarding the wrong party while the real one goes unmentioned.

### 2. The page loads nothing it does not ship

Every byte the page fetches comes from its own origin. No content delivery
network, no third-party font, no external image, no embedded frame, no remote
stylesheet.

Decidable by a command: **no subresource reference in the shipped page names a
scheme or a host.** Not in `src`, not in a stylesheet `href`, not in a CSS
`url()`. Every such reference is a relative path.

**A hyperlink is not a subresource, and this rule does not touch it.** The
imprint and the explanation (0001 §4, 0002 §6) may link off-origin — to this
repository, to the method — because a link fetches nothing until a visitor
chooses to follow it, at which point it is their navigation and not ours.

### 3. No third-party code runs. None

No analytics, no error reporting, no tag manager, no embedded widget, no consent
banner, no hosted font.

Fonts are named explicitly because they are the one people forget: a font served
from another origin is a request that hands that origin the visitor's IP address
and the page they were on, in exchange for a typeface. Whether the page serves
any font file **from its own origin** is 0005's question and is untouched here.

The consent banner is on the list for a reason worth stating: §4 removes the
thing a banner would ask about. A banner on this page would be asking permission
for something that does not happen.

### 4. Nothing is stored on the visitor's device

No cookie, no `localStorage`, no `sessionStorage`, no IndexedDB, no Cache
Storage, no service worker, no `history.pushState` used to carry state.

0001 §5 already puts *anything remembered between visits* out of scope. That is
a statement about the product; this is the mechanism list, and the list is what
a reviewer can actually check a diff against.

### 5. No network request after the page has loaded

Once the document and its subresources are fetched, the page makes no further
request of any kind. `fetch`, `XMLHttpRequest`, `WebSocket`, `EventSource`,
`navigator.sendBeacon`, and any element inserted at runtime that would cause a
fetch.

This is broader than it may look. 0002 §3 forbids the Core to name `fetch`, but
0002 constrains only the Core — the Shell and the View were free to make
requests, and this record is what closes that. There is no telemetry here, and
no mechanism by which telemetry could be added without violating a decision.

### 6. A Content-Security-Policy, delivered in the document

The page carries a policy, delivered as a
`<meta http-equiv="Content-Security-Policy">` element placed as early in
`<head>` as it can be — the specification is explicit that a policy delivered
this way does not apply to content preceding it.

The floor, which may not be relaxed:

```
default-src 'self';
connect-src 'none';
object-src 'none';
base-uri 'none';
form-action 'none'
```

`base-uri` and `form-action` are listed because neither falls back to
`default-src`. `connect-src 'none'` is §5 in a form the browser enforces rather
than a form a reviewer has to notice.

Three constraints on anything added to it later:

- **The only source expressions permitted anywhere in the policy are `'self'`
  and `'none'`.** No scheme, no host, no wildcard. This is §2 and §3 expressed
  where a browser can act on them, and it is the part that may not be widened
  without superseding this record.
- **`'unsafe-eval'` is never permitted.**
- **`'unsafe-inline'` is never permitted in `script-src`.** In `style-src`, 0005
  may add it if the rendering choice turns out to need it, and must record why.

**This constrains 0011, and here is how.** The `report-uri`, `frame-ancestors`
and `sandbox` directives are not supported in a `meta` element, so the policy
above is everything a static file can deliver by itself. If 0011 chooses a host
that can set response headers, it sends the same policy as a
`Content-Security-Policy` header **as well** — the header is strictly better and
the meta element stays, because a policy that depends on a host nobody has
chosen is a policy that will not exist when the first page ships. This does
**not** become a requirement on which host 0011 may choose; R2 says why.

### 7. The imprint is readable on the page, and it lives here like any other page content

Whatever 0004 decides the imprint must contain:

- **It is readable on the page itself.** Reading it requires no link to this
  repository and no link anywhere else. A link is a step, and a step is a place
  to give up.
- **It lives in the repository**, as part of the page, edited like any other page
  content. **What is rejected is an architecture, not a value**: a placeholder in
  the source that a deploy step fills from something the host holds. A stand-in
  carried in the source until the real value replaces it is page content like any
  other — 0004 §3 carries one — and no second copy is held by a host.
- **It is not confidential.** It exists in order to be read, and nothing here
  treats it as a credential — §8.
- **The published imprint appears in one place.** No copy in the README, none in
  the repository description, none in a decision record, none in a ticket. That is
  [C2](https://github.com/nanatsusaya/agent-driven-development/blob/main/method/rules.md#c2)
  applied to a datum rather than to a fact, and it makes a change of address one
  edit instead of a search. **Three things are not it**: a stand-in value, which
  stops existing when the real one arrives; a string a check looks for, which is a
  fixture rather than an address (0011 §6); and a contact address reached for
  another purpose, such as a security or conduct file, which is a reporting
  channel — 0004's *Consequences* own that cost, and nothing here reduces it.
- **Nothing derived from it is stored, sent or logged**, because nothing here
  could do so — §4 and §5.

### 8. `secrets` names the platform scanner

`method.json` binds the `secrets` authority to
<https://github.com/nanatsusaya/dot-panic/settings/security_analysis>, replacing
`null`. Secret scanning and push protection are both enabled on this repository,
and both run for free on public repositories.

What that covers is exactly what there is to cover. A scanner looks for strings
shaped like credentials, and P1's other half — personal data — has nothing to
guard here: no visitor datum ever enters the project (§4, §5), and the
operator's identity is published on purpose (§7). The one credential this
project will ever hold is 0011's, and it does not exist yet.

**The thing to watch is the day that stops being true.** A later record that
introduces an input, a stored value or an outbound request makes this section
wrong, and it will not announce itself as a privacy change — it will arrive as a
feature.

## Consequences

**Positive.**

- §2 to §5 are prohibitions with no exception clause, which makes them cheap to
  review: a diff either introduces one of the named mechanisms or it does not.
- §6 gives the browser a copy of §2, §3 and §5, so the first violation fails
  visibly at runtime rather than waiting for someone to notice it in a diff.
- No consent banner, no cookie notice, no privacy-policy surface has to be
  built, because §4 and §5 remove what they would be about. 0004 inherits a
  much smaller question than it would have.
- 0005 and 0009 arrive at a field that is already fenced, rather than having to
  reason about third-party code themselves.

**Negative, and these are real.**

- **§2 and §3 will at some point cost something visible.** The first time a
  typeface or a ready-made component would obviously improve the page, this
  record is what forbids it, and the argument for an exception will be a good
  one. There is no exception mechanism here on purpose; the way to get one is to
  supersede this record.
- **§6's floor may collide with 0005.** A canvas renderer will not care; a
  DOM-based one that sets styles from script may need `'unsafe-inline'` for
  `style-src`, which is a real weakening even though it is the permitted one.
  This record cannot know which, because 0005 is not written.
- **§6 without `frame-ancestors` leaves the page embeddable by anyone.** Accepted
  knowingly in R2 rather than passed over.
- **§7 puts a real postal address on a public page and into a public history,
  permanently.** That follows from 0001 §4 rather than from this record, but this
  is where it stops being abstract, and it is the one thing here that superseding
  a decision cannot undo.
- **Nothing here is enforced today.** There is no page, no build and no check to
  run any of it against, and the toolchain that could is 0009. Every rule in
  this record is carried by review until then — which is the honest state, not a
  gap to be papered over.

## Alternatives considered

- **Say nothing, on the grounds that a static page has no attack surface.**
  Rejected by the ticket's own opening argument: an unstated assumption is
  indistinguishable from an unexamined one, and everything below is a
  prohibition that costs nothing now and cannot be retrofitted.
- **A full threat model with actors, attack trees and a risk matrix.** Rejected
  under [A3](https://github.com/nanatsusaya/agent-driven-development/blob/main/method/rules.md#a3):
  ceremony scaled to a system that does not have the assets to justify it, in a
  project whose top-ranked failure is documentation a reader learns nothing
  from.
- **Permit one third-party font from a well-known provider.** Rejected because
  it would make §4 and §5 true in letter only — the request happens before any
  script runs, carries the visitor's address, and is invisible to every rule
  that talks about what the page *does*.
- **Permit anonymized analytics.** Rejected because no decision in this project
  would be made differently for knowing the visitor count, and 0001 §2 says the
  product is secondary. Collecting something nobody will act on is the whole
  definition of collecting too much.
- **Deliver the policy only as a response header.** Rejected because the host is
  0011's and is not chosen; the policy would be a plan rather than a fact.
- **Deliver the policy only in the document and never as a header.** Rejected
  because it would foreclose `frame-ancestors` permanently for no gain. The meta
  element is the floor, not the ceiling.
- **Leave `"secrets": null` and record it as an adaptation.** Rejected because
  the scanner exists and is switched on. Declaring the role unused would be
  false in a file whose only job is to be true.

## Resolved questions

**R1 — The imprint lives here and is readable on the page. P1 is not narrowed,
because it was never the rule in question.**

The first draft asked where the text should live and recommended narrowing P1 by
a recorded adaptation. Its argument was that git already writes a real name and
a real email address into every commit — which it does, in the author and the
committer field, since the first one — so the literal rule had never held.

The observation is true and it was attached to the wrong question. It treated
two parties as one. **The person responsible for a published project is attached
to it by name on purpose**, and P1 does not protect that: P1's stated reason is
that a pushed secret is compromised the moment it exists in the history, and an
identity published deliberately cannot be compromised by being published.
**What P1 protects here is the visitor** — an address, a cookie, a count — and
none of that ever enters the project, because §4 and §5 leave no mechanism by
which it could.

So nothing is narrowed. `method.json` records no adaptation, P1 stands as
written, and the distinction is now in *Context* so the next session does not
have to rediscover it. The near miss is the part worth keeping: the draft was
one review away from paying a permanent method adaptation to solve a problem
that did not exist.

The two alternatives fail on their own terms as well. A placeholder with
deploy-time injection buys a build step and a host secret in order to hide
something that is published on purpose. A link to an imprint hosted elsewhere
makes reading it a second step — and a step is a place to give up.

**R2 — 0011 is not required to choose a host that can set response headers.**
`frame-ancestors` cannot be delivered in a `meta` element, so a static file
cannot forbid framing by itself. It stays undelivered rather than narrowing the
field 0011 chooses from: clickjacking needs an action worth tricking somebody
into, and §1's asset list contains none — no form, no button, no session, no
stored state. §6 still sends the policy as a header wherever the host can, so a
host that supports it gains this at no cost. The argument for the other answer
was authorship rather than security — a framed page is a copy presented as
somebody else's — and it was not judged worth constraining a record that is not
yet written.

## Amendments

**A1 — two bullets in §7 name what they reject. 2026-08-05.**

§7's second bullet read:

> **It lives in the repository**, as part of the page, edited like any other page
> content. No placeholder, no injection at deploy time, no second copy held by a
> host.

Its fourth read:

> **It appears in one place.** No copy in the README, none in the repository
> description, none in a decision record, none in a ticket. That is C2 applied to
> a datum rather than to a fact, and it makes a change of address one edit
> instead of a search.

**No decision changes.** Both bullets forbid what they forbade. What is added is
the boundary each already had, stated somewhere other than here.

**The second bullet was misread three times.** During the audits of 2026-08-02
and 2026-08-03, three independent professional readers read this section three
different ways: one called 0004 §3's stand-in a release blocker; one read *none
in a decision record* against that same stand-in; one read *none in a ticket*
against the contact address in
[#38](https://github.com/nanatsusaya/dot-panic/issues/38). Each dissolves on a
full read, and R1 is where — what it rejects is *a placeholder with deploy-time
injection*, which is an architecture. Three stumbles over one section is evidence
about the wording rather than about the readers.

**The fourth bullet was the one actually failing.** Read literally it is failed
today by things nobody treats as defects: `Musterstadt` is in this project's
records because 0004 §3 names the stand-in and 0011 §6 makes the same string a
check's target, and the contact address is in two files under `.github/` because
0004 §2 put conventional contact notes there. Each is excused by an argument in a
different record — the pattern
[0005](0005-rendering-and-visual-design.md) R2 names as the wrong route: *a
record that supersedes §3.4, never a reinterpretation inside a later record*. So
the exceptions move into the bullet that states the rule.

**Nothing else changes.** §1 through §6 and §8 stand as accepted, R1 and R2 are
untouched, and the imprint model — a stand-in in the source until
[#90](https://github.com/nanatsusaya/dot-panic/issues/90) replaces it, with
publishing gated on the real value — belongs to 0003, 0004 and 0011 together and
was not in question.

**The C2 link keeps the method's old name**, like the other four in this record.
That is not this change's to fix: those records keep it because a record is
immutable, GitHub's redirect holds the links, and finishing the rename is its own
change.

Authorized by Daniel on 2026-08-05, against
[#134](https://github.com/nanatsusaya/dot-panic/issues/134) — which is itself the
answer to an offer made in the comment on
[PR #52](https://github.com/nanatsusaya/dot-panic/pull/52) and left unanswered
since: *"0003 §7's strictness is unresolved as a rule, only as a reading."* The
recommendation was this amendment over changing nothing and over superseding §7,
because the misreadings ask for a rule that explains itself rather than for a
different rule; and extended to both bullets rather than the one the ticket
scoped, because repairing one would have closed the case on the worse half:
*"wir folgen deiner empfehlung bei beiden."*

## References

- [Content Security Policy Level 3, §3.3 *The `meta` element*, W3C](https://www.w3.org/TR/CSP3/)
  — that `report-uri`, `frame-ancestors` and `sandbox` are unsupported in a
  `meta` element, and that a policy delivered there does not apply to content
  preceding it. Read 2026-08-02.
- [*About secret scanning*, GitHub Docs](https://docs.github.com/en/code-security/secret-scanning/introduction/about-secret-scanning)
  — that it runs for free on public repositories. Read 2026-08-02.
- [P1, A3 and C2 in the rule catalog](https://github.com/nanatsusaya/agent-driven-development/blob/main/method/rules.md),
  agent-driven-development — P1's *Why* is what R1 turns on. Read 2026-08-02.
- [0001](0001-purpose-scope-and-success.md) — purpose, scope and success. Read
  2026-08-02.
- [0002](0002-overall-architecture.md) — the three parts, and what the Core may
  not name. Read 2026-08-02.
- [Ticket #7](https://github.com/nanatsusaya/dot-panic/issues/7) — the scope this
  record is written against, and the comment that widened it. Read 2026-08-02.

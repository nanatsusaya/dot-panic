# 0003 — Security and privacy by design

- **Status:** Proposed
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
an imprint carries a real name and a postal address. The ticket was written on
the assumption that this project handles no personal data at all, and that
assumption was the whole of the small-attack-surface argument.

**Repository state at the time of writing.** No code, no page, no runtime, no
deployment, no host chosen. Three records accepted. The repository is public.
`method.json` declares `"authorities": { "secrets": null }`, on the grounds that
a static toy has nothing to protect.

**One thing found while writing this, because it changes the shape of the
question.** Every commit in this repository already carries a real name and a
real email address, in both the author and the committer field, and has done
since the first one. Git puts it there, the repository is public, and the
history is not rewritable in any sense that matters. The literal reading of
[P1](https://github.com/nanatsusaya/agent-driven-development/blob/main/method/rules.md#p1)
— *no personal datum is ever committed* — therefore has not held here since
commit one, and nothing available to this record can make it hold. What follows
from that is O1, and it is not this record's to answer.

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
4. **One personal datum: the imprint** (§7).
5. **One credential, once it exists: whatever 0011 needs in order to deploy**
   (§8). It does not exist yet.

Not assets, because they do not exist and 0001 §5 keeps it that way: accounts,
visitor content, session state, a database, an API key for anything the page
calls.

Items 4 and 5 are the entire list of things this project is trusted with, and
both arrived from decisions made after the ticket was written.

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
chosen is a policy that will not exist when the first page ships. Whether the
missing `frame-ancestors` is worth requiring such a host is O2.

### 7. The imprint appears exactly once, and it is not a secret

Whatever 0004 decides the imprint must contain:

- **It is not confidential.** It exists in order to be read. Nothing here treats
  it as a credential, and §8 says what that means for scanning.
- **It appears in one place.** No copy in the README, none in the repository
  description, none in a decision record, none in a ticket. This is
  [C2](https://github.com/nanatsusaya/agent-driven-development/blob/main/method/rules.md#c2)
  applied to a datum rather than to a fact, and it is what keeps the answer to
  O1 a change to one file instead of a search.
- **Nothing derived from it is stored, sent or logged.** There is nothing that
  could do so — §4 and §5.

Where that one place is — the repository, or only the deployed page — is O1.

### 8. `secrets` names the platform scanner, and this record names what it misses

`method.json` binds the `secrets` authority to
<https://github.com/nanatsusaya/dot-panic/settings/security_analysis>, replacing
`null`. Secret scanning and push protection are both enabled on this repository
and run for free on public repositories.

Said plainly, because a declared authority that is trusted for more than it does
is worse than none: **a scanner looks for strings shaped like credentials. It
will not find a postal address.** P1 has two halves, and only the credential
half is automated anywhere. The personal-data half is carried by §7, by O1's
answer, and by review — and by nothing that runs.

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
- **§6 without `frame-ancestors` leaves the page embeddable by anyone.** Named
  in O2 rather than quietly accepted.
- **§8 declares an authority that covers half of what its rule covers.** That is
  better than `null` and it is not good. The half it misses is the half this
  project actually has.
- **Nothing here is enforced today.** There is no page, no build and no check to
  run any of it against, and the toolchain that could is 0009. Every rule in
  this record is carried by review until then — which is the honest state, not a
  gap to be papered over.

## Alternatives considered

- **Say nothing, on the grounds that a static page has no attack surface.**
  Rejected by the ticket's own opening argument, and then by 0001 §4, which put
  a personal datum into a project that was assumed to have none.
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

## Open questions

**O1 — Does the imprint text live in the repository, or only on the deployed
page?**

- **(a) In the repository, like any other page content, with P1 narrowed by a
  recorded adaptation** — P1 protects data whose publication would be a mistake,
  not data published deliberately. **Recommended.** The reason is the finding in
  *Context*: git already writes a real name and a real email address into every
  commit, so (b) and (c) preserve the letter of P1 while the history breaks it
  anyway. A rule already broken by the tool the method requires is one to narrow
  openly under [A1](https://github.com/nanatsusaya/agent-driven-development/blob/main/method/rules.md#a1)
  and [A2](https://github.com/nanatsusaya/agent-driven-development/blob/main/method/rules.md#a2),
  not one to route around. It is also the only option that costs nothing to
  build.
- **(b) A placeholder in the repository, the real text injected at deploy time.**
  Keeps P1 literal, at the price of a build step and a host secret — neither of
  which exists, and both of which belong to 0009 and 0011. It would also make
  the first increment depend on machinery the project has decided nothing about.
- **(c) The page links to an imprint hosted elsewhere.** Cheapest to implement
  and moves the datum out of the project entirely. Whether a linked imprint
  satisfies the obligation is 0004's, so choosing this makes 0003 depend on a
  record that is not written.

**O2 — Does this record require 0011 to choose a host that can set response
headers, so that `frame-ancestors 'none'` can be delivered?**

**Recommended: no.** `frame-ancestors` defends against clickjacking, and
clickjacking needs an action worth tricking somebody into. §1's asset list
contains nothing an embedding page could reach: no form, no button, no session,
no stored state. Requiring a header capability would narrow 0011's field for a
protection with no asset behind it. §6 already says the header is sent if the
host can — this question is only whether that becomes a requirement on the host.

Answering **yes** is defensible on a different ground than security: a page
framed inside someone else's site is a copy of the thing this project exists to
show, presented as theirs.

## References

- [Content Security Policy Level 3, §3.3 *The `meta` element*, W3C](https://www.w3.org/TR/CSP3/)
  — that `report-uri`, `frame-ancestors` and `sandbox` are unsupported in a
  `meta` element, and that a policy delivered there does not apply to content
  preceding it. Read 2026-08-02.
- [*About secret scanning*, GitHub Docs](https://docs.github.com/en/code-security/secret-scanning/introduction/about-secret-scanning)
  — that it runs for free on public repositories. Read 2026-08-02.
- [P1, A1, A2, A3 and C2 in the rule catalog](https://github.com/nanatsusaya/agent-driven-development/blob/main/method/rules.md),
  agent-driven-development. Read 2026-08-02.
- [0001](0001-purpose-scope-and-success.md) — purpose, scope and success. Read
  2026-08-02.
- [0002](0002-overall-architecture.md) — the three parts, and what the Core may
  not name. Read 2026-08-02.
- [Ticket #7](https://github.com/nanatsusaya/dot-panic/issues/7) — the scope this
  record is written against, and the comment that widened it. Read 2026-08-02.

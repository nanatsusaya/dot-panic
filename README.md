# dot-panic

A worked example of
[agent-project-rules](https://github.com/nanatsusaya/agent-project-rules), a
published ruleset for running projects with AI agents. What it builds is a flock
of dots that scatters when your pointer comes near.

## What this is

**The method is the point; the toy is how it is shown.** Every decision was
written down before the code it constrains existed. What *done* meant was fixed
before the work started. The documents are bound to their roles in a file a tool
can read, and a command fails when they stop describing the project. That is
what there is to look at here.

**The toy is deliberately small.** Dots move in a flock. They never stop moving,
they never overlap, they stay inside the frame, and they get out of your way
when you approach with a mouse or a finger. No goal, no score, no ending — a
toy, not a game. That the documentation and a well-written implementation come
first, and the product second, is fixed by
[decision 0001](docs/adr/0001-purpose-scope-and-success.md) rather than left for
each session to weigh again.

## Why a flock

Because a green test suite proves almost nothing here.

The rules of the simulation are easy to test. No two dots overlap. Every dot
keeps moving. Every dot stays inside the frame. The same seed produces the same
run. All of that can pass while what appears on screen looks like twitching
confetti rather than a flock.

That gap — between a passing build and a thing that actually works — is what
this project is built to show. It is also why the condition that matters most
here is settled by a person watching, and by nothing else.

## What to read

In this order, if the method is what you came for.

1. **[docs/adr/0001](docs/adr/0001-purpose-scope-and-success.md)** — what this
   is, who it is for, when it is good enough, and the four ways it can fail,
   ranked so that a later trade-off knows which way to fall.
2. **[docs/adr/](docs/adr/README.md)** — the whole decision set, and the shape a
   record takes here. The index explains why it is ordered by meaning rather
   than by number.
3. **[CLAUDE.md](CLAUDE.md)** — the operating rules: what has to be decided
   before it is built, how a change reaches the trunk, what a comment in the
   code is for.
4. **[docs/method-log.md](docs/method-log.md)** — why the rules look like this.
   An entry exists only where something was learned the hard way, which makes
   it the least polished file here and the most honest.
5. **[docs/STATUS.md](docs/STATUS.md)** — where the work actually stands, and
   the single clearest next step.

[`method.json`](method.json) binds four of these — the decision set, the rules,
the log and the status — to their roles, so a session finds them by reading
rather than by convention. The first is a record inside the second.

## What a command decides, and what it cannot

Four checks. One decides that the documents still describe the project — the
declaration, the artifacts it names, and every link between markdown files. The
other three decide the code: that it type-checks under deliberately bounded
language settings, that it is formatted and linted, and that the tests pass with
the simulation above a coverage floor.

**None of them decides whether it looks right.** That is judged by watching, and
a change touching motion says what was watched and what was seen — which is a
claim a reviewer can disbelieve, and the point is that somebody had to make it.

[CLAUDE.md](CLAUDE.md) carries the four commands and what each one is for.

## Status

The toy runs; nothing is published yet. Beyond that, read
[docs/STATUS.md](docs/STATUS.md) — it is brought current before every session
ends and this section is not, so anything more specific written here would be
wrong within a week.

## License

[MIT](LICENSE).

# dot-panic

A flock of dots that scatters when your pointer comes near.

## What this is

Two things at once, and the second one is the point.

**A small browser toy.** Dots move in a flock. They never stop moving, they
never overlap, they stay inside the frame, and they get out of your way when
you approach with a mouse or a finger. There is no goal, no score and no
ending — this is a toy, not a game.

**A worked example of a method.** It is built under
[agent-project-rules](https://github.com/nanatsusaya/agent-project-rules),
a published ruleset for running projects with AI agents. The interesting
question here is not what gets built but how: which decisions were written
down before any code existed, what "done" meant before the work started, and
which of the claims made about this project a command can actually check.

## Why a flock

Because a green test suite proves almost nothing here.

The rules of the simulation are easy to test. No two dots overlap. Every dot
keeps moving. Every dot stays inside the frame. The same seed produces the
same run. All of that can pass while what appears on screen looks like
twitching confetti rather than a flock.

That gap — between a passing build and a thing that actually works — is what
this project is built to show.

## How this project is run

The method is declared in [`method.json`](method.json), which binds four roles
to four files:

| Question | File |
|---|---|
| How is work done here? | [CLAUDE.md](CLAUDE.md) |
| What was decided, and why? | [docs/adr/](docs/adr/README.md) |
| Where do we stand? | [docs/STATUS.md](docs/STATUS.md) |
| Why does the way we work look like this? | [docs/method-log.md](docs/method-log.md) |

## Status

Nothing is built yet. The method was adopted first, which is the order it asks
for: decide before building. [docs/STATUS.md](docs/STATUS.md) has the position
and the single next step.

## License

[MIT](LICENSE).

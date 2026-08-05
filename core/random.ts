// SplitMix64, written here from the published algorithm. 0013 §5 permits
// taking a named generator's algorithm and §1 forbids taking anyone's file;
// what was consulted is named in the change that produced this, per §7.
//
// It is this generator rather than one of the xoshiro family because its whole
// state is a single 64-bit word. Deriving a generator from a seed — which
// 0002 §4 requires — is then the seed itself, with no second algorithm chosen
// only to expand it.

/** The generator's entire state. A world carries one (0002 §4). */
export type Random = bigint;

const SIXTY_FOUR_BITS = 0xffffffffffffffffn;
const INCREMENT = 0x9e3779b97f4a7c15n;
const FIRST_MULTIPLIER = 0xbf58476d1ce4e5b9n;
const SECOND_MULTIPLIER = 0x94d049bb133111ebn;

// A number carries 53 bits exactly, so a fraction takes the top 53 of the
// generator's 64 and invents nothing below them.
const DISCARDED_BITS = 11n;
const FRACTIONS = 2 ** 53;

/** The generator a seed derives. Any integer is a seed (0002 §4). */
export function randomFromSeed(seed: number): Random {
  return BigInt(seed) & SIXTY_FOUR_BITS;
}

/**
 * One fraction in [0, 1), and the state that follows it. The same state always
 * gives the same pair, which is what lets the world carry the state rather
 * than the generator keep it.
 */
export function nextFraction(random: Random): readonly [number, Random] {
  const next = (random + INCREMENT) & SIXTY_FOUR_BITS;
  const once = ((next ^ (next >> 30n)) * FIRST_MULTIPLIER) & SIXTY_FOUR_BITS;
  const twice = ((once ^ (once >> 27n)) * SECOND_MULTIPLIER) & SIXTY_FOUR_BITS;
  const mixed = twice ^ (twice >> 31n);

  return [Number(mixed >> DISCARDED_BITS) / FRACTIONS, next];
}

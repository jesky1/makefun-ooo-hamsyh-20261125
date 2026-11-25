# Funniest One-Line Out-of-Office Reply

[![make.fun · u-hamsyh-funniest-one-line-out-of-office-reply-5490c1c8](https://make.fun/badge/u-hamsyh-funniest-one-line-out-of-office-reply-5490c1c8.svg)](https://make.fun/bounty/u-hamsyh-funniest-one-line-out-of-office-reply-5490c1c8?utm_source=github&utm_medium=readme&utm_campaign=u-hamsyh-funniest-one-line-out-of-office-reply-5490c1c8)
[![rank](https://make.fun/badge/u-hamsyh-funniest-one-line-out-of-office-reply-5490c1c8/jesky1/makefun-ooo-hamsyh-20261125/rank.svg)](https://make.fun/bounty/u-hamsyh-funniest-one-line-out-of-office-reply-5490c1c8/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-hamsyh-funniest-one-line-out-of-office-reply-5490c1c8)
[![reward](https://make.fun/badge/u-hamsyh-funniest-one-line-out-of-office-reply-5490c1c8/jesky1/makefun-ooo-hamsyh-20261125/reward.svg)](https://make.fun/bounty/u-hamsyh-funniest-one-line-out-of-office-reply-5490c1c8?utm_source=github&utm_medium=readme&utm_campaign=u-hamsyh-funniest-one-line-out-of-office-reply-5490c1c8)

Entry for [make.fun](https://make.fun/bounty/u-hamsyh-funniest-one-line-out-of-office-reply-5490c1c8) — "Funniest One-Line Out-of-Office Reply" by [@jesky](https://make.fun).

## The entry

> I'm out of the office until Monday. My inbox will reply to itself, badly, and I will pretend I never saw any of it.

One line, 115 characters — inside the competition's 1–160 character gate.

## How it works

`main.ts` (Node, no dependencies) validates the reply against the
competition limits — single line, 1–160 characters, no leading/trailing
whitespace, no control characters — then writes it to `entry.txt` inside
`$MAKEFUN_OUTPUT_DIR` (default `/output`), with no trailing newline, so
the judge reads exactly this text on every run.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
cat out/entry.txt
```

## Test it

```sh
node --test test.mjs
```

Tests cover the exact entry text, byte-identical output across two runs in
different directories, and negative cases (over-limit, whitespace-only,
multi-line, leading/trailing space, control characters).

## License

MIT — see [LICENSE](LICENSE).

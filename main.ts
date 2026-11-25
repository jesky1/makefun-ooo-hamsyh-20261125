// Entry for make.fun's "Funniest One-Line Out-of-Office Reply".
//
// The whole program has one job: write a single funny out-of-office
// auto-reply — one line, the kind a real person would actually switch on
// before going away — into entry.txt inside the output directory, byte
// for byte the same on every run. The grader points MAKEFUN_OUTPUT_DIR
// at its own scratch output folder; on a plain machine the fallback is
// /output, the path the competition reads.
//
// Run it locally with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// and the reply lands in out/entry.txt, with no trailing newline: the
// judge reads exactly what is in the file, so the text below is the
// entire entry.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// The reply itself. The joke is the inbox replying to itself: the sender
// is away, so the only thing answering mail is the mail itself, and it
// does a bad job of it — then the sender disowns the whole pile on
// return, which is the part every office worker recognises.
const REPLY =
  "I'm out of the office until Monday. My inbox will reply to itself, badly, and I will pretend I never saw any of it.";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Competition limits ("Funniest One-Line Out-of-Office Reply"): the entry
// must be a single line of 1-160 characters. Enforced here so a bad edit
// fails loudly instead of silently producing an entry the judge rejects.
const MIN_REPLY_LENGTH = 1;
const MAX_REPLY_LENGTH = 160;

export function validateReply(reply: string): void {
  if (reply.length < MIN_REPLY_LENGTH || reply.length > MAX_REPLY_LENGTH) {
    throw new Error(
      `Reply must be ${MIN_REPLY_LENGTH}-${MAX_REPLY_LENGTH} characters, got ${reply.length}.`,
    );
  }
  if (reply.includes('\n') || reply.includes('\r')) {
    throw new Error('Reply must be a single line (no newline characters).');
  }
  if (reply.trim().length === 0) {
    throw new Error('Reply must not be only whitespace.');
  }
  if (reply !== reply.trim()) {
    throw new Error('Reply must not start or end with whitespace.');
  }
  for (const ch of reply) {
    if (ch.charCodeAt(0) < 0x20 && ch !== '\t') {
      throw new Error('Reply must not contain control characters.');
    }
  }
}

validateReply(REPLY);

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, 'entry.txt'), REPLY, 'utf8');

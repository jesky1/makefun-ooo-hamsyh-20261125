import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = fileURLToPath(new URL('.', import.meta.url));

// Importing main.ts runs it (it writes entry.txt), so point its output at
// a scratch dir first; the runMain tests below set their own dir per run.
process.env.MAKEFUN_OUTPUT_DIR = mkdtempSync(join(tmpdir(), 'ooo-import-'));

function runMain(outDir) {
  return spawnSync('node', ['main.ts'], {
    cwd: dir,
    env: { ...process.env, MAKEFUN_OUTPUT_DIR: outDir },
    encoding: 'utf8',
  });
}

test('writes the exact one-line reply, no trailing newline', () => {
  const out = mkdtempSync(join(tmpdir(), 'ooo-out-'));
  try {
    const r = runMain(out);
    assert.equal(r.status, 0, r.stderr);
    const text = readFileSync(join(out, 'entry.txt'), 'utf8');
    assert.equal(
      text,
      "I'm out of the office until Monday. My inbox will reply to itself, badly, and I will pretend I never saw any of it.",
    );
    assert.equal(text.length, 115);
    assert.ok(!text.includes('\n'));
  } finally {
    rmSync(out, { recursive: true, force: true });
  }
});

test('two runs in different dirs are byte-identical', () => {
  const a = mkdtempSync(join(tmpdir(), 'ooo-a-'));
  const b = mkdtempSync(join(tmpdir(), 'ooo-b-'));
  try {
    assert.equal(runMain(a).status, 0);
    assert.equal(runMain(b).status, 0);
    assert.equal(
      readFileSync(join(a, 'entry.txt'), 'utf8'),
      readFileSync(join(b, 'entry.txt'), 'utf8'),
    );
  } finally {
    rmSync(a, { recursive: true, force: true });
    rmSync(b, { recursive: true, force: true });
  }
});

test('validator rejects an over-limit line', async () => {
  const { validateReply } = await import('./main.ts');
  assert.throws(() => validateReply('x'.repeat(161)), /160 characters/);
});

test('validator rejects whitespace-only and multi-line input', async () => {
  const { validateReply } = await import('./main.ts');
  assert.throws(() => validateReply('   '), /only whitespace/);
  assert.throws(() => validateReply('one\ntwo'), /single line/);
});

test('validator rejects leading/trailing space and control characters', async () => {
  const { validateReply } = await import('./main.ts');
  assert.throws(() => validateReply(' padded.'), /start or end with whitespace/);
  assert.throws(() => validateReply('a\u0007b'), /control characters/);
});

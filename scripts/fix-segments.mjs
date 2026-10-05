// Works around a Next.js static-export bug on Windows: segment prefetch files are written with
// backslash paths (out/en/__next.!X/en/__PAGE__.txt) instead of flat names (out/en/__next.!X.en.__PAGE__.txt),
// so the client router's prefetches 404. Flattens them. No-op on Linux/macOS builds.
import { readdirSync, statSync, renameSync, rmSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const files = (dir) => readdirSync(dir).flatMap((n) => (statSync(join(dir, n)).isDirectory() ? files(join(dir, n)) : [join(dir, n)]));

let moved = 0;
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (!statSync(p).isDirectory()) continue;
    if (!name.startsWith('__next.')) { walk(p); continue; }
    for (const f of files(p)) {
      renameSync(f, join(dir, name + '.' + relative(p, f).split(sep).join('.')));
      moved++;
    }
    rmSync(p, { recursive: true });
  }
})('out');
console.log(`fix-segments: flattened ${moved} prefetch files`);

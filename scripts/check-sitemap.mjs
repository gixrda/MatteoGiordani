// Build guard: every page in out/ must be in out/sitemap.xml, unless it is noindex.
// Catches a page added to app/ without an entry in INDEXABLE_PAGES (lib/meta.ts). Blog posts are listed automatically.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const OUT = 'out';
const sitemap = readFileSync(join(OUT, 'sitemap.xml'), 'utf8');
const listed = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname));

const pages = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) { if (!name.startsWith('_')) walk(p); continue; }
    if (name === 'index.html') pages.push(p);
  }
})(OUT);

const missing = pages
  .filter((f) => !/<meta name="robots" content="[^"]*noindex/.test(readFileSync(f, 'utf8')))
  .map((f) => '/' + relative(OUT, f).split(sep).slice(0, -1).map((s) => s + '/').join(''))
  .filter((path) => !['/404/'].includes(path) && !listed.has(path));

if (missing.length) {
  console.error(`check-sitemap: ${missing.length} indexable page(s) missing from sitemap.xml:\n  ${missing.join('\n  ')}\nAdd them to INDEXABLE_PAGES in lib/meta.ts.`);
  process.exit(1);
}
console.log(`check-sitemap: ${listed.size} URLs, every indexable page listed`);

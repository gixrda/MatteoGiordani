import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import type { ComponentType } from 'react';
import type { Locale } from './routes';

/**
 * Blog posts are MDX files in content/blog/<locale>/<slug>.mdx (Next.js MDX guide, dynamic imports).
 * The file name is the URL slug; the same file name in both locales pairs the translations (hreflang).
 * Every post exports its metadata:
 *   export const metadata = { title: '…', description: '…', date: '2026-10-20', tag: 'SEO' }
 * Optional: `updated` (ISO date, drives the sitemap lastmod) and `draft: true` (built nowhere: no page, no list, no sitemap).
 * Files starting with `_` are templates and always ignored (content/blog/it/_modello.mdx, en/_template.mdx).
 */
export type PostMeta = { title: string; description: string; date: string; updated?: string; tag?: string; draft?: boolean };
export type Post = PostMeta & { slug: string; locale: Locale };

const DIR = join(process.cwd(), 'content', 'blog');

function slugs(l: Locale): string[] {
  try {
    return readdirSync(join(DIR, l)).filter((f) => f.endsWith('.mdx') && !f.startsWith('_')).map((f) => f.slice(0, -4));
  } catch {
    return []; // no folder yet: no posts
  }
}

export async function loadPost(l: Locale, slug: string): Promise<Post & { Content: ComponentType }> {
  const mod = await import(`@/content/blog/${l}/${slug}.mdx`);
  return { ...(mod.metadata as PostMeta), slug, locale: l, Content: mod.default };
}

/** Published posts, newest first. Used by the post routes, the blog index, the home cards and the sitemap. */
export async function getPosts(l: Locale): Promise<Post[]> {
  const all = await Promise.all(slugs(l).map((s) => loadPost(l, s)));
  return all
    .filter((p) => !p.draft)
    .map(({ Content: _, ...p }) => p)
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** Published slugs per locale, to pair translations (hreflang). */
export async function publishedSlugs(): Promise<Record<Locale, string[]>> {
  const [it, en] = await Promise.all([getPosts('it'), getPosts('en')]);
  return { it: it.map((p) => p.slug), en: en.map((p) => p.slug) };
}

/**
 * generateStaticParams for the post routes. `output: 'export'` refuses an empty list, so while a locale has no
 * published post the route builds one placeholder that renders the 404 page (noindex, linked from nowhere).
 * ponytail: placeholder path /blog/_/ exists only until the first post is published, then disappears on its own.
 */
export async function postParams(l: Locale): Promise<{ slug: string }[]> {
  const posts = await getPosts(l);
  return posts.length ? posts.map((p) => ({ slug: p.slug })) : [{ slug: '_' }];
}

export async function isPublished(l: Locale, slug: string): Promise<boolean> {
  return (await getPosts(l)).some((p) => p.slug === slug);
}

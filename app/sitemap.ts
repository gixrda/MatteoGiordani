import type { MetadataRoute } from 'next';
import { INDEXABLE_PAGES, pathFor, postLanguages } from '@/lib/meta';
import { getPosts, publishedSlugs } from '@/lib/posts';
import { href, LOCALES } from '@/lib/routes';
import { SITE_URL } from '@/lib/site';

// Generated at build time (static export). Pages come from INDEXABLE_PAGES, posts from content/blog:
// a new post appears here, in its route and in the blog index on the next build, with no list to update.
// scripts/check-sitemap.mjs then fails the build if any built page is missing from this file.
export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = INDEXABLE_PAGES.flatMap((k) =>
    LOCALES.map((l) => ({
      url: SITE_URL + pathFor(l, k),
      alternates: { languages: { it: SITE_URL + pathFor('it', k), en: SITE_URL + pathFor('en', k), 'x-default': SITE_URL + pathFor('it', k) } },
    })),
  );

  const published = await publishedSlugs();
  const posts = (await Promise.all(LOCALES.map(getPosts))).flat().map((p) => ({
    url: SITE_URL + href.post(p.locale, p.slug),
    lastModified: p.updated ?? p.date,
    alternates: { languages: postLanguages(p.slug, published) },
  }));

  return [...pages, ...posts];
}

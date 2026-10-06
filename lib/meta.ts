import type { Metadata } from 'next';
import { getDict } from './i18n';
import { href, LOCALES, PROJECT_SLUGS, SERVICE_SLUGS, type Locale, type ProjectSlug, type ServiceSlug } from './routes';
import type { Post } from './posts';
import { PERSON, SITE_URL } from './site';
import { plain } from '@/components/Rich';

export type PageKey =
  | { page: 'home' | 'about' | 'insights' | 'contact' | 'privacy' }
  | { page: 'service'; slug: ServiceSlug }
  | { page: 'work'; slug: ProjectSlug };

/** Every indexable page with fixed content. Blog posts are added from content/blog by the sitemap. Privacy is noindex. */
export const INDEXABLE_PAGES: PageKey[] = [
  { page: 'home' },
  ...SERVICE_SLUGS.map((slug) => ({ page: 'service' as const, slug })),
  ...PROJECT_SLUGS.map((slug) => ({ page: 'work' as const, slug })),
  { page: 'about' },
  { page: 'insights' },
  { page: 'contact' },
];

export function pathFor(l: Locale, k: PageKey): string {
  switch (k.page) {
    case 'service': return href.service(l, k.slug);
    case 'work': return href.work(l, k.slug);
    default: return href[k.page](l);
  }
}

function text(l: Locale, k: PageKey): { title: string; description: string } {
  const t = getDict(l);
  switch (k.page) {
    case 'home': return { title: t.meta.homeTitle, description: t.meta.homeDescription };
    case 'service': return { title: t.services[k.slug].metaTitle, description: t.services[k.slug].metaDescription };
    case 'work': return { title: t.projects[k.slug].metaTitle, description: t.projects[k.slug].metaDescription };
    case 'about': return { title: t.about.metaTitle, description: t.about.metaDescription };
    case 'insights': return { title: t.insights.metaTitle, description: t.insights.metaDescription };
    case 'contact': return { title: t.contact.metaTitle, description: t.contact.metaDescription };
    case 'privacy': return { title: t.privacy.metaTitle, description: plain(t.privacy.body) };
  }
}

/** Unique title + description, canonical, hreflang (x-default → Italian), Open Graph (spec §4.3, §10.2). */
export function pageMeta(l: Locale, k: PageKey): Metadata {
  const { title, description } = text(l, k);
  const url = SITE_URL + pathFor(l, k);
  return {
    metadataBase: new URL(SITE_URL),
    title: { absolute: title },
    description,
    alternates: {
      canonical: url,
      languages: { it: SITE_URL + pathFor('it', k), en: SITE_URL + pathFor('en', k), 'x-default': SITE_URL + pathFor('it', k) },
    },
    openGraph: { type: 'website', url, title, description, siteName: PERSON.name, locale: l === 'it' ? 'it_IT' : 'en_GB' },
    twitter: { card: 'summary_large_image', title, description },
    robots: k.page === 'privacy' ? { index: false, follow: true } : undefined,
  };
}

/** Translations of a post: the locales that publish the same slug. */
export function postLanguages(slug: string, published: Record<Locale, string[]>): Partial<Record<Locale | 'x-default', string>> {
  const langs: Partial<Record<Locale | 'x-default', string>> = {};
  for (const l of LOCALES) if (published[l].includes(slug)) langs[l] = SITE_URL + href.post(l, slug);
  langs['x-default'] = langs.it ?? langs.en;
  return langs;
}

/** Same shape as pageMeta, for a blog post (Open Graph type article). */
export function postMeta(p: Post, published: Record<Locale, string[]>): Metadata {
  const url = SITE_URL + href.post(p.locale, p.slug);
  return {
    metadataBase: new URL(SITE_URL),
    title: { absolute: `${p.title} · ${PERSON.name}` },
    description: p.description,
    alternates: { canonical: url, languages: postLanguages(p.slug, published) },
    openGraph: {
      type: 'article', url, title: p.title, description: p.description, siteName: PERSON.name,
      locale: p.locale === 'it' ? 'it_IT' : 'en_GB', publishedTime: p.date, modifiedTime: p.updated ?? p.date, authors: [PERSON.name],
    },
    twitter: { card: 'summary_large_image', title: p.title, description: p.description },
  };
}

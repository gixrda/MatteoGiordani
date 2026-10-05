import type { Metadata } from 'next';
import { getDict } from './i18n';
import { href, type Locale, type ProjectSlug, type ServiceSlug } from './routes';
import { PERSON, SITE_URL } from './site';
import { plain } from '@/components/Rich';

export type PageKey =
  | { page: 'home' | 'about' | 'insights' | 'contact' | 'privacy' }
  | { page: 'service'; slug: ServiceSlug }
  | { page: 'work'; slug: ProjectSlug };

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

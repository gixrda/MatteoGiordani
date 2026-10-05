import type { MetadataRoute } from 'next';
import { pathFor, type PageKey } from '@/lib/meta';
import { PROJECT_SLUGS, SERVICE_SLUGS } from '@/lib/routes';
import { SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';

const PAGES: PageKey[] = [
  { page: 'home' },
  ...SERVICE_SLUGS.map((slug) => ({ page: 'service' as const, slug })),
  ...PROJECT_SLUGS.map((slug) => ({ page: 'work' as const, slug })),
  { page: 'about' },
  { page: 'insights' },
  { page: 'contact' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.flatMap((k) =>
    (['it', 'en'] as const).map((l) => ({
      url: SITE_URL + pathFor(l, k),
      alternates: { languages: { it: SITE_URL + pathFor('it', k), en: SITE_URL + pathFor('en', k) } },
    })),
  );
}

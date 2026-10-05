export type Locale = 'it' | 'en';
export const LOCALES: Locale[] = ['it', 'en'];

export type ServiceSlug = 'seo' | 'performance' | 'front-end';
export type ProjectSlug = 'ezdirect' | 'trainly' | 'the-butcher';
export const SERVICE_SLUGS: ServiceSlug[] = ['seo', 'performance', 'front-end'];
export const PROJECT_SLUGS: ProjectSlug[] = ['ezdirect', 'trainly', 'the-butcher'];

// Localised path segments (spec §4.3). [confirm IT slugs]
const SEG = {
  services: { it: 'servizi', en: 'services' },
  work: { it: 'lavori', en: 'work' },
  about: { it: 'chi-sono', en: 'about' },
  insights: { it: 'insights', en: 'insights' },
  contact: { it: 'contatti', en: 'contact' },
  privacy: { it: 'privacy', en: 'privacy' },
} as const;

const base = (l: Locale) => (l === 'it' ? '/' : '/en/');

export const href = {
  home: (l: Locale) => base(l),
  service: (l: Locale, s: ServiceSlug) => `${base(l)}${SEG.services[l]}/${s}/`,
  work: (l: Locale, s: ProjectSlug) => `${base(l)}${SEG.work[l]}/${s}/`,
  about: (l: Locale) => `${base(l)}${SEG.about[l]}/`,
  insights: (l: Locale) => `${base(l)}${SEG.insights[l]}/`,
  contact: (l: Locale) => `${base(l)}${SEG.contact[l]}/`,
  privacy: (l: Locale) => `${base(l)}${SEG.privacy[l]}/`,
};

/** Maps a pathname to the equivalent page in the other locale (language switch keeps context). */
export function swapLocale(pathname: string, to: Locale): string {
  const parts = pathname.split('/').filter(Boolean);
  const from: Locale = parts[0] === 'en' ? 'en' : 'it';
  if (from === 'en') parts.shift();
  if (parts.length) {
    const key = (Object.keys(SEG) as (keyof typeof SEG)[]).find((k) => SEG[k][from] === parts[0]);
    if (key) parts[0] = SEG[key][to];
  }
  const rest = parts.length ? parts.join('/') + '/' : '';
  return base(to) + rest;
}

/** Which nav item a pathname belongs to. */
export function section(pathname: string): 'home' | 'services' | 'work' | 'about' | 'insights' | 'contact' | null {
  const parts = pathname.split('/').filter(Boolean);
  if (parts[0] === 'en') parts.shift();
  if (!parts.length) return 'home';
  const key = (Object.keys(SEG) as (keyof typeof SEG)[]).find((k) => SEG[k].it === parts[0] || SEG[k].en === parts[0]);
  return key && key !== 'privacy' ? key : null;
}

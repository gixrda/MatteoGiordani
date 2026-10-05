import { Instrument_Serif, Hanken_Grotesk, Geist_Mono } from 'next/font/google';
import type { Locale } from '@/lib/routes';
import { getDict } from '@/lib/i18n';
import { Nav } from './Nav';
import { Footer } from './Footer';
import { RevealObserver } from './RevealObserver';
import { GlowTracker } from './GlowTracker';
import '@/styles/tokens.css';
import '@/styles/base.css';
import '@/styles/components.css';

// `latin` already covers Italian accented letters (Latin-1); latin-ext only added preload weight.
const serif = Instrument_Serif({ weight: '400', style: ['normal', 'italic'], subsets: ['latin'], variable: '--font-serif', display: 'swap' });
const sans = Hanken_Grotesk({ weight: ['400', '500', '600', '700'], subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const mono = Geist_Mono({ weight: ['400', '500'], subsets: ['latin'], variable: '--font-mono', display: 'swap', preload: false });

// Sets the theme before first paint (no flash): saved choice, else the system preference, else dark.
const THEME_SCRIPT = `(function(){var t;try{t=localStorage.getItem('theme')}catch(e){}if(t!=='light'&&t!=='dark'){t=window.matchMedia&&matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.setAttribute('data-theme',t)})()`;

export function Shell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const t = getDict(locale);
  return (
    <html lang={locale} data-theme="dark" className={`${serif.variable} ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <a className="skip" href="#main">{t.ui.skip}</a>
        {t.ui.copyNotice && <p className="notice">{t.ui.copyNotice}</p>}
        <Nav locale={locale} ui={t.ui} />
        <main id="main">{children}</main>
        <Footer locale={locale} />
        <RevealObserver />
        <GlowTracker />
      </body>
    </html>
  );
}

import { useEffect, useState } from 'react';
import { useI18n, type Lang } from '../i18n/I18nContext';
import './Navigation.css';

const LINKS = [
  { href: '#work', key: 'work' },
  { href: '#about', key: 'about' },
  { href: '#contact', key: 'contact' },
] as const;

const LANGS: Lang[] = ['it', 'en'];

/** IT / EN switch, shared by the bar and the mobile panel. */
function LangSwitch({ className }: { className: string }) {
  const { lang, setLang, t } = useI18n();
  return (
    <div className={className} role="group" aria-label={t.nav.language}>
      {LANGS.map((l, i) => (
        <span key={l} className="lang-switch__item">
          {i > 0 && <span aria-hidden>/</span>}
          <button type="button" lang={l} aria-pressed={lang === l} onClick={() => setLang(l)}>
            {l.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}

/**
 * Thin, fixed navigation. It uses difference blending so it stays legible
 * over every scene of the narrative — ivory, navy and everything between —
 * without any scroll logic.
 */
export function Navigation() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <header className="nav">
        <a className="nav__brand" href="#top">
          Matteo Giordani
        </a>
        <nav className="nav__links" aria-label={t.nav.primary}>
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {t.nav.links[l.key]}
            </a>
          ))}
        </nav>
        <LangSwitch className="nav__lang lang-switch" />
        <button
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="nav-panel"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? t.nav.close : t.nav.menu}
        </button>
      </header>

      <div id="nav-panel" className={`nav-panel${open ? ' is-open' : ''}`} hidden={!open}>
        <nav aria-label={t.nav.mobile}>
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {t.nav.links[l.key]}
            </a>
          ))}
        </nav>
        <LangSwitch className="nav-panel__lang lang-switch" />
      </div>
    </>
  );
}

import { useEffect, useState } from 'react';
import './Navigation.css';

const LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#insights', label: 'Insights' },
  { href: '#contact', label: 'Contact' },
];

/**
 * Thin, fixed navigation. It uses difference blending so it stays legible
 * over every scene of the narrative — ivory, navy and everything between —
 * without any scroll logic.
 */
export function Navigation() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<'it' | 'en'>('en');

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
        <nav className="nav__links" aria-label="Primary">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="nav__lang" role="group" aria-label="Language">
          <button type="button" aria-pressed={lang === 'it'} onClick={() => setLang('it')}>
            IT
          </button>
          <span aria-hidden>/</span>
          <button type="button" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>
            EN
          </button>
        </div>
        <button
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="nav-panel"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </header>

      <div id="nav-panel" className={`nav-panel${open ? ' is-open' : ''}`} hidden={!open}>
        <nav aria-label="Mobile">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
        </nav>
        <p className="label">IT / EN</p>
      </div>
    </>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { href, section, swapLocale, type Locale } from '@/lib/routes';
import { bookHref } from '@/lib/site';
import type { Dict } from '@/content/en';
import { Icon } from './Icon';
import { ThemeToggle } from './ThemeToggle';

export function Nav({ locale, ui }: { locale: Locale; ui: Dict['ui'] }) {
  const pathname = usePathname() || '/';
  const current = section(pathname);
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [open]);

  const links = [
    { key: 'home', label: ui.nav.home, to: href.home(locale) },
    { key: 'services', label: ui.nav.services, to: href.service(locale, 'seo') },
    { key: 'work', label: ui.nav.work, to: `${href.home(locale)}#work` },
    { key: 'about', label: ui.nav.about, to: href.about(locale) },
    { key: 'insights', label: ui.nav.insights, to: href.insights(locale) },
  ] as const;

  const lang = (
    <span className="lang" aria-label={ui.language}>
      {(['it', 'en'] as const).map((l, i) => (
        <span key={l}>
          {i > 0 && <span aria-hidden="true"> · </span>}
          {l === locale ? (
            <span className="lang-cur" aria-current="true">{l.toUpperCase()}</span>
          ) : (
            <Link href={swapLocale(pathname, l)} hrefLang={l} lang={l}>{l.toUpperCase()}</Link>
          )}
        </span>
      ))}
    </span>
  );

  return (
    <header className="nav-wrap">
      <nav className="nav" aria-label={ui.navLabel}>
        <div className="nav-left">
          <Link href={href.home(locale)} className="mono-mark" aria-label="MG, Matteo Giordani: home">MG</Link>
          <ThemeToggle label={ui.lightTheme} />
        </div>
        <ul className="nav-links">
          {links.map((l) => (
            <li key={l.key}>
              <Link href={l.to} aria-current={current === l.key ? 'page' : undefined}>{l.label}</Link>
            </li>
          ))}
          <li>{lang}</li>
        </ul>
        <div className="nav-right">
          <Link href={bookHref(locale)} className="btn btn-primary btn-sm">
            <Icon name="chat" />
            {ui.navCta}
          </Link>
          <button className="nav-menu" aria-expanded={open} aria-controls="nav-sheet" onClick={() => setOpen((o) => !o)}>
            <Icon name={open ? 'x' : 'menu'} size={20} />
            <span className="vh">{open ? ui.close : ui.menu}</span>
          </button>
        </div>
      </nav>
      <div id="nav-sheet" className="nav-sheet" hidden={!open}>
        <ul>
          {links.map((l) => (
            <li key={l.key}>
              <Link href={l.to} aria-current={current === l.key ? 'page' : undefined} onClick={() => setOpen(false)}>{l.label}</Link>
            </li>
          ))}
        </ul>
        {lang}
      </div>
    </header>
  );
}

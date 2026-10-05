// Small server-rendered building blocks shared by several pages.
import Link from 'next/link';
import type { Locale } from '@/lib/routes';
import { href } from '@/lib/routes';
import { getDict } from '@/lib/i18n';
import { PERSON, SITE_URL, bookHref } from '@/lib/site';
import { Icon } from './Icon';
import { Rich } from './Rich';
import { JsonLd } from './JsonLd';

export function BookButton({ locale, className = 'btn btn-primary', icon = 'arrow-right' }: { locale: Locale; className?: string; icon?: 'arrow-right' | 'arrow-up-right' | 'calendar' }) {
  const t = getDict(locale);
  return (
    <Link href={bookHref(locale)} className={className}>
      {icon === 'calendar' && <Icon name="calendar" />}
      {t.ui.book}
      {icon !== 'calendar' && <Icon name={icon} className={icon === 'arrow-right' ? 'nudge' : 'nudge-up'} />}
    </Link>
  );
}

/** Section title + text, header block (spec §5.4). */
export function SecHead({ title, text, children, id, as: H = 'h2' }: { title: string; text?: string; children?: React.ReactNode; id?: string; as?: 'h1' | 'h2' }) {
  return (
    <div className="sec-head reveal">
      <H className={H === 'h1' ? 'd-l' : 'd-m'} id={id}><Rich text={title} /></H>
      {(text || children) && (
        <div>
          {text && <p className="body"><Rich text={text} /></p>}
          {children}
        </div>
      )}
    </div>
  );
}

export type Crumb = { name: string; href?: string };

export function Breadcrumb({ items, children }: { items: Crumb[]; children?: React.ReactNode }) {
  return (
    <div className="crumbs-row">
      <nav aria-label="Breadcrumb" className="crumbs">
        <ol>
          {items.map((c, i) => (
            <li key={i}>
              {i > 0 && <span aria-hidden="true">›</span>}
              {c.href ? <Link href={c.href}>{c.name}</Link> : <span aria-current="page">{c.name}</span>}
            </li>
          ))}
        </ol>
      </nav>
      {children}
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: items.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, ...(c.href ? { item: SITE_URL + c.href } : {}) })),
        }}
      />
    </div>
  );
}

/** Ink panel with BuildObject state 5 bleeding off the right edge (service + project pages). */
export function CtaPanel({ locale, title, text, visual }: { locale: Locale; title: string; text: string; visual?: React.ReactNode }) {
  const t = getDict(locale);
  return (
    <section className="sec" aria-labelledby="cta-panel-title">
      <div className="wrap">
        <div className="cta-panel">
          <div className="cta-panel-copy">
            <h2 id="cta-panel-title" className="d-m"><Rich text={title} /></h2>
            <p><Rich text={text} /></p>
            <div className="btn-row">
              <BookButton locale={locale} className="btn btn-on-ink" icon="arrow-up-right" />
              <a href={`mailto:${PERSON.email}`} className="btn btn-ghost-ink">{t.ui.emailMe}</a>
            </div>
          </div>
          {visual && <div className="cta-panel-visual" aria-hidden="true">{visual}</div>}
        </div>
      </div>
    </section>
  );
}

/** Media placeholder (§6.17) until real assets exist. */
export function Slot({ label, note = 'screenshot to add', className = '', style }: { label: string; note?: string; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`slot ${className}`} style={style} role="img" aria-label={`${label} (${note})`}>
      <b>{label}</b>
      <span className="mono">{note}</span>
    </div>
  );
}

export function BrowserFrame({ url, children, className = '' }: { url: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`bframe ${className}`}>
      <div className="bframe-bar" aria-hidden="true"><i /><i /><i /><span className="mono">{url}</span></div>
      {children}
    </div>
  );
}

export function PhoneFrame({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`phone ${className}`}><div className="phone-screen">{children}</div></div>;
}

export const homeWorkHref = (l: Locale) => `${href.home(l)}#work`;

export const PHOTOS = {
  portrait: { src: '/img/matteopfp.jpg', w: 400, h: 400 },
  office: { src: '/img/matteoufficio.webp', w: 1200, h: 1200 },
  cafe: { src: '/img/matteocaffe.webp', w: 1200, h: 998 },
};

/** One of Matteo's photos: the frame carries size/shape (className), the clip holds the hover zoom, the glow sits underneath. */
export function Photo({ photo = 'portrait', alt, className = '', priority }: { photo?: keyof typeof PHOTOS; alt: string; className?: string; priority?: boolean }) {
  const p = PHOTOS[photo];
  return (
    <span className={`photo-frame ${className}`}>
      <span className="photo-clip">
        <img
          src={p.src}
          alt={alt}
          width={p.w}
          height={p.h}
          className="photo"
          {...(priority ? { fetchPriority: 'high' as const } : { loading: 'lazy' as const, decoding: 'async' as const })}
        />
      </span>
    </span>
  );
}

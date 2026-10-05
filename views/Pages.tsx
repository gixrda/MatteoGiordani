// About, Insights, Contact and Privacy pages (spec §9.2), built from the same system.
import { getDict } from '@/lib/i18n';
import { href, type Locale } from '@/lib/routes';
import { PERSON, SITE_URL } from '@/lib/site';
import { Breadcrumb, CtaBand, Photo } from '@/components/Blocks';
import { JsonLd } from '@/components/JsonLd';
import { Rich } from '@/components/Rich';
import { ContactBlock, InsightCards } from './HomeView';
import '@/styles/home.css';

const crumbs = (locale: Locale, name: string) => [{ name: getDict(locale).ui.breadcrumbHome, href: href.home(locale) }, { name }];

export function AboutView({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const a = t.about;
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          url: SITE_URL + href.about(locale),
          mainEntity: { '@type': 'Person', name: PERSON.name, jobTitle: PERSON.title, sameAs: [PERSON.linkedin], alumniOf: 'University of Pavia' },
        }}
      />
      <div className="wrap"><Breadcrumb items={crumbs(locale, t.ui.nav.about)} /></div>
      <section className="wrap page-hero about" aria-labelledby="about-h1">
        <div className="stack">
          <h1 id="about-h1" className="d-l"><Rich text={a.pageH1} /></h1>
          <p className="lead">{a.p1}</p>
          <p className="body">{a.p2}</p>
          <p className="body"><Rich text={a.more2} /></p>
        </div>
        <Photo alt={t.hero.photoAlt} className="about-photo" priority />
      </section>

      <section className="wrap sec" aria-labelledby="eq-title">
        <h2 id="eq-title" className="cap eq-label">{a.equationLabel}</h2>
        <ol className="equation">
          {a.equation.map((e, i) => (
            <li key={e.a}>
              {i > 0 && <span className="eq-op" aria-hidden="true">{i === 1 ? '+' : '='}</span>}
              <span className={`s-l${i === 2 ? ' acc' : ''}`}>{e.a}</span>
              <span className="caption">{e.b}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap sec about-how" aria-labelledby="how-title">
        <h2 id="how-title" className="d-m reveal"><Rich text={a.howTitle} /></h2>
        <ol className="how-list">
          {a.how.map((h, i) => (
            <li key={h}><span className="mono acc">{String(i + 1).padStart(2, '0')}</span><p className="body">{h}</p></li>
          ))}
        </ol>
      </section>

      <section className="wrap sec" aria-labelledby="tools-title">
        <h2 id="tools-title" className="cap eq-label">{a.toolsTitle}</h2>
        <ul className="tags big-tags">
          {t.hero.tools.map((tool) => <li key={tool} className="tag"><Rich text={tool} /></li>)}
        </ul>
        <div className="off">
          <span className="caption">{a.offLabel}</span>
          <ul className="tags">{a.off.map((o) => <li key={o} className="tag">{o}</li>)}</ul>
        </div>
      </section>
      <CtaBand locale={locale} />
    </>
  );
}

export function InsightsView({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  return (
    <>
      <div className="wrap"><Breadcrumb items={crumbs(locale, t.ui.nav.insights)} /></div>
      <section className="wrap page-hero" aria-labelledby="ins-h1">
        <div className="sec-head">
          <h1 id="ins-h1" className="d-l"><Rich text={t.insights.h2} /></h1>
          <div><p className="body">{t.insights.text}</p></div>
        </div>
        <p className="caption ins-empty"><Rich text={t.insights.empty} /></p>
        <InsightCards locale={locale} />
      </section>
      <CtaBand locale={locale} />
    </>
  );
}

export function ContactView({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  return (
    <>
      <div className="wrap"><Breadcrumb items={crumbs(locale, t.ui.nav.contact)} /></div>
      <section id="contact" className="wrap page-hero" aria-labelledby="contact-title">
        <ContactBlock locale={locale} as="h1" />
      </section>
    </>
  );
}

export function PrivacyView({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  return (
    <>
      <div className="wrap"><Breadcrumb items={crumbs(locale, t.footer.privacy)} /></div>
      <section className="wrap page-hero read" aria-labelledby="priv-h1">
        <h1 id="priv-h1" className="d-l"><Rich text={t.privacy.h1} /></h1>
        <p className="body"><Rich text={t.privacy.body} /></p>
      </section>
    </>
  );
}

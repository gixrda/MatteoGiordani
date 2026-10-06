import Link from 'next/link';
import { getDict } from '@/lib/i18n';
import { loadPost } from '@/lib/posts';
import { href, type Locale } from '@/lib/routes';
import { PERSON, SITE_URL } from '@/lib/site';
import { Breadcrumb, CtaPanel } from '@/components/Blocks';
import { Icon } from '@/components/Icon';
import { JsonLd } from '@/components/JsonLd';
import { CtaVisual } from './ServiceView';
import '@/styles/service.css';
import '@/styles/post.css';

/** Compact date for the byline (19/10/26); the full ISO date stays in the <time> element. */
const short = (iso: string, l: Locale) => new Date(iso).toLocaleDateString(l === 'it' ? 'it-IT' : 'en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' });

/** Blog post page: one MDX file from content/blog/<locale>/<slug>.mdx. */
export async function PostView({ locale, slug }: { locale: Locale; slug: string }) {
  const t = getDict(locale);
  const p = await loadPost(locale, slug);
  const url = SITE_URL + href.post(locale, slug);

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: p.title,
          description: p.description,
          datePublished: p.date,
          dateModified: p.updated ?? p.date,
          inLanguage: locale,
          url,
          mainEntityOfPage: url,
          author: { '@type': 'Person', name: PERSON.name, jobTitle: PERSON.title },
        }}
      />
      <div className="wrap">
        <Breadcrumb items={[{ name: t.ui.breadcrumbHome, href: href.home(locale) }, { name: t.ui.nav.insights, href: href.insights(locale) }, { name: p.title }]} />
      </div>

      <article className="wrap post" aria-labelledby="post-title">
        <header className="post-head">
          {p.tag && <p className="cap acc">{p.tag}</p>}
          <h1 id="post-title" className="d-m">{p.title}</h1>
          <p className="lead">{p.description}</p>
          <p className="caption">
            <time dateTime={p.date} title={p.date}>{short(p.date, locale)}</time>
            {p.updated && p.updated !== p.date && <> · {t.insights.updated} <time dateTime={p.updated} title={p.updated}>{short(p.updated, locale)}</time></>}
            {' · '}{PERSON.name}
          </p>
        </header>
        <div className="prose">
          <p.Content />
        </div>
        <Link href={href.insights(locale)} className="tlink post-back">
          <Icon name="arrow-right" size={14} className="flip" />{t.insights.back}
        </Link>
      </article>

      <CtaPanel locale={locale} title={t.servicePage.ctaH2} text={t.servicePage.ctaText} visual={<CtaVisual locale={locale} />} />
    </>
  );
}

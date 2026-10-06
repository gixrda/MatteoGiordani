import Link from 'next/link';
import { getDict } from '@/lib/i18n';
import { href, PROJECT_SLUGS, type Locale, type ProjectSlug } from '@/lib/routes';
import { PERSON, SITE_URL } from '@/lib/site';
import { BrowserFrame, Breadcrumb, CtaPanel, PhoneFrame, homeWorkHref } from '@/components/Blocks';
import { Icon } from '@/components/Icon';
import { JsonLd } from '@/components/JsonLd';
import { CwvTable } from '@/components/ProjectCard';
import { Rich, plain } from '@/components/Rich';
import { CtaVisual } from './ServiceView';
import '@/styles/service.css';
import '@/styles/build.css';

/** Project page (spec §9.1). Each project gets its own visuals and evidence, never three identical case studies. */
export function ProjectView({ locale, slug }: { locale: Locale; slug: ProjectSlug }) {
  const t = getDict(locale);
  const p = t.projects[slug];
  const pp = t.projectPage;
  const i = PROJECT_SLUGS.indexOf(slug);
  const prev = PROJECT_SLUGS[(i + PROJECT_SLUGS.length - 1) % PROJECT_SLUGS.length];
  const next = PROJECT_SLUGS[(i + 1) % PROJECT_SLUGS.length];

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: p.name,
          headline: plain(p.h1),
          description: p.metaDescription,
          url: SITE_URL + href.work(locale, slug),
          creator: { '@type': 'Person', name: PERSON.name, jobTitle: PERSON.title },
          keywords: p.tags.join(', '),
          ...(slug === 'ezdirect' ? { dateCreated: '2026-09' } : {}),
        }}
      />
      <div className="wrap">
        <Breadcrumb items={[{ name: t.ui.breadcrumbHome, href: href.home(locale) }, { name: t.ui.breadcrumbWork, href: homeWorkHref(locale) }, { name: p.name }]} />
      </div>

      <section className="wrap proj-hero" aria-labelledby="proj-title">
        {p.status && <span className="status"><i aria-hidden="true" />{p.status}</span>}
        <p className="cap acc">{p.cap}</p>
        <h1 id="proj-title" className="d-l"><Rich text={p.h1} /></h1>
        <p className="lead">{p.lead}</p>
        <dl className="proj-facts">
          {p.facts.map((f) => (
            <div key={f.label}><dt className="cap">{f.label}</dt><dd>{f.value}</dd></div>
          ))}
        </dl>
      </section>

      {/* Visuals */}
      <section className="wrap sec" aria-label={pp.visuals}>
        <div className="proj-band">
          {slug === 'ezdirect' && p.shots && (
            <div className="proj-ez">
              <BrowserFrame url="ezdirect.it">
                <img src={p.shots[0].src} alt={p.shots[0].alt} width={p.shots[0].w} height={p.shots[0].h} decoding="async" fetchPriority="high" className="bframe-img" />
              </BrowserFrame>
              <PhoneFrame>
                <img src={p.shots[1].src} alt={p.shots[1].alt} width={p.shots[1].w} height={p.shots[1].h} decoding="async" className="phone-img" />
              </PhoneFrame>
            </div>
          )}
          {slug === 'trainly' && p.shots && (
            <div className="proj-phones">
              {p.shots.map((sh) => (
                <img key={sh.src} src={sh.src} alt={sh.alt} width={sh.w} height={sh.h} decoding="async" className="phone-shot" />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Story */}
      <section className="wrap sec proj-story" aria-label={p.name}>
        {p.sections.map((s) => (
          <div key={s.title} className="proj-row reveal">
            <h2 className="s-l">{s.title}</h2>
            <div>
              {s.body && <p className="body"><Rich text={s.body} /></p>}
              {s.list && (
                <ul className="proj-list">
                  {s.list.map((li) => <li key={li}><Icon name="check" size={15} className="acc" />{li}</li>)}
                </ul>
              )}
            </div>
          </div>
        ))}
        {slug === 'ezdirect' && (
          <div className="proj-row reveal">
            <h2 className="s-l">{pp.evidence}</h2>
            <div className="card proj-evidence"><CwvTable c={t.cwv} /></div>
          </div>
        )}
      </section>

      <nav className="wrap sec proj-nav" aria-label={`${pp.prev} / ${pp.next}`}>
        {prev !== next && (
          <Link href={href.work(locale, prev)} className="card proj-nav-link">
            <span className="cap"><Icon name="arrow-right" size={13} className="flip" /> {pp.prev}</span>
            <span className="s-m">{t.projects[prev].name}</span>
          </Link>
        )}
        <Link href={href.work(locale, next)} className="card proj-nav-link next">
          <span className="cap">{pp.next} <Icon name="arrow-right" size={13} /></span>
          <span className="s-m">{t.projects[next].name}</span>
        </Link>
      </nav>

      <CtaPanel locale={locale} title={t.servicePage.ctaH2} text={t.servicePage.ctaText} visual={<CtaVisual locale={locale} />} />
    </>
  );
}

import Link from 'next/link';
import { getDict } from '@/lib/i18n';
import { href, SERVICE_SLUGS, type Locale, type ServiceSlug } from '@/lib/routes';
import { PERSON, SITE_URL } from '@/lib/site';
import { BookButton, Breadcrumb, CtaPanel, homeWorkHref } from '@/components/Blocks';
import { BuildObject } from '@/components/BuildObject';
import { Icon } from '@/components/Icon';
import { IncludedSection } from '@/components/IncludedSection';
import { JsonLd } from '@/components/JsonLd';
import { ProjectMedia } from '@/components/ProjectCard';
import { Rich } from '@/components/Rich';
import { ServiceToolWindow } from '@/components/ServiceToolWindow';
import '@/styles/service.css';
import '@/styles/build.css';

export function ServiceView({ locale, slug }: { locale: Locale; slug: ServiceSlug }) {
  const t = getDict(locale);
  const s = t.services[slug];
  const sp = t.servicePage;
  const url = SITE_URL + href.service(locale, slug);

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Service',
              name: s.name,
              description: s.metaDescription,
              url,
              areaServed: 'IT',
              provider: { '@type': 'Person', name: PERSON.name, jobTitle: PERSON.title, url: SITE_URL + href.home(locale) },
            },
            {
              '@type': 'FAQPage',
              mainEntity: s.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a.replace(/\s*\[[^\]]+\]/g, '') } })),
            },
          ],
        }}
      />

      <div className="wrap">
        <Breadcrumb items={[{ name: t.ui.breadcrumbHome, href: href.home(locale) }, { name: t.ui.breadcrumbServices }, { name: s.name }]}>
          <nav className="pills svc-switch" aria-label={sp.switcherLabel}>
            {SERVICE_SLUGS.map((k) => (
              <Link key={k} href={href.service(locale, k)} className="pill" aria-current={k === slug ? 'page' : undefined}>{t.services[k].switcher}</Link>
            ))}
          </nav>
        </Breadcrumb>
      </div>

      {/* Hero */}
      <section className="wrap svc-hero" aria-labelledby="svc-title">
        <div className="stack svc-hero-copy">
          <h1 id="svc-title" className="d-l">{s.h1a}<br /><em className="acc">{s.h1b}</em></h1>
          <p className="lead">{s.lead}</p>
          <p className="body">{s.paragraph}</p>
          <div className="btn-row">
            <BookButton locale={locale} icon="arrow-up-right" />
            <a href="#included" className="tlink">{sp.seeIncluded}<Icon name="arrow-down" className="nudge-down" /></a>
          </div>
          <p className="caption">{sp.note}</p>
        </div>
        <ServiceToolWindow slug={slug} title={s.toolTitle} sub={s.toolSub} tryIt={sp.tryIt} t={t.tools} />
      </section>

      {/* Included */}
      <section id="included" className="band sec-pad svc-band" aria-labelledby="inc-title">
        <div className="wrap">
          <IncludedSection
            head={
              <div className="stack">
                <h2 id="inc-title" className="d-m"><Rich text={sp.incH2} /></h2>
                <p className="body">{s.incPara}</p>
              </div>
            }
            checks={s.checks}
            regions={sp.regions}
            view={{ label: sp.viewLabel, visitors: sp.viewVisitors, google: sp.viewGoogle }}
            checksLabel={sp.checksLabel}
          />
          <p className="mono caption svc-illus">{t.ui.illustrative}</p>
        </div>
      </section>

      {/* How */}
      <section className="sec wrap" aria-labelledby="how-title">
        <div className="sec-head reveal">
          <h2 id="how-title" className="d-m"><Rich text={sp.howH2} /></h2>
          <div><p className="body">{sp.howText}</p></div>
        </div>
        <ol className="chain">
          {sp.steps.map((st, i) => (
            <li key={st.word}>
              <p className="chain-word">{st.word}{i < sp.steps.length - 1 && <Icon name="arrow-right" size={28} className="acc" />}</p>
              <p className="mono acc">{String(i + 1).padStart(2, '0')} · {st.mono}</p>
              <p className="small">{st.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Related work */}
      <section className="sec wrap" aria-labelledby="rel-title">
        <div className="sec-head reveal">
          <h2 id="rel-title" className="d-m"><Rich text={sp.relatedH2} /></h2>
          <div>
            <p className="body">{sp.relatedText}</p>
            <Link href={homeWorkHref(locale)} className="tlink">{t.ui.allProjects}<Icon name="arrow-up-right" className="nudge-up" /></Link>
          </div>
        </div>
        <div className="rel-grid">
          {s.related.map((r) => (
            <article key={r.slug} className="rel">
              <div className="rel-band">
                <span className="badge">{r.badge}</span>
                <div className="rel-media"><ProjectMedia slug={r.slug} /></div>
                <span className="rel-round" aria-hidden="true"><Icon name="arrow-up-right" size={18} /></span>
              </div>
              <p className="cap acc">{r.cap}</p>
              <div className="rel-row">
                <h3 className="s-l"><Link href={href.work(locale, r.slug)} className="rel-link">{t.projects[r.slug].name}</Link></h3>
                <span className="tlink rel-explore" aria-hidden="true">{t.ui.explore}<Icon name="arrow-right" className="nudge" /></span>
              </div>
              <p className="small"><Rich text={r.text} /></p>
            </article>
          ))}
        </div>
      </section>

      {/* Scope */}
      <section className="band sec-pad svc-band" aria-labelledby="scope-title">
        <div className="wrap">
          <div className="sec-head reveal">
            <h2 id="scope-title" className="d-m"><Rich text={sp.scopeH2} /></h2>
            <div>
              <p className="body"><Rich text={sp.scopeText} /></p>
              <Link href={href.contact(locale)} className="tlink">{sp.scopeLink}<Icon name="arrow-up-right" className="nudge-up" /></Link>
            </div>
          </div>
          <ul className="scope">
            {sp.scope.map((c) => (
              <li key={c.title}><h3 className="s-m">{c.title}</h3><p className="small"><Rich text={c.text} /></p></li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="sec wrap faq-sec" aria-labelledby="faq-title">
        <div className="stack reveal">
          <h2 id="faq-title" className="d-m"><Rich text={sp.faqH2} /></h2>
          <p className="body">{sp.faqText}</p>
          <a href={`mailto:${PERSON.email}`} className="tlink"><Icon name="mail" />{sp.faqAsk}</a>
        </div>
        <div className="faq glow">
          {s.faq.map((f) => (
            <details key={f.q}>
              <summary>
                <Icon name="search" />
                <span>{f.q}</span>
                <Icon name="chevron" className="faq-chev" />
              </summary>
              <p className="small"><Rich text={f.a} /></p>
            </details>
          ))}
        </div>
      </section>

      <CtaPanel locale={locale} title={sp.ctaH2} text={sp.ctaText} visual={<CtaVisual locale={locale} />} />
    </>
  );
}

export function CtaVisual({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  // Static, decorative: BuildObject at stage 5, sized with CSS (no client scaling needed).
  return (
    <div className="cta-bo">
      <BuildObject stage={5} labels={{ pins: t.build.pins, exampleSite: t.ui.exampleSite, cwvTitle: t.build.cwvTitle, cwvNote: t.build.cwvNote, stageLabel: t.build.stageLabel }} />
    </div>
  );
}

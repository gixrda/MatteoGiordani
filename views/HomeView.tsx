import Link from 'next/link';
import { getDict } from '@/lib/i18n';
import { href, PROJECT_SLUGS, type Locale } from '@/lib/routes';
import { PERSON, SITE_URL, bookHref } from '@/lib/site';
import { BookButton, Photo, SecHead } from '@/components/Blocks';
import { HomeFaq } from '@/components/HomeFaq';
import { ContactForm } from '@/components/ContactForm';
import { Icon } from '@/components/Icon';
import { JsonLd } from '@/components/JsonLd';
import { LayersSection } from '@/components/LayersSection';
import { PortraitCard } from '@/components/PortraitCard';
import { RotatingWords } from '@/components/RotatingWords';
import { ProcessScene } from '@/components/ProcessScene';
import { ProjectCard } from '@/components/ProjectCard';
import { Rich } from '@/components/Rich';
import { StickyBar } from '@/components/StickyBar';
import { ToolMarquee } from '@/components/ToolMarquee';
import { WorkGrid } from '@/components/WorkGrid';
import '@/styles/home.css';
import '@/styles/build.css';

export function HomeView({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const h = t.hero;
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Person',
              '@id': `${SITE_URL}/#person`,
              name: PERSON.name,
              jobTitle: PERSON.title,
              email: `mailto:${PERSON.email}`,
              url: SITE_URL + href.home(locale),
              sameAs: [PERSON.linkedin, PERSON.instagram].filter(Boolean),
              alumniOf: { '@type': 'CollegeOrUniversity', name: 'University of Pavia' },
              workLocation: { '@type': 'Place', address: { '@type': 'PostalAddress', addressLocality: 'Pisa', addressCountry: 'IT' } },
            },
            {
              '@type': 'ProfessionalService',
              name: `${PERSON.name} — ${PERSON.title}`,
              url: SITE_URL + href.home(locale),
              founder: { '@id': `${SITE_URL}/#person` },
              address: { '@type': 'PostalAddress', addressLocality: 'Pisa', addressRegion: 'PI', addressCountry: 'IT' },
              areaServed: [{ '@type': 'City', name: 'Pisa' }, { '@type': 'Country', name: 'Italia' }],
              serviceType: ['SEO', 'Technical SEO', 'Core Web Vitals', 'Front-End development'],
            },
          ],
        }}
      />

      {/* Hero (§7.2) */}
      <section id="hero" className="hero wrap" aria-labelledby="hero-title">
        <div className="hero-grid">
          <div className="hero-copy">
            <h1 id="hero-title" className="d-l">
              <span className="vh">{h.h1}</span>
              <span aria-hidden="true">{h.h1Lead} </span>
              <RotatingWords words={h.h1Words} />
            </h1>
            <p className="lead">{h.lead}</p>
            <BookButton locale={locale} />
            <div className="asks">
              <p className="cap">{h.askLabel}</p>
              <ul>
                {h.asks.map((a) => (
                  <li key={a.text}><Link href={href.service(locale, a.service)} className="ask">{a.text}</Link></li>
                ))}
              </ul>
            </div>
            <ul className="trust">
              {h.trust.map((x) => (
                <li key={x}><Icon name="check" size={15} />{x}</li>
              ))}
              <li><a href="#work" className="tlink">{h.viewWork}<Icon name="arrow-down" className="nudge-down" /></a></li>
            </ul>
          </div>
          <PortraitCard>
            <Photo alt={h.photoAlt} className="portrait-slot" priority />
            <div className="fchip fchip-id">
              <span className="mono-mark sm" aria-hidden="true">MG</span>
              <span><b>{h.chipHello}</b><span className="caption">{PERSON.title}</span></span>
            </div>
            <div className="fchip fchip-fact">
              <span className="fchip-serif">{h.chipFactTitle}</span>
              <span className="cap">{h.chipFactCap}</span>
            </div>
          </PortraitCard>
        </div>
        <ToolMarquee label={h.toolsLabel} tools={h.tools} />
      </section>

      {/* Services (§7.3) */}
      <section id="services" className="sec wrap" aria-labelledby="layers-title">
        <LayersSection
          items={t.layers.items}
          planes={[t.layers.planeSearch, t.layers.planeSpeed, t.layers.planeCode]}
          before={
            <div className="stack reveal">
              <h2 id="layers-title" className="d-m"><Rich text={t.layers.h2} /></h2>
              <p className="body">{t.layers.text}</p>
            </div>
          }
          after={
            <Link href={href.service(locale, 'seo')} className="btn btn-secondary">
              {t.layers.button}
              <Icon name="arrow-right" className="nudge" />
            </Link>
          }
        />
      </section>

      {/* Comparison (§7.4) */}
      <section className="sec wrap" aria-labelledby="cmp-title">
        <SecHead id="cmp-title" title={t.comparison.h2} text={t.comparison.text} />
        <div className="cmp">
          {[t.comparison.left, t.comparison.right].map((side, i) => (
            <div key={side.title} className={`cmp-card glow${i ? ' cmp-yes' : ''}`}>
              <h3 className="cmp-title s-m">
                <span className="cmp-ic"><Icon name={i ? 'check' : 'x'} size={14} /></span>
                {side.title}
              </h3>
              <ul>
                {side.rows.map((r) => (
                  <li key={r.b}><b>{r.b}</b><span>{r.s}</span></li>
                ))}
              </ul>
            </div>
          ))}
          <span className="cmp-vs" aria-hidden="true">vs</span>
        </div>
      </section>

      {/* Process (§7.5) */}
      <section className="sec process" aria-labelledby="proc-title">
        <div className="wrap">
          <SecHead id="proc-title" title={t.process.h2} text={t.process.text} />
        </div>
        <div className="wrap">
          <ProcessScene
            steps={t.process.steps}
            labels={{ pins: t.build.pins, exampleSite: t.ui.exampleSite, cwvTitle: t.build.cwvTitle, cwvNote: t.build.cwvNote, stageLabel: t.build.stageLabel }}
            play={t.process.play}
            pause={t.process.pause}
            stepsLabel={t.process.stepsLabel}
            illustrative={t.ui.illustrative}
          />
        </div>
      </section>

      {/* Selected work (§7.6) */}
      <section id="work" className="sec wrap" aria-labelledby="work-title">
        <SecHead id="work-title" title={t.work.h2} text={t.work.text} />
        <WorkGrid
          label={t.work.filterLabel}
          labels={t.work.filters}
          items={PROJECT_SLUGS.map((slug) => ({
            key: slug,
            filter: t.projects[slug].filter,
            wide: true,
            node: <ProjectCard locale={locale} slug={slug} t={t} wide />,
          }))}
        />
      </section>

      {/* Proof (§7.7) */}
      <section className="sec wrap" aria-labelledby="proof-title">
        <SecHead id="proof-title" title={t.proof.h2} text={t.proof.text} />
        <div className="bento">
          <div className="card bento-launch">
            <p className="cap">{t.proof.launchCap}</p>
            <p className="s-l"><Rich text={t.proof.launchDate} /></p>
            <p className="cap">{t.proof.launchText}</p>
          </div>
          <div className="card bento-lh">
            <div className="bento-row">
              <p className="cap">{t.proof.lighthouseCap}</p>
              <p className="mono caption">{t.proof.lighthouseNote}</p>
            </div>
            <ul className="rings">
              {t.proof.rings.map((r) => (
                <li key={r}><span className="ring mono">[—]</span><span className="caption">{r}</span></li>
              ))}
            </ul>
          </div>
          <div className="card bento-study">
            <p className="cap">{t.proof.studyCap}</p>
            <ul>
              {t.proof.study.map((s) => (
                <li key={s.title}><b className="s-m">{s.title}</b><span className="caption">{s.text}</span></li>
              ))}
            </ul>
          </div>
          {/* No client testimonial yet: a real before/after from ezdirect.it, pointing to the contact form. */}
          <div className="bento-quote glow">
            <p className="cap">{t.proof.nextCap}</p>
            <p className="bq-score">
              <span className="bq-old"><span className="vh">{t.cwv.before}: </span>{t.cwv.rows[0].before}</span>
              <Icon name="arrow-right" size={28} className="bq-arrow" />
              <span><span className="vh">{t.cwv.after}: </span>{t.cwv.rows[0].after}</span>
            </p>
            <div className="bq-foot">
              <p className="small">{t.proof.nextText}</p>
              <Link href={href.contact(locale)} className="bq-link">{t.proof.nextCta}<Icon name="arrow-right" className="nudge" /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* About (§7.8) */}
      <section className="sec wrap" aria-labelledby="about-title">
        <div className="about">
          <div className="stack">
            <h2 id="about-title" className="d-m reveal"><Rich text={t.about.h2} /></h2>
            <p className="body">{t.about.p1}</p>
            <p className="body">{t.about.p2}</p>
            <div className="off">
              <span className="caption">{t.about.offLabel}</span>
              <ul className="tags">{t.about.off.map((o) => <li key={o} className="tag">{o}</li>)}</ul>
            </div>
            <Link href={href.about(locale)} className="tlink">{t.about.more}<Icon name="arrow-right" className="nudge" /></Link>
          </div>
          <Photo photo="office" alt={t.about.officePhotoAlt} className="about-photo" />
        </div>
      </section>

      {/* Insights (§7.9): drafts stay visibly marked until published. */}
      <section className="sec wrap" aria-labelledby="ins-title">
        <SecHead id="ins-title" title={t.insights.h2} text={t.insights.text}>
          <Link href={href.insights(locale)} className="btn btn-secondary btn-sm">{t.insights.button}<Icon name="arrow-right" className="nudge" /></Link>
        </SecHead>
        <InsightCards locale={locale} />
      </section>

      {/* FAQ */}
      <section id="faq" className="sec wrap" aria-labelledby="faq-title">
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: t.faq.groups
              .flatMap((g) => g.items)
              .map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a.replace(/\s*\[[^\]]+\]/g, '') } })),
          }}
        />
        <SecHead id="faq-title" title={t.faq.h2} text={t.faq.text} />
        <HomeFaq
          groups={t.faq.groups}
          tabsLabel={t.faq.tabsLabel}
          more={
            <div className="card faq-more">
              <div>
                <h3 className="s-m"><Rich text={t.faq.moreTitle} /></h3>
                <p className="small">{t.faq.moreText}</p>
              </div>
              <BookButton locale={locale} icon="calendar" />
            </div>
          }
        />
      </section>

      {/* Contact (§7.10) */}
      <section id="contact" className="sec wrap" aria-labelledby="contact-title">
        <ContactBlock locale={locale} />
      </section>

      <StickyBar text={t.ui.stickyBar} book={t.ui.book} bookHref={bookHref(locale)} closeLabel={t.ui.close} />
    </>
  );
}

export function InsightCards({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  return (
    <ul className="insights">
      {t.insights.items.map((it) => (
        <li key={it.title} className="card insight">
          <div className="bento-row">
            <span className="cap acc">{it.tag}</span>
            <span className="caption">{t.insights.draft}</span>
          </div>
          <h3 className="s-m">{it.title}</h3>
        </li>
      ))}
    </ul>
  );
}

export function ContactBlock({ locale, as: H = 'h2' }: { locale: Locale; as?: 'h1' | 'h2' }) {
  const t = getDict(locale);
  const c = t.contact;
  return (
    <div className="contact">
      <Photo photo="cafe" alt={t.hero.cafePhotoAlt} className="contact-photo" />
      <div className="stack">
        <H id="contact-title" className={`${H === 'h1' ? 'd-l' : 'd-m'} reveal`}><Rich text={c.h2} /></H>
        <p className="body"><Rich text={c.text} /></p>
        <ContactForm c={c} privacyHref={href.privacy(locale)} />
      </div>
    </div>
  );
}

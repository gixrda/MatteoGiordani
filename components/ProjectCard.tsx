import Link from 'next/link';
import type { Dict } from '@/content/en';
import { href, type Locale, type ProjectSlug } from '@/lib/routes';
import { BrowserFrame, PhoneFrame, Slot } from './Blocks';
import { Icon } from './Icon';
import { Rich } from './Rich';

/** Media for each project until real screenshots exist (spec §6.17). Never stretched. */
export function ProjectMedia({ slug }: { slug: ProjectSlug }) {
  if (slug === 'trainly')
    return (
      <div className="pm-phones">
        <PhoneFrame className="tilt-l"><Slot label="Trainly 1" note="1179×2556" /></PhoneFrame>
        <PhoneFrame className="tilt-r"><Slot label="Trainly 2" note="1179×2556" /></PhoneFrame>
      </div>
    );
  if (slug === 'the-butcher')
    return (
      <div className="pm-pair">
        <BrowserFrame url="the-butcher · proposed"><Slot label="Proposed homepage" note="desktop · mockup to add" /></BrowserFrame>
        <PhoneFrame className="pm-pair-phone"><Slot label="Mobile" note="mockup to add" /></PhoneFrame>
      </div>
    );
  return (
    <BrowserFrame url="ezdirect.it">
      <Slot label="ezdirect.it homepage" note="screenshot to add · desktop 1440" />
    </BrowserFrame>
  );
}

export function CwvTable({ c }: { c: Dict['cwv'] }) {
  return (
    <table className="cwv">
      <caption className="cap">{c.caption}</caption>
      <thead>
        <tr><th scope="col" className="cap">{c.metric}</th><th scope="col" className="cap">{c.before}</th><th scope="col" className="cap">{c.after}</th></tr>
      </thead>
      <tbody>
        {['LCP', 'INP', 'CLS', c.perf].map((m) => (
          <tr key={m}>
            <th scope="row">{m}</th>
            <td className="mono"><span className="ph">[REAL DATA]</span></td>
            <td className="mono"><span className="ph">[REAL DATA]</span></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** Home project card (spec §6.16): the title link covers the card; the CWV table stays plain content. */
export function ProjectCard({ locale, slug, t, wide }: { locale: Locale; slug: ProjectSlug; t: Dict; wide?: boolean }) {
  const p = t.projects[slug];
  return (
    <article className={`pcard card${wide ? ' pcard-wide' : ''}`}>
      <div className="pcard-band">
        {slug === 'the-butcher' && <span className="badge pcard-badge">{t.ui.redesignConcept}</span>}
        <div className="pcard-media"><ProjectMedia slug={slug} /></div>
      </div>
      <div className="pcard-body">
        <div className="pcard-main">
          <p className="cap acc">{p.cap}</p>
          <h3 className="s-l">
            <Link href={href.work(locale, slug)} className="pcard-link">
              {p.name}
              <Icon name="arrow-up-right" size={22} className="pcard-arrow" />
            </Link>
          </h3>
          <p className="small"><Rich text={p.cardText} /></p>
          <ul className="tags">{p.tags.map((tag) => <li key={tag} className="tag">{tag}</li>)}</ul>
        </div>
        {wide && <CwvTable c={t.cwv} />}
      </div>
    </article>
  );
}

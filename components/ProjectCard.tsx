import Link from 'next/link';
import type { Dict } from '@/content/en';
import { href, type Locale, type ProjectSlug } from '@/lib/routes';
import { BrowserFrame, Slot } from './Blocks';
import { Icon } from './Icon';
import { Rich } from './Rich';

/** Card media for each project: the real cover where one exists, a placeholder until then (spec §6.17). Never stretched. */
export function ProjectMedia({ slug, t }: { slug: ProjectSlug; t: Dict }) {
  const cover = t.projects[slug].shots?.[0];
  if (cover)
    return <img src={cover.src} alt={cover.alt} width={cover.w} height={cover.h} loading="lazy" decoding="async" className="shot" />;
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
        <div className="pcard-media"><ProjectMedia slug={slug} t={t} /></div>
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
        {wide && slug === 'ezdirect' && <CwvTable c={t.cwv} />}
      </div>
    </article>
  );
}

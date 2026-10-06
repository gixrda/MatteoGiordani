import Link from 'next/link';
import type { Dict } from '@/content/en';
import { href, type Locale, type ProjectSlug } from '@/lib/routes';
import { BrowserFrame } from './Blocks';
import { Icon } from './Icon';
import { Rich } from './Rich';

/** Card media for each project: real screenshots, never stretched (spec §6.17). */
export function ProjectMedia({ slug, t }: { slug: ProjectSlug; t: Dict }) {
  const shots = t.projects[slug].shots;
  if (slug === 'ezdirect' && shots)
    return (
      <BrowserFrame url="ezdirect.it">
        <img src={shots[0].src} alt={shots[0].alt} width={shots[0].w} height={shots[0].h} loading="lazy" decoding="async" className="bframe-img" />
      </BrowserFrame>
    );
  if (shots)
    return (
      <div className="pm-phones">
        {[shots[0], shots[2], shots[4]].map((sh) => (
          <img key={sh.src} src={sh.src} alt={sh.alt} width={sh.w} height={sh.h} loading="lazy" decoding="async" className="phone-shot" />
        ))}
      </div>
    );
  return null;
}

export function CwvTable({ c }: { c: Dict['cwv'] }) {
  return (
    <table className="cwv">
      <caption className="cap">{c.caption}</caption>
      <thead>
        <tr><th scope="col" className="cap">{c.metric}</th><th scope="col" className="cap">{c.before}</th><th scope="col" className="cap">{c.after}</th></tr>
      </thead>
      <tbody>
        {c.rows.map((r) => (
          <tr key={r.m}>
            <th scope="row">{r.m}</th>
            <td className="mono cwv-before">{r.before}</td>
            <td className="mono">{r.after}</td>
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
        {p.status && <span className="status pcard-status"><i aria-hidden="true" />{p.status}</span>}
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

import Link from 'next/link';
import { href, SERVICE_SLUGS, PROJECT_SLUGS, type Locale } from '@/lib/routes';
import { getDict } from '@/lib/i18n';
import { PERSON, bookHref } from '@/lib/site';
import { Rich } from './Rich';

export function Footer({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const f = t.footer;
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-cols">
          <div>
            <p className="cap">{f.services}</p>
            <ul>
              {SERVICE_SLUGS.map((s) => (
                <li key={s}><Link href={href.service(locale, s)}>{t.services[s].name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="cap">{f.work}</p>
            <ul>
              {PROJECT_SLUGS.map((s) => (
                <li key={s}><Link href={href.work(locale, s)}>{t.projects[s].name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="cap">{f.resources}</p>
            <ul>
              <li><Link href={href.insights(locale)}>{t.ui.nav.insights}</Link></li>
              <li><Link href={href.about(locale)}>{t.ui.nav.about}</Link></li>
              <li><Link href={href.privacy(locale)}>{f.privacy}</Link></li>
            </ul>
          </div>
          <div>
            <p className="cap">{f.contact}</p>
            <ul>
              <li><a href={`mailto:${PERSON.email}`}>Email</a></li>
              <li><a href={PERSON.linkedin} rel="me noopener" target="_blank">LinkedIn</a></li>
              <li>{PERSON.instagram ? <a href={PERSON.instagram} rel="me noopener" target="_blank">Instagram</a> : <Rich text={t.contact.instagram} />}</li>
              <li><Link href={bookHref(locale)}>{t.ui.book}</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-base">
          <p><span className="footer-name">{PERSON.name}</span> <span className="caption">{PERSON.title}, {f.location}</span></p>
          <p className="caption">© 2026 · <Rich text={f.vat} /></p>
        </div>
      </div>
    </footer>
  );
}

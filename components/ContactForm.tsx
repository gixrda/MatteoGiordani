'use client';

import { useEffect, useState } from 'react';
import type { Dict } from '@/content/en';
import { PERSON } from '@/lib/site';
import { Icon } from './Icon';
import { SITE_EVENT, normaliseSite } from './HeroSearchBar';

type Field = 'need' | 'name' | 'email' | 'privacy';

/**
 * Contact form (spec §6.26, §7.10).
 * ponytail: the form provider is still [CHOOSE: Resend / Formspree / other], and the site is a static export,
 * so a valid submit opens the visitor's email app with the request prefilled. Swap `send` for a fetch() to the
 * chosen provider when it exists.
 */
export function ContactForm({ c, privacyHref }: { c: Dict['contact']; privacyHref: string }) {
  const [site, setSite] = useState('');
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const q = new URLSearchParams(location.search).get('site');
    if (q) setSite(normaliseSite(q));
    const on = (e: Event) => setSite((e as CustomEvent<string>).detail);
    addEventListener(SITE_EVENT, on);
    return () => removeEventListener(SITE_EVENT, on);
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);
    const v = (k: string) => String(d.get(k) ?? '').trim();
    const errs: Partial<Record<Field, string>> = {};
    if (!v('need')) errs.need = c.errors.need;
    if (!v('name')) errs.name = c.errors.name;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v('email'))) errs.email = c.errors.email;
    if (!d.get('privacy')) errs.privacy = c.errors.privacy;
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) return void (form.elements.namedItem(first) as HTMLElement | null)?.focus();

    const body = [
      `${c.need} ${v('need')}`,
      `${c.name}: ${v('name')}`,
      `${c.email}: ${v('email')}`,
      v('website') && `${c.website}: ${normaliseSite(v('website'))}`,
      v('message') && `\n${v('message')}`,
    ]
      .filter(Boolean)
      .join('\n');
    location.href = `mailto:${PERSON.email}?subject=${encodeURIComponent(`${c.submit} — ${v('need')}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  if (sent) return <p className="form-done" role="status"><Icon name="check" size={18} />{c.success}</p>;

  const err = (k: Field) =>
    errors[k] ? { 'aria-invalid': true as const, 'aria-describedby': `err-${k}` } : {};
  const msg = (k: Field) => errors[k] && <p id={`err-${k}`} className="err">{errors[k]}</p>;
  const [pBefore, pAfter] = c.privacy.split('{link}');

  return (
    <form className="cform" onSubmit={onSubmit} noValidate>
      <div className="field full">
        <label htmlFor="cf-need">{c.need}</label>
        <div className="select">
          <select id="cf-need" name="need" className="input" defaultValue="" {...err('need')}>
            <option value="" disabled>{c.needChoose}</option>
            {c.needs.map((n) => <option key={n}>{n}</option>)}
          </select>
          <Icon name="chevron" />
        </div>
        {msg('need')}
      </div>
      <div className="field">
        <label htmlFor="cf-name">{c.name}</label>
        <input id="cf-name" name="name" className="input" autoComplete="name" {...err('name')} />
        {msg('name')}
      </div>
      <div className="field">
        <label htmlFor="cf-email">{c.email}</label>
        <input id="cf-email" name="email" type="email" className="input" autoComplete="email" {...err('email')} />
        {msg('email')}
      </div>
      <div className="field full">
        <label htmlFor="cf-site">{c.website} <span className="opt">{c.optional}</span></label>
        <input id="cf-site" name="website" className="input mono-input" inputMode="url" autoComplete="url" placeholder="yourbusiness.it" value={site} onChange={(e) => setSite(e.target.value)} />
      </div>
      <div className="field full">
        <label htmlFor="cf-msg">{c.message} <span className="opt">{c.optional}</span></label>
        <textarea id="cf-msg" name="message" className="input" rows={2} placeholder={c.messagePlaceholder} />
      </div>
      <div className="field full">
        <label className="check">
          <input type="checkbox" name="privacy" {...err('privacy')} />
          <span>{pBefore}<a href={privacyHref}>{c.privacyLink}</a>{pAfter}</span>
        </label>
        {msg('privacy')}
      </div>
      <div className="full cform-foot">
        <button type="submit" className="btn btn-primary">
          <Icon name="calendar" />
          {c.submit}
        </button>
      </div>
    </form>
  );
}

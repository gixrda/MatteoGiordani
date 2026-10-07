'use client';

import { useEffect, useState } from 'react';
import type { Dict } from '@/content/en';
import { PERSON } from '@/lib/site';
import { Icon } from './Icon';

type Field = 'need' | 'name' | 'email' | 'privacy';

/** Strips protocol, "www." and trailing slashes. */
const normaliseSite = (v: string) => v.trim().replace(/^[a-z]+:\/\//i, '').replace(/^www\./i, '').replace(/\/+$/, '');

// Web3Forms access key (public by design: it only lets the form send to the owner's inbox). Set it on Vercel.
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

/**
 * Contact form (spec §6.26, §7.10).
 * The site is a static export, so a valid submit posts straight to Web3Forms, which emails the request to PERSON.email.
 */
export function ContactForm({ c, privacyHref }: { c: Dict['contact']; privacyHref: string }) {
  const [site, setSite] = useState('');
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');

  useEffect(() => {
    const q = new URLSearchParams(location.search).get('site');
    if (q) setSite(normaliseSite(q));
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

    if (d.get('botcheck')) return; // honeypot filled: a bot, drop silently

    setStatus('sending');
    try {
      const r = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `${c.submit}: ${v('need')}`,
          from_name: v('name'),
          replyto: v('email'),
          [c.need]: v('need'),
          [c.name]: v('name'),
          [c.email]: v('email'),
          [c.website]: normaliseSite(v('website')) || '—',
          [c.message]: v('message') || '—',
        }),
      });
      if (!(await r.json()).success) throw new Error();
      setStatus('sent');
    } catch {
      setStatus('failed');
    }
  };

  if (status === 'sent')
    return (
      <p className="form-done" role="status">
        <Icon name="check" size={18} />
        <span>{c.success}</span>
      </p>
    );

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
        <input type="checkbox" name="botcheck" hidden tabIndex={-1} autoComplete="off" />
        <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
          {status === 'sending' ? c.sending : c.submit}
          <Icon name="arrow-right" className="nudge" />
        </button>
        {status === 'failed' && <p className="err" role="alert">{c.failed}</p>}
        <p className="caption">{c.orEmail} <a href={`mailto:${PERSON.email}`}>{PERSON.email}</a></p>
      </div>
    </form>
  );
}

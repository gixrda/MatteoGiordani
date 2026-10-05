'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BOOKING_URL } from '@/lib/site';
import { Icon } from './Icon';

type Props = {
  contactHref: string;
  label: string;
  placeholders: string[];
  done: string;
  pickTime: string;
  book: string;
};

export const SITE_EVENT = 'mg:site';

/** Strips protocol, "www." and trailing slashes. No blocking validation (spec §6.5). */
export const normaliseSite = (v: string) => v.trim().replace(/^[a-z]+:\/\//i, '').replace(/^www\./i, '').replace(/\/+$/, '');

export function HeroSearchBar({ contactHref, label, placeholders, done, pickTime, book }: Props) {
  const router = useRouter();
  const [value, setValue] = useState('');
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [ph, setPh] = useState(0);

  useEffect(() => {
    if (value || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setPh((i) => (i + 1) % placeholders.length), 2600);
    return () => clearInterval(id);
  }, [value, placeholders.length]);

  // Booking: the calendar once chosen; until then the contact form, prefilled with the site.
  const go = (site: string) => {
    if (BOOKING_URL) return void (location.href = BOOKING_URL);
    const form = document.getElementById('contact');
    if (form) {
      dispatchEvent(new CustomEvent(SITE_EVENT, { detail: site }));
      form.scrollIntoView();
      (form.querySelector('select, input') as HTMLElement | null)?.focus({ preventScroll: true });
    } else {
      router.push(site ? `${contactHref}?site=${encodeURIComponent(site)}` : contactHref);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const site = normaliseSite(value);
    if (!site) return go('');
    setSubmitted(site);
  };

  if (submitted !== null) {
    const [before, after] = done.split('{site}');
    return (
      <div className="hsb hsb-done" role="status">
        <Icon name="check" size={18} className="hsb-ic" />
        <p>{before}<b>{submitted}</b>{after}</p>
        <button className="btn btn-primary" onClick={() => go(submitted)}>
          {pickTime}
          <Icon name="arrow-right" className="nudge" />
        </button>
      </div>
    );
  }

  return (
    <form className="hsb" onSubmit={onSubmit}>
      <Icon name="search" size={18} className="hsb-ic" />
      <span className="hsb-proto mono" aria-hidden="true">https://</span>
      <label htmlFor="hsb-input" className="vh">{label}</label>
      <input
        id="hsb-input"
        type="text"
        inputMode="url"
        autoComplete="url"
        spellCheck={false}
        autoCapitalize="none"
        placeholder={placeholders[ph]}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className="btn btn-primary">
        {book}
        <Icon name="arrow-right" className="nudge" />
      </button>
    </form>
  );
}

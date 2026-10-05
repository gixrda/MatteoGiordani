'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Icon } from './Icon';

/** Mobile-only bottom bar, shown after the hero and while the contact form is off-screen (spec §9.3). Can be dismissed. */
export function StickyBar({ text, book, bookHref, closeLabel }: { text: string; book: string; bookHref: string; closeLabel: string }) {
  const [show, setShow] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('hero');
    const contact = document.getElementById('contact');
    if (!hero) return;
    const seen = new Map<Element, boolean>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => seen.set(e.target, e.isIntersecting || (e.target === hero && e.boundingClientRect.top > 0)));
      setShow(!seen.get(hero) && !(contact && seen.get(contact)));
    });
    io.observe(hero);
    if (contact) io.observe(contact);
    return () => io.disconnect();
  }, []);

  return (
    <div className="sticky-bar" data-show={(show && !closed) || undefined} aria-hidden={!show || closed}>
      <p>{text}</p>
      <Link href={bookHref} className="btn btn-primary btn-sm" tabIndex={show && !closed ? undefined : -1}>{book}</Link>
      <button type="button" className="sticky-close" onClick={() => setClosed(true)} tabIndex={show && !closed ? undefined : -1}>
        <Icon name="x" size={16} />
        <span className="vh">{closeLabel}</span>
      </button>
    </div>
  );
}

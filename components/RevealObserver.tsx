'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * One subtle fade/translate per section header on first view (spec §9.4).
 * Content stays visible without JS: only headers below the fold are hidden, and only once this runs.
 */
export function RevealObserver() {
  const pathname = usePathname();
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const els = [...document.querySelectorAll<HTMLElement>('.reveal:not(.in)')].filter((el) => el.getBoundingClientRect().top > innerHeight);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    els.forEach((el) => {
      el.classList.add('pending');
      io.observe(el);
    });
    return () => io.disconnect();
  }, [pathname]);
  return null;
}

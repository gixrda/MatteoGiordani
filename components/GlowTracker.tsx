'use client';

import { useEffect } from 'react';

/** Feeds the pointer position to the card under the mouse (see the card light in components.css). One listener for the whole page. */
export function GlowTracker() {
  useEffect(() => {
    const on = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const el = (e.target as Element).closest?.<HTMLElement>('.card, .glow');
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    addEventListener('pointermove', on, { passive: true });
    return () => removeEventListener('pointermove', on);
  }, []);
  return null;
}

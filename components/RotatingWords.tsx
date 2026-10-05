'use client';

import { useEffect, useState } from 'react';

/**
 * Headline word that changes every 2.4 s: the current word slides down and fades out while the next
 * one slides in from above. With reduced motion the full phrase is shown instead (no autoplay).
 * Decorative: the h1 carries the full sentence in visually hidden text.
 */
export function RotatingWords({ words, fallback }: { words: string[]; fallback: string }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setI((n) => (n + 1) % words.length), 2400);
    return () => clearInterval(id);
  }, [words.length]);

  const prev = (i - 1 + words.length) % words.length;
  return (
    <>
      <span className="rot" aria-hidden="true">
        {words.map((w, k) => (
          <em key={w} className="acc" data-state={k === i ? 'in' : k === prev ? 'out' : 'next'}>{w}</em>
        ))}
      </span>
      <em className="acc rot-static" aria-hidden="true">{fallback}</em>
    </>
  );
}

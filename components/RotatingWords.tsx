'use client';

import { useEffect, useState } from 'react';

/**
 * Headline word slider: every 2.4 s the current word slides down out of its window while the next
 * one slides in from above. Runs even with reduced motion (Matteo's explicit choice for this element).
 * Decorative: the h1 carries the full sentence in visually hidden text.
 */
export function RotatingWords({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % words.length), 2400);
    return () => clearInterval(id);
  }, [words.length]);

  const prev = (i - 1 + words.length) % words.length;
  return (
    <span className="rot" aria-hidden="true">
      {words.map((w, k) => (
        <em key={w} className="acc" data-state={k === i ? 'in' : k === prev ? 'out' : 'next'}>{w}</em>
      ))}
    </span>
  );
}

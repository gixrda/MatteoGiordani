'use client';

import { useRef } from 'react';

/** Hero media card tilting with the cursor: ±8° Y, ±6° X. Off on touch and with reduced motion (spec §7.2). */
export function PortraitCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const can = () => matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches;

  const move = (e: React.PointerEvent) => {
    if (!can()) return;
    const el = ref.current!;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1200px) rotateY(${x * 16}deg) rotateX(${-y * 12}deg)`;
  };
  const leave = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  return (
    <div className="portrait-wrap" onPointerMove={move} onPointerLeave={leave}>
      <div ref={ref} className="portrait">{children}</div>
    </div>
  );
}

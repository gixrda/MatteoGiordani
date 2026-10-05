'use client';

import { useLayoutEffect, useRef, useState } from 'react';

/**
 * Renders a fixed-size illustration (designed at w×h px) scaled to the width of its parent.
 * The outer box reserves the exact space via aspect-ratio, so scaling never shifts layout.
 */
export function ScaleBox({ w, h, children, className = '' }: { w: number; h: number; children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [s, setS] = useState(0);
  useLayoutEffect(() => {
    const el = ref.current!;
    const ro = new ResizeObserver(() => setS(el.clientWidth / w));
    ro.observe(el);
    return () => ro.disconnect();
  }, [w]);
  return (
    <div ref={ref} className={`scalebox ${className}`} style={{ aspectRatio: `${w} / ${h}` }}>
      <div className="scalebox-in" style={{ width: w, height: h, transform: `scale(${s})`, visibility: s ? 'visible' : 'hidden' }}>
        {children}
      </div>
    </div>
  );
}

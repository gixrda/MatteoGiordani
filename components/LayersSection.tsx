'use client';

import { useState } from 'react';

type Item = { title: string; cap: string; text: string };

/** ExpandList (spec §6.12) driving the LayerStack (§6.11). The list carries the meaning; the stage is decorative. */
export function LayersSection({ items, planes, before, after }: { items: Item[]; planes: string[]; before: React.ReactNode; after: React.ReactNode }) {
  const [active, setActive] = useState(0);
  return (
    <div className="layers">
      <div className="layers-copy">
        {before}
        <ExpandList items={items} active={active} onActivate={setActive} />
        {after}
      </div>
      <LayerStack active={active} planes={planes} />
    </div>
  );
}

export function ExpandList({ items, active, onActivate, hover = true }: { items: { title: string; text: string; cap?: string }[]; active: number; onActivate: (i: number) => void; hover?: boolean }) {
  return (
    <ol className="xlist">
      {items.map((it, i) => (
        <li key={it.title}>
          <button
            type="button"
            aria-pressed={active === i}
            onClick={() => onActivate(i)}
            onFocus={() => onActivate(i)}
            onPointerEnter={(e) => hover && e.pointerType === 'mouse' && onActivate(i)}
          >
            <span className="xlist-n mono">{String(i + 1).padStart(2, '0')}</span>
            <span className="xlist-t">
              <span className="xlist-title">{it.title}</span>
              {it.cap && <span className="xlist-cap cap">{it.cap}</span>}
            </span>
            <span className="xlist-d"><span>{it.text}</span></span>
          </button>
        </li>
      ))}
    </ol>
  );
}

function LayerStack({ active, planes }: { active: number; planes: string[] }) {
  return (
    <div className="lstack" aria-hidden="true">
      <div className="lstack-in">
        {/* bottom → top: Code, Speed, Search. Item 0 (Found) = Search plane. */}
        <div className="plane plane-code" data-on={active === 2 || undefined} style={{ '--z': '0px' } as React.CSSProperties}>
          <span className="plane-tag">03 · {planes[2]}</span>
          <pre>{`<header>
  <h1>Cucina pavese</h1>
  <img width height alt>
  <a href="/prenota">
</header>`}</pre>
        </div>
        <div className="plane plane-speed" data-on={active === 1 || undefined} style={{ '--z': '120px' } as React.CSSProperties}>
          <span className="plane-tag">02 · {planes[1]}</span>
          {[
            ['LCP', 'good ≤ 2.5 s', 42],
            ['INP', 'good ≤ 200 ms', 30],
            ['CLS', 'good ≤ 0.1', 22],
          ].map(([k, v, w]) => (
            <div key={k as string} className="plane-bar">
              <p><span>{k}</span><span>{v}</span></p>
              <i><b style={{ width: `${w}%` }} /></i>
            </div>
          ))}
        </div>
        <div className="plane plane-search" data-on={active === 0 || undefined} style={{ '--z': '240px' } as React.CSSProperties}>
          <span className="plane-tag">01 · {planes[0]}</span>
          <div className="plane-snip">
            <span>trattoria-esempio.it</span>
            <u>Trattoria Esempio — Cucina pavese</u>
            <span>Piatti della tradizione pavese, a pranzo e a cena.</span>
          </div>
          <i className="plane-line" /><i className="plane-line short" />
        </div>
      </div>
    </div>
  );
}

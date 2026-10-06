'use client';

import { useState } from 'react';

type Filter = 'all' | 'website' | 'mobile';

/** Filter pills above the project grid (spec §6.16). Cards are server-rendered and passed in. */
export function WorkGrid({ labels, label, items }: { labels: Record<Filter, string>; label: string; items: { key: string; filter: Filter; wide?: boolean; node: React.ReactNode }[] }) {
  const [f, setF] = useState<Filter>('all');
  return (
    <>
      <div className="pills work-filters" role="group" aria-label={label}>
        {(Object.keys(labels) as Filter[]).map((k) => (
          <button key={k} type="button" className="pill" aria-pressed={f === k} onClick={() => setF(k)}>{labels[k]}</button>
        ))}
      </div>
      <div className="work-grid">
        {items.map((it) => (
          <div key={it.key} className={it.wide && f === 'all' ? 'wide' : undefined} hidden={f !== 'all' && f !== it.filter}>
            {it.node}
          </div>
        ))}
      </div>
    </>
  );
}

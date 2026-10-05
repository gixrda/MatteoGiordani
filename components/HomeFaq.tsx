'use client';

import { useState } from 'react';
import { Icon } from './Icon';
import { Rich } from './Rich';

type Group = { name: string; items: { q: string; a: string }[] };

/** Home FAQ: category pills switch the list; each question is its own card (native <details>). */
export function HomeFaq({ groups, tabsLabel, more }: { groups: Group[]; tabsLabel: string; more: React.ReactNode }) {
  const [g, setG] = useState(0);
  return (
    <>
      <div className="pills faq-tabs" role="group" aria-label={tabsLabel}>
        {groups.map((grp, i) => (
          <button key={grp.name} type="button" className="pill" aria-pressed={g === i} onClick={() => setG(i)}>{grp.name}</button>
        ))}
      </div>
      <div className="faq-list">
        {groups[g].items.map((f) => (
          <details key={f.q} className="faq-item glow">
            <summary>
              <span>{f.q}</span>
              <span className="faq-plus" aria-hidden="true"><Icon name="plus" size={14} /></span>
            </summary>
            <p className="small"><Rich text={f.a} /></p>
          </details>
        ))}
      </div>
      {more}
    </>
  );
}

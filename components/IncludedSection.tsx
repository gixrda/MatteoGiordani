'use client';

import { useState } from 'react';
import type { Check, Region } from '@/content/en';
import { ExpandList } from './LayersSection';
import { ScaleBox } from './ScaleBox';
import { Plate } from './BuildObject';
import { Icon } from './Icon';

type Props = {
  head: React.ReactNode;
  checks: Check[];
  regions: Record<Region, string>;
  view: { label: string; visitors: string; google: string };
  checksLabel: string;
};

/** "Every check, on the page it touches": view toggle + PageAnatomy (§6.21) + ExpandList of checks. */
export function IncludedSection({ head, checks, regions, view, checksLabel }: Props) {
  const [active, setActive] = useState(0);
  const [google, setGoogle] = useState(false);
  const c = checks[active];
  const caption = `${String(active + 1).padStart(2, '0')} ${c.title} → ${regions[c.region]}`;
  return (
    <>
      <div className="sec-head reveal">
        {head}
        <div>
          <div className="seg" role="group" aria-label={view.label}>
            <button type="button" aria-pressed={!google} onClick={() => setGoogle(false)}><Icon name="person" />{view.visitors}</button>
            <button type="button" aria-pressed={google} onClick={() => setGoogle(true)}><Icon name="code" />{view.google}</button>
          </div>
        </div>
      </div>
      <div className="included">
        <figure className="anatomy-fig">
          <ScaleBox w={560} h={610}>
            <PageAnatomy region={c.region} google={google} label={caption} />
          </ScaleBox>
          <figcaption className="caption anatomy-cap" aria-hidden="true"><span className="mono acc">{String(active + 1).padStart(2, '0')}</span> {c.title} → {regions[c.region]}</figcaption>
        </figure>
        <div aria-label={checksLabel} role="group">
          <ExpandList items={checks} active={active} onActivate={setActive} />
        </div>
      </div>
    </>
  );
}

const R: Record<Exclude<Region, 'page'>, { x: number; y: number; w: number; h: number; code: string }> = {
  tab: { x: 12, y: 8, w: 300, h: 26, code: '<title>Trattoria Esempio — Cucina pavese…</title>' },
  url: { x: 12, y: 40, w: 536, h: 26, code: 'https://trattoria-esempio.it/ · index, follow' },
  nav: { x: 20, y: 82, w: 520, h: 34, code: '<nav> 4 × <a href>' },
  h1: { x: 20, y: 132, w: 252, h: 66, code: '<h1>Cucina pavese in centro a Pavia</h1>' },
  text: { x: 20, y: 206, w: 252, h: 50, code: '<p> what, where, for whom' },
  cta: { x: 20, y: 266, w: 160, h: 36, code: '<a href="/prenota"> · 48px tap' },
  img: { x: 290, y: 132, w: 250, h: 170, code: '<img src="sala.avif" width height alt fetchpriority="high">' },
  h2: { x: 20, y: 326, w: 520, h: 78, code: '<h2>Il menu</h2> · <h2>Dove siamo</h2>' },
  local: { x: 20, y: 422, w: 300, h: 62, code: '<address> name · address · phone' },
  widget: { x: 440, y: 430, w: 100, h: 54, code: '<script>' },
  footer: { x: 20, y: 540, w: 520, h: 46, code: '<footer> legal · links · contacts' },
};

function Visitor({ k }: { k: keyof typeof R }) {
  switch (k) {
    case 'tab': return <span className="pa-tab">Trattoria Esempio — Cucina pavese…</span>;
    case 'url': return <span className="pa-url"><Icon name="lock" size={11} />trattoria-esempio.it</span>;
    case 'nav': return <span className="pa-nav"><b>Trattoria Esempio</b><span>Menu</span><span>Dove siamo</span><em>Prenota</em></span>;
    case 'h1': return <span className="pa-h1">Cucina pavese in centro a Pavia</span>;
    case 'text': return <span className="pa-lines"><i /><i /><i style={{ width: '60%' }} /></span>;
    case 'cta': return <span className="pa-cta">Prenota un tavolo</span>;
    case 'img': return <span className="pa-img"><Plate /></span>;
    case 'h2': return <span className="pa-h2">{['Il menu', 'Dove siamo'].map((h) => <span key={h}><b>{h}</b><i /><i /></span>)}</span>;
    case 'local': return <span className="pa-local"><Icon name="pin" size={14} /><span><b>Via Esempio 1, Pavia</b><br />0382 000 000</span></span>;
    case 'widget': return <span className="pa-widget"><Icon name="chat" size={20} /></span>;
    case 'footer': return <span className="pa-footer">© Trattoria Esempio · Privacy · Contatti</span>;
  }
}

/** Annotated example page, 560×610 (spec §6.21). Fictional business, labelled as such by the surrounding section. */
function PageAnatomy({ region, google, label }: { region: Region; google: boolean; label: string }) {
  return (
    <div className="pa" data-google={google || undefined} data-whole={region === 'page' || undefined} role="img" aria-label={label}>
      <div aria-hidden="true">
      {(Object.keys(R) as (keyof typeof R)[]).map((k) => {
        const r = R[k];
        return (
          <div key={k} className={`pa-r pa-${k}-r`} data-on={region === k || undefined} data-dim={(region !== k && region !== 'page') || undefined} style={{ left: r.x, top: r.y, width: r.w, height: r.h }}>
            <span className="pa-v"><Visitor k={k} /></span>
            <code className="pa-g">{r.code}</code>
          </div>
        );
      })}
      </div>
    </div>
  );
}

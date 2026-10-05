// The fictional "Trattoria Esempio" website in six states (spec §6.10). Designed at 680×460, scaled by ScaleBox.
// All site content is fictional demo copy (Italian on purpose: it is an example Italian business).

import { Icon } from './Icon';

export type BuildLabels = { pins: string[]; exampleSite: string; cwvTitle: string; cwvNote: string; stageLabel: string };

const URLS = ['search?q=trattoria+pavia', 'trattoria-esempio.it/index.php?id=1', 'trattoria-esempio.it'];

export function Plate() {
  return (
    <svg viewBox="0 0 200 160" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <circle cx="100" cy="80" r="56" />
      <circle cx="100" cy="80" r="40" />
      <circle cx="100" cy="80" r="24" />
      <path d="M26 34v26a8 8 0 0 0 8 8v60M22 34v22M30 34v22M174 34c-10 8-12 30-6 40h6v54" />
    </svg>
  );
}

/** `name` = stage name for the accessible label; omit it when the object is purely decorative. */
export function BuildObject({ stage, labels, name }: { stage: number; labels: BuildLabels; name?: string }) {
  const on = (...s: number[]) => (s.includes(stage) ? 'on' : undefined);
  const url = URLS[Math.min(stage, 2)];
  return (
    <div
      className="bo"
      data-stage={stage}
      {...(name ? { role: 'img', 'aria-label': labels.stageLabel.replace('{name}', name) } : { 'aria-hidden': true })}
    >
      <div className="bo-bar">
        <span className="bo-dots"><i /><i /><i /></span>
        <span className="bo-url">{stage >= 2 && <Icon name="lock" size={11} />}{url}</span>
        <span className="bo-label">{labels.exampleSite}</span>
      </div>
      <div className="bo-body">
        {/* 0 · Discover */}
        <div className="bo-l bo-search" data-on={on(0)}>
          <div className="bo-field" style={{ '--d': 0 } as React.CSSProperties}><Icon name="search" size={15} />trattoria pavia<i className="bo-caret" /></div>
          {[290, 215, 290].map((w, i) => (
            <div key={i} className="bo-res" style={{ '--d': i + 1 } as React.CSSProperties}>
              <i style={{ width: w * 0.5 }} /><i style={{ width: w }} /><i />
            </div>
          ))}
          <div className="bo-ours" style={{ '--d': 4 } as React.CSSProperties}>
            <span>trattoria-esempio.it/index.php?id=1</span>
            <u>Home</u>
            <span>Benvenuti nel sito della trattoria. Clicca qui per…</span>
          </div>
        </div>

        {/* 1–2 · Understand / Optimize: the raw page */}
        <div className="bo-l bo-raw" data-on={on(1, 2)} data-dim={stage === 2 || undefined}>
          <p className="bo-raw-nav"><u>Home</u> | <u>Chi siamo</u> | <u>Menu</u> | <u>Contatti</u></p>
          <div className="bo-raw-img"><span>foto_sala_DEFINITIVA.jpg</span></div>
          <p className="bo-raw-h">Benvenuti nel nostro sito!!</p>
          <div className="bo-lines"><i style={{ width: 310 }} /><i style={{ width: 260 }} /><i style={{ width: 190 }} /></div>
          <p className="bo-raw-call"><u>Chiamaci</u></p>
        </div>
        {[
          { x: 352, y: 54, n: 1 },
          { x: 300, y: 226, n: 2 },
          { x: 212, y: 12, n: 3 },
          { x: 88, y: 306, n: 4 },
        ].map((p, i) => (
          <div key={p.n} className="bo-pin" data-on={on(1, 2)} data-fixed={stage === 2 || undefined} style={{ left: p.x, top: p.y, '--d': i } as React.CSSProperties}>
            <b>{stage === 2 ? <Icon name="check" size={11} /> : p.n}</b>
            <span>{labels.pins[p.n - 1]}</span>
          </div>
        ))}
        <div className="bo-l bo-panel" data-on={on(2)} style={{ '--d': 1 } as React.CSSProperties}>
          <p className="o">&lt;title&gt;</p>
          <p>Trattoria Esempio — Cucina pavese in centro a Pavia</p>
          <p className="o">&lt;meta name=&quot;description&quot;&gt;</p>
          <p>Piatti della tradizione pavese, a pranzo e a cena. Prenota un tavolo online.</p>
          <hr />
          <p className="o">headings</p>
          <p>H1 Cucina pavese in centro a Pavia</p>
          <p className="ind">H2 Il menu</p>
          <p className="ind">H2 Dove siamo</p>
          <p className="ind">H2 Prenota un tavolo</p>
        </div>

        {/* 3–5 · Build / Perform / Convert: the polished site */}
        <div className="bo-l bo-site" data-on={on(3, 4, 5)}>
          <div className="bo-guides" aria-hidden="true">{Array.from({ length: 12 }, (_, i) => <i key={i} />)}</div>
          <div className="bo-site-nav" style={{ '--d': 0 } as React.CSSProperties}>
            <b>Trattoria Esempio</b>
            <span>Menu</span>
            <span>Dove siamo</span>
            <em>Prenota</em>
          </div>
          <p className="bo-h1" style={{ '--d': 1 } as React.CSSProperties}>Cucina pavese in centro a Pavia</p>
          <p className="bo-sub" style={{ '--d': 2 } as React.CSSProperties}>Piatti della tradizione, a pranzo e a cena.</p>
          <span className="bo-cta" style={{ '--d': 3 } as React.CSSProperties}>Prenota un tavolo</span>
          <div className="bo-img" style={{ '--d': 2 } as React.CSSProperties}><Plate /></div>
          <div className="bo-info" style={{ '--d': 4 } as React.CSSProperties}>
            {['Orari', 'Dove siamo', 'Telefono'].map((h) => (
              <div key={h}><b>{h}</b><i /><i /></div>
            ))}
          </div>
        </div>
        <svg className="bo-cursor" data-on={on(5)} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 3l13 7.5-6 1.5-2.5 6L5 3Z" />
        </svg>

        <div className="bo-l bo-cwv" data-on={on(4)}>
          <p className="bo-cwv-h"><b>{labels.cwvTitle}</b><span>{labels.cwvNote}</span></p>
          {[
            ['LCP', 'good ≤ 2.5 s'],
            ['INP', 'good ≤ 200 ms'],
            ['CLS', 'good ≤ 0.1'],
          ].map(([k, v], i) => (
            <div key={k} className="bo-cwv-row" style={{ '--d': i } as React.CSSProperties}>
              <p><span>{k}</span><span>{v}</span></p>
              <div className="bo-track"><i /><b /></div>
            </div>
          ))}
        </div>

        <div className="bo-l bo-snippet" data-on={on(5)}>
          <p className="bo-snip-q"><Icon name="search" size={11} />trattoria pavia</p>
          <p className="bo-snip-url">trattoria-esempio.it</p>
          <p className="bo-snip-t">Trattoria Esempio — Cucina pavese in centro a Pavia</p>
          <p className="bo-snip-d">Piatti della tradizione pavese, a pranzo e a cena. Prenota un tavolo online.</p>
        </div>
      </div>
    </div>
  );
}

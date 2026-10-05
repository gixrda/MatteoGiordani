'use client';

import { useId, useState } from 'react';
import type { Dict } from '@/content/en';
import type { ServiceSlug } from '@/lib/routes';
import { Icon } from './Icon';

type T = Dict['tools'];

/** Service hero window (spec §6.25): header + dotted-grid body with one interactive demo per service. */
export function ServiceToolWindow({ slug, title, sub, tryIt, t }: { slug: ServiceSlug; title: string; sub: string; tryIt: string; t: T }) {
  const icon = slug === 'seo' ? 'search' : slug === 'performance' ? 'gauge' : 'code';
  return (
    <div className="toolwin">
      <div className="toolwin-head">
        <span className="toolwin-ic"><Icon name={icon} size={18} /></span>
        <div>
          <p className="toolwin-title">{title}</p>
          <p className="caption">{sub}</p>
        </div>
        <span className="cap toolwin-try">{tryIt}</span>
      </div>
      <div className="toolwin-body">
        {slug === 'seo' && <SnippetTool t={t} />}
        {slug === 'performance' && <LcpTool t={t} />}
        {slug === 'front-end' && <CodeTool t={t} />}
      </div>
    </div>
  );
}

const cut = (s: string, n: number) => (s.length > n ? s.slice(0, n - 1).trimEnd() + '…' : s);

function SnippetTool({ t }: { t: T }) {
  const id = useId();
  const [mobile, setMobile] = useState(false);
  const [title, setTitle] = useState(t.snippetTitle);
  const [desc, setDesc] = useState(t.snippetDescription);
  const tMax = mobile ? 55 : 60;
  const dMax = mobile ? 120 : 155;
  return (
    <div className="tool-snippet">
      <div className="seg" role="group" aria-label="Preview">
        <button type="button" aria-pressed={!mobile} onClick={() => setMobile(false)}><Icon name="desktop" />{t.desktop}</button>
        <button type="button" aria-pressed={mobile} onClick={() => setMobile(true)}><Icon name="mobile" />{t.mobile}</button>
      </div>
      <div className="snip" data-mobile={mobile || undefined} aria-live="polite">
        <div className="snip-site">
          <span className="snip-fav" aria-hidden="true">T</span>
          <span><b>Trattoria Esempio</b><span className="snip-url">trattoria-esempio.it › menu</span></span>
        </div>
        <p className="snip-title">{cut(title, tMax)}</p>
        <p className="snip-desc">{cut(desc, dMax)}</p>
      </div>
      <div className="field">
        <div className="tool-label">
          <label htmlFor={`${id}-t`} className="cap">{t.metaTitle}</label>
          <span className="mono" data-over={title.length > tMax || undefined}>{title.length} / {tMax}</span>
        </div>
        <input id={`${id}-t`} className="input" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className="field">
        <div className="tool-label">
          <label htmlFor={`${id}-d`} className="cap">{t.metaDescription}</label>
          <span className="mono" data-over={desc.length > dMax || undefined}>{desc.length} / {dMax}</span>
        </div>
        <textarea id={`${id}-d`} className="input" rows={2} value={desc} onChange={(e) => setDesc(e.target.value)} />
      </div>
      <p className="caption">{t.snippetRule}</p>
    </div>
  );
}

function LcpTool({ t }: { t: T }) {
  const id = useId();
  const [v, setV] = useState(3.8);
  const zone = v <= 2.5 ? 0 : v <= 4 ? 1 : 2;
  return (
    <div className="tool-lcp">
      <div className="lcp-read" aria-live="polite">
        <p className="lcp-val"><span>{v.toFixed(1)}</span> s</p>
        <p className="lcp-zone" data-zone={zone}>{t.zones[zone]}</p>
      </div>
      <div className="lcp-bar" aria-hidden="true">
        <i /><i /><i />
        <b style={{ left: `${(v / 6) * 100}%` }} />
      </div>
      <div className="lcp-ticks mono" aria-hidden="true">
        <span>0</span><span style={{ left: `${(2.5 / 6) * 100}%` }}>2.5 s</span><span style={{ left: `${(4 / 6) * 100}%` }}>4 s</span><span>6 s</span>
      </div>
      <label htmlFor={id} className="cap">{t.lcpLabel}</label>
      <input id={id} type="range" min={0.5} max={6} step={0.1} value={v} onChange={(e) => setV(Number(e.target.value))} aria-valuetext={`${v.toFixed(1)} s, ${t.zones[zone]}`} />
      <dl className="lcp-foot">
        {t.lcpFooter.map((f) => (
          <div key={f.k}><dt className="mono">{f.k} <span>{f.v}</span></dt><dd className="caption">{f.t}</dd></div>
        ))}
      </dl>
      <p className="caption">{t.lcpNote}</p>
    </div>
  );
}

function CodeTool({ t }: { t: T }) {
  const [after, setAfter] = useState(true);
  const notes = after ? t.notesAfter : t.notesBefore;
  return (
    <div className="tool-code">
      <div className="seg" role="group" aria-label="Code">
        <button type="button" aria-pressed={!after} onClick={() => setAfter(false)}>{t.before}</button>
        <button type="button" aria-pressed={after} onClick={() => setAfter(true)}>{t.after}</button>
      </div>
      <pre className="code" aria-live="polite">
        {after ? (
          <code>
            {'<'}<em>header</em>{' class="hero">\n  <img src="'}<em>sala-1200.avif</em>{'"\n       '}<em>width=&quot;1200&quot; height=&quot;800&quot;</em>{'\n       '}<em>alt=&quot;Sala della trattoria a pranzo&quot;</em>{'\n       '}<em>fetchpriority=&quot;high&quot;</em>{'>\n  <'}<em>h1</em>{'>Cucina pavese in centro a Pavia</'}<em>h1</em>{'>\n</'}<em>header</em>{'>'}
          </code>
        ) : (
          <code>{'<div class="hero">\n  <img src="foto_sala_DEFINITIVA.jpg">\n  <div class="title">Benvenuti!!</div>\n</div>'}</code>
        )}
      </pre>
      <ul className="code-notes">
        {notes.map((n) => (
          <li key={n.k}><span className="mono">{n.k}</span><span className="small">{n.t}</span></li>
        ))}
      </ul>
    </div>
  );
}

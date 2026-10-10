'use client';

import { useEffect, useRef, useState } from 'react';
import { Icon } from './Icon';

type Shot = { src: string; w: number; h: number; alt: string };
type Labels = { zoom: string; close: string; film: string; prev: string; next: string };

/** Full-resolution screen for the zoom: same file name under /zoom (780 × 1594, from the 1170 × 2391 app captures). */
const zoomSrc = (src: string) => src.replace(/\/([^/]+)$/, '/zoom/$1');

const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Trainly visuals: the promo film playing in a phone, beside a slider of the app screens.
 * The film starts muted and loops (with Reduce motion it waits for play); each screen opens full size in a native dialog.
 */
export function TrainlyGallery({ shots, labels }: { shots: Shot[]; labels: Labels }) {
  const film = useRef<HTMLVideoElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const [shot, setShot] = useState<Shot | null>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    if (reduced()) film.current?.pause();
  }, []);

  const onScroll = () => {
    const t = track.current!;
    setEdge({ start: t.scrollLeft <= 1, end: t.scrollLeft + t.clientWidth >= t.scrollWidth - 1 });
  };
  useEffect(onScroll, []);

  // One screen per click: the first item's width plus the track gap.
  const slide = (dir: 1 | -1) => {
    const t = track.current!;
    const step = (t.firstElementChild as HTMLElement).offsetWidth + parseFloat(getComputedStyle(t).columnGap);
    t.scrollBy({ left: dir * step, behavior: reduced() ? 'auto' : 'smooth' });
  };

  const open = (s: Shot) => {
    setShot(s);
    dialog.current?.showModal();
  };

  return (
    <div className="proj-trainly">
      {/* PhoneFrame markup, inlined: Blocks is server-only (it loads the dictionaries). */}
      <div className="phone phone-film">
        <div className="phone-screen">
          <video ref={film} src="/video/trainly-film.mp4" poster="/img/trainly/film-poster.webp" width={720} height={1280} autoPlay muted loop playsInline controls aria-label={labels.film} />
        </div>
      </div>

      <div className="shots-slider">
        <div ref={track} className="shots-track" onScroll={onScroll}>
          {shots.map((s) => (
            <button key={s.src} type="button" className="phone-shot shot-btn" onClick={() => open(s)} aria-haspopup="dialog">
              <img src={s.src} alt={s.alt} width={s.w} height={s.h} decoding="async" />
              <span className="vh">{labels.zoom}</span>
            </button>
          ))}
        </div>
        <div className="shots-nav">
          <button type="button" className="round-btn" onClick={() => slide(-1)} disabled={edge.start}>
            <Icon name="arrow-right" className="flip" />
            <span className="vh">{labels.prev}</span>
          </button>
          <button type="button" className="round-btn" onClick={() => slide(1)} disabled={edge.end}>
            <Icon name="arrow-right" />
            <span className="vh">{labels.next}</span>
          </button>
        </div>
      </div>

      {/* Esc and the backdrop close it natively; any click closes too, so a tap on the enlarged image dismisses it on touch. */}
      <dialog ref={dialog} className="zoom" aria-label={shot?.alt} onClick={() => dialog.current?.close()} onClose={() => setShot(null)}>
        {shot && <img src={zoomSrc(shot.src)} alt={shot.alt} width={780} height={1594} />}
        <button type="button" className="round-btn zoom-close" autoFocus>
          <Icon name="x" size={18} />
          <span className="vh">{labels.close}</span>
        </button>
      </dialog>
    </div>
  );
}

'use client';

import { useRef, useState } from 'react';
import { Icon } from './Icon';

type Shot = { src: string; w: number; h: number; alt: string };

/** Full-resolution screen for the zoom: same file name under /zoom (780 × 1594, from the 1170 × 2391 app captures). */
const zoomSrc = (src: string) => src.replace(/\/([^/]+)$/, '/zoom/$1');

/** Trainly app screens, each opening full size in a native modal dialog, followed by the promo film. */
export function TrainlyGallery({ shots, labels }: { shots: Shot[]; labels: { zoom: string; close: string; film: string } }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [shot, setShot] = useState<Shot | null>(null);

  const open = (s: Shot) => {
    setShot(s);
    ref.current?.showModal();
  };

  return (
    <div className="proj-phones">
      {shots.map((s) => (
        <button key={s.src} type="button" className="phone-shot shot-btn" onClick={() => open(s)} aria-haspopup="dialog">
          <img src={s.src} alt={s.alt} width={s.w} height={s.h} decoding="async" />
          <span className="vh">{labels.zoom}</span>
        </button>
      ))}
      <video className="phone-shot film" src="/video/trainly-film.mp4" poster="/img/trainly/film-poster.webp" width={720} height={1280} controls playsInline preload="none" aria-label={labels.film} />
      {/* Esc and the backdrop close it natively; any click closes too, so a tap on the enlarged image dismisses it on touch. */}
      <dialog ref={ref} className="zoom" aria-label={shot?.alt} onClick={() => ref.current?.close()} onClose={() => setShot(null)}>
        {shot && <img src={zoomSrc(shot.src)} alt={shot.alt} width={780} height={1594} />}
        <button type="button" className="round-btn zoom-close" autoFocus>
          <Icon name="x" size={18} />
          <span className="vh">{labels.close}</span>
        </button>
      </dialog>
    </div>
  );
}

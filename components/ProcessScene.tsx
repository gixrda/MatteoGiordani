'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { BuildObject, type BuildLabels } from './BuildObject';
import { ScaleBox } from './ScaleBox';
import { Icon } from './Icon';

type Step = { name: string; kicker: string; text: string };
type Props = { steps: Step[]; labels: BuildLabels; play: string; pause: string; stepsLabel: string; illustrative: string };

// Must match the media query in styles/home.css that pins the scene.
const PIN_QUERY = '(min-width: 901px) and (min-height: 760px) and (prefers-reduced-motion: no-preference)';

/**
 * Home process (spec §6.13, §6.14, §9.4).
 * Desktop: pinned with position: sticky, scroll progress picks the stage; step buttons scroll to their stage.
 * Mobile / reduced motion: no pinning; step chips, autoplay every 3.4 s (not with reduced motion) with play/pause.
 */
export function ProcessScene({ steps, labels, play, pause, stepsLabel, illustrative }: Props) {
  const [stage, setStage] = useState(0);
  const [pinned, setPinned] = useState(false);
  const [playing, setPlaying] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = matchMedia(PIN_QUERY);
    const sync = () => {
      setPinned(mq.matches);
      setPlaying(!mq.matches && !matchMedia('(prefers-reduced-motion: reduce)').matches);
    };
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  // Scroll-driven stage while pinned.
  useEffect(() => {
    if (!pinned) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = wrap.current!.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / (r.height - innerHeight)));
      setStage(Math.min(steps.length - 1, Math.floor(p * steps.length)));
    };
    const onScroll = () => (raf ||= requestAnimationFrame(update));
    update();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    return () => {
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [pinned, steps.length]);

  // Autoplay while not pinned.
  useEffect(() => {
    if (pinned || !playing) return;
    const id = setInterval(() => setStage((s) => (s + 1) % steps.length), 3400);
    return () => clearInterval(id);
  }, [pinned, playing, steps.length]);

  const pick = useCallback(
    (i: number) => {
      if (pinned) {
        const el = wrap.current!;
        const top = el.getBoundingClientRect().top + scrollY;
        scrollTo({ top: top + ((i + 0.5) / steps.length) * (el.offsetHeight - innerHeight) });
      } else {
        setPlaying(false);
        setStage(i);
      }
    },
    [pinned, steps.length],
  );

  const s = steps[stage];
  return (
    <div className="proc-pin" ref={wrap}>
      <div className="proc-sticky">
        <div className="timeline" role="group" aria-label={stepsLabel}>
          <div className="timeline-line" aria-hidden="true"><i style={{ transform: `scaleX(${stage / (steps.length - 1)})` }} /></div>
          {steps.map((st, i) => (
            <button key={st.name} type="button" aria-current={i === stage ? 'step' : undefined} data-done={i < stage || undefined} onClick={() => pick(i)}>
              <i aria-hidden="true" />
              <span>{st.name}</span>
            </button>
          ))}
        </div>
        <div className="stepcard">
          <div className="stepcard-copy">
            <p className="stepcard-n" aria-hidden="true">{String(stage + 1).padStart(2, '0')}</p>
            <h3 className="stepcard-name">{s.name}</h3>
            <p className="stepcard-kicker">{s.kicker}</p>
            <p className="small stepcard-text">{s.text}</p>
            <div className="stepcard-foot">
              {!pinned && (
                <button type="button" className="round-btn" onClick={() => setPlaying((p) => !p)} aria-label={playing ? pause : play}>
                  <Icon name={playing ? 'pause' : 'play'} size={15} />
                </button>
              )}
              <span className="mono caption">{illustrative}</span>
            </div>
          </div>
          <div className="stepcard-panel">
            <ScaleBox w={680} h={460}>
              <BuildObject stage={stage} labels={labels} name={s.name} />
            </ScaleBox>
          </div>
        </div>
      </div>
    </div>
  );
}

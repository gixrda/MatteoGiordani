'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { BuildObject, type BuildLabels } from './BuildObject';
import { ScaleBox } from './ScaleBox';
import { Icon } from './Icon';

type Step = { name: string; kicker: string; text: string };
type Props = { steps: Step[]; labels: BuildLabels; play: string; pause: string; stepsLabel: string; illustrative: string };

/**
 * Home process (spec §6.13, §6.14). Plays by itself (3.4 s per step) once the scene scrolls into view,
 * pauses while it is off-screen. Picking a step or pressing pause stops it; play resumes it.
 * Reduced motion: no autoplay, every step reachable with the buttons.
 */
export function ProcessScene({ steps, labels, play, pause, stepsLabel, illustrative }: Props) {
  const [stage, setStage] = useState(0);
  const [playing, setPlaying] = useState(false); // user intent
  const [visible, setVisible] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.45 });
    io.observe(wrap.current!);
    setPlaying(true);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!playing || !visible) return;
    const id = setInterval(() => setStage((s) => (s + 1) % steps.length), 3400);
    return () => clearInterval(id);
  }, [playing, visible, steps.length]);

  const pick = useCallback((i: number) => {
    setPlaying(false);
    setStage(i);
  }, []);

  const s = steps[stage];
  return (
    <div className="proc" ref={wrap}>
      <div>
        <div className="timeline" role="group" aria-label={stepsLabel}>
          <div className="timeline-line" aria-hidden="true"><i style={{ transform: `scaleX(${stage / (steps.length - 1)})` }} /></div>
          {steps.map((st, i) => (
            <button key={st.name} type="button" aria-current={i === stage ? 'step' : undefined} data-done={i < stage || undefined} onClick={() => pick(i)}>
              <i aria-hidden="true" />
              <span>{st.name}</span>
            </button>
          ))}
        </div>
        <div className="stepcard glow">
          <div className="stepcard-copy">
            <p className="stepcard-n" aria-hidden="true">{String(stage + 1).padStart(2, '0')}</p>
            <h3 className="stepcard-name">{s.name}</h3>
            <p className="stepcard-kicker">{s.kicker}</p>
            <p className="small stepcard-text">{s.text}</p>
            <div className="stepcard-foot">
              <button type="button" className="round-btn" onClick={() => setPlaying((p) => !p)} aria-label={playing ? pause : play}>
                <Icon name={playing ? 'pause' : 'play'} size={15} />
              </button>
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

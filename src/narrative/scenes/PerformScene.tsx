import { motion } from 'framer-motion';
import { useNarrative } from '../NarrativeContext';
import { SceneCaption } from '../SceneCaption';
import { BEAT, sceneById } from '../timeline';
import { useKeyframes, useStep } from '../motion';
import { U, type Box } from '../geometry';

const STATES = ['Heavy', 'Cleaner', 'Lighter', 'Faster'] as const;
const STATE_STARTS = [BEAT.heavy[0], BEAT.clean[0], BEAT.lighter[0], BEAT.faster[0]];

/** Conceptual states only — no numbers are shown or implied. */
const VITALS = [
  ['LCP', 'Loading', 'The main content appears early.'],
  ['INP', 'Responsiveness', 'The page reacts without delay.'],
  ['CLS', 'Visual stability', 'Nothing moves unexpectedly.'],
] as const;

export function PerformCaption() {
  const { p } = useNarrative();
  const step = useStep(p, STATE_STARTS);
  return (
    <SceneCaption
      scene={sceneById('perform')}
      title={<>Lighter. Faster. Stable.</>}
      aside={
        <div className="perform">
          <ol className="perform__states" aria-label="Performance states">
            {STATES.map((s, i) => (
              <li key={s} className={i <= step ? 'is-on' : undefined} aria-current={i === step ? 'step' : undefined}>
                {s}
              </li>
            ))}
          </ol>
          <ul className="perform__vitals">
            {VITALS.map(([abbr, name, text]) => (
              <li key={abbr} className={step >= 3 ? 'is-ok' : undefined}>
                <abbr title={name}>{abbr}</abbr>
                <span>
                  <b>{name}.</b> {text}
                </span>
              </li>
            ))}
          </ul>
          <p className="perform__note">Core Web Vitals, shown as concepts — not measured scores.</p>
        </div>
      }
    />
  );
}

interface Artefact {
  label: string;
  box: Box;
  variant: 'modal' | 'bar' | 'bubble' | 'image';
  i: number;
}

/** What makes real sites heavy: third-party widgets, oversized media, overlays. */
const ARTEFACTS: Artefact[] = [
  { label: 'hero-banner-4000px.png', box: { top: 14, left: 61, width: 34, height: 21 }, variant: 'image', i: 0 },
  { label: 'popup.js', box: { top: 17, left: 30, width: 36, height: 20 }, variant: 'modal', i: 1 },
  { label: 'cookie-banner.js', box: { top: 56.5, left: 5, width: 90, height: 5 }, variant: 'bar', i: 2 },
  { label: 'chat-widget.js', box: { top: 45, left: 86, width: 9, height: 9 }, variant: 'bubble', i: 3 },
];

export function PerformOverlay() {
  return (
    <>
      {ARTEFACTS.map((a) => (
        <HeavyArtefact key={a.label} {...a} />
      ))}
    </>
  );
}

function HeavyArtefact({ label, box, variant, i }: Artefact) {
  const { p, layout } = useNarrative();
  const u = layout.u;
  const tIn = BEAT.heavy[0] + i * 0.007;
  const tOut = BEAT.clean[0] + i * 0.008;
  const opacity = useKeyframes(p, [tIn, tIn + 0.012, tOut, tOut + 0.012], [0, 1, 1, 0]);
  const y = useKeyframes(p, [tIn, tIn + 0.012, tOut, tOut + 0.012], [-2 * u, 0, 0, 3 * u]);
  return (
    <motion.div
      className={`ov-heavy ov-heavy--${variant}`}
      style={{ top: U(box.top), left: U(box.left), width: U(box.width), height: U(box.height), opacity, y, z: 3 * u }}
    >
      <span className="ov-heavy__label">{label}</span>
    </motion.div>
  );
}

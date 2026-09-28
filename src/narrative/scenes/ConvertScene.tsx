import { motion } from 'framer-motion';
import { useNarrative } from '../NarrativeContext';
import { SceneCaption } from '../SceneCaption';
import { sceneById } from '../timeline';
import { useFade, useKeyframes } from '../motion';
import { ANCHOR, U } from '../geometry';

const NODE_X = 2.4;
const STEPS = [
  { label: 'Search', y: -7, t: 0.815 },
  { label: 'Land', y: ANCHOR.heroH1.y, t: 0.83 },
  { label: 'Act', y: ANCHOR.heroCta.y, t: 0.845 },
];

export function ConvertCaption() {
  return (
    <SceneCaption
      scene={sceneById('convert')}
      title={<>A website shouldn't only rank. It should work.</>}
      aside={
        <ol className="journey-steps label" aria-label="User journey">
          {STEPS.map((s, i) => (
            <li key={s.label}>
              <span>{String(i + 1).padStart(2, '0')}</span> {s.label}
            </li>
          ))}
        </ol>
      }
    >
      Clear hierarchy, one obvious next step, a journey that ends in a conversation. This is where SEO, Front-End and
      UX meet.
    </SceneCaption>
  );
}

/** The user journey: from the search, through the headline, to one clear action. */
export function ConvertOverlay() {
  const { p } = useNarrative();
  const draw = useKeyframes(p, [0.815, 0.855], [0, 1]);
  const opacity = useFade(p, 0.81, 0.82, 0.9, 0.92);
  const first = STEPS[0].y;
  const last = STEPS[STEPS.length - 1].y;

  return (
    <motion.div className="ov-journey" style={{ opacity }}>
      <svg className="ov-lines ov-lines--journey" viewBox="0 0 100 64" aria-hidden>
        <motion.path d={`M${NODE_X} ${first} L${NODE_X} ${last}`} style={{ pathLength: draw }} />
      </svg>
      {STEPS.map((s, i) => (
        <JourneyNode key={s.label} index={i + 1} {...s} />
      ))}
    </motion.div>
  );
}

function JourneyNode({ label, y, t, index }: { label: string; y: number; t: number; index: number }) {
  const { p } = useNarrative();
  const opacity = useKeyframes(p, [t, t + 0.012], [0, 1]);
  return (
    <motion.span className="ov-node" style={{ left: U(NODE_X), top: U(y), opacity }}>
      <span className="ov-node__dot" />
      <span className="ov-node__label">
        {String(index).padStart(2, '0')} {label}
      </span>
    </motion.span>
  );
}

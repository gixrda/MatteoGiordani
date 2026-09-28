import { motion } from 'framer-motion';
import { useNarrative } from '../NarrativeContext';
import { SceneCaption } from '../SceneCaption';
import { sceneById } from '../timeline';
import { useFade, useKeyframes } from '../motion';
import { ANCHOR, U } from '../geometry';
import { useI18n } from '../../i18n/I18nContext';

interface Query {
  q: string;
  intent: string;
  at: { x: number; y: number };
  to: { x: number; y: number };
}

/** Where each illustrative query sits and which part of the page answers it (text comes from the dictionary). */
const PLACEMENT = [
  { at: { x: 0, y: -16 }, to: ANCHOR.heroCenter },
  { at: { x: 50, y: -16 }, to: ANCHOR.card3 },
  { at: { x: 4, y: -9.5 }, to: ANCHOR.card1 },
  { at: { x: 56, y: -9.5 }, to: ANCHOR.navLinks },
];

const CAPSULE_H = 4.4;

export function UnderstandCaption() {
  const { t } = useI18n();
  const copy = t.scenes.understand;
  return (
    <SceneCaption scene={sceneById('understand')} title={copy.title}>
      {copy.body}
    </SceneCaption>
  );
}

/** Real searches arrive and connect to the parts of the page that should answer them. */
export function UnderstandOverlay() {
  const { t } = useI18n();
  const QUERIES: Query[] = t.demo.queries.map((query, i) => ({ ...query, ...PLACEMENT[i] }));
  return (
    <>
      <svg className="ov-lines" viewBox="0 0 100 64" aria-hidden>
        {QUERIES.map((q, i) => (
          <QueryLine key={i} query={q} i={i} />
        ))}
      </svg>
      {QUERIES.map((q, i) => (
        <QueryCapsule key={i} query={q} i={i} />
      ))}
    </>
  );
}

function QueryCapsule({ query, i }: { query: Query; i: number }) {
  const { p } = useNarrative();
  const t = 0.205 + i * 0.012;
  const opacity = useFade(p, t, t + 0.02, 0.33, 0.36);
  const y = useKeyframes(p, [t, t + 0.02], [10, 0]);
  return (
    <motion.div className="ov-query" style={{ left: U(query.at.x), top: U(query.at.y), opacity, y }}>
      <span className="ov-query__dot" />
      <span className="ov-query__text">{query.q}</span>
      <span className="ov-query__intent">{query.intent}</span>
    </motion.div>
  );
}

function QueryLine({ query, i }: { query: Query; i: number }) {
  const { p } = useNarrative();
  const t = 0.235 + i * 0.012;
  const pathLength = useKeyframes(p, [t, t + 0.035], [0, 1]);
  const opacity = useFade(p, t, t + 0.005, 0.33, 0.36);
  const x0 = query.at.x + 2.1;
  const y0 = query.at.y + CAPSULE_H / 2;
  const { x, y } = query.to;
  const d = `M${x0} ${y0} C ${x0} ${y0 + (y - y0) * 0.6}, ${x} ${y - (y - y0) * 0.4}, ${x} ${y}`;
  return (
    <motion.g style={{ opacity }}>
      <motion.path d={d} style={{ pathLength }} />
      <circle cx={x} cy={y} r={0.7} />
    </motion.g>
  );
}

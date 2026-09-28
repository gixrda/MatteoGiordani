import { motion } from 'framer-motion';
import { useNarrative } from '../NarrativeContext';
import { SceneCaption } from '../SceneCaption';
import { sceneById } from '../timeline';
import { useFade, useTypedCount } from '../motion';
import { U } from '../geometry';

const QUERY = 'strength training near me';

export function DiscoverCaption() {
  return (
    <SceneCaption scene={sceneById('discover')} title={<>Being online isn't the same as being found.</>}>
      Most websites exist. Few are found by the people already searching for what they offer.
    </SceneCaption>
  );
}

/**
 * A search happens above the unfinished page. Results appear —
 * and the slot where this website should be stays empty.
 */
export function DiscoverOverlay() {
  const { p } = useNarrative();
  const search = useFade(p, 0.1, 0.125, 0.19, 0.205);
  const results = useFade(p, 0.14, 0.16, 0.185, 0.2);
  const typed = useTypedCount(p, [0.11, 0.14], [0, QUERY.length]);

  return (
    <>
      <motion.div className="ov-query ov-query--search" style={{ left: U(0), top: U(-16), opacity: search }}>
        <svg className="ov-query__glyph" viewBox="0 0 16 16" aria-hidden>
          <circle cx="7" cy="7" r="4.6" />
          <path d="M10.4 10.4 L14 14" />
        </svg>
        <span className="ov-query__text">
          {QUERY.slice(0, typed)}
          {typed < QUERY.length && <span className="obj-caret" />}
        </span>
      </motion.div>

      <motion.div className="ov-results" style={{ left: U(52), top: U(-20), opacity: results }}>
        {[0, 1, 2].map((i) => (
          <span className="ov-results__row" key={i}>
            <i style={{ width: U(22 - i * 3) }} />
            <i style={{ width: U(12 + i * 2) }} />
          </span>
        ))}
        <span className="ov-results__row ov-results__row--empty">your-business.it ?</span>
      </motion.div>
    </>
  );
}

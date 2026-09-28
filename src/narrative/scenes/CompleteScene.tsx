import { motion } from 'framer-motion';
import { useNarrative } from '../NarrativeContext';
import { useKeyframes, useVisibility } from '../motion';

/**
 * Payoff: the object has filled the viewport and dissolved into the page.
 * The website you watched being built is the one you are now using.
 */
export function CompleteScene() {
  const { p } = useNarrative();
  const opacity = useKeyframes(p, [0.955, 0.985], [0, 1]);
  const y = useKeyframes(p, [0.955, 0.99], [36, 0]);
  const visibility = useVisibility(opacity);
  return (
    <motion.div className="complete" style={{ opacity, y, visibility }}>
      <p className="label">07 — Complete</p>
      <h2 className="complete__title display-l">The website is ready.</h2>
      <p className="complete__lead lead">You've just watched it being built. Now you're using it.</p>
    </motion.div>
  );
}

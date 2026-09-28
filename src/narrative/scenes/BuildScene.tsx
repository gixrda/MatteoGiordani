import { motion } from 'framer-motion';
import { useNarrative } from '../NarrativeContext';
import { SceneCaption } from '../SceneCaption';
import { sceneById } from '../timeline';
import { useFade, useKeyframes } from '../motion';
import { U } from '../geometry';

export function BuildCaption() {
  return (
    <SceneCaption scene={sceneById('build')} emphasis title={<>I don't stop at the audit. I&nbsp;can build the fix.</>}>
      The person who finds the problem also writes the components, the layout and the CSS that solve it. Nothing
      lost in a hand-off.
    </SceneCaption>
  );
}

/**
 * Two fragments of real code — one component, one layout rule — then the same
 * UI on a narrow viewport. Code is used sparingly: it is evidence, not decoration.
 */
export function BuildOverlay() {
  const { p, layout } = useNarrative();
  const u = layout.u;
  const component = useFade(p, 0.505, 0.53, 0.6, 0.625);
  const componentY = useKeyframes(p, [0.505, 0.53], [3 * u, 0]);
  const css = useFade(p, 0.52, 0.545, 0.6, 0.625);
  const cssY = useKeyframes(p, [0.52, 0.545], [3 * u, 0]);
  const phone = useFade(p, 0.598, 0.628, 0.655, 0.685);
  const phoneX = useKeyframes(p, [0.598, 0.628], [6 * u, 0]);

  return (
    <>
      <motion.pre
        className="ov-code"
        style={{ left: U(-6), top: U(40), opacity: component, y: componentY, z: 16 * u }}
      >
        <code>
          <span className="t">&lt;Hero</span>
          {'\n  '}
          <span className="a">title</span>={'{'}page.h1{'}'}
          {'\n  '}
          <span className="a">cta</span>=<span className="s">"Book a free session"</span>
          {'\n'}
          <span className="t">/&gt;</span>
        </code>
      </motion.pre>

      <motion.pre className="ov-code" style={{ left: U(50), top: U(-15), opacity: css, y: cssY, z: 12 * u }}>
        <code>
          <span className="t">.cards</span> {'{'}
          {'\n  '}
          <span className="a">display</span>: grid;
          {'\n  '}
          <span className="a">grid-template-columns</span>:{'\n    '}repeat(auto-fit, minmax(16rem, 1fr));
          {'\n'}
          {'}'}
        </code>
      </motion.pre>

      <motion.div className="ov-phone" style={{ opacity: phone, x: phoneX, z: 10 * u }}>
        <span className="ov-phone__notch" />
        <span className="ui-logo ui-logo--small">
          your<b>·</b>business
        </span>
        <span className="ov-phone__h1">Strength training, close to home.</span>
        <span className="ui-btn ov-phone__cta">Book a free session</span>
        <span className="ov-phone__media" />
        <span className="ov-phone__card" />
        <span className="ov-phone__card" />
      </motion.div>
    </>
  );
}

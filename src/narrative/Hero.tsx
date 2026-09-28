import { motion } from 'framer-motion';
import { useNarrative } from './NarrativeContext';
import { useFade, useKeyframes, useVisibility } from './motion';
import { HERO_OUT, INTRO } from './timeline';

/**
 * The first viewport. It lives inside the pinned stage so that the object
 * shown here is the very same one that evolves through the narrative.
 */
export function Hero() {
  const { p } = useNarrative();
  const opacity = useKeyframes(p, HERO_OUT, [1, 0]);
  const y = useKeyframes(p, HERO_OUT, [0, -56]);
  const visibility = useVisibility(opacity);

  return (
    <>
      <motion.div className="hero" style={{ opacity, y, visibility }}>
        <div className="hero__id">
          <p className="hero__name">Matteo Giordani</p>
          <p className="hero__role">SEO Specialist &amp; Front-End Developer</p>
        </div>
        <h1 className="hero__title display-xl">I build websites that rank, perform and convert.</h1>
        <p className="hero__lead lead">I help businesses get found on Google.</p>
        <div className="hero__actions">
          <a className="btn btn--primary" href="#contact">
            Get in touch
          </a>
          <a className="btn btn--secondary" href="#work">
            View my work
          </a>
        </div>
      </motion.div>
      <motion.p className="hero__cue label" style={{ opacity, visibility }} aria-hidden>
        <span className="hero__cue-line" />
        Scroll — watch the website build itself
      </motion.p>
    </>
  );
}

/** The promise, stated once, between the hero and chapter one. */
export function IntroTitle() {
  const { p } = useNarrative();
  const opacity = useFade(p, INTRO[0], INTRO[1], INTRO[2], INTRO[3]);
  const y = useKeyframes(p, INTRO, [28, 0, 0, -28]);
  const visibility = useVisibility(opacity);
  return (
    <motion.div className="caption caption--intro" style={{ opacity, y, visibility }}>
      <p className="caption__index label">From unfinished to found</p>
      <p className="caption__title">The website builds itself while you scroll.</p>
    </motion.div>
  );
}

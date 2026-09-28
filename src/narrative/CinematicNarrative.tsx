import { useCallback, useMemo, useRef, type CSSProperties } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { NarrativeContext, useNarrative, type NarrativeState } from './NarrativeContext';
import { useStageLayout, type StageLayout } from './useStageLayout';
import { useColorKeyframes, useKeyframes } from './motion';
import { BEAT } from './timeline';
import { BrowserObject } from './BrowserObject';
import { useI18n } from '../i18n/I18nContext';
import { Hero, IntroTitle } from './Hero';
import { ChapterRail } from './ChapterRail';
import { DiscoverCaption, DiscoverOverlay } from './scenes/DiscoverScene';
import { UnderstandCaption, UnderstandOverlay } from './scenes/UnderstandScene';
import { OptimizeCaption } from './scenes/OptimizeScene';
import { BuildCaption, BuildOverlay } from './scenes/BuildScene';
import { PerformCaption, PerformOverlay } from './scenes/PerformScene';
import { ConvertCaption, ConvertOverlay } from './scenes/ConvertScene';
import { CompleteScene } from './scenes/CompleteScene';
import './narrative.css';

/**
 * A tall section with a sticky, viewport-sized stage. Native scrolling moves
 * through the section; progress through it drives every scene. Nothing
 * intercepts wheel, touch or keyboard input.
 */
export function CinematicNarrative() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  /*
   * Scrolling stays native; only the animated value is eased. A wheel notch
   * becomes a short glide instead of a jump. Overdamped: no overshoot, and it
   * settles in ~0.2s so fast scrolling never feels detached.
   */
  const smoothed = useSpring(scrollYProgress, { stiffness: 170, damping: 34, mass: 0.5, restDelta: 0.00005 });
  const reduced = useReducedMotion() ?? false;
  const p = reduced ? scrollYProgress : smoothed;
  const layout = useStageLayout(stageRef);
  const { t } = useI18n();

  const toneXs = [BEAT.dark[0], BEAT.dark[1], BEAT.dawn[0], BEAT.dawn[1]];
  /* Light → dark → light as the opacity of one layer (compositor-only), not a repainted background. */
  const night = useKeyframes(p, toneXs, [0, 1, 1, 0]);
  const color = useColorKeyframes(p, toneXs, ['#0b0f14', '#ece7dc', '#ece7dc', '#0b0f14']);

  const state = useMemo<NarrativeState>(() => ({ p, layout, reduced }), [p, layout, reduced]);

  const jumpTo = useCallback(
    (progress: number) => {
      const el = sectionRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      const distance = el.offsetHeight - window.innerHeight;
      window.scrollTo({ top: top + progress * distance, behavior: reduced ? 'auto' : 'smooth' });
    },
    [reduced],
  );

  const skip = useCallback(() => {
    document.getElementById('services')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  }, [reduced]);

  return (
    <NarrativeContext.Provider value={state}>
      <section ref={sectionRef} id="top" className="narrative" aria-label={t.narrativeLabel}>
        <motion.div
          ref={stageRef}
          className={`stage${layout.compact ? ' stage--compact' : ''}`}
          style={{ color }}
        >
          <motion.div className="stage__night" style={{ opacity: night }} aria-hidden />
          <ObjectStage />
          <Hero />
          <div className="stage__copy">
            <IntroTitle />
            <DiscoverCaption />
            <UnderstandCaption />
            <OptimizeCaption />
            <BuildCaption />
            <PerformCaption />
            <ConvertCaption />
          </div>
          <CompleteScene />
          <ChapterRail onJump={jumpTo} onSkip={skip} />
        </motion.div>
      </section>
    </NarrativeContext.Provider>
  );
}

/* ------------------------------------------------------------------ */

/** Rig keyframe stops (narrative progress). */
const K = [0, 0.035, 0.09, 0.2, 0.3, 0.37, 0.44, 0.5, 0.56, 0.61, 0.66, 0.8, 0.86, 0.92, 0.985];

function rigKeyframes(layout: StageLayout, reduced: boolean) {
  const { w, h, slot, compact } = layout;
  const cx = w / 2 - (slot.x + slot.w / 2);
  const cy = h / 2 - (slot.y + slot.h / 2);
  const fill = Math.max(w / slot.w, h / slot.h) * 1.04;
  const r = reduced ? 0 : 1;

  if (compact) {
    return {
      x: K.map((_, i) => (i === K.length - 1 ? cx : 0)),
      /* Perform carries the tallest caption (states + vitals + note): the object steps down for it. */
      y: [0.2, 0.08, 0.03, 0.03, 0.06, 0.04, 0.06, 0.06, 0.04, 0.02, 0.07, 0.07, 0.03, 0].map((f) => f * h).concat(cy),
      s: [0.82, 0.86, 0.86, 0.86, 0.82, 0.82, 0.76, 0.76, 0.8, 0.88, 0.86, 0.86, 0.94, 0.94, fill],
      rx: [6, 4, 3, 3, 2, 5, 9, 9, 7, 2, 0, 0, 0, 0, 0].map((v) => v * r),
      ry: [-12, -8, -6, -6, -3, -9, -16, -16, -10, -3, 0, 0, 0, 0, 0].map((v) => v * r),
    };
  }
  return {
    x: [0.1, 0.02, 0, 0, 0, 0, -0.01, -0.01, 0, 0, 0, 0, 0, 0].map((f) => f * w).concat(cx),
    y: [0.17, 0.06, 0.03, 0.03, 0.07, 0.05, 0.07, 0.07, 0.05, 0.02, 0, 0, 0, 0].map((f) => f * h).concat(cy),
    s: [0.94, 0.86, 0.82, 0.84, 0.86, 0.84, 0.8, 0.8, 0.84, 0.9, 0.9, 0.92, 0.96, 0.96, fill],
    rx: [9, 6, 5, 5, 3, 8, 14, 14, 10, 2, 0, 0, 0, 0, 0].map((v) => v * r),
    ry: [-26, -16, -12, -12, -6, -18, -30, -30, -18, -4, 0, 0, 0, 0, 0].map((v) => v * r),
  };
}

/** The object in its 3D space, plus every scene overlay anchored to it. */
function ObjectStage() {
  const { p, layout, reduced } = useNarrative();
  const kf = rigKeyframes(layout, reduced);
  const x = useKeyframes(p, K, kf.x);
  const y = useKeyframes(p, K, kf.y);
  const scale = useKeyframes(p, K, kf.s);
  const rotateX = useKeyframes(p, K, kf.rx);
  const rotateY = useKeyframes(p, K, kf.ry);
  const { slot } = layout;

  const slotStyle = {
    left: slot.x,
    top: slot.y,
    width: slot.w,
    height: slot.h,
    '--u': `${layout.u}px`,
  } as CSSProperties;

  return (
    <div className="slot" style={slotStyle} aria-hidden>
      <motion.div className="rig" style={{ x, y, scale, rotateX, rotateY }}>
        <BrowserObject />
        <DiscoverOverlay />
        <UnderstandOverlay />
        <BuildOverlay />
        <PerformOverlay />
        <ConvertOverlay />
      </motion.div>
    </div>
  );
}

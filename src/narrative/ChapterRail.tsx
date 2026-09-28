import { motion, useTransform } from 'framer-motion';
import { useNarrative } from './NarrativeContext';
import { useFade, useStep, useVisibility } from './motion';
import { COMPLETE, SCENES } from './timeline';
import { useI18n } from '../i18n/I18nContext';

interface ChapterRailProps {
  /** Scroll the page to a given narrative progress. */
  onJump: (progress: number) => void;
  onSkip: () => void;
}

/**
 * Orientation inside a long pinned sequence, and a way to move faster:
 * every chapter is a native scroll target, and the intro can be skipped.
 */
export function ChapterRail({ onJump, onSkip }: ChapterRailProps) {
  const { p } = useNarrative();
  const { t } = useI18n();
  const first = SCENES[0].start;
  const opacity = useFade(p, first - 0.02, first, COMPLETE.start - 0.01, COMPLETE.start + 0.01);
  const visibility = useVisibility(opacity);
  const active = useStep(p, SCENES.map((s) => s.start));
  const progress = useTransform(p, [first, COMPLETE.start], [0, 1]);
  const current = SCENES[Math.max(active, 0)];

  return (
    <motion.nav className="rail" style={{ opacity, visibility }} aria-label={t.rail.label}>
      <ol className="rail__list">
        {SCENES.map((s, i) => (
          <li key={s.id}>
            <button
              type="button"
              className={i === active ? 'is-active' : i < active ? 'is-past' : undefined}
              aria-current={i === active ? 'step' : undefined}
              onClick={() => onJump(s.start + 0.03)}
            >
              <span className="rail__index">{s.index}</span>
              <span className="rail__label">{t.scenes[s.id].label}</span>
            </button>
          </li>
        ))}
      </ol>
      <p className="rail__compact label" aria-hidden>
        {current.index} / 06 — {t.scenes[current.id].label}
      </p>
      <span className="rail__track" aria-hidden>
        <motion.span className="rail__fill" style={{ scaleX: progress }} />
      </span>
      <button type="button" className="rail__skip label" onClick={onSkip}>
        {t.rail.skip}
      </button>
    </motion.nav>
  );
}

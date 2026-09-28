import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useNarrative } from './NarrativeContext';
import { useFade, useKeyframes, useVisibility } from './motion';
import type { Scene } from './timeline';
import { useI18n } from '../i18n/I18nContext';

interface SceneCaptionProps {
  scene: Scene;
  title: ReactNode;
  children?: ReactNode;
  /** Scene-specific content under the body (e.g. Perform states). */
  aside?: ReactNode;
  /** Key positioning moment: larger title. */
  emphasis?: boolean;
}

/** The semantic text of a chapter. Crossfades in and out with its scene range. */
export function SceneCaption({ scene, title, children, aside, emphasis }: SceneCaptionProps) {
  const { p } = useNarrative();
  const { t } = useI18n();
  const inEnd = scene.start + 0.028;
  const outStart = scene.end - 0.022;
  const opacity = useFade(p, scene.start, inEnd, outStart, scene.end);
  const y = useKeyframes(p, [scene.start, inEnd, outStart, scene.end], [28, 0, 0, -28]);
  const visibility = useVisibility(opacity);
  const titleId = `scene-${scene.id}`;

  return (
    <motion.article
      className={`caption${emphasis ? ' caption--emphasis' : ''}`}
      style={{ opacity, y, visibility }}
      aria-labelledby={titleId}
    >
      <p className="caption__index label">
        <span>{scene.index}</span>
        {t.scenes[scene.id].label}
      </p>
      <h2 className="caption__title" id={titleId}>
        {title}
      </h2>
      {children && <p className="caption__body">{children}</p>}
      {aside}
    </motion.article>
  );
}

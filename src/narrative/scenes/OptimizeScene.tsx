import { SceneCaption } from '../SceneCaption';
import { sceneById } from '../timeline';
import { useI18n } from '../../i18n/I18nContext';

/**
 * Optimize has no separate overlay: its visuals are properties of the object
 * itself (depth separation, <head> plane, semantic tags, heading levels,
 * internal links), so they live in BrowserObject and are driven by BEAT.
 */
export function OptimizeCaption() {
  const { t } = useI18n();
  const copy = t.scenes.optimize;
  return (
    <SceneCaption scene={sceneById('optimize')} title={copy.title}>
      {copy.body}
    </SceneCaption>
  );
}

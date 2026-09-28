import { SceneCaption } from '../SceneCaption';
import { sceneById } from '../timeline';

/**
 * Optimize has no separate overlay: its visuals are properties of the object
 * itself (depth separation, <head> plane, semantic tags, heading levels,
 * internal links), so they live in BrowserObject and are driven by BEAT.
 */
export function OptimizeCaption() {
  return (
    <SceneCaption
      scene={sceneById('optimize')}
      title={<>Make the website understandable to search engines — and to people.</>}
    >
      Semantic hierarchy, metadata, internal links, indexability. The structure nobody sees — and everybody depends
      on.
    </SceneCaption>
  );
}

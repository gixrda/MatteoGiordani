import { createContext, useContext } from 'react';
import type { MotionValue } from 'framer-motion';
import type { StageLayout } from './useStageLayout';

export interface NarrativeState {
  /** Scroll progress through the pinned stage, 0 → 1. */
  p: MotionValue<number>;
  layout: StageLayout;
  reduced: boolean;
}

export const NarrativeContext = createContext<NarrativeState | null>(null);

export function useNarrative(): NarrativeState {
  const ctx = useContext(NarrativeContext);
  if (!ctx) throw new Error('useNarrative must be used inside <CinematicNarrative>');
  return ctx;
}

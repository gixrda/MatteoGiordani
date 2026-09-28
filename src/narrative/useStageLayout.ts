import { useLayoutEffect, useState, type RefObject } from 'react';

/** The object is designed in a 100 × 64 unit space (1u = 1% of its width). */
export const OBJECT_RATIO = 0.64;

/** Below this stage width the narrative switches to its simplified, stacked layout. */
export const COMPACT_BELOW = 820;

export interface StageLayout {
  w: number;
  h: number;
  compact: boolean;
  /** 1% of the object width, in px. All object geometry is expressed in u. */
  u: number;
  /** Resting rectangle of the object inside the stage, in px. */
  slot: { x: number; y: number; w: number; h: number };
}

export function computeLayout(w: number, h: number): StageLayout {
  const compact = w < COMPACT_BELOW;
  const width = compact
    ? Math.min(w * 0.9, (h * 0.44) / OBJECT_RATIO)
    : Math.min(w * 0.52, (h - 220) / OBJECT_RATIO);
  const sw = Math.max(width, 220);
  const sh = sw * OBJECT_RATIO;
  const cx = compact ? w / 2 : w * 0.665;
  const cy = compact ? h * 0.63 : h * 0.53;
  return { w, h, compact, u: sw / 100, slot: { x: cx - sw / 2, y: cy - sh / 2, w: sw, h: sh } };
}

/** Measures the sticky stage (100svh, so mobile toolbars do not cause re-layout). */
export function useStageLayout(ref: RefObject<HTMLElement | null>) {
  const [layout, setLayout] = useState<StageLayout>(() =>
    computeLayout(
      typeof window === 'undefined' ? 1440 : window.innerWidth,
      typeof window === 'undefined' ? 900 : window.innerHeight,
    ),
  );

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const { width, height } = el.getBoundingClientRect();
      setLayout((prev) => (prev.w === width && prev.h === height ? prev : computeLayout(width, height)));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);

  return layout;
}

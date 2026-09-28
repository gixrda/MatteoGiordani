import { useEffect, useRef, useState } from 'react';
import { useMotionValueEvent, useTransform, type MotionValue } from 'framer-motion';

const smoothstep = (t: number) => t * t * (3 - 2 * t);

/**
 * Piecewise interpolation with an ease-in-out on every segment.
 * Values are clamped outside the input range.
 */
export function interp(v: number, xs: readonly number[], ys: readonly number[], ease = true): number {
  const last = xs.length - 1;
  if (v <= xs[0]) return ys[0];
  if (v >= xs[last]) return ys[last];
  let i = 0;
  while (i < last - 1 && v > xs[i + 1]) i++;
  const span = xs[i + 1] - xs[i];
  const t = span === 0 ? 1 : (v - xs[i]) / span;
  return ys[i] + (ys[i + 1] - ys[i]) * (ease ? smoothstep(t) : t);
}

/**
 * Scroll-linked keyframes. Outputs may change between renders
 * (e.g. object size on resize) and are picked up immediately.
 */
export function useKeyframes(
  p: MotionValue<number>,
  xs: readonly number[],
  ys: readonly number[],
  ease = true,
): MotionValue<number> {
  const ref = useRef({ xs, ys, ease });
  ref.current = { xs, ys, ease };
  const mv = useTransform(p, (v) => interp(v, ref.current.xs, ref.current.ys, ref.current.ease));
  const key = ys.join(',');
  useEffect(() => {
    mv.set(interp(p.get(), ref.current.xs, ref.current.ys, ref.current.ease));
  }, [key, mv, p]);
  return mv;
}

/** 0 → 1 → 1 → 0 across four points. */
export function useFade(p: MotionValue<number>, a: number, b: number, c = 2, d = 2) {
  return useKeyframes(p, [a, b, c, d], [0, 1, 1, 0]);
}

/** Hide fully transparent content from pointer and assistive focus. */
export function useVisibility(opacity: MotionValue<number>) {
  return useTransform(opacity, (o) => (o < 0.01 ? 'hidden' : 'visible'));
}

/**
 * Text typed by scroll: characters appear between `from` and `to`
 * (and disappear when scrolling back). Re-renders only when the count changes.
 */
export function useTypedCount(p: MotionValue<number>, xs: readonly number[], counts: readonly number[]) {
  const count = (v: number) => Math.round(interp(v, xs, counts, false));
  const [n, setN] = useState(() => count(p.get()));
  useMotionValueEvent(p, 'change', (v) => {
    const next = count(v);
    setN((prev) => (prev === next ? prev : next));
  });
  return n;
}

/** Index of the last beat whose start has been passed (-1 before the first). */
export function useStep(p: MotionValue<number>, starts: readonly number[]) {
  const step = (v: number) => starts.reduce((acc, s, i) => (v >= s ? i : acc), -1);
  const [n, setN] = useState(() => step(p.get()));
  useMotionValueEvent(p, 'change', (v) => {
    const next = step(v);
    setN((prev) => (prev === next ? prev : next));
  });
  return n;
}

type RGBA = [number, number, number, number];

function parseColor(c: string): RGBA {
  if (c.startsWith('#')) {
    const n = parseInt(c.slice(1), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255, 1];
  }
  const [r, g, b, a = 1] = c.match(/[\d.]+/g)!.map(Number);
  return [r, g, b, a];
}

/** Scroll-linked colour keyframes (hex or rgb/rgba), interpolated per channel. */
export function useColorKeyframes(p: MotionValue<number>, xs: readonly number[], colors: readonly string[]) {
  const channels = colors.map(parseColor);
  const ref = useRef({ xs, channels });
  ref.current = { xs, channels };
  return useTransform(p, (v) => {
    const { xs: x, channels: ch } = ref.current;
    const [r, g, b, a] = [0, 1, 2, 3].map((i) =>
      interp(
        v,
        x,
        ch.map((c) => c[i]),
        false,
      ),
    );
    return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${a.toFixed(3)})`;
  });
}

/**
 * Geometry of the central object, in object units (1u = 1% of its width).
 * The object is 100u × 64u; the chrome bar is 4.6u tall.
 * Scenes use these boxes to anchor annotations to the page.
 */
export const U = (n: number) => `calc(var(--u) * ${n})`;

export interface Box {
  top: number;
  left: number;
  width: number;
  height: number;
}

export const CHROME_H = 4.6;

export const LAYERS = {
  header: { top: 7, left: 5, width: 90, height: 4 },
  hero: { top: 14, left: 5, width: 90, height: 21 },
  cards: { top: 38.5, left: 5, width: 90, height: 12.5 },
  footer: { top: 54.5, left: 5, width: 90, height: 5.5 },
} satisfies Record<string, Box>;

/** Anchor points (object coordinates) used by connection lines. */
export const ANCHOR = {
  heroCenter: { x: 40, y: 24 },
  heroMedia: { x: 78, y: 24.5 },
  heroH1: { x: 5, y: 20 },
  heroCta: { x: 5, y: 32.1 },
  navLinks: { x: 70, y: 9 },
  card1: { x: 19.3, y: 44.8 },
  card3: { x: 80.7, y: 44.8 },
  footer: { x: 50, y: 57.2 },
} as const;

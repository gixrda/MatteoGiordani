/**
 * The whole cinematic narrative is driven by one number: scroll progress
 * through the pinned stage, from 0 (hero) to 1 (the website is ready).
 * Every scene and every transformation of the object reads from here,
 * so the pacing can be tuned in one place.
 */

export type SceneId = 'discover' | 'understand' | 'optimize' | 'build' | 'perform' | 'convert';

export interface Scene {
  id: SceneId;
  index: string;
  start: number;
  end: number;
}

export const SCENES: readonly Scene[] = [
  { id: 'discover', index: '01', start: 0.09, end: 0.2 },
  { id: 'understand', index: '02', start: 0.2, end: 0.34 },
  { id: 'optimize', index: '03', start: 0.34, end: 0.5 },
  { id: 'build', index: '04', start: 0.5, end: 0.66 },
  { id: 'perform', index: '05', start: 0.66, end: 0.8 },
  { id: 'convert', index: '06', start: 0.8, end: 0.92 },
];

export const sceneById = (id: SceneId) => SCENES.find((s) => s.id === id)!;

/** Hero fades out as the object takes the stage. */
export const HERO_OUT = [0.01, 0.035] as const;

/** "The website builds itself." — the promise, before chapter one. */
export const INTRO = [0.03, 0.045, 0.075, 0.09] as const;

/** Final reveal: the object fills the viewport and becomes the site. */
export const COMPLETE = { start: 0.92, end: 1 } as const;

/** Named beats shared by the object and the scenes. [start, end] */
export const BEAT = {
  /** Discover: layout grid appears. */
  grid: [0.07, 0.11],
  /** Understand: the page receives content roles. */
  roles: [0.26, 0.31],
  /** Optimize: the stage goes dark (x-ray). */
  dark: [0.36, 0.42],
  /** Optimize: layers separate in depth. */
  explode: [0.37, 0.44],
  /** Optimize: loose wireframe snaps to the grid. */
  order: [0.38, 0.45],
  /** Optimize → Build: semantic tags visible. */
  tags: [0.41, 0.45],
  /** Build: tags turn into components. */
  components: [0.5, 0.53],
  /** Build: layers collapse into one surface. */
  collapse: [0.55, 0.6],
  /** Build: wireframe becomes real UI. */
  ui: [0.55, 0.61],
  /** Perform: heavy artefacts load in. */
  heavy: [0.655, 0.685],
  /** Perform: heavy artefacts are removed. */
  clean: [0.705, 0.74],
  /** Perform: frame gets lighter. */
  lighter: [0.74, 0.77],
  /** Perform: loads and stabilises. */
  faster: [0.77, 0.795],
  /** Convert: back to light. */
  dawn: [0.8, 0.86],
  /** Convert: the CTA takes focus. */
  focus: [0.845, 0.875],
  /** Complete: content dissolves into the page. */
  dissolve: [0.93, 0.96],
  /** Complete: object fills the viewport. */
  fill: [0.92, 0.985],
} as const;

// Italian copy. Must be written by Matteo (or adapted), never machine-translated (spec §0.6).
// Every key left out here falls back to the English string, and Italian pages show the
// [IT COPY TO WRITE] notice until this file is complete. Same shape as content/en.ts.

import type { Dict } from './en';

type DeepPartial<T> = { [K in keyof T]?: T[K] extends (infer U)[] ? U[] : T[K] extends object ? DeepPartial<T[K]> : T[K] };

const it: DeepPartial<Dict> = {
  ui: {
    nav: { home: 'Home', services: 'Servizi', work: 'Lavori', about: 'Chi sono', insights: 'Insights', contact: 'Contatti' },
    copyNotice: '[IT COPY TO WRITE] Italian copy not written yet: English text is shown as a fallback.',
  },
};

export default it;
export type { DeepPartial };

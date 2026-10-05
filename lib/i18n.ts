import en, { type Dict } from '@/content/en';
import it from '@/content/it';
import type { Locale } from './routes';

function merge<T>(base: T, over: unknown): T {
  if (over === undefined || over === null) return base;
  if (Array.isArray(base) || typeof base !== 'object' || base === null) return over as T;
  const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
  for (const [k, v] of Object.entries(over as Record<string, unknown>)) out[k] = merge(out[k], v);
  return out as T;
}

const dicts: Record<Locale, Dict> = { en, it: merge(en, it) };

export const getDict = (l: Locale): Dict => dicts[l];

/** Replaces {key} tokens in a string. */
export const fill = (s: string, vars: Record<string, string>) => s.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '');

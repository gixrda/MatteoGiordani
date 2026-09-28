import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { en, type Dictionary } from './en';
import { it } from './it';

export type Lang = 'en' | 'it';

const DICTIONARIES: Record<Lang, Dictionary> = { en, it };
const STORAGE_KEY = 'mg-lang';

interface I18nState {
  lang: Lang;
  t: Dictionary;
  setLang: (lang: Lang) => void;
}

const I18nContext = createContext<I18nState | null>(null);

function readStoredLang(): Lang {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === 'it' || stored === 'en' ? stored : 'en';
  } catch {
    return 'en';
  }
}

/** Single source of truth for the interface language; the whole tree re-renders with the new dictionary. */
export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readStoredLang);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* Storage unavailable (private mode): the choice lasts for this visit. */
    }
  }, []);

  const t = DICTIONARIES[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description);
  }, [lang, t]);

  const value = useMemo(() => ({ lang, t, setLang }), [lang, t, setLang]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nState {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>');
  return ctx;
}

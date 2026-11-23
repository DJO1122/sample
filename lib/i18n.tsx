"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import en from "@/locales/en.json";
import ta from "@/locales/ta.json";

export type Language = "en" | "ta";

const DICTIONARIES = { en, ta } as const;
const STORAGE_KEY = "aerotel.lang";

type Dictionary = typeof en;

/* ------------------------------------------------------------------ */
/* Language store                                                      */
/*                                                                     */
/* The choice lives in a tiny external store read through              */
/* useSyncExternalStore, so the server snapshot is always English (the */
/* markup we prerender) and the stored preference is picked up on      */
/* hydration without a cascading setState-in-effect.                   */
/* ------------------------------------------------------------------ */

let current: Language = "en";
let readFromStorage = false;
const listeners = new Set<() => void>();

function readStored(): Language {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "ta" ? "ta" : "en";
  } catch {
    return "en";
  }
}

function subscribe(onChange: () => void) {
  if (!readFromStorage) {
    readFromStorage = true;
    current = readStored();
  }
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

function getSnapshot(): Language {
  return current;
}

function getServerSnapshot(): Language {
  return "en";
}

function setLanguage(next: Language) {
  if (next === current) return;
  current = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* storage blocked - the choice still applies for this page view */
  }
  listeners.forEach((listener) => listener());
}

/* ------------------------------------------------------------------ */

interface I18nValue {
  lang: Language;
  setLang: (lang: Language) => void;
  /** Dotted key lookup, e.g. t("hero.title"). Falls back to English. */
  t: (key: string) => string;
}

const I18nContext = createContext<I18nValue | null>(null);

function lookup(dict: Dictionary, key: string): string | undefined {
  const value = key
    .split(".")
    .reduce<unknown>(
      (acc, part) =>
        acc && typeof acc === "object"
          ? (acc as Record<string, unknown>)[part]
          : undefined,
      dict,
    );
  return typeof value === "string" ? value : undefined;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = useCallback(
    (key: string) => lookup(DICTIONARIES[lang], key) ?? lookup(en, key) ?? key,
    [lang],
  );

  const value = useMemo(
    () => ({ lang, setLang: setLanguage, t }),
    [lang, t],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used inside I18nProvider");
  return context;
}

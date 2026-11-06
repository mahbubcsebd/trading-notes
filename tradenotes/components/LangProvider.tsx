"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { translate, type Key, type Lang } from "@/lib/i18n";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: Key) => string };

const LangContext = createContext<Ctx>({
  lang: "en",
  setLang: () => {},
  t: (k) => translate("en", k),
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const s = localStorage.getItem("tn-lang");
      if (s === "bn" || s === "en") setLangState(s);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("tn-lang", l);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<Ctx>(
    () => ({ lang, setLang, t: (k) => translate(lang, k) }),
    [lang, setLang],
  );
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);

/** Renders English or Bengali text depending on the chosen language. */
export function T({ k }: { k: Key }) {
  const { t } = useLang();
  return <>{t(k)}</>;
}

"use client";

import { createContext, useContext, useEffect, useState } from "react";

// Two-language toggle: Donovian (Cyrillic) primary, English fallback. We keep
// this in localStorage so the choice persists across navigations.
export type Lang = "ru" | "en";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (ru: string, en: string) => string;
};

const LangCtx = createContext<Ctx>({
  lang: "ru",
  setLang: () => {},
  t: (ru) => ru,
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ru");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem("sam.lang") : null;
    if (saved === "en" || saved === "ru") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") window.localStorage.setItem("sam.lang", l);
  };

  const t = (ru: string, en: string) => (lang === "ru" ? ru : en);

  return <LangCtx.Provider value={{ lang, setLang, t }}>{children}</LangCtx.Provider>;
}

export const useLang = () => useContext(LangCtx);

"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import en from "@/locales/en.json";
import ar from "@/locales/ar.json";

type Lang = "en" | "ar";
type Translations = typeof en;

const translations: Record<Lang, Translations> = { en, ar };

interface LanguageContextType {
  lang: Lang;
  dir: "ltr" | "rtl";
  t: Translations;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === "en" ? "ar" : "en"));
  }, []);

  const dir = lang === "ar" ? "rtl" : "ltr";
  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, dir, t, toggleLang }}>
      <div dir={dir}>{children}</div>
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}

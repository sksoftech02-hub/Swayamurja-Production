'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '@/lib/types';
import { translations } from '@/lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  const applyLanguageDom = (lang: Language) => {
    document.documentElement.lang = lang === 'mr' ? 'mr' : 'en';
    document.body.classList.toggle('lang-mr', lang === 'mr');
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get('lang');
    if (urlLang === 'en' || urlLang === 'mr') {
      setLanguageState(urlLang);
      localStorage.setItem('swayamurja_lang', urlLang);
      applyLanguageDom(urlLang);
      return;
    }

    const saved = localStorage.getItem('swayamurja_lang') as Language;
    if (saved === 'en' || saved === 'mr') {
      setLanguageState(saved);
      applyLanguageDom(saved);
    } else {
      applyLanguageDom('en');
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('swayamurja_lang', lang);
    applyLanguageDom(lang);
  };

  const toggleLanguage = () => {
    const next = language === 'en' ? 'mr' : 'en';
    setLanguage(next);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

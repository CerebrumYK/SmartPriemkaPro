'use client';

import { ReactNode, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../src/i18n';

interface I18nProviderProps {
  children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  useEffect(() => {
    // Load translations from public folder
    const loadTranslations = async () => {
      try {
        const ruResponse = await fetch('/locales/ru/common.json');
        const enResponse = await fetch('/locales/en/common.json');
        
        if (ruResponse.ok && enResponse.ok) {
          const ruTranslations = await ruResponse.json();
          const enTranslations = await enResponse.json();
          
          i18n.addResourceBundle('ru', 'common', ruTranslations);
          i18n.addResourceBundle('en', 'common', enTranslations);
        }
      } catch (error) {
        console.error('Failed to load translations:', error);
      }
    };

    loadTranslations();
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  );
}
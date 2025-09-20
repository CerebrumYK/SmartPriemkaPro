import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ru: {
    common: {}
  },
  en: {
    common: {}
  }
};

// Function to load translations dynamically
const loadTranslations = async () => {
  try {
    const ruResponse = await fetch('/locales/ru/common.json');
    const enResponse = await fetch('/locales/en/common.json');
    
    if (ruResponse.ok) {
      resources.ru.common = await ruResponse.json();
    }
    if (enResponse.ok) {
      resources.en.common = await enResponse.json();
    }
  } catch (error) {
    console.error('Failed to load translations:', error);
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ru',
    fallbackLng: 'ru',
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

// Load translations when initializing
loadTranslations().then(() => {
  i18n.reloadResources();
});

export default i18n;
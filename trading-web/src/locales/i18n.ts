import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import translationEN from '../locales/english/translation.json';
import translationESP from '../locales/spain/translation.json';

// the translations
const resources = {
  English: {
    translation: translationEN,
  },
  Spain: {
    translation: translationESP,
  },
};

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'English',
    debug: true,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import resources from './locales';

const locales = Object.keys(resources);

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  supportedLngs: locales,
  debug: import.meta.env.MODE === 'development',
  resources,
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
});

export default i18n;

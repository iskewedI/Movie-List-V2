import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const fallbackLng = ['en'];
export const availableLanguages = ['en', 'es'];

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng, //Default EN.
    detection: {
      checkWhitelist: true,
    },
    debug: false,
    supportedLngs: availableLanguages,
  });

export default i18n;

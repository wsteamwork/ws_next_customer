import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

import home_vi from './home/home-vi.json';
import home_en from './home/home-en.json';

const languageDetector = {
  init: Function.prototype,
  type: 'languageDetector',
  async: true, // flags below detection to be async
  detect: async (callback) => {
    const savedDataJSON = cookies.get('initLanguage');
    const lng = savedDataJSON ? savedDataJSON : null;
    const selectLanguage = lng || 'vi';
    callback(selectLanguage);
  },
  cacheUserLanguage: () => {}
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'vi',
    resources: {
      en: {
        home: home_en
      },
      vi: {
        home: home_vi
      }
    },

    // have a common namespace used around the full app
    ns: ['common'],
    defaultNS: 'common',

    // debug: true,

    cache: {
      enabled: true
    },

    interpolation: {
      escapeValue: false // not needed for react as it does escape per default to prevent xss!
    }
  });

export default i18n;

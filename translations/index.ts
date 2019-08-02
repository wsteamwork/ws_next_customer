import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

import home_vi from './home/home-vi.json';
import home_en from './home/home-en.json';
import layout_vi from './layout/layout-vi.json';
import layout_en from './layout/layout-en.json';
import rooms_vi from './rooms/rooms-vi.json';
import rooms_en from './rooms/room-en.json';
import room_vi from './room/room-vi.json';
import room_en from './room/room-en.json';

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
        home: home_en,
        layout: layout_en,
        rooms: rooms_en,
        room: room_en
      },
      vi: {
        home: home_vi,
        layout: layout_vi,
        rooms: rooms_vi,
        room: room_vi
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

// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'

import Vuetify from 'vuetify/lib/framework';
import 'vuetify/dist/vuetify.min.css';

export default function (Vue, { appOptions, router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)

  head.link.push({
    rel: 'stylesheet',
    href: 'https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css',
  });

  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900',
  });

  const opts = {
    theme: {
      options: {
        customProperties: true
      },
      dark: true,
      themes: {
        dark: {
          background: '#0f0f23',
          'primary--text': "#ccc"
        }
      }
    }
  };

  Vue.use(Vuetify);
  appOptions.vuetify = new Vuetify(opts);

}

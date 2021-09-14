import DefaultLayout from '~/layouts/Default.vue';

import '@jamescoyle/svg-icon';

export default function (Vue, { appOptions, router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)

  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900',
  });
}

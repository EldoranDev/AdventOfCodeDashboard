import DefaultLayout from '~/layouts/Default.vue';
import { Chart, ScatterController, LinearScale, LogarithmicScale, PointElement, LineElement, Title, Legend, Tooltip } from 'chart.js';

export default function (Vue, { appOptions, router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)

  Chart.register(
    ScatterController,
    LinearScale,
    LogarithmicScale,
    PointElement,
    LineElement,
    Title,
    Legend,
    Tooltip
  );

  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900',
  });
}

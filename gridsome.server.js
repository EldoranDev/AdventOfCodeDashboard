const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');

const axios = require('./src/aoc/axios');
const dataSource = require('./src/aoc/datasource');

// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function (api) {
  api.loadSource(async (actions) => {
    await dataSource(actions);
  })

  api.chainWebpack((config, { isServer }) => {
    config.plugin('vuetify-loader').use(VuetifyLoaderPlugin);
  });
}

const aoc = require('./src/aoc');

// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function (api) {
  api.loadSource(async (actions) => {
    await aoc.loadSource(actions);
  });

  api.createPages(async (actions) => {
    await aoc.createPages(actions);
  });
}

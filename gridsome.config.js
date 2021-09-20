const postcssNesting = require('postcss-nesting');

module.exports = {
  siteName: 'AoC 2020',
  plugins: [
    {
      use: 'gridsome-plugin-tailwindcss',
    }
  ],
  pathPrefix: process.env.GRIDSOME_PATH_PREFIX || '/',
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          postcssNesting(),
        ],
      },
    },
  },
}

// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'AoC 2020',
  plugins: [
    {
      use: 'gridsome-plugin-tailwindcss',
    }
  ],
  pathPrefix: process.env.GRIDSOME_PATH_PREFIX || '/',
}

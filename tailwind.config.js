module.exports = {
    purge: [
        './src/**/*.html',
        './src/**/*.vue',
        './src/**/*.jsx',
    ],
    theme: {
        fontFamily: {
            sans: ["Source Code Pro", 'sans-serif'],
        },
        extend: {
            colors: {
                'aoc-green': '#00cc00'
            }
        }
    }
}

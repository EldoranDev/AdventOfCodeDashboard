const path = require('path');

module.exports = {
    YEAR: process.env.AOC_YEAR || (new Date()).getFullYear(),
    SESSION: process.env.AOC_SESSION,
    CACHE: process.env.AOC_CACHED || false,
    BOARD: process.env.AOC_BOARD,
    CACHE_DIR: path.resolve(__dirname, '..', '..', '.aoc'),
    INCLUDE_MEMBER: process.env.AOC_INCLUDE ? process.env.AOC_INCLUDE.split(',') : [],
    INCLUDE_ALL: process.env.AOC_INCLUDE ? false : !!process.env.AOC_INCLUDE_ALL,
};
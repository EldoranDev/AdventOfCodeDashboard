const axios = require('axios').default;

const YEAR = process.env.AOC_YEAR || (new Date()).getFullYear();
const SESSION = process.env.AOC_SESSION;

module.exports = axios.create({
    baseURL: `https://adventofcode.com/${YEAR}`,
    headers: {
        cookie: `session=${SESSION}`
    }
})
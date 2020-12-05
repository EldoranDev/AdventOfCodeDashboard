const axios = require('axios').default;
const config = require('../config');

module.exports = axios.create({
    baseURL: `https://adventofcode.com/${config.YEAR}`,
    headers: {
        cookie: `session=${config.SESSION}`
    }
})
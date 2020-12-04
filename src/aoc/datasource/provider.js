const axios = require('../axios');
const config = require('../config');
const cache = require('./cache');

const { JSDOM } = require('jsdom');

const CACHE_API = 'api';
const CACHE_INTRO = 'intro-';

module.exports = {
    async getLeaderBoard () {
        if (config.CACHE) {
            if (!await cache.has(CACHE_API)) {
                await cache.set(CACHE_API, JSON.stringify(await fetchFromApi()));
            }
            return JSON.parse(await cache.get(CACHE_API));
        }

        return await fetchFromApi();
    },
    async getDayIntro (day) {
        if (config.CACHE) {
            const key = `${CACHE_INTRO}${day}`;
            if (!await cache.has(key)) {
                await cache.set(key, await fetchIntro(day));
            }

            return await cache.get(key);
        }

        return await fetchIntro(day);
    }
};


async function fetchFromApi() {
    return (await axios.get(`/leaderboard/private/view/${config.BOARD}.json`)).data;
}

async function fetchIntro(day) {
    const { data } = await axios.get(`https://adventofcode.com/2020/day/${day}`);
    
    const { document } = (new JSDOM(data)).window;
    const intro = document.querySelector('p');

    return intro.textContent;
}
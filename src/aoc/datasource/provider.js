const config = require('../config');
const cache = require('./cache');
const axios = require('./axios');

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
    async getDay (day) {
        if (Date.now() - Date.UTC(config.YEAR, 11, day, 5, 0) < 0) {
            return { name: '', intro: '' };
        }
        if (config.CACHE) {
            const key = `${CACHE_INTRO}${day}`;
            if (!await cache.has(key)) {
                await cache.set(key, JSON.stringify(await fetchDay(day)));
            }

            return JSON.parse(await cache.get(key));
        }

        return await fetchDay(day);
    }
};


async function fetchFromApi() {
    return (await axios.get(`/leaderboard/private/view/${config.BOARD}.json`)).data;
}

async function fetchDay(day) {
    const { data } = await axios.get(`https://adventofcode.com/2020/day/${day}`);
    
    const { document } = (new JSDOM(data)).window;
    
    return {
        name: document.querySelector('h2').textContent.split(':')[1].replace('---', '').trim(),
        intro: document.querySelector('p').textContent,
    }
}
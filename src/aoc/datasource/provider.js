const crypto = require('crypto');

const config = require('../config');
const cache = require('./cache');
const axios = require('./axios');

const { JSDOM } = require('jsdom');

const CACHE_API = 'api';
const CACHE_INTRO = 'intro-';
const CACHE_REPO = 'repo-';

const hash = crypto.createHash('sha256');

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
    },
    async getRepoInfos (repoList) {
        
        const repos = [];
        
        for (const repo of repoList) { 
            if (config.CACHE) {
                const key = `${CACHE_REPO}${hash.update(repo).digest('hex')}`;
                
                if (!await cache.has(key)) {
                    await cache.set(key, JSON.stringify(await fetchRepo(repo)))
                }

                repos.push(JSON.parse(await cache.get(key)));
            } else {
                repos.push(await fetchRepo(repo));
            }
        }

        return repos;
    }
};


async function fetchFromApi() {
    return (await axios.get(`/leaderboard/private/view/${config.BOARD}.json`)).data;
}

async function fetchDay(day) {
    const { data } = await axios.get(`https://adventofcode.com/${config.YEAR}/day/${day}`);
    
    const { document } = (new JSDOM(data)).window;
    
    return {
        name: document.querySelector('h2').textContent.split(':')[1].replace('---', '').trim(),
        intro: document.querySelector('p').textContent,
    }
}

async function fetchRepo(link) {
    const { data } = await axios.get(link);

    return data;
}
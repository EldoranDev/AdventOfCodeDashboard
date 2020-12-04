const fs = require('fs/promises');
const path = require('path');

const config = require('../config');

module.exports = {
    async get(key) {
        return await fs.readFile(path.resolve(config.CACHE_DIR, key), {
            encoding: 'utf-8'
        });
    },
    async set (key, value) {
        await fs.writeFile(path.resolve(config.CACHE_DIR, key), value);
    },
    async has (key) {
        try {
            await fs.access(path.resolve(config.CACHE_DIR, key));
            return true;
        } catch {
            return false;
        }
    },
    async setup() {
        try {
            await fs.access(config.CACHE_DIR);
        } catch (e) {
            await fs.mkdir(config.CACHE_DIR);
        }
    }
};

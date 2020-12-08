const { getDay } = require('../datasource/provider');
const config = require('../config');

module.exports = {
    async generate (data, context) {
        const collection = [];

        for (let id of Array.from( (new Array(25)).keys())) {
            const day = await getDay(id+1);

            collection.push({
                id: id,
                start: Date.UTC(config.YEAR, 11, id+1, 5) / 1000,
                name: day.name,
                intro: day.intro,
                events: [],
            });
        }

        return collection;
    },
};

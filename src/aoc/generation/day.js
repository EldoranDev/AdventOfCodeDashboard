let collection = [];

const { getDay } = require('../datasource/provider');

module.exports = {
    async generate (data, context) {
        for (let id of Array.from( (new Array(25)).keys())) {
            const day = await getDay(id+1);

            collection.push({
                id,
                start: (Date.UTC(process.env.AOC_YEAR, 11, id, 5) / 1000),
                name: day.name,
                intro: day.intro,
                events: [],
            } );
        }

        return collection;
    },
};

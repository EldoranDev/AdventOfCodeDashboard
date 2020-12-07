const config = require('../config');

let collection = { };

module.exports = {
    TYPE: 'Member',
    generate (data, context) {
        const ids = Object.keys(data.members);
        const colors = getColors(ids.length);

        for (let i = 0; i < ids.length; i++) {
            const id = ids[i];

            collection[id] = {
                id,
                name: getName(data.members[id]),
                color: colors[i],
                score: {
                    local: data.members[id].local_score,
                    global: data.members[id].global_score,
                },
                medals: [
                    { place: 1, first: 0, second: 0 },
                    { place: 2, first: 0, second: 0 },
                    { place: 3, first: 0, second: 0 },
                ],
                events: [],
            }
        }

        return collection;
    },
};

function getColors(n) {
    const basePalette = ["#781c81", "#6e1980", "#65187f", "#5e187e", "#58197e", "#531b7f", "#4f1d81", "#4c2182", "#492484", "#462987", "#442d8a", "#43328d", "#423791", "#413d94", "#404298", "#3f489c", "#3f4ea0", "#3f53a5", "#3f59a9", "#3f5fad", "#4064b1", "#4069b5", "#416fb8", "#4274bb", "#4379be", "#447dc0", "#4582c1", "#4686c2", "#488ac2", "#4a8ec1", "#4b92c0", "#4d95be", "#4f99bb", "#519cb8", "#549fb4", "#56a2b0", "#58a4ac", "#5ba7a7", "#5ea9a2", "#60ab9d", "#63ad98", "#66af93", "#69b18e", "#6cb289", "#70b484", "#73b580", "#77b67b", "#7ab877", "#7eb973", "#82ba6f", "#85ba6b", "#89bb68", "#8dbc65", "#91bd61", "#95bd5e", "#99bd5c", "#9dbe59", "#a1be56", "#a5be54", "#a9be52", "#adbe50", "#b1be4e", "#b5bd4c", "#b9bd4a", "#bcbc48", "#c0bb47", "#c3ba45", "#c7b944", "#cab843", "#cdb641", "#d0b540", "#d3b33f", "#d6b13e", "#d8ae3d", "#dbab3c", "#dda93b", "#dfa53a", "#e0a239", "#e29e38", "#e39a37", "#e49636", "#e59235", "#e68d34", "#e78833", "#e78332", "#e77d31", "#e77730", "#e7712f", "#e66b2d", "#e6642c", "#e55e2b", "#e4572a", "#e35029", "#e24928", "#e14226", "#df3b25", "#de3424", "#dc2e22", "#db2721", "#d92120"];
    let step = basePalette.length / n;

    return [...Array(n).keys()].map(i => basePalette[Math.floor(i * step, 0)]);
}

function getName({ name, id }) {
    if (
        name
        && (
            config.INCLUDE_ALL 
            || config.INCLUDE_MEMBER.includes(id.toString())
        )
    ) {
        return name;
    }
    
    return 'Anonymous';
}
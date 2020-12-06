const provider = require('./datasource/provider');
const cache = require('./datasource/cache');
const config = require('./config');

const TYPE_STAR = 'STAR';
const TYPE_START = 'START';

const basePalette = ["#781c81", "#6e1980", "#65187f", "#5e187e", "#58197e", "#531b7f", "#4f1d81", "#4c2182", "#492484", "#462987", "#442d8a", "#43328d", "#423791", "#413d94", "#404298", "#3f489c", "#3f4ea0", "#3f53a5", "#3f59a9", "#3f5fad", "#4064b1", "#4069b5", "#416fb8", "#4274bb", "#4379be", "#447dc0", "#4582c1", "#4686c2", "#488ac2", "#4a8ec1", "#4b92c0", "#4d95be", "#4f99bb", "#519cb8", "#549fb4", "#56a2b0", "#58a4ac", "#5ba7a7", "#5ea9a2", "#60ab9d", "#63ad98", "#66af93", "#69b18e", "#6cb289", "#70b484", "#73b580", "#77b67b", "#7ab877", "#7eb973", "#82ba6f", "#85ba6b", "#89bb68", "#8dbc65", "#91bd61", "#95bd5e", "#99bd5c", "#9dbe59", "#a1be56", "#a5be54", "#a9be52", "#adbe50", "#b1be4e", "#b5bd4c", "#b9bd4a", "#bcbc48", "#c0bb47", "#c3ba45", "#c7b944", "#cab843", "#cdb641", "#d0b540", "#d3b33f", "#d6b13e", "#d8ae3d", "#dbab3c", "#dda93b", "#dfa53a", "#e0a239", "#e29e38", "#e39a37", "#e49636", "#e59235", "#e68d34", "#e78833", "#e78332", "#e77d31", "#e77730", "#e7712f", "#e66b2d", "#e6642c", "#e55e2b", "#e4572a", "#e35029", "#e24928", "#e14226", "#df3b25", "#de3424", "#dc2e22", "#db2721", "#d92120"];

module.exports = {
    loadSource: async (context) => {
        if (config.CACHE) {
            await cache.setup();
        }
    
        const data = await provider.getLeaderBoard();
        
        const memberCollection = context.addCollection({
            typeName: 'Member'
        });

        const eventCollection = context.addCollection({
            typeName: 'Event'
        });

        const medalCollection = context.addCollection({
            typeName: 'Medal'
        });

        const dayCollection = context.addCollection({
            typeName: 'Day',
        })

        const days = Array.from( (new Array(25)).keys()).map(() => []);
    
        const ids = Object.keys(data.members);
        
        const members = {};

        for (const id of ids) {
            const member = data.members[id];
            const events = getMemberEvents(member, eventCollection, context);
            
            events.forEach((event) => {
                days[event.day-1].push(event);
            });

            members[id] = {
                id,
                data: member,
                events,
                medals: [],
            };
        }
        
        for (let i = 1; i <= (new Date()).getDate(); i++) {
            let medals = getMedals(days[i-1], medalCollection, context);

            for (let medal of medals) {
                members[medal.member.id].medals.push(context.store.createReference(medal));
            }

            eventCollection.addNode({
                type: TYPE_START,
                timestamp: (Date.UTC(2020, 11, i, 5, 0)) / 1000,
                day: i,
                year: config.YEAR,
                intro: await provider.getDayIntro(i)
            });

            dayCollection.addNode({
                id: i,
                events: days[i-1],
                first: medals.filter(({part}) => part === 1),
                second: medals.filter(({part}) => part === 2),
            })
        }
        

        let memberCount = 0;
        let colorOffset = (basePalette.length / Object.keys(members).length)|0;

        for (let member of Object.values(members)) {
            if (member.events.length > 0) {
                memberCollection.addNode({
                    id: member.id,
                    color: basePalette[memberCount++ * colorOffset],
                    name: getMemberName(member),
                    score: {
                        local: member.data.local_score,
                        global: member.data.global_score,
                    },
                    events: member.events,
                    medals: member.medals,
                });
            }
        }
    },
    createPages: async ({ createPage, graphql }) => {
        const { data } = await graphql(`{
            allMember {
                edges {
                    node {
                        id
                    }
                }
            }
        }`);

        data.allMember.edges.forEach(({ node }) => {
            createPage({
                path: `/member/${node.id}`,
                component: './src/templates/member.vue',
                context: {
                    memberId: node.id,
                },
            });
        })
    }
};

function getMemberName(member) {
    if (
        member.data.name
        && (
            config.INCLUDE_ALL 
            || config.INCLUDE_MEMBER.includes(member.id.toString())
        )
    ) {
        return member.data.name;
    }
    
    return 'Anonymous';
}

function getMemberEvents(member, collection, { store }) {
    if (!member.completion_day_level) {
        return [];
    }
    const days = Object.keys(member.completion_day_level);    
    const events = [];

    for (const day of days) {
        const parts = Object.keys(member.completion_day_level[day]);

        for (const part of parts) {
            events.push(collection.addNode({
                type: TYPE_STAR,
                member: store.createReference('Member', member.id),
                timestamp: member.completion_day_level[day][part].get_star_ts,
                year: config.YEAR,
                day,
                part: Number(part),
            }));
        }
    }

    return events;
}

/**@param {Array} day */
function getMedals(day, collection, { store }) {
    const fastest = [
        day.filter((a) => a.part === 1).sort((a, b) => a.timestamp - b.timestamp).slice(0, 3),
        day.filter((a) => a.part === 2).sort((a, b) => a.timestamp - b.timestamp).slice(0, 3),
    ];

    const medals = [];

    for (let i = 0; i < fastest[0].length; i++) {
        let event = fastest[0][i];
        medals.push(collection.addNode({
            id: `${event.day}-${event.part}-${i+1}`,
            place: i+1,
            day: event.day,
            part: event.part,
            member: event.member,
            event,
        }));
    }

    for (let i = 0; i < fastest[1].length; i++) {
        let event = fastest[1][i];
        medals.push(collection.addNode({
            id: `${event.day}-${event.part}-${i+1}`,
            place: i+1,
            day: event.day,
            part: event.part,
            member: event.member,
            event,
        }));
    }

    return medals;
}
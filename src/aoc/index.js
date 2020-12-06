const provider = require('./datasource/provider');
const cache = require('./datasource/cache');
const config = require('./config');

const TYPE_STAR = 'STAR';
const TYPE_START = 'START';

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
        
        for (let member of Object.values(members)) {
            if (member.events.length > 0) {
                memberCollection.addNode({
                    id: member.id,
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
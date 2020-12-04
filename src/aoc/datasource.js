const provider = require('./datasource/provider');
const cache = require('./datasource/cache');
const config = require('./config');

const TYPE_STAR = 'STAR';
const TYPE_START = 'START';

module.exports = async ({addCollection}) => {
    if (config.CACHE) {
        await cache.setup();
    }

    const data = await provider.getLeaderBoard();
    
    const memberCollection = addCollection({
        typeName: 'Member'
    });

    const eventCollection = addCollection({
        typeName: 'Event'
    });

    const ids = Object.keys(data.members);

    for (const id of ids) {
        const member = data.members[id];
        const events = getMemberEvents(member);

        for (const event of events) {
            eventCollection.addNode(event);
        }

        if (events.length > 0) {
            memberCollection.addNode({
                id: Number(id),
                name: member.name || 'Anonymous',
                score: {
                    local: member.local_score,
                    global: member.global_score,
                }
            });
        }
    }
    
    for (let i = 1; i < (new Date()).getDay(); i++) {
        console.log(await provider.getDayIntro(i));
        eventCollection.addNode({
            type: TYPE_START,
            timestamp: (new Date(2020, 11, i, 6, 0)).getTime() / 1000,
            day: i,
            // intro: await provider.getDayIntro(i),
        })
    }
};

function getMemberEvents(member) {
    if (!member.completion_day_level) {
        return [];
    }
    const days = Object.keys(member.completion_day_level);    
    const events = [];

    for (const day of days) {
        const parts = Object.keys(member.completion_day_level[day]);

        for (const part of parts) {
            events.push({
                type: TYPE_STAR,
                member: Number(member.id),
                timestamp: member.completion_day_level[day][part].get_star_ts,
                day: Number(day),
                part: Number(part),
            });
        }
    }

    return events;
}

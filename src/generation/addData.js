const TYPE_STAR = 'STAR';
const TYPE_START = 'START';

module.exports = (data, addCollection) => {
    const userCollection = addCollection({
        typeName: 'User'
    });

    const eventCollection = addCollection({
        typeName: 'Event'
    });

    const ids = Object.keys(data.members);

    for (const id of ids) {
        const member = data.members[id];

        userCollection.addNode({
            id,
            name: member.name || 'Anonymous',
            score: {
                local: member.local_score,
                global: member.global_score,
            }
        });

        const events = getMemberEvents(member);

        for (const event of events) {
            eventCollection.addNode(event);
        }
    }

    for (let i = 1; i < (new Date()).getDay(); i++) {
        eventCollection.addNode({
            type: TYPE_START,
            timestamp: (new Date(2020, 11, i, 6, 0)).getTime(),
            day: i,
            // Get days intro text    
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
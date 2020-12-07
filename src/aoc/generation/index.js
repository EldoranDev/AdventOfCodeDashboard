const dayGenerator = require('./day');
const memberGenerator = require('./member');
const eventGenerator = require('./member');

module.exports = async (data, context) => {        
    const days = await dayGenerator.generate(data, context);
    const members = memberGenerator.generate(data, context);
    const events = eventGenerator.generate(data, context);

    console.log(days);

    const memberCollection = context.addCollection({
        typeName: 'Member'
    });

    const eventCollection = context.addCollection({
        typeName: 'Event'
    });

    const dayCollection = context.addCollection({
        typeName: 'Day',
    });
}

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
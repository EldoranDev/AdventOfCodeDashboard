const dayGenerator = require('./day');
const memberGenerator = require('./member');
const eventGenerator = require('./event');
const linker = require('./linker');

module.exports = async (data, context) => {        
    const days = await dayGenerator.generate(data, context);
    const members = memberGenerator.generate(data, context);
    const events = eventGenerator.generate(data, context);

    const memberCollection = context.addCollection({
        typeName: 'Member'
    });

    const eventCollection = context.addCollection({
        typeName: 'Event'
    });

    const dayCollection = context.addCollection({
        typeName: 'Day',
    });

    linker.link(context, events, days, members);

    days.forEach((day) => dayCollection.addNode(day));
    Object.values(members).forEach((member) => memberCollection.addNode(member));
    events.forEach((event) => eventCollection.addNode(event));
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
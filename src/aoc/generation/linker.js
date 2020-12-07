const TYPES = require('./types');

module.exports = {
    link(context, events, days, members) {
        linkEventsToDays(events, days, context);
        linkEventsToMembers(events, members, context);
    }
}

function linkEventsToDays(events, days, { store }) {
    for (let day of days) {
        let parts = [[], []];

        for (let event of events.filter((event) => event.day.id === day.id)) {
            day.events.push(store.createReference(TYPES.EVENT, event.id));
            
            parts[event.part-1].push(event);
        }

        for (let part of parts) {
            let place = 0;

            for (let event of part.sort((a, b) => a.timestamp - b.timestamp)) {
                event.place = place++;
            }
        }
    }
}

function linkEventsToMembers(events, _members, { store }) {
    const members = Object.values(_members);

    for(let member of members) {
        for (let event of events.filter((event) => event.member.id === member.id)) {
            member.events.push(store.createReference(TYPES.EVENT, event.id));
            event.points = (members.length - event.place) + 1
        }
    }
}
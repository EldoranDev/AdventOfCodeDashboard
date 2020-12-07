const TYPES = require('./types');

module.exports = {
    linkEventsToDays(events, days, { store }) {
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
}
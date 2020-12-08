const TYPE_STAR = 'STAR';
const TYPE_START = 'START';

const TYPES = require('./types');
const config = require('../config');

module.exports = {
    TYPE: 'Event',
    generate (data, { store }) {
        const events = [];

        Object.values(data.members).forEach((member) => {
            const days = Object.keys(member.completion_day_level);

            for (const day of days) {
                const parts = Object.keys(member.completion_day_level[day]);

                for (const part of parts) {
                    events.push({
                        id: `${member.id}-${day}-${part}`,
                        type: TYPE_STAR,
                        member: store.createReference(TYPES.MEMBER, member.id),
                        timestamp: member.completion_day_level[day][part].get_star_ts,
                        year: config.YEAR,
                        day: store.createReference(TYPES.DAY, day-1),
                        part: Number(part),
                    });
                }
            }
        });

        for (let id = 0; id < 25; id++) {
            const timestamp = Date.UTC(config.YEAR, 11, id, 5);
            
            if (timestamp > Date.now()) {
                continue;
            }

            events.push({
                id: `start-${id}`,
                timestamp: timestamp / 1000,
                type: TYPE_START,
                year: config.YEAR,
                day: store.createReference(TYPES.DAY, id-1)
            });
        }

        return events;
    },
};
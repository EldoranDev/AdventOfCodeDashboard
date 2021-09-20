const TYPES = require('./types');

module.exports = {
    link(context, events, days, members, repos) {
        linkEventsToDays(events, days, context);
        linkEventsToMembers(events, members, days, context);
        linkRepoToMembers(repos, members, context);
    }
}

function linkEventsToDays(events, days, { store }) {
    for (let day of days) {
        let parts = [[], []];
        
        for (let event of events.filter((event) => Number(event.day.id) === Number(day.id))) {
            day.events.push(store.createReference(TYPES.EVENT, event.id));

            if (event.part) {
                parts[event.part-1].push(event);
            }
        }
        
        for (let part of parts) {
            let place = 0;

            for (let event of part.sort((a, b) => a.timestamp - b.timestamp)) {
                event.place = place++;
            }
        }
    }
}

function linkEventsToMembers(events, _members, days,  { store }) {
    const members = Object.values(_members);
    const d = [];

    for(let member of members) {
        
        for (let event of events.filter((event) => event.member && event.member.id === member.id).sort((a, b) => a.timestamp - b.timestamp)) {
            member.events.push(store.createReference(TYPES.EVENT, event.id));
            event.points = (members.length - event.place);  

            if (event.part === 1) {
                d[event.day.id] = event;
                event.timeTaken = event.timestamp - days[event.day.id].start;
                
                if (event.place < 3) {
                    member.medals[event.place].first++;
                }
            } else {
                event.timeTaken = event.timestamp - d[event.day.id].timestamp;

                if (event.place < 3) {
                    member.medals[event.place].second++;
                }
            }
        }
    }
}

function linkRepoToMembers(repos, members, { store }) {
    for (let repo of repos) {
        members[repo.member.id].repo = store.createReference(TYPES.REPO, repo.id);
    }
}

const TYPES = require('./types');
const config = require('../config');

module.exports = {
    link(context, events, days, members, repos) {
        linkEventsToDays(events, days, context);
        linkEventsToMembers(events, members, days, context);
        linkRepoToMembers(repos, members, context);
        linkEventsToRepo(events, repos, context);
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

function linkEventsToRepo(events, repos, context) {
    for (const repo of repos) {
        if (repo.solutions == null || repo.solutions == undefined) {
            continue;
        }

        for (const solution of repo.solutions) {
            if (Number(solution.year) !== Number(config.YEAR)) {
                continue;
            }

            const member = repo.id;
            const day = solution.day;

            const event = events.filter((event) => Number(event.member?.id) === member && Number(event.day.id) === day-1);

            if (event.length === 0) {
                continue;
            }


            if (Array.isArray(solution.link)) {
                event[0].solution = solution.link[0];
                event[1].solution = solution.link[1];
            } else {
                event[0].solution = solution.link;
                event[1].solution = solution.link;
            }
        }
    }
}
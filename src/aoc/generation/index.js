const dayGenerator = require('./day');
const memberGenerator = require('./member');
const eventGenerator = require('./event');
const repoGenerator = require('./repo');

const linker = require('./linker');

module.exports = async (data, context) => {        
    const days = await dayGenerator.generate(data, context);
    const members = memberGenerator.generate(data, context);
    const events = eventGenerator.generate(data, context);
    const repos = await repoGenerator.generate(data, context);

    const memberCollection = context.addCollection({
        typeName: 'Member'
    });

    const eventCollection = context.addCollection({
        typeName: 'Event'
    });

    const dayCollection = context.addCollection({
        typeName: 'Day',
    });

    const repoCollection = context.addCollection({
        typeName: 'Repo',
    });

    linker.link(context, events, days, members, repos);

    days.forEach((day) => dayCollection.addNode(day));
    Object.values(members).forEach((member) => {
        if (member.events.length === 0) return;
        memberCollection.addNode(member);
    });
    events.forEach((event) => eventCollection.addNode(event));
    repos.forEach((repo) => repoCollection.addNode(repo));
}

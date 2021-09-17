const { getRepoInfos } = require('../datasource/provider');

const TYPES = require('./types');
const config = require('../config');

module.exports = {
    async generate (data, { store }) {
        const collection = [];
        const repos = await getRepoInfos(config.REPOS);
        
        for (let repo of repos) {
            collection.push({
                id: repo.id,
                member: store.createReference(TYPES.MEMBER, repo.id),
                language: repo.language,
                repo: repo.repo,
                solutions: repo.solutions,
            });
        }
        
        return collection;
    },
};

const provider = require('./datasource/provider');
const cache = require('./datasource/cache');
const config = require('./config');
const generator = require('./generation');

module.exports = {
    loadSource: async (context) => {
        if (config.CACHE) {
            await cache.setup();
        }

        const data = await provider.getLeaderBoard();
    
        generator(context);
    },
    createPages: async ({ createPage, graphql }) => {
        const { data } = await graphql(`{
            allMember {
                edges {
                    node {
                        id
                    }
                }
            }
        }`);

        data.allMember.edges.forEach(({ node }) => {
            createPage({
                path: `/member/${node.id}`,
                component: './src/templates/member.vue',
                context: {
                    memberId: node.id,
                },
            });
        })
    }
};

const dotenv = require('dotenv');
dotenv.config({ path: './.env.local' });

const reactQueryConfig = {
    dedupeFragments: true,
    skipTypename: true,
    namingConvention: {
        tranformUnderscore: true,
    },
    exposeFetcher: true,
    exposeDocument: true,
    exposeQueryKeys: true,
    errorType: "Error",
    fetcher: "./fetcher#fetcher"
}

module.exports = {
    schema: [
        {
            'https://graphql.edgein.dev/v1/graphql': {
                headers: {
                    'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
                },
            },
        },
    ],
    overwrite: true,
    documents: ['./graphql/**/*.graphql'],
    generates: {
        'graphql/types.ts': {
            plugins: [
                'typescript',
                'typescript-operations',
                { 'typescript-react-query': reactQueryConfig },
            ],
            config: {
                avoidOptionals: true
            }
        }
    }
};

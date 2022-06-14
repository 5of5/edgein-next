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
            'http://localhost:8080/v1/graphql': {
                headers: {
                    'x-hasura-admin-secret': 'asdfasdfasdfasdf',
                },
            },
        },
    ],
    overwrite: true,
    documents: ['./infra/**/*.graphql'],
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

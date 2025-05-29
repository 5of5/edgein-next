import { useState, useEffect } from 'react';
import buildHasuraProvider, { BuildFields } from 'ra-data-hasura';
import { DataProvider } from 'react-admin';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const useAdminDataProvider = (
  transformData: (data: DataProvider<string>) => DataProvider<string>,
  customBuildFields?: BuildFields,
) => {
  const [dataProvider, setDataProvider] = useState<DataProvider<string> | null>(
    null,
  );

  useEffect(() => {
    const buildDataProvider = async () => {
      const httpLink = createHttpLink({
        uri: '/api/graphql/',
      });

      const authLink = setContext((_, { headers }) => {
        return {
          headers: {
            ...headers,
            'Content-Type': 'application/json',
            'x-hasura-admin-secret':
              'H2qMpIzxHTQYpxhhuVoOrDvMEW3coQFLE42kiShCEJ5sHATlv7Fk12NfQIoSCjid',
          },
        };
      });

      const apolloClientWithAuth = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
      });

      const buildGqlQueryOverrides = customBuildFields
        ? {
            buildFields: customBuildFields,
          }
        : undefined;

      const dataProvider = await buildHasuraProvider(
        {
          client: apolloClientWithAuth,
        },
        buildGqlQueryOverrides,
      );

      setDataProvider(transformData({ ...dataProvider }));
    };
    buildDataProvider();
  }, [customBuildFields, transformData]);

  return { dataProvider };
};

export default useAdminDataProvider;

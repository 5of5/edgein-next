import { useState, useEffect } from 'react';
import buildHasuraProvider, { BuildFields } from 'ra-data-hasura';
import { DataProvider } from 'react-admin';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const useAdminDataProvider = (
  transformData: (data: DataProvider<string>) => DataProvider<string>,
  customBuildFields?: BuildFields,
) => {
  const [dataProvider, setDataProvider] = useState<DataProvider<string> | null>(
    null,
  );

  useEffect(() => {
    const buildDataProvider = async () => {
      const apolloClientWithAuth = new ApolloClient({
        uri: '/api/graphql/',
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

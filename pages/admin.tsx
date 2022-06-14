// Initialize the dataProvider before rendering react-admin resources.
import React, { useState, useEffect } from 'react';
import buildHasuraProvider from 'ra-data-hasura';
import { Admin, DataProvider, Resource } from 'react-admin';

import { CompanyCreate, CompanyEdit, CompanyList } from '../components/admin/companies';

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { InvestmentRoundsCreate, InvestmentRoundsEdit, InvestmentRoundsList } from '../components/admin/investmentRounds';

const AdminApp = () => {
  const [dataProvider, setDataProvider] = useState<DataProvider<string> | null>(null);

  useEffect(() => {
    const buildDataProvider = async () => {
      const myClientWithAuth = new ApolloClient({
        uri: "/api/graphql",
        cache: new InMemoryCache(),
      });      
      const dataProvider = await buildHasuraProvider({
        client: myClientWithAuth
      });
      setDataProvider(() => dataProvider);
    };
    buildDataProvider();
  }, []);

  if (!dataProvider) return <p>Loading...</p>;

  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name="companies"
        list={CompanyList}
        edit={CompanyEdit}
        create={CompanyCreate}
      />
      <Resource
        name="investment_rounds"
        list={InvestmentRoundsList}
        edit={InvestmentRoundsEdit}
        create={InvestmentRoundsCreate}
      />
    </Admin>
  );
};

export async function getStaticProps() {
  return {
    props: { noLayout: true },
  }
}

export default AdminApp
// Initialize the dataProvider before rendering react-admin resources.
import React, { useState, useEffect } from 'react';
import buildHasuraProvider from 'ra-data-hasura';
import { Admin, DataProvider, Resource } from 'react-admin';

import { CompanyCreate, CompanyEdit, CompanyList } from '../../components/admin/companies';

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { InvestmentRoundsCreate, InvestmentRoundsEdit, InvestmentRoundsList } from '../../components/admin/investmentRounds';
import { InvestmentsList, InvestmentsEdit, InvestmentsCreate } from '../../components/admin/investment';
import { InvestorsList, InvestorsEdit, InvestorCreate } from '../../components/admin/investors';
import { PeopleList, PeopleEdit, PeopleCreate } from '../../components/admin/people';
import { TeamMembersList, TeamMembersEdit, TeamMembersCreate } from '../../components/admin/teamMembers';
import { VcFirmCreate, VcFirmEdit, VcFirmList } from '../../components/admin/vcFirms';
import { BlockchainsList, BlockchainsEdit, BlockchainsCreate } from '../../components/admin/blockchains';
import { CoinsList, CoinsEdit, CoinsCreate } from '../../components/admin/coins';
import { ActionsList } from '../../components/admin/actions';

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
        name="blockchains"
        list={BlockchainsList}
        edit={BlockchainsEdit}
        create={BlockchainsCreate}
      />
      <Resource
        name="coins"
        list={CoinsList}
        edit={CoinsEdit}
        create={CoinsCreate}
      />
      <Resource
        name="companies"
        list={CompanyList}
        edit={CompanyEdit}
        create={CompanyCreate}
      />
      <Resource
        name="people"
        list={PeopleList}
        edit={PeopleEdit}
        create={PeopleCreate}
      />
      <Resource
        name="vc_firms"
        list={VcFirmList}
        edit={VcFirmEdit}
        create={VcFirmCreate}
      />
      <Resource
        name="investment_rounds"
        list={InvestmentRoundsList}
        edit={InvestmentRoundsEdit}
        create={InvestmentRoundsCreate}
      />
      <Resource
        name="investments"
        list={InvestmentsList}
        edit={InvestmentsEdit}
        create={InvestmentsCreate}
      />
      <Resource
        name="team_members"
        list={TeamMembersList}
        edit={TeamMembersEdit}
        create={TeamMembersCreate}
      />
      <Resource
        name="investors"
        list={InvestorsList}
        edit={InvestorsEdit}
        create={InvestorCreate}
      />
      <Resource
        name="actions"
        list={ActionsList}
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
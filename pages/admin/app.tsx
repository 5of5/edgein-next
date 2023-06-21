// Initialize the dataProvider before rendering react-admin resources.
import React, { useState, useEffect } from 'react';
import buildHasuraProvider, { BuildFields, buildFields } from 'ra-data-hasura';

import { Admin, DataProvider, Resource, AuthProvider } from 'react-admin';

import CssBaseline from '@mui/material/CssBaseline';

import {
  CompanyCreate,
  CompanyEdit,
  CompanyList,
} from '../../components/admin/company';

import { CoinList, CoinCreate, CoinEdit } from '../../components/admin/coin';
import {
  EventList,
  EventCreate,
  EventEdit,
} from '../../components/admin/event';
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { getParentSubOrganizations } from '@/utils/resource-link';
import {
  InvestmentRoundCreate,
  InvestmentRoundEdit,
  InvestmentRoundList,
} from '../../components/admin/investmentRound';
import {
  InvestmentList,
  InvestmentEdit,
  InvestmentCreate,
} from '../../components/admin/investment';
import {
  InvestorList,
  InvestorEdit,
  InvestorCreate,
} from '../../components/admin/investor';
import {
  PersonList,
  PersonEdit,
  PersonCreate,
} from '../../components/admin/person';
import {
  TeamMemberList,
  TeamMemberEdit,
  TeamMemberCreate,
} from '../../components/admin/teamMember';
import {
  VcFirmCreate,
  VcFirmEdit,
  VcFirmList,
} from '../../components/admin/vcFirm';
import {
  BlockchainList,
  BlockchainEdit,
  BlockchainCreate,
} from '../../components/admin/blockchain';
import { NewsList, NewsEdit, NewsCreate } from '../../components/admin/news';
import { useAuth } from '../../hooks/use-auth';
import { onSubmitData } from '@/utils/submit-data';
import ElemMyLogin from '@/components/admin/elem-my-login';
import ElemLayoutApp from '@/components/admin/elem-layout-app';
import { theme } from '@/theme/admin';

type NullableInputs = {
  [key: string]: Array<string>;
};

const nullableInputs: NullableInputs = {
  investments: ['person_id', 'vc_firm_id', 'round_id'],
  users: ['person_id'],
};

const isTypeReferenceToResourceLink = (type: string) => {
  return ['companies', 'vc_firms'].includes(type);
};

const extractFieldsFromQuery = (queryAst: any) => {
  return queryAst.definitions[0].selectionSet.selections;
};

// Define the additional fields that we want.
const EXTENDED_GET_LIST_INVESTMENT_ROUNDS = gql`
  {
    company {
      name
    }
  }
`;

const EXTENDED_GET_RESOURCE_LINKS = gql`
  {
    to_links {
      id
      link_type
      from_company {
        id
        name
        slug
        tags
        sentiment
        overview
        logo
      }
      from_vc_firm {
        id
        name
        slug
        tags
        sentiment
        overview
        logo
      }
    }
    from_links {
      id
      link_type
      to_company {
        id
        name
        slug
        tags
        sentiment
        overview
        logo
      }
      to_vc_firm {
        id
        name
        slug
        tags
        sentiment
        overview
        logo
      }
    }
  }
`;

const EXTENDED_GET_NEWS_ORGANIZATIONS = gql`
  {
    organizations {
      id
      company_id
      vc_firm_id
    }
  }
`;

const customBuildFields: BuildFields = (type, fetchType) => {
  const resourceName = type.name;

  // First take the default fields (all, but no related or nested).
  const defaultFields = buildFields(type, fetchType);

  if (resourceName === 'investment_rounds') {
    const relatedEntities = extractFieldsFromQuery(
      EXTENDED_GET_LIST_INVESTMENT_ROUNDS,
    );
    defaultFields.push(...relatedEntities);
  }

  if (resourceName === 'news') {
    const relatedEntities = extractFieldsFromQuery(
      EXTENDED_GET_NEWS_ORGANIZATIONS,
    );
    defaultFields.push(...relatedEntities);
  }

  if (isTypeReferenceToResourceLink(resourceName)) {
    const relatedEntities = extractFieldsFromQuery(EXTENDED_GET_RESOURCE_LINKS);
    defaultFields.push(...relatedEntities);
  }

  // Extend other queries for other resources/fetchTypes here...

  return defaultFields;
};

const AdminApp = () => {
  const [dataProvider, setDataProvider] = useState<DataProvider<string> | null>(
    null,
  );
  const { user } = useAuth();

  const authProvider = {
    // authentication
    login: () => Promise.resolve(),
    checkError: () => Promise.resolve(),
    checkAuth: () => {
      if (user) {
        if (
          user.role === 'admin' ||
          user.role === 'cms' ||
          user.role === 'cms-readonly'
        ) {
          return Promise.resolve();
        } else {
          return Promise.reject(new Error('User is not an admin'));
        }
      }
      return Promise.reject();
    },
    logout: () => Promise.resolve(),
    getIdentity: () => Promise.resolve().then(res => res),
    // authorization
    getPermissions: () => Promise.resolve(),
  } as AuthProvider;

  const nullInputTransform = (type: string, obj: any): any => {
    const nullableInputsForType = nullableInputs[type];
    if (nullableInputsForType && obj.data) {
      nullableInputsForType.forEach(input => {
        if (obj.data[input] == '') {
          obj.data[input] = null;
        }
      });
    }
    return obj;
  };

  useEffect(() => {
    const buildDataProvider = async () => {
      const myClientWithAuth = new ApolloClient({
        uri: '/api/graphql/',
        cache: new InMemoryCache(),
      });
      const dataProvider = await buildHasuraProvider(
        {
          client: myClientWithAuth,
        },
        { buildFields: customBuildFields },
      );
      // Fix nullable inputs for graphql
      setDataProvider({
        ...dataProvider,
        getList: async (type, obj) => {
          // eslint-disable-next-line prefer-const
          let { data, ...metadata } = await dataProvider.getList(type, obj);
          if (isTypeReferenceToResourceLink(type)) {
            data = data.map(val => ({
              ...val,
              ...getParentSubOrganizations(val),
            }));
          }
          if (type === 'news') {
            data = data.map(val => ({
              ...val,
              company_ids: val?.organizations
                ?.filter((item: any) => item.company_id)
                ?.map((item: any) => item.company_id),
              vc_firm_ids: val?.organizations
                ?.filter((item: any) => item.vc_firm_id)
                ?.map((item: any) => item.vc_firm_id),
            }));
          }
          return {
            data,
            ...metadata,
          };
        },
        getOne: async (type, obj) => {
          // eslint-disable-next-line prefer-const
          let { data, ...metadata } = await dataProvider.getOne(type, obj);
          if (type === 'news') {
            data = {
              ...data,
              source: data?.source ? JSON.stringify(data.source) : '',
              metadata: data?.metadata ? JSON.stringify(data.metadata) : '',
            };
          }
          return {
            data,
            ...metadata,
          };
        },
        create: (type, obj) =>
          onSubmitData(type, nullInputTransform(type, obj), 'POST'),
        update: (type, obj) =>
          onSubmitData(type, nullInputTransform(type, obj), 'PUT'),
        deleteMany: async (type, obj: any) => {
          const response = await Promise.all(
            obj.ids.map(async (id: number) => {
              await onSubmitData(
                type,
                nullInputTransform(type, { id, previousData: { id } }),
                'DELETE',
              );
              return { id };
            }),
          );
          return { data: response };
        },
        delete: (type, obj) =>
          onSubmitData(type, nullInputTransform(type, obj), 'DELETE'),
      });
    };
    buildDataProvider();
  }, []);

  if (!dataProvider || !user) return <p>Loading...</p>;

  const getResourceProps = (name: string, list: any, edit: any, create: any) =>
    user.role !== 'cms-readonly'
      ? {
          name,
          list,
          edit,
          create,
        }
      : { name, list };

  return (
    <Admin
      loginPage={ElemMyLogin}
      layout={ElemLayoutApp}
      dataProvider={dataProvider}
      authProvider={authProvider}
      theme={theme}
    >
      <CssBaseline />
      <Resource
        {...getResourceProps(
          'blockchains',
          BlockchainList,
          BlockchainEdit,
          BlockchainCreate,
        )}
      />
      <Resource
        {...getResourceProps('coins', CoinList, CoinEdit, CoinCreate)}
      />
      <Resource
        {...getResourceProps('events', EventList, EventEdit, EventCreate)}
      />
      <Resource {...getResourceProps('news', NewsList, NewsEdit, NewsCreate)} />
      <Resource
        {...getResourceProps(
          'companies',
          CompanyList,
          CompanyEdit,
          CompanyCreate,
        )}
      />
      <Resource
        {...getResourceProps('people', PersonList, PersonEdit, PersonCreate)}
      />
      <Resource
        {...getResourceProps('vc_firms', VcFirmList, VcFirmEdit, VcFirmCreate)}
      />
      <Resource
        {...getResourceProps(
          'investment_rounds',
          InvestmentRoundList,
          InvestmentRoundEdit,
          InvestmentRoundCreate,
        )}
      />
      <Resource
        {...getResourceProps(
          'investments',
          InvestmentList,
          InvestmentEdit,
          InvestmentCreate,
        )}
      />
      <Resource
        {...getResourceProps(
          'team_members',
          TeamMemberList,
          TeamMemberEdit,
          TeamMemberCreate,
        )}
      />
      <Resource
        {...getResourceProps(
          'investors',
          InvestorList,
          InvestorEdit,
          InvestorCreate,
        )}
      />
    </Admin>
  );
};

export async function getStaticProps() {
  return {
    props: { noLayout: true },
  };
}

export default AdminApp;

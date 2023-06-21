// Initialize the dataProvider before rendering react-admin resources.
import React, { useState, useEffect } from 'react';
import buildHasuraProvider, { BuildFields, buildFields } from 'ra-data-hasura';

import { Admin, DataProvider, Resource, AuthProvider } from 'react-admin';

import CssBaseline from '@mui/material/CssBaseline';

import { ApolloClient, InMemoryCache } from '@apollo/client';
import {
  DisabledEmailList,
  DisabledEmailEdit,
  DisabledEmailCreate,
} from '../../components/admin/disabledEmail';
import { UserList, UserEdit } from '../../components/admin/user';
import {
  DataPartnerList,
  DataPartnerCreate,
  DataPartnerEdit,
} from '../../components/admin/dataPartner';
import { useAuth } from '../../hooks/use-auth';
import ElemMyLogin from '@/components/admin/elem-my-login';
import ElemLayoutApp from '@/components/admin/elem-layout-app';
import { theme } from '@/theme/admin';

type NullableInputs = {
  [key: string]: Array<string>;
};

const nullableInputs: NullableInputs = {
  users: ['person_id'],
};

const customBuildFields: BuildFields = (type, fetchType) => {
  // First take the default fields (all, but no related or nested).
  const defaultFields = buildFields(type, fetchType);

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
        if (user.role === 'admin') {
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
        getOne: async (type: string, obj: any) => {
          const { data, ...metadata } = await dataProvider.getOne(type, obj);

          if (type === 'users') {
            if (data.additional_emails && data.additional_emails.length > 0) {
              data.additional_emails = data.additional_emails.map(
                (item: string) => ({
                  email: item,
                }),
              );
            }
          }

          return {
            data,
            ...metadata,
          };
        },
        create: (type, obj) =>
          dataProvider.create(type, nullInputTransform(type, obj)),
        update: (type, obj) =>
          dataProvider.update(type, nullInputTransform(type, obj)),
      });
    };
    buildDataProvider();
  }, []);

  if (!dataProvider || !user) return <p>Loading...</p>;

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
        name="disabled_emails"
        list={DisabledEmailList}
        edit={DisabledEmailEdit}
        create={DisabledEmailCreate}
      />
      <Resource name="users" list={UserList} edit={UserEdit} />
      <Resource
        name="data_partners"
        list={DataPartnerList}
        edit={DataPartnerEdit}
        create={DataPartnerCreate}
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

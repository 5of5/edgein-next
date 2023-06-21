// Initialize the dataProvider before rendering react-admin resources.
import React, { useState, useEffect } from 'react';
import buildHasuraProvider from 'ra-data-hasura';

import { Admin, DataProvider, Resource, AuthProvider } from 'react-admin';

import CssBaseline from '@mui/material/CssBaseline';

import { ApolloClient, InMemoryCache } from '@apollo/client';
import {
  LeadSegmentationList,
  LeadSegmentationCreate,
  LeadSegmentationEdit,
} from '../../components/admin/leads-segmentation';
import { useAuth } from '../../hooks/use-auth';
import { onSubmitData } from '@/utils/submit-data';
import { theme } from '@/theme/admin';
import ElemMyLogin from '@/components/admin/elem-my-login';
import ElemLayoutApp from '@/components/admin/elem-layout-app';

const AdminData = () => {
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

  useEffect(() => {
    const buildDataProvider = async () => {
      const myClientWithAuth = new ApolloClient({
        uri: '/api/graphql/',
        cache: new InMemoryCache(),
      });

      const dataProvider = await buildHasuraProvider({
        client: myClientWithAuth,
      });

      setDataProvider({
        ...dataProvider,
        create: (type, obj) => onSubmitData(type, obj, 'POST'),
        update: (type, obj) => onSubmitData(type, obj, 'PUT'),
        deleteMany: async (type, obj: any) => {
          const response = await Promise.all(
            obj.ids.map(async (id: number) => {
              await onSubmitData(type, { id, previousData: { id } }, 'DELETE');
              return { id };
            }),
          );
          return { data: response };
        },
        delete: (type, obj) => onSubmitData(type, obj, 'DELETE'),
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
        name="leads_segmentation"
        list={LeadSegmentationList}
        create={LeadSegmentationCreate}
        edit={LeadSegmentationEdit}
      />
    </Admin>
  );
};

export async function getStaticProps() {
  return {
    props: { noLayout: true },
  };
}

export default AdminData;

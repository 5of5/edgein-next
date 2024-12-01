// Initialize the dataProvider before rendering react-admin resources.
import React, { useCallback } from 'react';

import { Admin, DataProvider, Resource } from 'react-admin';

import CssBaseline from '@mui/material/CssBaseline';

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
import ElemAdminLogin from '@/components/admin/elem-admin-login';
import ElemLayoutApp from '@/components/admin/elem-layout-app';
import { theme } from '@/theme/admin';
import useAdminDataProvider from '@/hooks/use-admin-data-provider';
import { NullableInputs } from '@/types/admin';
import { nullInputTransform } from '@/utils/admin';
import useAdminAuthProvider from '@/hooks/use-admin-auth-provider';
import { USER_ROLES } from '@/utils/users';
import {
  UserTransactionsCreate,
  UserTransactionsList,
} from '@/components/admin/user-transactions';

const nullableInputs: NullableInputs = {
  users: ['person_id'],
};

const AdminApp = () => {
  const { user } = useAuth();
  const authProvider = useAdminAuthProvider([USER_ROLES.ADMIN], user);

  const onTransformData = useCallback(
    (adminDataProvider: DataProvider<string>) =>
      ({
        ...adminDataProvider,
        getOne: async (type: string, obj: any) => {
          const { data, ...metadata } = await adminDataProvider.getOne(
            type,
            obj,
          );

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
          adminDataProvider.create(
            type,
            nullInputTransform(nullableInputs, type, obj),
          ),
        update: (type, obj) =>
          adminDataProvider.update(
            type,
            nullInputTransform(nullableInputs, type, obj),
          ),
      } as DataProvider<string>),
    [],
  );

  const { dataProvider } = useAdminDataProvider(onTransformData);

  if (!dataProvider || !user) return <p>Loading...</p>;

  return (
    <Admin
      loginPage={ElemAdminLogin}
      layout={ElemLayoutApp}
      dataProvider={dataProvider}
      authProvider={authProvider}>
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
      <Resource
        name="user_transactions"
        list={UserTransactionsList}
        create={UserTransactionsCreate}
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

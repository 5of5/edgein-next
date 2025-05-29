// Initialize the dataProvider before rendering react-admin resources.
import React, { useCallback } from 'react';
import { Admin, DataProvider, Resource } from 'react-admin';
import CssBaseline from '@mui/material/CssBaseline';
import { LeadList, LeadCreate, LeadEdit } from '../../components/admin/leads';
import {
  LeadSegmentationList,
  LeadSegmentationCreate,
  LeadSegmentationEdit,
} from '../../components/admin/leads-segmentation';
import { useAuth } from '../../hooks/use-auth';
import { onSubmitData } from '@/utils/submit-data';
import { theme } from '@/theme/admin';
import ElemAdminLogin from '@/components/admin/elem-admin-login';
import ElemLayoutApp from '@/components/admin/elem-layout-app';
import useAdminDataProvider from '@/hooks/use-admin-data-provider';
import useAdminAuthProvider from '@/hooks/use-admin-auth-provider';
import { USER_ROLES } from '@/utils/users';

const AdminData = () => {
  const { user } = useAuth();

  const authProvider = useAdminAuthProvider(
    [USER_ROLES.ADMIN],
    user || undefined,
  );

  const onTransformData = useCallback(
    (adminDataProvider: DataProvider<string>) =>
      ({
        ...adminDataProvider,
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
      authProvider={authProvider}
      theme={theme}>
      <CssBaseline />
      <Resource
        name="leads"
        list={LeadList}
        create={LeadCreate}
        edit={LeadEdit}
      />
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

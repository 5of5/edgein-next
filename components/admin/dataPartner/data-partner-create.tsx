import React from 'react';
import { useCreate, useRedirect } from 'react-admin';
import ElemToolbar from '../elem-toolbar';
import ElemFormBase from '../elem-form-base';
import DataPartnerForm from './data-partner-form';

export const DataPartnerCreate = () => {
  const [create] = useCreate();
  const redirect = useRedirect();

  const handleSaveDraft = (data: any) => {
    data.status = 'draft';
    create('data_partners', { data });
    redirect('/data_partners');
  };

  return (
    <ElemFormBase title="Create a Coin" action="create">
      <DataPartnerForm
        action="create"
        toolbar={<ElemToolbar onSaveDraft={handleSaveDraft} />}
      />
    </ElemFormBase>
  );
};

import React from 'react';
import { useCreate, useRedirect } from 'react-admin';
import ElemToolbar from '../elem-toolbar';
import ElemFormBase from '../elem-form-base';
import UserTransactionForm from './user-transactions-form';

export const UserTransactionsCreate = () => {
  const [create] = useCreate();
  const redirect = useRedirect();

  const handleSaveDraft = (data: any) => {
    data.status = 'draft';
    create('user_transactions', { data });
    redirect('/user_transactions');
  };

  return (
    <ElemFormBase title="Create a User Transaction" action="create">
      <UserTransactionForm
        toolbar={<ElemToolbar onSaveDraft={handleSaveDraft} />}
      />
    </ElemFormBase>
  );
};

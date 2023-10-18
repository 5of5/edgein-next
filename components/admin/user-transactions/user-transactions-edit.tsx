import React from 'react';
import ElemTitle from '../elem-title';
import ElemFormBase from '../elem-form-base';
import UserTransactionForm from './user-transactions-form';

export const UserTransactionsEdit = () => {
  return (
    <div style={{ paddingBottom: '20px' }}>
      <ElemFormBase title={<ElemTitle category="User transaction" />} action="edit">
        <UserTransactionForm />
      </ElemFormBase>
    </div>
  );
};

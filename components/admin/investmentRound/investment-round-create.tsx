import React from 'react';
import { useCreate, useRedirect } from 'react-admin';
import ElemToolbar from '../elem-toolbar';
import ElemFormBase from '../elem-form-base';
import InvestmentRoundForm from './investment-round-form';

export const InvestmentRoundCreate = () => {
  const [create] = useCreate();
  const redirect = useRedirect();

  const handleSaveDraft = (data: any) => {
    data.status = 'draft';
    create('investment_rounds', { data });
    redirect('/investment_rounds');
  };

  return (
    <ElemFormBase title="Create a Investment Round" action="create">
      <InvestmentRoundForm
        toolbar={<ElemToolbar onSaveDraft={handleSaveDraft} />}
      />
    </ElemFormBase>
  );
};

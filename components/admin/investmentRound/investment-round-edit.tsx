import React from 'react';
import ElemTitle from '../elem-title';
import ElemFormBase from '../elem-form-base';
import InvestmentRoundForm from './investment-round-form';
import InvestmentTable from './investment-table';

export const InvestmentRoundEdit = () => {
  return (
    <div style={{ paddingBottom: '20px' }}>
      <ElemFormBase title={<ElemTitle category="Round" />} action="edit">
        <InvestmentRoundForm />
      </ElemFormBase>

      <InvestmentTable />
    </div>
  );
};

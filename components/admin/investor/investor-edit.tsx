import React from 'react';
import ElemFormBase from '../elem-form-base';
import ElemTitle from '../elem-title';
import InvestorForm from './investor-form';

export const InvestorEdit = () => {
  return (
    <ElemFormBase title={<ElemTitle category="VC" />} action="edit">
      <InvestorForm />
    </ElemFormBase>
  );
};

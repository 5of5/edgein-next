import React from 'react';
import ElemTitle from '../elem-title';
import ElemFormBase from '../elem-form-base';
import LeadForm from './form';

export const LeadEdit = () => {
  return (
    <ElemFormBase title={<ElemTitle category="Lead" />} action="edit">
      <LeadForm action="edit" />
    </ElemFormBase>
  );
};

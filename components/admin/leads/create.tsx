import React from 'react';
import { useCreate, useRedirect } from 'react-admin';
import { Leads } from '@/graphql/types';
import ElemToolbar from '../elem-toolbar';
import ElemFormBase from '../elem-form-base';
import LeadForm from './form';

export const LeadCreate = () => {
  const [create] = useCreate();
  const redirect = useRedirect();

  const handleSaveDraft = (data: Partial<Leads>) => {
    data.status = 'draft';
    create('leads', { data });
    redirect('/leads');
  };

  return (
    <ElemFormBase title="Create a lead" action="create">
      <LeadForm
        action="create"
        toolbar={<ElemToolbar onSaveDraft={handleSaveDraft} />}
      />
    </ElemFormBase>
  );
};

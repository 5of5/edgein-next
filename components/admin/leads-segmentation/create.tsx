import React from 'react';
import { useCreate, useRedirect } from 'react-admin';
import ElemToolbar from '../elem-toolbar';
import ElemFormBase from '../elem-form-base';
import LeadSegmentationForm from './form';

export const LeadSegmentationCreate = () => {
  const [create] = useCreate();
  const redirect = useRedirect();

  const handleSaveDraft = (data: any) => {
    data.status = 'draft';
    create('leads_segmentation', { data });
    redirect('/leads_segmentation');
  };

  return (
    <ElemFormBase title="Create a lead segmentation" action="create">
      <LeadSegmentationForm
        action="create"
        toolbar={<ElemToolbar onSaveDraft={handleSaveDraft} />}
      />
    </ElemFormBase>
  );
};

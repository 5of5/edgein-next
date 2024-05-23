import React from 'react';
import ElemTitle from '../elem-title';
import ElemFormBase from '../elem-form-base';
import LeadSegmentationForm from './form';

export const LeadSegmentationEdit = () => {
  return (
    <ElemFormBase
      title={<ElemTitle category="Lead Segmentation" />}
      action="edit">
      <LeadSegmentationForm action="edit" />
    </ElemFormBase>
  );
};

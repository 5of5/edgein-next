import React from 'react';
import ElemFormBase from '../elem-form-base';
import ElemTitle from '../elem-title';
import DisabledEmailForm from './disabled-email-form';
import { transform } from './services';

export const DisabledEmailEdit = () => {
  return (
    <ElemFormBase
      title={<ElemTitle category="Allow List" />}
      action="edit"
      transform={transform}>
      <DisabledEmailForm action="edit" />
    </ElemFormBase>
  );
};

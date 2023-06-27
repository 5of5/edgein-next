import React, { ReactElement } from 'react';
import { SimpleForm, TextInput, SelectInput } from 'react-admin';
import { status } from '@/utils/constants';
import { validateLeadSegmentation } from '@/utils/admin';

type LeadSegmentationFormProps = {
  action: 'create' | 'edit';
  toolbar?: ReactElement | false;
};

const LeadSegmentationForm = ({
  action,
  toolbar,
}: LeadSegmentationFormProps) => {
  const inputClassName =
    'w-full px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none';

  return (
    <SimpleForm toolbar={toolbar} validate={validateLeadSegmentation}>
      {action === 'edit' && (
        <TextInput className={inputClassName} disabled source="id" />
      )}
      <TextInput className={inputClassName} source="name" />
      <TextInput className={inputClassName} source="description" />
      <TextInput className={inputClassName} source="sql" />
      <TextInput
        className={inputClassName}
        source="campaign_id"
        label="Campaign ID"
      />
      <SelectInput
        className={inputClassName}
        source="status"
        choices={status}
      />
    </SimpleForm>
  );
};

export default LeadSegmentationForm;

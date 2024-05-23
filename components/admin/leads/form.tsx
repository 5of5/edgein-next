import React, { ReactElement } from 'react';
import {
  SimpleForm,
  TextInput,
  ReferenceInput,
  AutocompleteInput,
} from 'react-admin';

type LeadFormProps = {
  action: 'create' | 'edit';
  toolbar?: ReactElement | false;
};

const LeadForm = ({ action, toolbar }: LeadFormProps) => {
  const inputClassName =
    'w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none';

  return (
    <SimpleForm toolbar={toolbar}>
      {action === 'edit' && (
        <TextInput className={inputClassName} disabled source="id" />
      )}
      <TextInput className={inputClassName} source="first_name" />
      <TextInput className={inputClassName} source="last_name" />
      <TextInput className={inputClassName} source="email" />
      <TextInput className={inputClassName} source="phone" />
      <TextInput className={inputClassName} source="linkedin_url" />
      <TextInput className={inputClassName} source="company_name" />
      <TextInput className={inputClassName} source="website" />
      <TextInput className={inputClassName} source="source" />
      <TextInput
        className={inputClassName}
        source="campaign_id"
        label="Campaign ID"
      />
      <TextInput
        className={inputClassName}
        source="instantly_id"
        label="Instantly ID"
      />
      <TextInput className={inputClassName} source="email_domain" />
      <ReferenceInput
        label="Converted User"
        source="converted_userid"
        reference="users">
        <AutocompleteInput
          className={inputClassName}
          style={{ padding: 0, border: 'none' }}
          optionText="display_name"
          filterToQuery={search => ({ name: search })}
        />
      </ReferenceInput>
      <TextInput className={inputClassName} source="status" />
    </SimpleForm>
  );
};

export default LeadForm;

import React, { ReactElement } from 'react';
import {
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  DateInput,
  AutocompleteInput,
} from 'react-admin';
import {
  investorFunctionChoices,
  investorSeniorityChoices,
} from '@/utils/constants';

type InvestorFormProps = {
  toolbar?: ReactElement | false;
};

const InvestorForm = ({ toolbar }: InvestorFormProps) => {
  const inputClassName =
    'w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none';

  return (
    <SimpleForm toolbar={toolbar}>
      <ReferenceInput label="VC Firm" source="vc_firm_id" reference="vc_firms">
        <AutocompleteInput
          style={{ padding: 0, border: 'none' }}
          className={inputClassName}
          optionText="name"
          filterToQuery={search => ({ name: search })}
        />
      </ReferenceInput>
      <ReferenceInput label="Person" source="person_id" reference="people">
        <AutocompleteInput
          style={{ padding: 0, border: 'none' }}
          className={inputClassName}
          optionText="name"
          filterToQuery={search => ({ name: search })}
        />
      </ReferenceInput>
      <SelectInput
        className={inputClassName}
        source="function"
        choices={investorFunctionChoices}
      />
      <DateInput className={inputClassName} source="start_date" />
      <DateInput className={inputClassName} source="end_date" />
      {/* <TextInput
        className={inputClassName}
        source="founder"
      /> */}
      <SelectInput
        className={inputClassName}
        source="seniority"
        choices={investorSeniorityChoices}
      />
      <TextInput className={inputClassName} source="title" />
    </SimpleForm>
  );
};

export default InvestorForm;

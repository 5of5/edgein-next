import React, { ReactElement } from 'react';
import {
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  DateInput,
  BooleanInput,
  AutocompleteInput,
} from 'react-admin';
import {
  functionChoicesTM,
  seniorityChoicesTM,
  ADMIN_REFERENCE_INPUT_PER_PAGE,
} from '@/utils/constants';

type TeamMemberFormProps = {
  toolbar?: ReactElement | false;
};

const TeamMemberForm = ({ toolbar }: TeamMemberFormProps) => {
  const inputClassName =
    'w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none';

  return (
    <SimpleForm toolbar={toolbar}>
      <ReferenceInput
        label="Company"
        source="company_id"
        reference="companies"
        perPage={ADMIN_REFERENCE_INPUT_PER_PAGE}
      >
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
        choices={functionChoicesTM}
      />
      <DateInput className={inputClassName} source="start_date" />
      <DateInput className={inputClassName} source="end_date" />
      <SelectInput
        className={inputClassName}
        source="seniority"
        choices={seniorityChoicesTM}
      />
      <TextInput className={inputClassName} source="title" />
      <BooleanInput className="w-full" source="founder" />
    </SimpleForm>
  );
};

export default TeamMemberForm;

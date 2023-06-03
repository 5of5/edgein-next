import React from 'react';
import {
  TextField,
  EditButton,
  TextInput,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  DateField,
  SelectField,
  BooleanField,
  AutocompleteInput,
} from 'react-admin';
import {
  functionChoicesTM,
  seniorityChoicesTM,
  ADMIN_REFERENCE_INPUT_PER_PAGE,
} from '@/utils/constants';
import ElemList from '../elem-list';
import { useAuth } from '@/hooks/use-auth';

const filters = [
  <TextInput key="search" source="title" label="Title" resettable alwaysOn />,
  <ReferenceInput
    key="searchCompany"
    source="company_id"
    reference="companies"
    perPage={ADMIN_REFERENCE_INPUT_PER_PAGE}
  >
    <AutocompleteInput
      optionText={choice => `${choice.name}`}
      filterToQuery={search => ({ name: search })}
    />
  </ReferenceInput>,
  <ReferenceInput key="searchPerson" source="person_id" reference="people">
    <AutocompleteInput
      optionText={choice => `${choice.name}`}
      filterToQuery={search => ({ name: search })}
    />
  </ReferenceInput>,
  <SelectInput
    key="function"
    source="function"
    label="Function"
    choices={functionChoicesTM}
  />,
  <SelectInput
    key="seniority"
    source="seniority"
    label="Seniority"
    choices={seniorityChoicesTM}
  />,
];

export const TeamMemberList = () => {
  const { user } = useAuth();

  return (
    <ElemList filters={filters}>
      {user?.role !== 'cms-readonly' && <EditButton />}
      <TextField source="id" />
      <ReferenceField label="Company" source="company_id" reference="companies">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField label="Person" source="person_id" reference="people">
        <TextField source="name" />
      </ReferenceField>
      <SelectField source="function" choices={functionChoicesTM} />
      <DateField source="start_date" />
      <DateField source="end_date" />
      <BooleanField source="founder" />
      <SelectField source="seniority" choices={seniorityChoicesTM} />
      <TextField source="title" />
      {/* <TextField source="counter" /> */}
    </ElemList>
  );
};

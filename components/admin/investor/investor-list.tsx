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
  AutocompleteInput,
  required,
} from 'react-admin';
import {
  investorFunctionChoices,
  investorSeniorityChoices,
} from '@/utils/constants';
import ElemList from '../elem-list';
import { useAuth } from '@/hooks/use-auth';

const filters = [
  <TextInput key="search" source="title" label="Title" resettable alwaysOn />,
  <ReferenceInput
    key="searchVCFirm"
    source="vc_firm_id"
    reference="vc_firms"
    validate={required()}>
    <AutocompleteInput
      optionText={choice => `${choice.name}`}
      filterToQuery={search => ({ name: search })}
    />
  </ReferenceInput>,
  <ReferenceInput
    key="searchPerson"
    source="person_id"
    reference="people"
    validate={required()}>
    <AutocompleteInput
      optionText={choice => `${choice.name}`}
      filterToQuery={search => ({ name: search })}
    />
  </ReferenceInput>,
  <SelectInput
    key="function"
    source="function"
    label="Function"
    choices={investorFunctionChoices}
  />,
  <SelectInput
    key="seniority"
    source="seniority"
    label="Seniority"
    choices={investorSeniorityChoices}
  />,
];

export const InvestorList = () => {
  const { user } = useAuth();

  return (
    <ElemList filters={filters}>
      {user?.role !== 'cms-readonly' && <EditButton />}
      <TextField source="id" />
      <ReferenceField label="VC Firm" source="vc_firm_id" reference="vc_firms">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField label="Person" source="person_id" reference="people">
        <TextField source="name" />
      </ReferenceField>
      <SelectField source="function" choices={investorFunctionChoices} />
      <DateField source="start_date" />
      <DateField source="end_date" />
      {/* <TextField source="founder" /> */}
      <SelectField source="seniority" choices={investorSeniorityChoices} />
      <TextField source="title" />
      {/* <TextField source="counter" /> */}
    </ElemList>
  );
};

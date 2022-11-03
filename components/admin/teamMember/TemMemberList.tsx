import React from "react";
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
  useGetList,
} from "react-admin";
import { functionChoicesTM, seniorityChoicesTM } from "@/utils/constants";
import ElemList from "../ElemList";
import { getAdminRenderData, sortWithData } from "@/utils";

const filters = [
  <TextInput key="search" source="title" label="Title" resettable alwaysOn />,
  <ReferenceInput key="searchCompany" source="company_id" reference="companies">
    <AutocompleteInput
      optionText={(choice) => `${choice.name}`}
      filterToQuery={(search) => ({ name: search })}
    />
  </ReferenceInput>,
  <ReferenceInput key="searchPerson" source="person_id" reference="people">
    <AutocompleteInput
      optionText={(choice) => `${choice.name}`}
      filterToQuery={(search) => ({ name: search })}
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
  const [customSort, setCustomSort] = React.useState({
    field: "id",
    order: "ASC",
  });
  const headers: string[] = [
    "id",
    "company_id",
    "person_id",
    "function",
    "start_date",
    "end_date",
    "founder",
    "seniority",
    "title",
  ];
  const { data } = useGetList("team_members", {
    pagination: { page: 1, perPage: 10 },
  });
  let renderData = getAdminRenderData(data, headers, "/9");

  renderData = renderData && sortWithData(renderData, customSort);

  return (
    <ElemList filters={filters}>
      <EditButton />
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

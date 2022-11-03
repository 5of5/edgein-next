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
  AutocompleteInput,
  useGetList,
  required,
} from "react-admin";
import {
  investorFunctionChoices,
  investorSeniorityChoices,
} from "@/utils/constants";
import ElemList from "../ElemList";
import { getAdminRenderData, sortWithData } from "@/utils";

const filters = [
  <TextInput key="search" source="title" label="Title" resettable alwaysOn />,
  <ReferenceInput
    key="searchVCFirm"
    source="vc_firm_id"
    reference="vc_firms"
    validate={required()}
  >
    <AutocompleteInput
      optionText={(choice) => `${choice.name}`}
      filterToQuery={(search) => ({ name: search })}
    />
  </ReferenceInput>,
  <ReferenceInput
    key="searchPerson"
    source="person_id"
    reference="people"
    validate={required()}
  >
    <AutocompleteInput
      optionText={(choice) => `${choice.name}`}
      filterToQuery={(search) => ({ name: search })}
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
  const [customSort, setCustomSort] = React.useState({
    field: "id",
    order: "ASC",
  });
  const headers: string[] = [
    "id",
    "vc_firm_id",
    "person_id",
    "function",
    "start_date",
    "end_date",
    "seniority",
    "title",
  ];
  const { data } = useGetList("investors", {
    pagination: { page: 1, perPage: 10 },
  });
  let renderData = getAdminRenderData(data, headers, "/8");

  renderData = renderData && sortWithData(renderData, customSort);

  return (
    <ElemList filters={filters}>
      <EditButton />
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

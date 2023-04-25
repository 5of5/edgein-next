import React from "react";
import {
  TextField,
  EditButton,
  TextInput,
  ReferenceArrayField,
  SingleFieldList,
  ChipField,
} from "react-admin";
import ElemList from "../ElemList";

const filters = [
  <TextInput
    key="search"
    source="text"
    label="Search news"
    resettable
    alwaysOn
  />,
];

export const NewsList = () => {
  return (
    <ElemList filters={filters}>
      <EditButton />
      <TextField source="id" />
      <TextField source="text" />
      <TextField source="date" />
      <TextField source="link" />
      <TextField source="notes" />
      <ReferenceArrayField
        label="Companies"
        source="company_ids"
        reference="companies"
      >
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>
      <ReferenceArrayField
        label="Vc firms"
        source="vc_firm_ids"
        reference="vc_firms"
      >
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>
      <TextField source="source" />
      <TextField source="kind" />
      <TextField source="metadata" />
      <TextField source="status" />
    </ElemList>
  );
};

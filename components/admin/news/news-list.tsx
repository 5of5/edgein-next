import React from "react";
import {
  TextField,
  EditButton,
  TextInput,
  ReferenceArrayField,
  SingleFieldList,
  ChipField,
  FunctionField,
} from "react-admin";
import ElemList from "../elem-list";

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
      <FunctionField
        source="library"
        render={(record: any) => (Array.isArray(record.library) ? record.library.join() : record.library ?? "")}
      />
      <TextField source="status" />
    </ElemList>
  );
};

import React from "react";
import { TextField, EditButton, TextInput, useGetList } from "react-admin";
import ElemList from "../ElemList";

const filters = [
  <TextInput
    key="search"
    source="name"
    label="Search Name"
    resettable
    alwaysOn
  />,
];

export const BlockchainList = () => {
  return (
    <ElemList filters={filters}>
      <EditButton />
      <TextField source="id" />
      <TextField source="name" />
      {/* <TextField source="counter" /> */}
    </ElemList>
  );
};

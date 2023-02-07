import React from "react";
import { TextField, EditButton, SelectField } from "react-admin";
import ElemList from "../elem-list";
import { typeChoices } from "./services";

export const DisabledEmailList = () => {
  return (
    <ElemList>
      <EditButton />
      <TextField source="id" />
      <TextField source="email" />
      <SelectField source="type" choices={typeChoices} />
    </ElemList>
  );
};

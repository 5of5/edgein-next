import React from "react";
import { TextField, EditButton, SelectField } from "react-admin";
import ElemList from "../ElemList";
import { typeChoices } from "./services";

export const AllowedEmailList = () => {
  return (
    <ElemList>
      <EditButton />
      <TextField source="id" />
      <TextField source="email" />
      <TextField source="person_id" />
      <SelectField source="type" choices={typeChoices} />
    </ElemList>
  );
};

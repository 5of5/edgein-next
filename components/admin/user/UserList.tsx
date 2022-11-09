import React from "react";
import { TextField, EditButton } from "react-admin";
import ElemList from "../ElemList";

export const UserList = () => {
  return (
    <ElemList>
      <EditButton />
      <TextField source="id" />
      <TextField source="email" />
      <TextField source="display_name" />
      <TextField source="person_id" />
      <TextField source="role" />
    </ElemList>
  );
};

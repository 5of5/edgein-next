import React from "react";
import { ImageField, TextField, EditButton, TextInput, FunctionField } from "react-admin";
import ElemList from "../ElemList";
import { useAuth } from "@/hooks/useAuth";

const filters = [
  <TextInput
    key="search"
    className="w-[500px]"
    source="name,github,personal_email,work_email,linkedin"
    label="Name,Github,Personal Email,Work Email,Linkedin"
    resettable
    alwaysOn
  />,
];

export const PersonList = () => {
  const { user } = useAuth();

  return (
    <ElemList filters={filters}>
      { user?.role !== "cms-readonly" && <EditButton /> }
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="slug" />
      <ImageField className="logoFile" source="picture.url" label="Picture" />
      <TextField source="github" />
      <TextField source="type" />
      <TextField source="personal_email" />
      <TextField source="work_email" />
      <TextField source="linkedin" />
      <FunctionField
        source="library"
        render={(record: any) => (record.library ? record.library.join() : "")}
      />
      <TextField source="status" />
      {/* <TextField source="counter" /> */}
    </ElemList>
  );
};

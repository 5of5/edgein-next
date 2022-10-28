
import React, { useState } from "react";

import {
  ImageField,
  List,
  Datagrid,
  TextField,
  EditButton,
  TextInput,
  useGetList,
  Pagination,
  Toolbar,
  Button,
  TopToolbar,
} from "react-admin";


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
const PostPagination = () => (
  <Pagination rowsPerPageOptions={[5, 10, 25, 50, 100, 250]} />
);

export const PersonList = () => {
  return (
    <List
      filters={filters}
      pagination={<PostPagination />}
      sx={{
        ".MuiToolbar-root": {
          justifyContent: "start !important",
          paddingTop: 0,
          marginBottom: "4px",
        },
        ".RaBulkActionsToolbar-toolbar": {
          justifyContent: "start !important",
        },
        ".MuiToolbar-root .MuiButtonBase-root": {
          paddingTop: 0,
          paddingBottom: 0,
          margin: "4px",
        },
        ".RaBulkActionsToolbar-topToolbar": {
          paddingTop: 0,
          paddingBottom: 0,
          marginBottom: 0,
        },
        ".MuiToolbar-root form": {
          flex: "0 1 auto",
        },
        ".MuiToolbar-root form .MuiFormControl-root": {
          margin: 0,
        },
      }}
    >
      <Datagrid>
        <EditButton />
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="slug" />
        <ImageField className="logoFile" source="picture.url" label="Picture" />
        <TextField source="github" />
        <TextField source="type" />
        <TextField source="personal_email" />
        <TextField source="work_email" />
        <TextField source="linkedin" />
        <TextField source="status" />
        {/* <TextField source="counter" /> */}
      </Datagrid>
    </List>
  );
};

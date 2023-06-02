import React from 'react';
import { TextField, EditButton, TextInput, FunctionField } from 'react-admin';
import ElemList from '../elem-list';

const filters = [
  <TextInput
    key="search"
    source="email,display_name"
    label="Email, Display name"
    resettable
    alwaysOn
  />,
];

export const UserList = () => {
  return (
    <ElemList filters={filters} disableDelete={true}>
      <EditButton />
      <TextField source="id" />
      <TextField source="email" />
      <TextField source="display_name" />
      <TextField source="person_id" />
      <TextField source="role" />
      <FunctionField
        source="additional_emails"
        render={(record: any) => {
          return record?.additional_emails?.map((item: string) => (
            <p key={item}>{item}</p>
          ));
        }}
      />
    </ElemList>
  );
};

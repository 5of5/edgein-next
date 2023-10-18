import React from 'react';
import {
  TextField,
  EditButton,
  ReferenceField,
  TextInput,
} from 'react-admin';
import ElemList from '../elem-list';

const filters = [
  <TextInput
    key="search"
    source="amount"
    label="Use"
    resettable
    alwaysOn
  />
];

export const UserTransactionsList = () => {
  return (
    <ElemList filters={filters}>
      <EditButton />
      <TextField source="id" />
      <ReferenceField label="User" source="user_id" reference="users">
        <TextField source="display_name" />
      </ReferenceField>
      <TextField source="amount" />
      <TextField source="note" />
      <ReferenceField label="Created by" source="created_by" reference="users">
        <TextField source="display_name" />
      </ReferenceField>
    </ElemList>
  );
};

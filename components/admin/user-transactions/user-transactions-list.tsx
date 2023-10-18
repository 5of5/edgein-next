import React from 'react';
import { TextField, EditButton, ReferenceField, TextInput, NumberInput, NumberField } from 'react-admin';
import ElemList from '../elem-list';

const filters = [
  <NumberInput key="search" source="amount" label="Use" alwaysOn />,
];

export const UserTransactionsList = () => {
  return (
    <ElemList filters={filters}>
      <EditButton />
      <TextField source="id" />
      <ReferenceField label="User" source="user_id" reference="users">
        <TextField source="display_name" />
      </ReferenceField>
      <NumberField source="amount" />
      <TextField source="note" />
      <ReferenceField label="Created by" source="created_by" reference="users">
        <TextField source="display_name" />
      </ReferenceField>
    </ElemList>
  );
};

import React from 'react';
import { TextField, EditButton, TextInput, DateField } from 'react-admin';
import ElemList from '../elem-list';

const filters = [
  <TextInput
    key="search"
    source="name"
    label="Search Name"
    resettable
    alwaysOn
  />,
];

export const LeadSegmentationList = () => {
  return (
    <ElemList filters={filters}>
      <EditButton />
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="description" />
      <TextField source="sql" />
      <TextField source="campaign_id" />
      <TextField source="status" />
      <DateField source="created_at" />
    </ElemList>
  );
};

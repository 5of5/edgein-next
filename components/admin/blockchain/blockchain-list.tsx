import { useAuth } from '@/hooks/use-auth';
import React from 'react';
import { TextField, EditButton, TextInput, useGetList } from 'react-admin';
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

export const BlockchainList = () => {
  const { user } = useAuth();

  return (
    <ElemList filters={filters}>
      {user?.role !== 'cms-readonly' && <EditButton />}
      <TextField source="id" />
      <TextField source="name" />
      {/* <TextField source="counter" /> */}
    </ElemList>
  );
};

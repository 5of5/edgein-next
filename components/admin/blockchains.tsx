// in posts.js
import * as React from "react";
import {
  SearchInput,
  List,
  Datagrid,
  Edit,
  Create,
  SimpleForm,
  TextField,
  EditButton,
  TextInput,
} from "react-admin";

const filters = [
  <SearchInput key="search" source="name" resettable alwaysOn />
];

export const BlockchainsList = () => (
  <List filters={filters}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <EditButton />
    </Datagrid>
  </List>
);

interface TitleProps {
  record?: Record<string, string>;
}

const BlockchainsTitle = ({ record }: TitleProps) => {
  return <span>Blockchain {record ? `"${record.name}"` : ""}</span>;
};

export const BlockchainsEdit = () => (
  <Edit title={<BlockchainsTitle />}>
    <SimpleForm>
      <TextInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        disabled
        source="id"
      />
      <TextInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="name"
      />
    </SimpleForm>
  </Edit>
);

export const BlockchainsCreate = () => (
  <Create title="Create a Blockchain">
    <SimpleForm>
      <TextInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="name"
      />
    </SimpleForm>
  </Create>
);

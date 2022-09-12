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
  <TextInput key="search" source="name" label="Search Name" resettable alwaysOn />
];

export const BlockchainsList = () => (
  <List filters={filters}
    sx={{
      '.css-1d00q76-MuiToolbar-root-RaListToolbar-root': {
        justifyContent: 'flex-start'
      }
    }}
  >
    <Datagrid>
      <EditButton />
      <TextField source="id" />
      <TextField source="name" />
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
  <Edit title={<BlockchainsTitle />}
    sx={{
      '.MuiFormHelperText-root': {
        display: 'none',
      }
    }}
  >
    <SimpleForm>
      <TextInput
        className="w-full px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        disabled
        source="id"
      />
      <TextInput
        className="w-full px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="name"
      />
    </SimpleForm>
  </Edit>
);

export const BlockchainsCreate = () => (
  <Create title="Create a Blockchain"
    sx={{
      '.MuiFormHelperText-root': {
        display: 'none',
      }
    }}
  >
    <SimpleForm>
      <TextInput
        className="w-full px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="name"
      />
    </SimpleForm>
  </Create>
);

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
  required,
  minLength,
  regex
} from "react-admin";

const postFilters = [
	<SearchInput source="name,slug" resettable alwaysOn />
];

export const VcFirmList = () => (
  <List filters={postFilters}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="slug" />
      <TextField source="website" />
      <TextField source="linkedin" />
      <EditButton />
    </Datagrid>
  </List>
);

interface TitleProps {
  record?: Record<string, string>;
}

const VcFirmTitle = ({ record }: TitleProps) => {
  return <span>Vc Firm {record ? `"${record.name}"` : ""}</span>;
};

const validateName = [required(), minLength(3)];
const validateSlug = [required(), minLength(3)];
const validateUrl = regex(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi, 'Must be a valid Url')

export const VcFirmEdit = () => (
  <Edit title={<VcFirmTitle />}>
    <SimpleForm>
      <TextInput  className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none" disabled source="id" />
      <TextInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="name"
        validate={validateName}
      />
      <TextInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="slug"
        validate={validateSlug}
      />
      <TextInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="website"
        validate={validateUrl}
      />
      <TextInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="linkedin"
        validate={validateUrl}
      />
    </SimpleForm>
  </Edit>
);

export const VcFirmCreate = () => (
  <Create title="Create a VC Firm">
    <SimpleForm>
      <TextInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="name"
        validate={validateName}
      />
      <TextInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="slug"
        validate={validateSlug}
      />
      <TextInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="website"
        validate={validateUrl}
      />
      <TextInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="linkedin"
        validate={validateUrl}
      />
    </SimpleForm>
  </Create>
);

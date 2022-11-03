import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  required,
} from "react-admin";
import ElemTitle from "../ElemTitle";

export const UserEdit = () => {
  return (
    <Edit
      title={<ElemTitle category="Users" />}
      sx={{
        ".MuiFormHelperText-root": {
          display: "none",
        },
        ".MuiPaper-root": {
          position: "relative",
        },
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
          disabled
          source="email"
        />
        <TextInput
          className="w-full px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="display_name"
        />
        <TextInput
          className="w-full px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="person_id"
        />
        <SelectInput
          className="w-full px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="role"
          choices={[
            { id: "admin", name: "Admin" },
            { id: "user", name: "User" },
          ]}
          validate={required()}
        />
      </SimpleForm>
    </Edit>
  );
};

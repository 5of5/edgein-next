import React from "react";
import {
  SimpleForm,
  TextInput,
  SelectInput,
  required,
  Toolbar,
  SaveButton,
  DeleteButton,
} from "react-admin";
import ElemFormBase from "../ElemFormBase";
import ElemTitle from "../ElemTitle";
import UserResetPasswordButton from "./UserResetPasswordButton";

const UserEditToolbar = () => {
  return (
    <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
      <SaveButton label="Save" />
      <div>
        <UserResetPasswordButton />
        <DeleteButton label="Delete" sx={{ marginLeft: 1 }} />
      </div>
    </Toolbar>
  );
};

export const UserEdit = () => {
  const inputClassName =
    "w-full px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none";

  return (
    <ElemFormBase title={<ElemTitle category="Users" />} action="edit">
      <SimpleForm toolbar={<UserEditToolbar />}>
        <TextInput className={inputClassName} disabled source="id" />
        <TextInput className={inputClassName} disabled source="email" />
        <TextInput className={inputClassName} source="display_name" />
        <TextInput className={inputClassName} source="person_id" />
        <SelectInput
          className={inputClassName}
          source="role"
          choices={[
            { id: "admin", name: "Admin" },
            { id: "user", name: "User" },
            { id: "cms", name: "CMS" },
            { id: "cms-readonly", name: "CMS Readonly" },
          ]}
          validate={required()}
        />
        <SelectInput
          className={inputClassName}
          source="active"
          choices={[
            { id: true, name: "Active" },
            { id: false, name: "In active" },
          ]}
          validate={required()}
        />
      </SimpleForm>
    </ElemFormBase>
  );
};

import React from "react";
import {
  SimpleForm,
  TextInput,
  SelectInput,
  ArrayInput,
  SimpleFormIterator,
  required,
} from "react-admin";
import ElemFormBase from "../ElemFormBase";
import ElemTitle from "../ElemTitle";

export const UserEdit = () => {
  const inputClassName =
    "w-full px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none";

  const transform = (data: any) => ({
    ...data,
    additional_emails:
      data.additional_emails && data.additional_emails.length > 0
        ? data.additional_emails.map((item: { email: string }) => item.email)
        : data.additional_emails,
  });

  return (
    <ElemFormBase
      title={<ElemTitle category="Users" />}
      action="edit"
      transform={transform}
    >
      <SimpleForm>
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
        <ArrayInput source="additional_emails">
          <SimpleFormIterator
            disableReordering
            sx={{ margin: 2, paddingTop: 1 }}
          >
            <TextInput className={inputClassName} source="email" />
          </SimpleFormIterator>
        </ArrayInput>
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

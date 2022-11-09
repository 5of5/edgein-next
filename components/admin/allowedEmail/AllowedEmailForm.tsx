import React from "react";
import { SimpleForm, TextInput, SelectInput } from "react-admin";
import { typeChoices } from "./services";

type AllowedEmailFormProps = {
  action: "create" | "edit";
};

const AllowedEmailForm = ({ action }: AllowedEmailFormProps) => {
  const inputClassName =
    "w-full px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none";

  return (
    <SimpleForm>
      {action === "edit" && (
        <TextInput className={inputClassName} disabled source="id" />
      )}
      <TextInput className={inputClassName} source="email" />
      <TextInput className={inputClassName} source="person_id" />
      <SelectInput
        className={inputClassName}
        source="type"
        key="type"
        label="Type"
        choices={typeChoices}
      />
    </SimpleForm>
  );
};

export default AllowedEmailForm;

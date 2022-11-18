import React from "react";
import { SimpleForm, TextInput, SelectInput, required } from "react-admin";
import { typeChoices } from "./services";

type DisabledEmailFormProps = {
  action: "create" | "edit";
};

const DisabledEmailForm = ({ action }: DisabledEmailFormProps) => {
  const inputClassName =
    "w-full px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none";

  return (
    <SimpleForm>
      {action === "edit" && (
        <TextInput className={inputClassName} disabled source="id" />
      )}
      <TextInput className={inputClassName} source="email" label="email or domain" />
      <SelectInput
        className={inputClassName}
        source="match_type"
        label="Type"
        choices={typeChoices}
        validate={required()}
      />
    </SimpleForm>
  );
};

export default DisabledEmailForm;

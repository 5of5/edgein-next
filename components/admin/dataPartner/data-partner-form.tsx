import React, { ReactElement } from "react";
import { SimpleForm, TextInput } from "react-admin";

type DataPartnerFormProps = {
  action: "create" | "edit";
  toolbar?: ReactElement | false;
  currentData?: any;
};

const DataPartnerForm = ({ action, toolbar }: DataPartnerFormProps) => {
  const inputClassName =
    "w-full px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none";

  return (
    <SimpleForm toolbar={toolbar}>
      {action === "edit" && (
        <TextInput className={inputClassName} disabled source="id" />
      )}
      <TextInput className={inputClassName} source="name" />
      {action === "edit" && (
        <TextInput className={inputClassName} disabled source="api_key" />
      )}
    </SimpleForm>
  );
};

export default DataPartnerForm;

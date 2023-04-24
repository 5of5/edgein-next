import React, { ReactElement } from "react";
import { SimpleForm, TextInput, DateInput, SelectInput } from "react-admin";
import { status } from "@/utils/constants";

type NewsFormProps = {
  action: "create" | "edit";
  toolbar?: ReactElement | false;
};

const NewsForm = ({ action, toolbar }: NewsFormProps) => {
  const inputClassName =
    "w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none";

  return (
    <SimpleForm toolbar={toolbar}>
      {action === "edit" && (
        <TextInput
          className="w-full px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          disabled
          source="id"
        />
      )}
      <TextInput className={inputClassName} source="text" />
      <TextInput className={inputClassName} source="link" />
      <DateInput className={inputClassName} source="date" />
      <TextInput
        className={inputClassName}
        source="source"
        multiline
        format={(v) => (v ? v.replace(/^"(.*)"$/, "$1") : "")}
        parse={(v) => (v ? `"${v}"` : "")}
      />
      <TextInput className={inputClassName} source="kind" />
      <SelectInput
        className={inputClassName}
        source="status"
        choices={status}
      />
    </SimpleForm>
  );
};

export default NewsForm;

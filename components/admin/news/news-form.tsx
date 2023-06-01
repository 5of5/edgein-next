import React, { ReactElement } from "react";
import {
  SimpleForm,
  TextInput,
  DateInput,
  SelectInput,
  SelectArrayInput,
} from "react-admin";
import { libraryChoices, status } from "@/utils/constants";
import { isValidJsonString } from "@/utils/helpers";

type NewsFormProps = {
  action: "create" | "edit";
  toolbar?: ReactElement | false;
};

const validateNews = (values: any) => {
  const { source, metadata } = values;
  const errors: any = {};
  if (source && !isValidJsonString(source)) {
    errors.source = "Invalid source format";
  }
  if (metadata && !isValidJsonString(metadata)) {
    errors.metadata = "Invalid metadata format";
  }
  return errors;
};

const NewsForm = ({ action, toolbar }: NewsFormProps) => {
  const inputClassName =
    "w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none";

  return (
    <SimpleForm toolbar={toolbar} validate={validateNews}>
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
      <TextInput className={inputClassName} source="source" multiline />
      <TextInput className={inputClassName} source="kind" />
      <SelectArrayInput
        className={inputClassName}
        source="library"
        choices={libraryChoices}
        defaultValue={["Web3"]}
      />
      <TextInput className={inputClassName} source="metadata" multiline />
      <SelectInput
        className={inputClassName}
        source="status"
        choices={status}
      />
    </SimpleForm>
  );
};

export default NewsForm;

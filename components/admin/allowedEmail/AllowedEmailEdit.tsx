import React from "react";
import { Edit, SimpleForm, TextInput, SelectInput } from "react-admin";
import ElemTitle from "../ElemTitle";
import { typeChoices, transform } from "./services";

export const AllowedEmailEdit = () => {
  return (
    <Edit
      transform={transform}
      title={<ElemTitle category="Allow List" />}
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
          source="email"
        />
        <TextInput
          className="w-full px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="person_id"
        />
        <SelectInput
          className="w-full px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="type"
          key="type"
          label="Type"
          choices={typeChoices}
        />
      </SimpleForm>
    </Edit>
  );
};

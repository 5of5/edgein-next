import React from "react";
import { Create, SimpleForm, TextInput, SelectInput } from "react-admin";
import { typeChoices, transform } from "./services";

export const AllowedEmailCreate = () => {
  return (
    <Create
      transform={transform}
      title="Create a entry in allow list"
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
          source="email"
        />
        <TextInput
          className="w-full px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="person_id"
        />
        <SelectInput
          className="w-full mt-5 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="type"
          key="type"
          label="Type"
          choices={typeChoices}
        />
      </SimpleForm>
    </Create>
  );
};

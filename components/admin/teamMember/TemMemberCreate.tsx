import React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  DateInput,
  BooleanInput,
  AutocompleteInput,
  useCreate,
  useRedirect,
} from "react-admin";
import { functionChoicesTM, seniorityChoicesTM } from "@/utils/constants";
import ElemToolbar from "../ElemToolbar";

export const TeamMemberCreate = () => {
  const [create] = useCreate();
  const redirect = useRedirect();

  const handleSaveDraft = (data: any) => {
    data.status = "draft";
    create("team_members", { data });
    redirect("/team_members");
  };

  return (
    <Create
      title="Add a person to a company"
      sx={{
        ".MuiCardContent-root": {
          "& > div": {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            flexDirection: "row !important",
          },
        },
        ".MuiFormHelperText-root": {
          display: "none",
        },
      }}
    >
      <SimpleForm toolbar={<ElemToolbar onSaveDraft={handleSaveDraft} />}>
        <ReferenceInput
          label="Company"
          source="company_id"
          reference="companies"
        >
          <AutocompleteInput
            style={{ padding: 0, border: "none" }}
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            optionText="name"
            filterToQuery={(search) => ({ name: search })}
          />
        </ReferenceInput>
        <ReferenceInput label="Person" source="person_id" reference="people">
          <AutocompleteInput
            style={{ padding: 0, border: "none" }}
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            optionText="name"
            filterToQuery={(search) => ({ name: search })}
          />
        </ReferenceInput>
        <SelectInput
          className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="function"
          choices={functionChoicesTM}
        />
        <DateInput
          className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="start_date"
        />
        <DateInput
          className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="end_date"
        />
        <SelectInput
          className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="seniority"
          choices={seniorityChoicesTM}
        />
        <TextInput
          className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="title"
        />
        <BooleanInput className="w-full" source="founder" />
      </SimpleForm>
    </Create>
  );
};

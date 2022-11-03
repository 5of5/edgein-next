import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  DateInput,
  AutocompleteInput,
} from "react-admin";
import {
  investorFunctionChoices,
  investorSeniorityChoices,
} from "@/utils/constants";
import ElemTitle from "../ElemTitle";

export const InvestorEdit = () => (
  <Edit
    title={<ElemTitle category="VC" />}
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
    <SimpleForm>
      <ReferenceInput label="VC Firm" source="vc_firm_id" reference="vc_firms">
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
        choices={investorFunctionChoices}
      />
      <DateInput
        className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="start_date"
      />
      <DateInput
        className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="end_date"
      />
      {/* <TextInput
        className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="founder"
      /> */}
      <SelectInput
        className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="seniority"
        choices={investorSeniorityChoices}
      />
      <TextInput
        className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="title"
      />
    </SimpleForm>
  </Edit>
);

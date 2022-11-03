import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  AutocompleteInput,
  NumberInput,
  required,
} from "react-admin";
import { status } from "@/utils/constants";
import ElemTitle from "../ElemTitle";

export const InvestmentEdit = () => (
  <Edit
    title={<ElemTitle category="Investment" />}
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
      <TextInput
        className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        disabled
        source="id"
      />
      <ReferenceInput
        label="Partner or Angel"
        source="person_id"
        reference="people"
        allowEmpty
      >
        <AutocompleteInput
          className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          style={{ padding: 0, border: "none" }}
          optionText="name"
          filterToQuery={(search) => ({ name: search })}
        />
      </ReferenceInput>
      <ReferenceInput
        label="Round"
        source="round_id"
        reference="investment_rounds"
        validate={required()}
      >
        <AutocompleteInput
          className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          style={{ padding: 0, border: "none" }}
          optionText="round"
          filterToQuery={(search) => ({ name: search })}
        />
      </ReferenceInput>
      <ReferenceInput
        label="VC Firm"
        source="vc_firm_id"
        reference="vc_firms"
        allowEmpty
      >
        <AutocompleteInput
          className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          style={{ padding: 0, border: "none" }}
          optionText="name"
          filterToQuery={(search) => ({ name: search })}
        />
      </ReferenceInput>
      <NumberInput
        className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="amount"
      />
      <SelectInput
        className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="status"
        choices={status}
      />
    </SimpleForm>
  </Edit>
);

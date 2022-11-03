import React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  DateInput,
  AutocompleteInput,
  useCreate,
  useRedirect,
} from "react-admin";
import {
  investorFunctionChoices,
  investorSeniorityChoices,
} from "@/utils/constants";
import ElemToolbar from "../ElemToolbar";

export const InvestorCreate = () => {
  const [create] = useCreate();
  const redirect = useRedirect();

  const handleSaveDraft = (data: any) => {
    data.status = "draft";
    create("investors", { data });
    redirect("/investors");
  };

  return (
    <Create
      title="Add an investor to a VC firm"
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
          label="VC Firm"
          source="vc_firm_id"
          reference="vc_firms"
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
    </Create>
  );
};

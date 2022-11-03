import React from "react";
import {
  Create,
  SimpleForm,
  ReferenceInput,
  SelectInput,
  DateInput,
  NumberInput,
  AutocompleteInput,
  useCreate,
  useRedirect,
} from "react-admin";
import { roundChoices, currencyChoices, status } from "@/utils/constants";
import ElemToolbar from "../ElemToolbar";

export const InvestmentRoundCreate = () => {
  const [create] = useCreate();
  const redirect = useRedirect();

  const handleSaveDraft = (data: any) => {
    data.status = "draft";
    create("investment_rounds", { data });
    redirect("/investment_rounds");
  };

  return (
    <Create
      title="Create a Investment Round"
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
        <DateInput
          className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="round_date"
        />
        <SelectInput
          className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="round"
          choices={roundChoices}
        />
        <NumberInput
          className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="amount"
        />
        <SelectInput
          className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="currency"
          choices={currencyChoices}
        />
        <NumberInput
          className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="valuation"
        />
        <SelectInput
          className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="status"
          choices={status}
        />
      </SimpleForm>
    </Create>
  );
};

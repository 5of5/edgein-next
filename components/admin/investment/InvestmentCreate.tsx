import React from "react";
import {
  Create,
  SimpleForm,
  ReferenceInput,
  SelectInput,
  AutocompleteInput,
  useCreate,
  useRedirect,
  NumberInput,
  required,
} from "react-admin";
import { status } from "@/utils/constants";
import ElemToolbar from "../ElemToolbar";

export const InvestmentCreate = () => {
  const [create] = useCreate();
  const redirect = useRedirect();

  const handleSaveDraft = (data: any) => {
    data.status = "draft";
    create("investments", { data });
    redirect("/investments");
  };

  return (
    <Create
      title="Add a vc or angel to an Investment Round"
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
          label="Partner or Angel"
          source="person_id"
          reference="people"
          resettable
          allowEmpty
          emptyValue={null}
        >
          <AutocompleteInput
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            style={{ padding: 0, border: "none" }}
            optionText="name"
            filterToQuery={(search) => ({ name: search })}
            emptyValue={null}
          />
        </ReferenceInput>
        <ReferenceInput
          label="Round"
          source="round_id"
          reference="investment_rounds"
          resettable
          validate={required()}
          emptyValue={null}
        >
          <AutocompleteInput
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            style={{ padding: 0, border: "none" }}
            optionText={(rec) => `${rec.company.name} ${rec.round}`}
            filterToQuery={(search) => ({ "company#name@_ilike": search })}
            emptyValue={null}
          />
        </ReferenceInput>

        <ReferenceInput
          label="VC Firm"
          source="vc_firm_id"
          reference="vc_firms"
          resettable
          allowEmpty
          emptyValue={null}
        >
          <AutocompleteInput
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            style={{ padding: 0, border: "none" }}
            optionText="name"
            filterToQuery={(search) => ({ name: search })}
            emptyValue={null}
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
    </Create>
  );
};

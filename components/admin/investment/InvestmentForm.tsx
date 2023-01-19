import React, { ReactElement } from "react";
import {
  SimpleForm,
  ReferenceInput,
  SelectInput,
  AutocompleteInput,
  NumberInput,
  required,
} from "react-admin";
import { status } from "@/utils/constants";

type InvestmentFormProps = {
  toolbar?: ReactElement | false;
};

const InvestmentForm = ({ toolbar }: InvestmentFormProps) => {
  const inputClassName =
    "w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none";

  return (
    <SimpleForm toolbar={toolbar}>
      <ReferenceInput
        label="Partner or Angel"
        source="person_id"
        reference="people"
        resettable
        allowEmpty
        emptyValue={null}
      >
        <AutocompleteInput
          className={inputClassName}
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
          className={inputClassName}
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
          className={inputClassName}
          style={{ padding: 0, border: "none" }}
          optionText="name"
          filterToQuery={(search) => ({ name: search })}
          emptyValue={null}
        />
      </ReferenceInput>
      <NumberInput className={inputClassName} source="amount" />
      <SelectInput
        className={inputClassName}
        source="status"
        choices={status}
      />
    </SimpleForm>
  );
};

export default InvestmentForm;

import React, { ReactElement } from "react";
import {
  SimpleForm,
  ReferenceInput,
  SelectInput,
  DateInput,
  NumberInput,
  AutocompleteInput,
} from "react-admin";
import { roundChoices, currencyChoices, status } from "@/utils/constants";

type InvestmentRoundFormProps = {
  toolbar?: ReactElement | false;
};

const InvestmentRoundForm = ({ toolbar }: InvestmentRoundFormProps) => {
  const inputClassName =
    "w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none";

  return (
    <SimpleForm toolbar={toolbar}>
      <ReferenceInput label="Company" source="company_id" reference="companies">
        <AutocompleteInput
          style={{ padding: 0, border: "none" }}
          className={inputClassName}
          optionText="name"
          filterToQuery={(search) => ({ name: search })}
        />
      </ReferenceInput>
      <DateInput className={inputClassName} source="round_date" />
      <SelectInput
        className={inputClassName}
        source="round"
        choices={roundChoices}
      />
      <NumberInput className={inputClassName} source="amount" />
      <SelectInput
        className={inputClassName}
        source="currency"
        choices={currencyChoices}
      />
      <NumberInput className={inputClassName} source="valuation" />
      <SelectInput
        className={inputClassName}
        source="status"
        choices={status}
      />
    </SimpleForm>
  );
};

export default InvestmentRoundForm;

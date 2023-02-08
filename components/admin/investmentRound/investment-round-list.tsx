import React from "react";
import {
  TextField,
  EditButton,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  SelectField,
  DateField,
  NumberField,
  AutocompleteInput,
  TextInput,
} from "react-admin";
import {
  roundChoices,
  currencyChoices,
  ADMIN_REFERENCE_INPUT_PER_PAGE,
} from "@/utils/constants";
import ElemList from "../elem-list";
import { useAuth } from "@/hooks/use-auth";

const filters = [
  <TextInput
    key="search"
    source="company#name@_ilike"
    label="Company"
    resettable
    alwaysOn
  />,
  <ReferenceInput
    key="searchCompany"
    source="company_id"
    reference="companies"
    perPage={ADMIN_REFERENCE_INPUT_PER_PAGE}
  >
    <AutocompleteInput
      style={{ padding: 0, border: "none" }}
      className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
      optionText="name"
      filterToQuery={(search) => ({ name: search })}
    />
  </ReferenceInput>,
  <SelectInput
    key="round"
    label="Round"
    source="round"
    choices={roundChoices}
  />,
  <SelectField
    key="currency"
    label="Cayer"
    source="currency"
    choices={currencyChoices}
  />,
];

export const InvestmentRoundList = () => {
  const { user } = useAuth();

  return (
    <ElemList filters={filters}>
      { user?.role !== "cms-readonly" && <EditButton /> }
      <TextField source="id" />
      <ReferenceField label="Company" source="company_id" reference="companies">
        <TextField source="name" />
      </ReferenceField>
      <DateField source="round_date" />
      <TextField source="round" />
      <NumberField source="amount" />
      <SelectField source="currency" choices={currencyChoices} />
      <NumberField source="valuation" />
      <TextField source="status" />
      {/* <TextField source="counter" /> */}
    </ElemList>
  );
};

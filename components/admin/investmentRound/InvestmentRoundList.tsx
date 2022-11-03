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
  useGetList,
} from "react-admin";
import { useFormContext } from "react-hook-form";
import { roundChoices, currencyChoices } from "@/utils/constants";
import ElemList from "../ElemList";
import { getAdminRenderData, sortWithData } from "@/utils";

const filters = [
  <ReferenceInput key="searchCompany" source="company_id" reference="companies">
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
  const [customSort, setCustomSort] = React.useState({
    field: "id",
    order: "ASC",
  });
  const headers: string[] = [
    "id",
    "company_id",
    "round_date",
    "round",
    "amount",
    "currency",
    "valuation",
    "status",
  ];
  const { data } = useGetList("investment_rounds", {
    pagination: { page: 1, perPage: 10 },
  });
  let renderData = getAdminRenderData(data, headers, "/8");

  renderData = renderData && sortWithData(renderData, customSort);

  return (
    <ElemList filters={filters}>
      <EditButton />
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

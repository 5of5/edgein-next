// in posts.js
import * as React from "react";
import {
  SearchInput,
  List,
  Datagrid,
  Edit,
  Create,
  SimpleForm,
  TextField,
  EditButton,
  TextInput,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  DateInput,
  SelectField,
  NumberInput,
  DateField,
  NumberField,
} from "react-admin";
import {roundChoices, currencyChoices} from "../../utils/constants"

const filters = [
	<SearchInput key="search" type="number"  source="amount,valuation" resettable alwaysOn />
];

export const InvestmentRoundsList = () => (
  <List filters={filters}>
    <Datagrid>
      <TextField source="id" />
      <ReferenceField label="Company" source="company_id" reference="companies">
        <TextField source="name" />
      </ReferenceField>
      <DateField source="round_date" />
      <SelectField
        source="round"
        choices={roundChoices}
      />
      <NumberField source="amount" />
      <SelectField
        source="currency"
        choices={currencyChoices}
      />
      <NumberField source="valuation" />
      <EditButton />
    </Datagrid>
  </List>
);

interface InvestmentRoundsTitleProps {
  record?: Record<string, string>;
}

const InvestmentRoundsTitle = ({ record }: InvestmentRoundsTitleProps) => {
  return <span>Round {record ? `"${record.name}"` : ""}</span>;
};

export const InvestmentRoundsEdit = () => (
  <Edit title={<InvestmentRoundsTitle />}>
    <SimpleForm>
      <TextInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        disabled
        source="id"
      />
      <ReferenceInput label="Company" source="company_id" reference="companies">
        <SelectInput
          className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          optionText="name"
        />
      </ReferenceInput>
      <DateInput className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none" source="round_date" />
      <SelectInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="round"
        choices={roundChoices}
      />
      <NumberInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="amount"
      />
      <SelectInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="currency"
        choices={currencyChoices}
      />
      <NumberInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="valuation"
      />
    </SimpleForm>
  </Edit>
);

export const InvestmentRoundsCreate = () => (
  <Create title="Create a Investment Round">
    <SimpleForm>
      <ReferenceInput label="Company" source="company_id" reference="companies">
        <SelectInput
          className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          optionText="name"
        />
      </ReferenceInput>
      <DateInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="round_date"
      />
      <SelectInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="round"
        choices={roundChoices}
      />
      <NumberInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="amount"
      />
      <SelectInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="currency"
        choices={currencyChoices}
      />
      <NumberInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="valuation"
      />
    </SimpleForm>
  </Create>
);

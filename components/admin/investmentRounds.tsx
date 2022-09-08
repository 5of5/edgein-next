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
  AutocompleteInput
} from "react-admin";
import { roundChoices, currencyChoices, status } from "../../utils/constants"

const filters = [
  <TextInput key="search" type="text" source="round" label="Search in Round" resettable alwaysOn />,
  <TextInput key="searchNumbers" type="number" source="valuation,amount" label="Valuation, Amount" resettable />,
  <ReferenceInput key="searchCompany" source="company_id" reference="companies">
    <AutocompleteInput
      optionText={choice =>
        `${choice.name}`
      }
    />
  </ReferenceInput>
];

export const InvestmentRoundsList = () => (
  <List filters={filters}
    sx={{
      '.css-1d00q76-MuiToolbar-root-RaListToolbar-root': {
        justifyContent: 'flex-start'
      }
    }}
  >
    <Datagrid>
      <EditButton />
      <TextField source="id" />
      <ReferenceField label="Company" source="company_id" reference="companies">
        <TextField source="name" />
      </ReferenceField>
      <DateField source="round_date" />
      <TextField source="round" />
      {/* <SelectField
        source="round"
        choices={roundChoices}
      /> */}
      <NumberField source="amount" />
      <SelectField
        source="currency"
        choices={currencyChoices}
      />
      <NumberField source="valuation" />
      <TextField source="status" />
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
  <Edit title={<InvestmentRoundsTitle />}
    sx={{
      '.MuiCardContent-root': {
        '& > div': {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          flexDirection: 'row !important',
        },
      },
      '.MuiFormHelperText-root': {
        display: 'none',
      }
    }}
  >
    <SimpleForm>
      <TextInput
        className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        disabled
        source="id"
      />
      <ReferenceInput label="Company" source="company_id" reference="companies">
        <SelectInput
          className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          optionText="name"
        />
      </ReferenceInput>
      <DateInput className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none" source="round_date" />
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
  </Edit>
);

export const InvestmentRoundsCreate = () => (
  <Create title="Create a Investment Round"
    sx={{
      '.MuiCardContent-root': {
        '& > div': {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          flexDirection: 'row !important',
        },
      },
      '.MuiFormHelperText-root': {
        display: 'none',
      }
    }}
  >
    <SimpleForm>
      <ReferenceInput label="Company" source="company_id" reference="companies">
        <SelectInput
          className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          optionText="name"
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

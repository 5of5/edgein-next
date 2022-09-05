// in posts.js
import * as React from "react";
import {
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
  AutocompleteInput
} from "react-admin";
import { status } from "../../utils/constants"

const filters = [
  //<TextInput key="search" source="status" label="Search in status" resettable alwaysOn />,
  <ReferenceInput key="searchPeople" source="person_id" reference="people">
    <AutocompleteInput
      optionText={choice =>
        `${choice.name}`
      }
    />
  </ReferenceInput>,
  <ReferenceInput key="searchRounds" source="round_id" reference="investment_rounds">
    <AutocompleteInput
      optionText={choice =>
        `${choice.round}`
      }
    />
  </ReferenceInput>,
  <ReferenceInput key="searchVCFirm" source="vc_firm_id" reference="vc_firms">
    <AutocompleteInput
      optionText={choice =>
        `${choice.name}`
      }
    />
  </ReferenceInput>
];

export const InvestmentsList = () => (
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
      <ReferenceField label="Partner" source="person_id" reference="people">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField
        label="Round"
        source="round_id"
        reference="investment_rounds"
      >
        <TextField source="round" />
      </ReferenceField>
      <ReferenceField label="VC Firm" source="vc_firm_id" reference="vc_firms">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="status" />
    </Datagrid>
  </List>
);

interface TitleProps {
  record?: Record<string, string>;
}

const InvestmentsTitle = ({ record }: TitleProps) => {
  return <span>Investment {record ? `"${record.name}"` : ""}</span>;
};

export const InvestmentsEdit = () => (
  <Edit title={<InvestmentsTitle />}>
    <SimpleForm>
      <TextInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        disabled
        source="id"
      />
      <ReferenceInput
        label="Partner or Angel"
        source="person_id"
        reference="people"
      >
        <SelectInput
          className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          optionText="name"
        />
      </ReferenceInput>
      <ReferenceInput
        label="Round"
        source="round_id"
        reference="investment_rounds"
      >
        <SelectInput
          className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          optionText="round"
        />
      </ReferenceInput>
      <ReferenceInput label="VC Firm" source="vc_firm_id" reference="vc_firms">
        <SelectInput
          className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          optionText="name"
        />
      </ReferenceInput>
      <SelectInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="status"
        choices={status}
      />
    </SimpleForm>
  </Edit>
);

export const InvestmentsCreate = () => (
  <Create title="Add a vc or angel to an Investment Round">
    <SimpleForm>
      <ReferenceInput
        label="Partner or Angel"
        source="person_id"
        reference="people"
      >
        <SelectInput
          className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          optionText="name"
        />
      </ReferenceInput>
      <ReferenceInput
        label="Round"
        source="round_id"
        reference="investment_rounds"
      >
        <SelectInput
          className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          optionText="round"
        />
      </ReferenceInput>

      <ReferenceInput label="VC Firm" source="vc_firm_id" reference="vc_firms">
        <SelectInput
          className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          optionText="name"
        />
      </ReferenceInput>
      <SelectInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="status"
        choices={status}
      />
    </SimpleForm>
  </Create>
);

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
  DateField,
  SelectField,
  DateInput,
  AutocompleteInput
} from "react-admin";
import { investorFunctionChoices, investorSeniorityChoices } from "../../utils/constants"

const filters = [
  <TextInput key="search" source="function,seniority,title" label="Search in Function,Seniority,Title" resettable alwaysOn />,
  <ReferenceInput key="searchVCFirm" source="vc_firm_id" reference="vc_firms">
    <AutocompleteInput
      optionText={choice =>
        `${choice.name}`
      }
    />
  </ReferenceInput>,
  <ReferenceInput key="searchPerson" source="person_id" reference="people">
  <AutocompleteInput
    optionText={choice =>
      `${choice.name}`
    }
  />
</ReferenceInput>
];

export const InvestorsList = () => (
  <List filters={filters}
  sx={{
		'.css-1d00q76-MuiToolbar-root-RaListToolbar-root' : {
      justifyContent: 'flex-start'
		}
	   }}
  >
    <Datagrid>
      <EditButton />
      <ReferenceField label="VC Firm" source="vc_firm_id" reference="vc_firms">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField label="Perons" source="person_id" reference="people">
        <TextField source="name" />
      </ReferenceField>
      <SelectField
        source="function"
        choices={investorFunctionChoices}
      />
      <DateField source="start_date" />
      <DateField source="end_date" />
      {/* <TextField source="founder" /> */}
      <SelectField
        source="seniority"
        choices={investorSeniorityChoices}
      />
      <TextField source="title" />
    </Datagrid>
  </List>
);

interface TitleProps {
  record?: Record<string, string>;
}

const InvestorsTitle = ({ record }: TitleProps) => {
  return <span>VC {record ? `"${record.name}"` : ""}</span>;
};

export const InvestorsEdit = () => (
  <Edit title={<InvestorsTitle />}>
    <SimpleForm>
      <ReferenceInput label="VC Firm" source="vc_firm_id" reference="vc_firms">
        <SelectInput
          className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          optionText="name"
        />
      </ReferenceInput>
      <ReferenceInput label="Person" source="person_id" reference="people">
        <SelectInput
          className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          optionText="name"
        />
      </ReferenceInput>
      <SelectInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="function"
        choices={investorFunctionChoices}
      />
      <DateInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="start_date"
      />
      <DateInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="end_date"
      />
     {/* <TextInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="founder"
      /> */}
      <SelectInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="seniority"
        choices={investorSeniorityChoices}
      />
      <TextInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="title"
      />
    </SimpleForm>
  </Edit>
);

export const InvestorCreate = () => (
  <Create title="Add an investor to a VC firm">
    <SimpleForm>
      <ReferenceInput label="VC Firm" source="vc_firm_id" reference="vc_firms">
        <SelectInput
          className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          optionText="name"
        />
      </ReferenceInput>
      <ReferenceInput label="Person" source="person_id" reference="people">
        <SelectInput
          className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          optionText="name"
        />
      </ReferenceInput>
      <SelectInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="function"
        choices={investorFunctionChoices}
      />
      <DateInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="start_date"
      />
      <DateInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="end_date"
      />
      {/* <TextInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="founder"
      /> */}
      <SelectInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="seniority"
        choices={investorSeniorityChoices}
      />
      <TextInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"

        source="title"
      />
    </SimpleForm>
  </Create>
);

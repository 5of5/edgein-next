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
} from "react-admin";

export const InvestorsList = () => (
	<List>
		<Datagrid>
			<ReferenceField label="Company" source="company_id" reference="companies">
				<TextField source="name" />
			</ReferenceField>
			<ReferenceField label="Perons" source="person_id" reference="people">
				<TextField source="name" />
			</ReferenceField>
      <SelectField source="function" choices={[
					{
						id:"Seed",
						name: "Seed"
					},
					{
						id:"Series A",
						name: "Series A"
					},
			]} />
			<DateField source="start_date" />
			<DateField source="end_date" />
      <TextField source="founder" />
			<SelectField source="seniority" choices={[
					{
						id:"Seed",
						name: "Seed"
					},
					{
						id:"Series A",
						name: "Series A"
					},
			]} />
			<TextField source="title" />
			<EditButton />
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
      <ReferenceInput label="Company" source="company_id" reference="companies">
        <SelectInput optionText="name" />
			</ReferenceInput>
			<ReferenceInput label="Person" source="person_id" reference="people">
        <SelectInput optionText="name" />
			</ReferenceInput>
      <SelectInput source="function" choices={[
					{
						id:"Seed",
						name: "Seed"
					},
					{
						id:"Series A",
						name: "Series A"
					},
			]} />
			<DateInput source="start_date" />
			<DateInput source="end_date" />
      <TextInput source="founder" />
			<SelectInput source="seniority" choices={[
					{
						id:"Seed",
						name: "Seed"
					},
					{
						id:"Series A",
						name: "Series A"
					},
			]} />
			<TextInput source="title" />
		</SimpleForm>
	</Edit>
);

export const InvestorCreate = () => (
	<Create title="Add an investor to a VC firm">
		<SimpleForm>
    <ReferenceInput label="VC Firm" source="vc_firm_id" reference="vc_firms">
        <SelectInput optionText="name" />
			</ReferenceInput>
			<ReferenceInput label="Person" source="person_id" reference="people">
        <SelectInput optionText="name" />
			</ReferenceInput>
      <SelectInput source="function" choices={[
					{
						id:"Seed",
						name: "Seed"
					},
					{
						id:"Series A",
						name: "Series A"
					},
			]} />
			<DateInput source="start_date" />
			<DateInput source="end_date" />
      <TextInput source="founder" />
			<SelectInput source="seniority" choices={[
					{
						id:"Seed",
						name: "Seed"
					},
					{
						id:"Series A",
						name: "Series A"
					},
			]} />
			<TextInput source="title" />
		</SimpleForm>
	</Create>
);

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
	DateInput,
	SelectField,
	NumberInput,
	DateField,
	NumberField,
} from "react-admin";
import uniqid from 'uniqid';

export const InvestmentRoundsList = () => (
	<List>
		<Datagrid>
			<TextField source="id" />
			<ReferenceField label="Company" source="company_id" reference="companies">
				<TextField source="name" />
			</ReferenceField>
			<DateField source="round_date" />
			<SelectField source="round" choices={[
					{
						id:"Seed",
						name: "Seed"
					},
					{
						id:"Series A",
						name: "Series A"
					},
			]} />
			<NumberField source="amount" />
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
			<TextInput disabled source="id" />
			<ReferenceInput label="Company" source="company_id" reference="companies">
        <SelectInput optionText="name" />
			</ReferenceInput>
			<DateInput source="round_date" />
			<SelectInput source="round" choices={[
					{
						id:"Seed",
						name: "Seed"
					},
					{
						id:"Series A",
						name: "Series A"
					},
			]} />
			<NumberInput source="amount" />
			<NumberInput source="valuation" />
		</SimpleForm>
	</Edit>
);

export const InvestmentRoundsCreate = () => (
	<Create title="Create a Investment Round">
		<SimpleForm defaultValues={{ external_id: uniqid() }}>
			<ReferenceInput label="Company" source="company_id" reference="companies">
        <SelectInput optionText="name" />
			</ReferenceInput>
			<DateInput source="round_date" />
			<SelectField source="round" choices={[
					{
						id:"Seed",
						name: "Seed"
					},
					{
						id:"Series A",
						name: "Series A"
					},
			]} />
			<NumberInput source="amount" />
			<NumberInput source="valuation" />
		</SimpleForm>
	</Create>
);

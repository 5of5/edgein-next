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
} from "react-admin";

export const InvestmentsList = () => (
	<List>
		<Datagrid>
			<TextField source="id" />
			<ReferenceField label="Partner" source="person_id" reference="people">
				<TextField source="name" />
			</ReferenceField>
			<ReferenceField label="Round" source="round_id" reference="investment_rounds">
				<TextField source="name" />
			</ReferenceField>
			<ReferenceField label="VC Firm" source="vc_firm_id" reference="vc_firms">
				<TextField source="name" />
			</ReferenceField>
			<EditButton />
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
			<TextInput disabled source="id" />
			<ReferenceInput label="Partner or Angel" source="person_id" reference="people">
        <SelectInput optionText="name" />
			</ReferenceInput>
			<ReferenceInput label="Round" source="round_id" reference="investment_rounds">
        <SelectInput optionText="name" />
			</ReferenceInput>
			<ReferenceInput label="VC Firm" source="vc_firm_id" reference="vc_firms">
        <SelectInput optionText="name" />
			</ReferenceInput>
		</SimpleForm>
	</Edit>
);

export const InvestmentsCreate = () => (
	<Create title="Add a vc or angel to an Investment Round">
		<SimpleForm>
      <ReferenceInput label="Partner or Angel" source="person_id" reference="people">
        <SelectInput optionText="name" />
			</ReferenceInput>
			<ReferenceInput label="Round" source="round_id" reference="investment_rounds">
        <SelectInput optionText="name" />
			</ReferenceInput>
			<ReferenceInput label="VC Firm" source="vc_firm_id" reference="vc_firms">
        <SelectInput optionText="name" />
			</ReferenceInput>
		</SimpleForm>
	</Create>
);

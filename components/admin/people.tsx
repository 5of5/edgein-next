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
} from "react-admin";

export const PeopleList = () => (
	<List>
		<Datagrid>
			<TextField source="id" />
			<TextField source="name" />
			<TextField source="slug" />
			<TextField source="github" />
			<TextField source="type" />
			<TextField source="personal_email" />
			<TextField source="work_email" />
			<TextField source="linkedin" />
			<EditButton />
		</Datagrid>
	</List>
);

interface TitleProps {
	record?: Record<string, string>;
}

const PeopleTitle = ({ record }: TitleProps) => {
	return <span>Person {record ? `"${record.name}"` : ""}</span>;
};

export const PeopleEdit = () => (
	<Edit title={<PeopleTitle />}>
		<SimpleForm>
      <TextInput disabled source="id" />
			<TextInput source="name" />
			<TextInput source="slug" />
			<TextInput source="github" />
			<TextInput source="type" />
			<TextInput source="personal_email" />
			<TextInput source="work_email" />
			<TextInput source="linkedin" />
		</SimpleForm>
	</Edit>
);

export const PeopleCreate = () => (
	<Create title="Create a Person">
		<SimpleForm>
			<TextInput source="name" />
			<TextInput source="slug" />
			<TextInput source="github" />
			<TextInput source="type" />
			<TextInput source="personal_email" />
			<TextInput source="work_email" />
			<TextInput source="linkedin" />
		</SimpleForm>
	</Create>
);

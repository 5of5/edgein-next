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
	required,
	minLength,
	email,
} from "react-admin";
import uniqid from 'uniqid';

export const PeopleList = () => (
	<List>
		<Datagrid>
			<TextField source="id" />
			<TextField source="name" />
			<TextField source="slug" />
			<TextField source="github" />
			{/* <TextInput source="title" /> */}
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

const validateName = [required(), minLength(3)];
const validateSlug = [required(), minLength(3)];
const validateEmail = email()

const PeopleTitle = ({ record }: TitleProps) => {
	return <span>Person {record ? `"${record.name}"` : ""}</span>;
};

export const PeopleEdit = () => (
	<Edit title={<PeopleTitle />}>
		<SimpleForm>
			<TextInput disabled source="id" />
			<TextInput source="name" validate={validateName} />
			<TextInput source="slug" validate={validateSlug} />
			<TextInput source="github" />
			{/* <TextInput source="title" /> */}
			<TextInput source="type" />
			<TextInput source="personal_email" validate={validateEmail} />
			<TextInput source="work_email" validate={validateEmail} />
			<TextInput source="linkedin" />
		</SimpleForm>
	</Edit>
);

export const PeopleCreate = () => (
	<Create title="Create a Person">
		<SimpleForm defaultValues={{ external_id: uniqid() }}>
			<TextInput source="name" validate={validateName} />
			<TextInput source="slug" validate={validateSlug} />
			<TextInput source="github" />
			{/* <TextInput source="title" /> */}
			<TextInput source="type" />
			<TextInput source="personal_email" validate={validateEmail} />
			<TextInput source="work_email" validate={validateEmail} />
			<TextInput source="linkedin" />
		</SimpleForm>
	</Create>
);

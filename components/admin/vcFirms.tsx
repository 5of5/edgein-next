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
	minLength
} from "react-admin";
import uniqid from 'uniqid';

export const VcFirmList = () => (
	<List>
		<Datagrid>
			<TextField source="id" />
			<TextField source="name" />
			<TextField source="slug" />
			<TextField source="website" />
			<TextField source="linkedin" />
			<EditButton />
		</Datagrid>
	</List>
);

interface TitleProps {
	record?: Record<string, string>;
}

const VcFirmTitle = ({ record }: TitleProps) => {
	return <span>Vc Firm {record ? `"${record.name}"` : ""}</span>;
};

const validateName = [required(), minLength(3)];
const validateSlug = [required(), minLength(3)];

export const VcFirmEdit = () => (
	<Edit title={<VcFirmTitle />}>
		<SimpleForm>
      <TextInput disabled source="id" />
			<TextInput source="name" validate={validateName} />
			<TextInput source="slug" validate={validateSlug} />
			<TextInput source="website" />
			<TextInput source="linkedin" />
		</SimpleForm>
	</Edit>
);

export const VcFirmCreate = () => (
	<Create title="Create a VC Firm">
		<SimpleForm defaultValues={{ external_id: uniqid() }}>
			<TextInput source="name" validate={validateName} />
			<TextInput source="slug" validate={validateSlug} />
			<TextInput source="website" />
			<TextInput source="linkedin" />
		</SimpleForm>
	</Create>
);

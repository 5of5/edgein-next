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

export const VcFirmEdit = () => (
	<Edit title={<VcFirmTitle />}>
		<SimpleForm>
      <TextInput disabled source="id" />
			<TextInput source="name" />
			<TextInput source="slug" />
			<TextInput source="website" />
			<TextInput source="linkedin" />
		</SimpleForm>
	</Edit>
);

export const VcFirmCreate = () => (
	<Create title="Create a VC Firm">
		<SimpleForm>
			<TextInput source="name" />
			<TextInput source="slug" />
			<TextInput source="website" />
			<TextInput source="linkedin" />
		</SimpleForm>
	</Create>
);

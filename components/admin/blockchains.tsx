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

export const BlockchainsList = () => (
	<List>
		<Datagrid>
			<TextField source="id" />
			<TextField source="name" />
			<EditButton />
		</Datagrid>
	</List>
);

interface TitleProps {
	record?: Record<string, string>;
}

const BlockchainsTitle = ({ record }: TitleProps) => {
	return <span>Blockchain {record ? `"${record.name}"` : ""}</span>;
};

export const BlockchainsEdit = () => (
	<Edit title={<BlockchainsTitle />}>
		<SimpleForm>
			<TextInput disabled source="id" />
			<TextInput source="name" />
		</SimpleForm>
	</Edit>
);

export const BlockchainsCreate = () => (
	<Create title="Create a Blockchain">
		<SimpleForm>
			<TextInput source="name" />
		</SimpleForm>
	</Create>
);

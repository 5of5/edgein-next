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

export const CoinsList = () => (
	<List>
		<Datagrid>
			<TextField source="id" />
			<TextField source="name" />
			<TextField source="ticker" />
      <ReferenceField label="Blockchain" source="blockchain_id" reference="blockchains">
				<TextField source="name" />
			</ReferenceField>
			<EditButton />
		</Datagrid>
	</List>
);

interface TitleProps {
	record?: Record<string, string>;
}

const CoinsTitle = ({ record }: TitleProps) => {
	return <span>Coin {record ? `"${record.name}"` : ""}</span>;
};

export const CoinsEdit = () => (
	<Edit title={<CoinsTitle />}>
		<SimpleForm>
			<TextInput disabled source="id" />
			<TextInput source="name" />
			<TextInput source="ticker" />
      <ReferenceInput label="Blockchain" source="blockchain_id" reference="blockchains">
        <SelectInput optionText="name" />
			</ReferenceInput>
		</SimpleForm>
	</Edit>
);

export const CoinsCreate = () => (
	<Create title="Create a Coin">
		<SimpleForm>
			<TextInput source="name" />
			<TextInput source="ticker" />
      <ReferenceInput label="Blockchain" source="blockchain_id" reference="blockchains">
        <SelectInput optionText="name" />
			</ReferenceInput>
		</SimpleForm>
	</Create>
);

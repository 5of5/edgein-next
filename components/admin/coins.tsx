// in posts.js
import * as React from "react";
import {
	SearchInput,
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

const postFilters = [
	<SearchInput source="name" resettable alwaysOn />
  ];

export const CoinsList = () => (
	<List filters={postFilters}>
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
			<TextInput className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none" disabled source="id" />
			<TextInput className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none" source="name" />
			<TextInput className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none" source="ticker" />
      <ReferenceInput label="Blockchain" source="blockchain_id" reference="blockchains">
        <SelectInput className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none" optionText="name" />
			</ReferenceInput>
		</SimpleForm>
	</Edit>
);

export const CoinsCreate = () => (
	<Create title="Create a Coin">
		<SimpleForm>
			<TextInput className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none" source="name" />
			<TextInput className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none" source="ticker" />
      <ReferenceInput  label="Blockchain" source="blockchain_id" reference="blockchains">
        <SelectInput className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none" optionText="name" />
			</ReferenceInput>
		</SimpleForm>
	</Create>
);

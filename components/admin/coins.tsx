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
	AutocompleteInput
} from "react-admin";

const filters = [
	<TextInput key="search" source="name,ticker" label="Search Name, Ticker" resettable alwaysOn />,
	<ReferenceInput key="searchBlockchain" source="blockchain_id" reference="blockchains">
		<AutocompleteInput
			optionText={choice =>
				`${choice.name}`
			}
		/>
	</ReferenceInput>
];

export const CoinsList = () => (
	<List filters={filters}
		sx={{
			'.css-1d00q76-MuiToolbar-root-RaListToolbar-root': {
				justifyContent: 'flex-start'
			}
		}}
	>
		<Datagrid>
			<EditButton />
			<TextField source="id" />
			<TextField source="name" />
			<TextField source="ticker" />
			<ReferenceField label="Blockchain" source="blockchain_id" reference="blockchains">
				<TextField source="name" />
			</ReferenceField>
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
			<ReferenceInput label="Blockchain" source="blockchain_id" reference="blockchains">
				<SelectInput className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none" optionText="name" />
			</ReferenceInput>
		</SimpleForm>
	</Create>
);

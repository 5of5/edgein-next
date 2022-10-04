// in posts.js
import React from "react";
import {
	List,
	Datagrid,
	Edit,
	Create,
	SimpleForm,
	TextField,
	EditButton,
	TextInput,
	SelectInput,
	Pagination,
	SelectField,
} from "react-admin";

export const typeChoices = [
	{
		id: "EMAIL",
		name: "email",
	},
	{
		id: "DOMAIN",
		name: "domain",
	},
];
const PostPagination = () => (
	<Pagination rowsPerPageOptions={[5, 10, 25, 50, 100, 250]} />
);

export const AllowedEmailsList = () => {
	return (
		<List
			pagination={<PostPagination />}
			sx={{
				".MuiToolbar-root": {
					justifyContent: "start !important",
					paddingTop: 0,
					marginBottom: "4px",
				},
				".RaBulkActionsToolbar-toolbar": {
					justifyContent: "start !important",
				},
				".MuiToolbar-root .MuiButtonBase-root": {
					paddingTop: 0,
					paddingBottom: 0,
					margin: "4px",
				},
				".RaBulkActionsToolbar-topToolbar": {
					paddingTop: 0,
					paddingBottom: 0,
					marginBottom: 0,
				},
				".MuiToolbar-root form": {
					flex: "0 1 auto",
				},
				".MuiToolbar-root form .MuiFormControl-root": {
					margin: 0,
				},
			}}
		>
			<Datagrid
			// data={renderData}
			// sort={customSort}
			// setSort={(value) => setCustomSort(value)}
			>
				<EditButton />
				<TextField source="id" />
				<TextField source="email" />
				<SelectField source="type" choices={typeChoices} />
			</Datagrid>
		</List>
	);
};

interface TitleProps {
	record?: Record<string, string>;
}

const AllowedEmailsTitle = ({ record }: TitleProps) => {
	return <span>Allow List {record ? `"${record.name}"` : ""}</span>;
};

export const AllowedEmailsEdit = () => {
	return (
		<Edit
			title={<AllowedEmailsTitle />}
			sx={{
				".MuiFormHelperText-root": {
					display: "none",
				},
				".MuiPaper-root": {
					position: "relative",
				},
			}}
		>
			<SimpleForm>
				<TextInput
					className="w-full px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
					disabled
					source="id"
				/>
				<TextInput
					className="w-full px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
					source="email"
				/>
				<SelectInput
					className="w-full px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
					source="type"
					key="type"
					label="Type"
					choices={typeChoices}
				/>
			</SimpleForm>
		</Edit>
	);
};

export const AllowedEmailsCreate = () => {
	return (
		<Create
			title="Create a entry in allow list"
			sx={{
				".MuiFormHelperText-root": {
					display: "none",
				},
				".MuiPaper-root": {
					position: "relative",
				},
			}}
		>
			<SimpleForm>
				<TextInput
					className="w-full px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
					source="email"
				/>
				<SelectInput
					className="w-full mt-5 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
					source="type"
					key="type"
					label="Type"
					choices={typeChoices}
				/>
			</SimpleForm>
		</Create>
	);
};

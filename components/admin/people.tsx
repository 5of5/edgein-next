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
	required,
	minLength,
	email,
	regex
} from "react-admin";
import uniqid from "uniqid";

const postFilters = [
	<SearchInput source="name,slug,type" resettable alwaysOn />
];
export const PeopleList = () => (
	<List filters={postFilters}>
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
const validateEmail = email();
const validateUrl = regex(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi, 'Must be a valid Url')

const PeopleTitle = ({ record }: TitleProps) => {
	return <span>Person {record ? `"${record.name}"` : ""}</span>;
};

export const PeopleEdit = () => (
	<Edit title={<PeopleTitle />}>
		<SimpleForm>
			<TextInput
				className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
				disabled
				source="id"
			/>
			<TextInput
				className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
				source="name"
				validate={validateName}
			/>
			<TextInput
				className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
				source="slug"
				validate={validateSlug}
			/>
			<TextInput
				className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
				source="github"
				validate={validateUrl}
			/>
			{/* <TextInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="title"
      /> */}
			<TextInput
				className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
				source="type"
			/>
			<TextInput
				className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
				source="personal_email"
				validate={validateEmail}
			/>
			<TextInput
				className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
				source="work_email"
				validate={validateEmail}
			/>
			<TextInput
				className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
				source="linkedin"
				validate={validateUrl}
			/>
		</SimpleForm>
	</Edit>
);

export const PeopleCreate = () => (
	<Create title="Create a Person">
		<SimpleForm defaultValues={{ external_id: uniqid() }}>
			<TextInput
				className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
				source="name"
				validate={validateName}
			/>
			<TextInput
				className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
				source="slug"
				validate={validateSlug}
			/>
			<TextInput
				className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
				source="github"
				validate={validateUrl}
			/>
			{/* <TextInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="title"
      /> */}
			<TextInput
				className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
				source="type"
			/>
			<TextInput
				className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
				source="personal_email"
				validate={validateEmail}
			/>
			<TextInput
				className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
				source="work_email"
				validate={validateEmail}
			/>
			<TextInput
				className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
				source="linkedin"
				validate={validateUrl}
			/>
		</SimpleForm>
	</Create>
);

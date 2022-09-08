// in posts.js
import * as React from "react";
import {
	SearchInput,
	FileInput, ImageField,
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
	regex,
	SelectInput
} from "react-admin";
import { uploadFile, deleteFile } from "../../utils/fileFunctions";
import { validateName, validateSlug, validateUrl, validateEmail, status } from "../../utils/constants"
const filters = [
	<TextInput key="search" source="name,type" label="Search in name,type" resettable alwaysOn />
];
export const PeopleList = () => (
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
			<TextField source="slug" />
			<ImageField source="picture.url" label="Picture" />
			<TextField source="github" />
			{/* <TextInput source="title" /> */}
			<TextField source="type" />
			<TextField source="personal_email" />
			<TextField source="work_email" />
			<TextField source="linkedin" />
			<TextField source="status" />
		</Datagrid>
	</List>
);

interface TitleProps {
	record?: Record<string, string>;
}

const PeopleTitle = ({ record }: TitleProps) => {
	return <span>Person {record ? `"${record.name}"` : ""}</span>;
};

export const PeopleEdit = () => {

	const [logo, setLogo] = React.useState(null)
	const [oldLogo, setOldLogo] = React.useState(null)
	const [isImageUpdated, setIsImageUpdated] = React.useState(false)

	const transform = async (data: any) => {
		var formdata = { ...data };
		if (oldLogo) {
			//delete old file from s3
			deleteFile(oldLogo)
		}
		if (logo) {
			const res = await uploadFile(logo);
			formdata = {
				...data,
				picture: res.file
			}
			return formdata
		} else {
			formdata = {
				...data
			}
			return formdata
		}
	};

	const onSelect = (files: any) => {
		if (files && files.length > 0) {
			setLogo(files[0])
		} else {
			setLogo(null)
		}
	}

	const onDropRejected = (files: any) => {
		if (files.id) {
			setOldLogo(files)
		}
		setIsImageUpdated(true)
		setLogo(null)
	}

	return (
		<Edit title={<PeopleTitle />} transform={transform}
			sx={{
				'.MuiCardContent-root': {
					'& > div': {
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						flexWrap: 'wrap',
						flexDirection: 'row !important',
					},
				},
				'.MuiFormHelperText-root': {
					display: 'none',
				}
			}}
		>
			<SimpleForm>
				<TextInput
					className="w-full px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
					disabled
					source="id"
				/>
				<TextInput
					className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
					source="name"
					validate={validateName}
					sx={{
						'.MuiFormHelperText-root': {
							display: 'block !important',
						}
					}}
				/>
				<TextInput
					className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
					source="slug"
					validate={validateSlug}
					sx={{
						'.MuiFormHelperText-root': {
							display: 'block !important',
						}
					}}
				/>
				<FileInput className="w-full" onRemove={onDropRejected} options={{ onDrop: onSelect }} source="picture" label="picture" accept="image/*" placeholder={<p>Drop your file here</p>}>
					<ImageField source="src" title="title" />
				</FileInput>
				{
					(!logo && !isImageUpdated) &&
					<ImageField className="w-full" source="picture.url" title="Logo" />
				}
				<TextInput
					className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
					source="type"
				/>
				<SelectInput
					className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
					source="status"
					choices={status}
				/>
				<TextInput
					className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
					source="github"
					validate={validateUrl}
					sx={{
						'.MuiFormHelperText-root': {
							display: 'block !important',
						}
					}}
				/>

				<TextInput
					className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
					source="personal_email"
					validate={validateEmail}
					sx={{
						'.MuiFormHelperText-root': {
							display: 'block !important',
						}
					}}
				/>
				<TextInput
					className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
					source="work_email"
					validate={validateEmail}
					sx={{
						'.MuiFormHelperText-root': {
							display: 'block !important',
						}
					}}
				/>
				<TextInput
					className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
					source="linkedin"
					validate={validateUrl}
					sx={{
						'.MuiFormHelperText-root': {
							display: 'block !important',
						}
					}}
				/>

			</SimpleForm>
		</Edit>
	)
}

export const PeopleCreate = () => {
	const [logo, setLogo] = React.useState(null)

	const transform = async (data: any) => {
		var formdata = { ...data };
		if (logo) {
			const res = await uploadFile(logo);
			formdata = {
				...data,
				picture: res.file
			}
			return formdata
		} else {
			formdata = {
				...data
			}
			return formdata
		}
	};

	const onSelect = (files: any) => {
		if (files && files.length > 0) {
			setLogo(files[0])
		} else {
			setLogo(null)
		}
	}

	const onDropRejected = (files: any) => {
		setLogo(null)
	}
	return (
		<Create title="Create a Person" transform={transform}
			sx={{
				'.MuiCardContent-root': {
					'& > div': {
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						flexWrap: 'wrap',
						flexDirection: 'row !important',
					},
				},
				'.MuiFormHelperText-root': {
					display: 'none',
				}
			}}
		>
			<SimpleForm>
				<TextInput
					className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
					source="name"
					validate={validateName}
					sx={{
						'.MuiFormHelperText-root': {
							display: 'block !important',
						}
					}}
				/>
				<TextInput
					className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
					source="slug"
					validate={validateSlug}
					sx={{
						'.MuiFormHelperText-root': {
							display: 'block !important',
						}
					}}
				/>
				<FileInput className="w-full" onRemove={onDropRejected} options={{ onDrop: onSelect }} source="picture" label="picture" accept="image/*" placeholder={<p>Drop your file here</p>}>
					<ImageField source="src" title="title" />
				</FileInput>
				<TextInput
					className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
					source="type"
				/>
				<SelectInput
					className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
					source="status"
					choices={status}
				/>
				<TextInput
					className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
					source="github"
					validate={validateUrl}
					sx={{
						'.MuiFormHelperText-root': {
							display: 'block !important',
						}
					}}
				/>

				<TextInput
					className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
					source="personal_email"
					validate={validateEmail}
					sx={{
						'.MuiFormHelperText-root': {
							display: 'block !important',
						}
					}}
				/>
				<TextInput
					className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
					source="work_email"
					validate={validateEmail}
					sx={{
						'.MuiFormHelperText-root': {
							display: 'block !important',
						}
					}}
				/>
				<TextInput
					className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
					source="linkedin"
					validate={validateUrl}
					sx={{
						'.MuiFormHelperText-root': {
							display: 'block !important',
						}
					}}
				/>

			</SimpleForm>
		</Create>
	)
}

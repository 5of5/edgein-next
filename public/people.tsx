// in posts.js
import * as React from "react";
import {
	FileInput, ImageField,
	List,
	Datagrid,
	Edit,
	Create,
	SimpleForm,
	TextField,
	EditButton,
	TextInput,
	FormDataConsumer,
	SelectInput,
	useGetList
} from "react-admin";
import { useFormContext } from "react-hook-form";
import { random } from "lodash";
import { uploadFile, deleteFile } from "../../utils/fileFunctions";
import { validateNameAndSlugAndEmailAndDomain, status } from "../../utils/constants"
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
	const { data: people } = useGetList('people', {});
	const [slug, setSlug] = React.useState('')

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

	const handleNameBlur = (value: string, formData: any) => {
		let filterSlug: any[] | undefined
		filterSlug = people?.filter(f => f.slug === value)

		if (formData.slug === '') {
			if (filterSlug && filterSlug?.length > 0) {
				handleNameBlur(filterSlug[0].slug + '-' + random(10), formData)
			}
			if (filterSlug?.length === 0) {
				setSlug(value)
			}
		}
	}

	const SlugInput = ({ slug }: any) => {
		const { setValue } = useFormContext();

		React.useEffect(() => {
			if (slug !== '')
				setValue('slug', slug)
		}, [slug])

		return (
			<TextInput
				className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
				source="slug"
			/>
		);
	};

	return (
		<Edit title={<PeopleTitle />} transform={transform}>
			<SimpleForm validate={(value) => validateNameAndSlugAndEmailAndDomain(true, value, people)}>
				<TextInput
					className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
					disabled
					source="id"
				/>
				<FormDataConsumer>
					{({ formData, ...rest }) => (
						<TextInput
							className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
							source="name"
							onBlur={e => handleNameBlur(e.target.value, formData)}
							{...rest}
						/>
					)}
				</FormDataConsumer>
				<SlugInput slug={slug} />
				<FileInput onRemove={onDropRejected} options={{ onDrop: onSelect }} source="picture" label="picture" accept="image/*" placeholder={<p>Drop your file here</p>}>
					<ImageField source="src" title="title" />
				</FileInput>
				{
					(!logo && !isImageUpdated) &&
					<ImageField source="picture.url" title="Logo" />
				}
				<TextInput
					className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
					source="github"

				/>
				<TextInput
					className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
					source="type"
				/>
				<TextInput
					className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
					source="personal_email"
				/>
				<TextInput
					className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
					source="work_email"
				/>
				<TextInput
					className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
					source="linkedin"

				/>
				<SelectInput
					className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
					source="status"
					choices={status}
				/>
			</SimpleForm>
		</Edit>
	)
}

export const PeopleCreate = () => {
	const [logo, setLogo] = React.useState(null)
	const { data: people } = useGetList('people', {});
	const [slug, setSlug] = React.useState('')

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

	const handleNameBlur = (value: string, formData: any) => {
		let filterSlug: any[] | undefined
		filterSlug = people?.filter(f => f.slug === value)

		if (formData.slug === '') {
			if (filterSlug && filterSlug?.length > 0) {
				handleNameBlur(filterSlug[0].slug + '-' + random(10), formData)
			}
			if (filterSlug?.length === 0) {
				setSlug(value)
			}
		}
	}

	const SlugInput = ({ slug }: any) => {
		const { setValue } = useFormContext();

		React.useEffect(() => {
			if (slug !== '')
				setValue('slug', slug)
		}, [slug])

		return (
			<TextInput
				className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
				source="slug"
			/>
		);
	};

	return (
		<Create title="Create a Person" transform={transform}>
			<SimpleForm validate={(value) => validateNameAndSlugAndEmailAndDomain(false, value, people)}>
				<FormDataConsumer>
					{({ formData, ...rest }) => (
						<TextInput
							className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
							source="name"
							onBlur={e => handleNameBlur(e.target.value, formData)}
							{...rest}
						/>
					)}
				</FormDataConsumer>
				<SlugInput slug={slug} />
				<FileInput onRemove={onDropRejected} options={{ onDrop: onSelect }} source="picture" label="picture" accept="image/*" placeholder={<p>Drop your file here</p>}>
					<ImageField source="src" title="title" />
				</FileInput>
				<TextInput
					className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
					source="github"
				/>
				<TextInput
					className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
					source="type"
				/>
				<TextInput
					className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
					source="personal_email"
				/>
				<TextInput
					className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
					source="work_email"
				/>
				<TextInput
					className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
					source="linkedin"
				/>
				<SelectInput
					className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
					source="status"
					choices={status}
				/>
			</SimpleForm>
		</Create>
	)
}


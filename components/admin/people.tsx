// in posts.js
import React, { FC, useRef, useState } from 'react';
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
	SelectInput,
	Pagination
} from "react-admin";
import { uploadFile, deleteFile } from "../../utils/fileFunctions";
import { validateName, validateSlug, validateUrl, validateEmail, status } from "../../utils/constants"

import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const filters = [
	<TextInput key="search" source="name,type" label="Search in name,type" resettable alwaysOn />
];
const PostPagination = () => <Pagination rowsPerPageOptions={[5, 10, 25, 50, 100, 250]} />;

export const PeopleList = () => (
	<List filters={filters}
	    pagination={<PostPagination />}
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

	const [logo, setLogo] = useState(null)
	const [oldLogo, setOldLogo] = useState(null)
	const [isImageUpdated, setIsImageUpdated] = useState(false)

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
	const [logo, setLogo] = useState(null)
	const [isIcon, setIsIcon] = useState(false)
	const [keyword, setKeyword] = useState('');

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

	type Props = {
		googleKeyWord: string,
	  };
	  const RenderGoogleIcon: FC<Props> = ({googleKeyWord}) => {
		const url = "https://www.google.com/search?q=" + googleKeyWord
		return(
		<div style={{ position: 'absolute', top: '70px' }}>
		  <a href={url} target="_blank" rel="noreferrer">
			<GoogleIcon />
		  </a>
		</div>)
	  }
	
	const RenderLinkedinIcon: FC<Props> = ({googleKeyWord}) => {
	const url = "https://www.google.com/search?q=" + googleKeyWord + " Linkedin"

	return (
		<div style={{ position: 'absolute', top: '70px', left: '45px' }}>
		<a href={url} target="_blank" rel="noreferrer">
			<LinkedInIcon /></a>
		</div>)
	}
	const RenderGitHubIcon: FC<Props> = ({googleKeyWord}) => {
	const url = "https://www.google.com/search?q=" + googleKeyWord + " Github"

	return (
	<div style={{ position: 'absolute', top: '70px', left: '80px' }}>
		<a href={url} target="_blank" rel="noreferrer">
		<GitHubIcon />
		</a>
	</div>)
	}

	const RenderCBIcon: FC<Props> = ({googleKeyWord}) => {
	const url = "https://www.google.com/search?q=" + googleKeyWord + "  Crunchbase"
	const cb_logo = "https://www.vectorlogo.zone/logos/crunchbase/crunchbase-icon.svg"

	return (
	<div style={{ position: 'absolute', top: '70px', left: '115px' }}>
		<a href={url} target="_blank" rel="noreferrer">
			<img
			className="w-[25px] h-[25px]"
			src={cb_logo}
			alt={cb_logo}
			/>
		</a>
	</div>)
	}


	const handleIcon = (e: any) => {
	setIsIcon(e.target.value.length > 0 ? true : false);
	setKeyword(e.target.value);
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
		<div className='customForm' style={{ position: 'relative' }}>
			<SimpleForm>
				<TextInput
					className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
					source="name"
					validate={validateName}
					onChange={handleIcon}

					sx={{
						'.MuiFormHelperText-root': {
							display: 'block !important',
						}
					}}
				/>
				{isIcon &&
				<>
					<RenderGoogleIcon googleKeyWord={keyword}/>
					<RenderLinkedinIcon googleKeyWord={keyword}/>
					<RenderGitHubIcon googleKeyWord={keyword}/>
					<RenderCBIcon googleKeyWord={keyword}/>
				</>}
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
			</div>
		</Create>
	)
}

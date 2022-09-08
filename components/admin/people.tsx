// in posts.js
import React, { FC, useState } from 'react';
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
	useGetList,
	Pagination,
	useRedirect,
	Toolbar,
	Button,
	useCreate,
	SaveButton

} from "react-admin";
import { useFormContext } from "react-hook-form";
import { random } from "lodash";
import { uploadFile, deleteFile } from "../../utils/fileFunctions";
import { validateNameAndSlugAndEmailAndDomain, status, crunchbaseImg } from "../../utils/constants"

import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import ContentSave from '@mui/icons-material/Save';

const filters = [
	<TextInput key="search" source="name,type" label="Search in name,type" resettable alwaysOn />
];
const PostPagination = () => <Pagination rowsPerPageOptions={[5, 10, 25, 50, 100, 250]} />;
const CustomToolbar = () => {
	const form = useFormContext();
	const [create] = useCreate();
	const redirect = useRedirect()

	const handleSaveDraft = () => {
		let data = form.getValues()
		data.status = 'draft'
		create('people', { data })
		redirect('/people')
	}

	return (
		<Toolbar>
			<SaveButton />
			<Button
				label="Save As Draft"
				sx={{ marginLeft: '1rem', padding: '6px 16px', fontSize: '0.9rem', }}
				variant="outlined"
				onClick={handleSaveDraft}
				startIcon={<ContentSave />}
			/>
		</Toolbar>
	);
};

export const PeopleList = () => {
	const [customSort, setCustomSort] = useState({ field: 'id', order: 'ASC' })
	const headers: string[] = [
		'id', 'name', 'slug', 'picture', 'github',
		"type", "personal_email",
		"work_email",
		"linkedin",
		"status"
	]
	const { data } = useGetList(
		'people',
		{ pagination: { page: 1, perPage: 10 } }
	);
	let renderData = data?.map(v => {
		let sum = 0
		for (var index in v) {
			v[index] && headers.includes(index) ? sum++ : sum
		}
		return ({ ...v, counter: sum + '/10' })
	})

	const sortWithData = (sortData: any) => {
		const isAscending = customSort.order === 'ASC'
		if (isAscending) {
			sortData = sortData.sort((a: any, b: any) => (a[customSort.field] > b[customSort.field]) ? 1 : -1);
		} else {
			sortData = sortData.sort((a: any, b: any) => (a[customSort.field] > b[customSort.field]) ? -1 : 1);
		}
		return sortData
	}
	renderData = renderData && sortWithData(renderData)

	return (
		<List filters={filters}
			pagination={<PostPagination />}
			sx={{
				'.MuiToolbar-root': {
					justifyContent: 'flex-start'
				}
			}}
		>
			<Datagrid
				data={renderData}
				sort={customSort}
				setSort={(value) => setCustomSort(value)}
			>
				<EditButton />
				<TextField source="id" />
				<TextField source="name" />
				<TextField source="slug" />
				<ImageField source="picture.url" label="Picture" />
				<TextField source="github" />
				<TextField source="type" />
				<TextField source="personal_email" />
				<TextField source="work_email" />
				<TextField source="linkedin" />
				<TextField source="status" />
				<TextField source="counter" />
			</Datagrid>
		</List>
	)
};

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
		let convertedValue = value.replace(/ /g, "-").toLowerCase();
		filterSlug = people?.filter(f => f.slug === convertedValue && f.status !== 'draft')

		if (formData.slug === '') {
			if (filterSlug && filterSlug?.length > 0) {
				handleNameBlur(filterSlug[0].slug + '-' + random(10), formData)
			}
			if (filterSlug?.length === 0) {
				setSlug(convertedValue)
			}
		}
	}

	const SlugInput = ({ slug }: any) => {
		const { setValue } = useFormContext();

		React.useEffect(() => {
			if (slug !== '')
				setValue('slug', slug)
		}, [slug, setValue])

		return (
			<TextInput
				className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
				source="slug"
				sx={{
					'.MuiFormHelperText-root': {
						display: 'block !important',
					}
				}}
			/>
		);
	};

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
			<SimpleForm validate={(value) => validateNameAndSlugAndEmailAndDomain(true, value, people)}>
				<TextInput
					className="w-full px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
					disabled
					source="id"
				/>
				<FormDataConsumer>
					{({ formData, ...rest }) => (
						<TextInput
							className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
							source="name"
							onBlur={e => handleNameBlur(e.target.value, formData)}
							sx={{
								'.MuiFormHelperText-root': {
									display: 'block !important',
								}
							}}
							{...rest}
						/>
					)}
				</FormDataConsumer>
				<SlugInput slug={slug} />
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
					sx={{
						'.MuiFormHelperText-root': {
							display: 'block !important',
						}
					}}
				/>
				<TextInput
					className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
					source="personal_email"
					sx={{
						'.MuiFormHelperText-root': {
							display: 'block !important',
						}
					}}
				/>
				<TextInput
					className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
					source="work_email"
					sx={{
						'.MuiFormHelperText-root': {
							display: 'block !important',
						}
					}}
				/>
				<TextInput
					className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
					source="linkedin"
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
		let convertedValue = value.replace(/ /g, "-").toLowerCase();
		filterSlug = people?.filter(f => f.slug === convertedValue && f.status !== 'draft')

		if (formData.slug === '') {
			if (filterSlug && filterSlug?.length > 0) {
				handleNameBlur(filterSlug[0].slug + '-' + random(10), formData)
			}
			if (filterSlug?.length === 0) {
				setSlug(convertedValue)
			}
		}
	}

	const SlugInput = ({ slug }: any) => {
		const { setValue } = useFormContext();

		React.useEffect(() => {
			if (slug !== '')
				setValue('slug', slug)
		}, [slug, setValue])

		return (
			<TextInput
				className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
				source="slug"
				sx={{
					'.MuiFormHelperText-root': {
						display: 'block !important',
					}
				}}
			/>
		);
	};


	type Props = {
		googleKeyWord: string,
	};
	const RenderGoogleIcon: FC<Props> = ({ googleKeyWord }) => {
		const url = "https://www.google.com/search?q=" + googleKeyWord
		return (
			<div style={{ position: 'absolute', top: '70px' }}>
				<a href={url} target="_blank" rel="noreferrer">
					<GoogleIcon />
				</a>
			</div>)
	}

	const RenderLinkedinIcon: FC<Props> = ({ googleKeyWord }) => {
		const url = "https://www.google.com/search?q=" + googleKeyWord + " Linkedin"

		return (
			<div style={{ position: 'absolute', top: '70px', left: '45px' }}>
				<a href={url} target="_blank" rel="noreferrer">
					<LinkedInIcon /></a>
			</div>)
	}
	const RenderGitHubIcon: FC<Props> = ({ googleKeyWord }) => {
		const url = "https://www.google.com/search?q=" + googleKeyWord + " Github"

		return (
			<div style={{ position: 'absolute', top: '70px', left: '80px' }}>
				<a href={url} target="_blank" rel="noreferrer">
					<GitHubIcon />
				</a>
			</div>)
	}

	const RenderCBIcon: FC<Props> = ({ googleKeyWord }) => {
		const url = "https://www.google.com/search?q=" + googleKeyWord + "  Crunchbase"

		return (
			<div style={{ position: 'absolute', top: '70px', left: '115px' }}>
				<a href={url} target="_blank" rel="noreferrer">
					<img
						className="w-[25px] h-[25px]"
						src={crunchbaseImg}
						alt={crunchbaseImg}
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
				<SimpleForm validate={(value) => validateNameAndSlugAndEmailAndDomain(false, value, people)} toolbar={<CustomToolbar />} >
					<FormDataConsumer>
						{({ formData, ...rest }) => (
							<TextInput
								className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
								source="name"
								onBlur={e => handleNameBlur(e.target.value, formData)}
								onChange={handleIcon}
								sx={{
									'.MuiFormHelperText-root': {
										display: 'block !important',
									}
								}}
								{...rest}
							/>

						)}

					</FormDataConsumer>
					{isIcon &&
						<>
							<RenderGoogleIcon googleKeyWord={keyword} />
							<RenderLinkedinIcon googleKeyWord={keyword} />
							<RenderGitHubIcon googleKeyWord={keyword} />
							<RenderCBIcon googleKeyWord={keyword} />
						</>}
					<SlugInput slug={slug} />
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
						sx={{
							'.MuiFormHelperText-root': {
								display: 'block !important',
							}
						}}
					/>
					<TextInput
						className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
						source="personal_email"
						sx={{
							'.MuiFormHelperText-root': {
								display: 'block !important',
							}
						}}
					/>
					<TextInput
						className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
						source="work_email"
						sx={{
							'.MuiFormHelperText-root': {
								display: 'block !important',
							}
						}}
					/>
					<TextInput
						className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
						source="linkedin"
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


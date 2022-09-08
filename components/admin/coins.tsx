// in posts.js
import React, { FC, useRef, useState } from 'react';
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
	AutocompleteInput,
	Pagination,
	Toolbar,
	SaveButton,
	useCreate,
	Button,
	useRedirect,
	useGetList
} from "react-admin";

import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { crunchbaseImg } from '@/utils/constants';
import ContentSave from '@mui/icons-material/Save';
import { useFormContext } from 'react-hook-form';

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

const PostPagination = () => <Pagination rowsPerPageOptions={[5, 10, 25, 50, 100, 250]} />;

const CustomToolbar = () => {
	const form = useFormContext();
	const [create] = useCreate();
	const redirect = useRedirect()

	const handleSaveDraft = () => {
		let data = form.getValues()
		data.status = 'draft'
		create('coins', { data })
		redirect('/coins')
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

export const CoinsList = () => {
	const [customSort, setCustomSort] = useState({ field: 'id', order: 'ASC' })
	const headers: string[] = [
		'id', 'name', 'ticker', 'blockchain_id'
	]
	const { data } = useGetList(
		'coins',
		{ pagination: { page: 1, perPage: 10 } }
	);
	let renderData = data?.map(v => {
		let sum = 0
		for (var index in v) {
			v[index] && headers.includes(index) ? sum++ : sum
		}
		return ({ ...v, counter: sum + '/4' })
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
				<TextField source="ticker" />
				<ReferenceField label="Blockchain" source="blockchain_id" reference="blockchains">
					<TextField source="name" />
				</ReferenceField>
				<TextField source="counter" />
			</Datagrid>
		</List>
	)
}

interface TitleProps {
	record?: Record<string, string>;
}

const CoinsTitle = ({ record }: TitleProps) => {
	return <span>Coin {record ? `"${record.name}"` : ""}</span>;
};

export const CoinsEdit = () => (
	<Edit title={<CoinsTitle />}
		sx={{
			'.MuiFormHelperText-root': {
				display: 'none',
			}
		}}
	>
		<SimpleForm>
			<TextInput className="w-full px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none" disabled source="id" />
			<TextInput className="w-full px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none" source="name" />
			<TextInput className="w-full px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none" source="ticker" />
			<ReferenceInput label="Blockchain" source="blockchain_id" reference="blockchains">
				<SelectInput className="w-full px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none" optionText="name" />
			</ReferenceInput>
		</SimpleForm>
	</Edit>
);

export const CoinsCreate = () => {
	const [isIcon, setIsIcon] = React.useState(false)
	const [keyword, setKeyword] = React.useState('');

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
		<Create title="Create a Coin"
			sx={{
				'.MuiFormHelperText-root': {
					display: 'none',
				}
			}}
		>
			<SimpleForm toolbar={<CustomToolbar />}>
				<TextInput className="w-full px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none" source="name" onChange={handleIcon}
				/>
				{isIcon &&
					<>
						<RenderGoogleIcon googleKeyWord={keyword} />
						<RenderLinkedinIcon googleKeyWord={keyword} />
						<RenderGitHubIcon googleKeyWord={keyword} />
						<RenderCBIcon googleKeyWord={keyword} />
					</>}
				<TextInput className="w-full mt-5 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none" source="ticker" />
				<ReferenceInput label="Blockchain" source="blockchain_id" reference="blockchains">
					<SelectInput className="w-full px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none" optionText="name" />
				</ReferenceInput>
			</SimpleForm>
		</Create>)
}

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
	Pagination
} from "react-admin";

import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { crunchbaseImg } from '@/utils/constants';

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

export const CoinsList = () => (
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
		>
			<div className='customForm' style={{ position: 'relative' }}>
				<SimpleForm>
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
			</div>
		</Create>)
}

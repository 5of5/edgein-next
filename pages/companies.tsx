import React, { useEffect, useState } from "react";
import type { NextPage, GetStaticProps } from "next";
import { ElemHeading } from "../components/ElemHeading";
import { PlaceholderCompanyCard } from "@/components/Placeholders";
import { ElemFiltersWrap } from "../components/ElemFiltersWrap";
import { InputSearch } from "../components/InputSearch";
import { InputSelect } from "../components/InputSelect";
import { ElemRecentCompanies } from "../components/Companies/ElemRecentCompanies";
import { ElemButton } from "@/components/ElemButton";
import { runGraphQl } from "../utils";
import {
	IconGrid,
	IconList,
	IconSearch,
	IconAnnotation,
} from "@/components/Icons";
import {
	Companies,
	Companies_Bool_Exp,
	GetCompaniesDocument,
	GetCompaniesQuery,
	useGetCompaniesQuery,
} from "../graphql/types";
import { useDebounce } from "../hooks/useDebounce";
import { Pagination } from "../components/Pagination";
import { useAuth } from "../hooks/useAuth";
import { ElemCompanyCard } from "@/components/Companies/ElemCompanyCard";

type Props = {
	companiesCount: number;
	initialCompanies: GetCompaniesQuery["companies"];
	companyLayers: TextFilter[];
	amountRaised: NumericFilter[];
	totalEmployees: NumericFilter[];
	setToggleFeedbackForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export type DeepPartial<T> = T extends object
	? {
			[P in keyof T]?: DeepPartial<T[P]>;
	  }
	: T;

const Companies: NextPage<Props> = ({
	companiesCount,
	initialCompanies,
	companyLayers,
	amountRaised,
	totalEmployees,
	setToggleFeedbackForm,
}) => {
	const [initialLoad, setInitialLoad] = useState(true);
	const { user } = useAuth();

	// Search Box
	const [search, setSearch] = useState("");
	const debouncedSearchTerm = useDebounce(search, 500);

	const searchCompanies = (e: {
		target: { value: React.SetStateAction<string> };
	}) => {
		setSearch(e.target.value);

		// Change url on search
		// router.push(`/companies/?search=${e.target.value}`, undefined, {
		// 	shallow: true,
		// });
	};

	// Company Layers Filter
	const [selectedLayer, setSelectedLayer] = useState(companyLayers[0]);

	// Amount Raised Filter
	const [selectedAmountRaised, setSelectedAmountRaised] = useState(
		amountRaised[0]
	);

	// Total Employees Filter
	const [selectedTotalEmployees, setSelectedTotalEmployees] = useState(
		totalEmployees[0]
	);

	// Layout Grid/List
	const [toggleViewMode, setToggleViewMode] = useState(false);

	const [page, setPage] = useState<number>(0);
	const limit = 50;
	const offset = limit * page;

	useEffect(() => {
		setPage(0);
		if (
			initialLoad &&
			debouncedSearchTerm !== "" &&
			selectedLayer.value !== "" &&
			selectedAmountRaised.rangeEnd !== 0 &&
			selectedTotalEmployees.rangeEnd !== 0
		) {
			setInitialLoad(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		debouncedSearchTerm,
		selectedAmountRaised,
		selectedLayer,
		selectedTotalEmployees,
	]);

	const filters: DeepPartial<Companies_Bool_Exp> = {
		_and: [{ slug: { _neq: "" }, status: { _eq: "published" } }],
	};
	if (debouncedSearchTerm !== "") {
		filters._and?.push({
			_or: [
				{ name: { _ilike: `%${debouncedSearchTerm}%` } },
				{ coin: { ticker: { _ilike: `%${debouncedSearchTerm}%` } } },
			],
		});
	}
	if (selectedLayer.value) {
		filters._and?.push({ layer: { _eq: selectedLayer.value } });
	}
	if (selectedAmountRaised.rangeEnd !== 0) {
		filters._and?.push({
			_and: [
				{ investor_amount: { _gt: selectedAmountRaised.rangeStart } },
				{ investor_amount: { _lte: selectedAmountRaised.rangeEnd } },
			],
		});
	}
	if (selectedTotalEmployees.rangeEnd !== 0) {
		filters._and?.push({
			_and: [
				{ total_employees: { _gt: selectedTotalEmployees.rangeStart } },
				{ total_employees: { _lte: selectedTotalEmployees.rangeEnd } },
			],
		});
	}

	const {
		data: companiesData,
		error,
		isLoading,
	} = useGetCompaniesQuery({
		offset,
		limit,
		where: filters as Companies_Bool_Exp,
		// TODO: pass logged in user's id
		current_user: user?.id ?? 0,
	});

	if (!isLoading && initialLoad) {
		setInitialLoad(false);
	}

	const companies = initialLoad ? initialCompanies : companiesData?.companies;

	const onUpdateOfCompany = (company: Companies) => {
		// TODO if company is currently displayed update it
	};

	return (
		<div>
			<ElemHeading
				title="Web3 Companies"
				subtitle="Early-stage companies in this Web3 market renaissance require actionable intelligence and hyper-speed. Consider this your greatest asset."
			></ElemHeading>

			<div className="max-w-7xl px-4 mx-auto relative z-10 sm:px-6 lg:px-8">
				{companies && (
					<ElemRecentCompanies
						onUpdateOfCompany={onUpdateOfCompany}
						heading="Recently Discovered"
					/>
				)}
			</div>

			<div className="max-w-7xl px-4 mx-auto mt-7 relative z-10 sm:px-6 lg:px-8">
				<div className="bg-white rounded-lg p-5">
					<h2 className="text-xl font-bold">All Companies</h2>
					<ElemFiltersWrap className="pt-2 filters-wrap">
						<InputSearch
							className="w-full md:grow md:shrink md:basis-0 md:max-w-[16rem]"
							label="Search"
							name="search"
							value={search}
							placeholder="Quick Search..."
							onChange={searchCompanies}
						/>

						<InputSelect
							className="w-full md:grow md:shrink md:basis-0 md:max-w-[16rem]"
							value={selectedLayer}
							onChange={setSelectedLayer}
							options={companyLayers}
						/>

						<InputSelect
							className="w-full md:grow md:shrink md:basis-0 md:max-w-[16rem]"
							value={selectedAmountRaised}
							onChange={setSelectedAmountRaised}
							options={amountRaised}
						/>

						<InputSelect
							className="w-full md:grow md:shrink md:basis-0 md:max-w-[16rem]"
							value={selectedTotalEmployees}
							onChange={setSelectedTotalEmployees}
							options={totalEmployees}
						/>

						<div className="hidden md:block md:shrink md:basis-0">
							<div
								className="px-4 py-1.5 cursor-pointer rounded-md bg-white border border-dark-500/10 hover:text-primary-500 hover:ring hover:ring-primary-100"
								onClick={() => setToggleViewMode(!toggleViewMode)}
							>
								{toggleViewMode ? (
									<div className="flex items-center">
										<IconGrid className="w-5 h-5 mr-1" />
										Grid
									</div>
								) : (
									<div className="flex items-center">
										<IconList className="w-5 h-5 mr-1" />
										List
									</div>
								)}
							</div>
						</div>
					</ElemFiltersWrap>

					{companies?.length === 0 && (
						<>
							<div className="flex items-center justify-center mx-auto min-h-[40vh]">
								<div className="w-full max-w-2xl p-8 text-center bg-white border rounded-2xl border-dark-500/10">
									<IconSearch className="w-12 h-12 mx-auto text-slate-300" />
									<h2 className="mt-5 text-3xl font-bold">No results found</h2>
									<div className="mt-1 text-lg text-dark-400">
										Please check spelling, try different filters, or tell us
										about missing data.
									</div>
									<ElemButton
										onClick={() => setToggleFeedbackForm(true)}
										btn="white"
										className="mt-3"
									>
										<IconAnnotation className="w-6 h-6 mr-1" />
										Tell us about missing data
									</ElemButton>
								</div>
							</div>
						</>
					)}

					<div
						className={`grid gap-5 grid-cols-1 md:grid-cols-${
							toggleViewMode ? "1" : "2"
						} lg:grid-cols-${toggleViewMode ? "1" : "3"}`}
					>
						{error ? (
							<h4>Error loading companies</h4>
						) : isLoading && !initialLoad ? (
							<>
								{Array.from({ length: 9 }, (_, i) => (
									<PlaceholderCompanyCard key={i} />
								))}
							</>
						) : (
							companies?.map((company) => {
								return (
									<ElemCompanyCard
										key={company.id}
										company={company as Companies}
										toggleViewMode={toggleViewMode}
									/>
								);
							})
						)}
					</div>
					<Pagination
						shownItems={companies?.length}
						totalItems={companiesCount}
						page={page}
						itemsPerPage={limit}
						onClickPrev={() => setPage((prev) => prev - 1)}
						onClickNext={() => setPage((prev) => prev + 1)}
					/>
				</div>
			</div>
		</div>
	);
};

export const getStaticProps: GetStaticProps = async (context) => {
	const { data: companies } = await runGraphQl<GetCompaniesQuery>(
		GetCompaniesDocument,
		{
			limit: 50,
			offset: 0,
			where: { slug: { _neq: "" }, status: { _eq: "published" } },
		}
	);

	return {
		props: {
			metaTitle: "Web3 Companies - EdgeIn.io",
			metaDescription:
				"Early-stage companies in this Web3 market renaissance require actionable intelligence and hyper-speed. Consider this your greatest asset.",
			companiesCount: companies?.companies.length,
			initialCompanies: companies?.companies.slice(0, 50),
			companyLayers: LayersFilters,
			amountRaised: AmountRaisedFilters,
			totalEmployees: EmployeesFilters,
		},
	};
};

export default Companies;

interface TextFilter {
	title: string;
	description?: string;
	value: string;
}

export interface NumericFilter {
	title: string;
	description?: string;
	rangeStart: number;
	rangeEnd: number;
}

const LayersFilters: TextFilter[] = [
	{
		title: "All Layers",
		value: "",
	},
	{
		title: "Layer 0",
		value: "Layer 0",
		description: "Native Code",
	},
	{
		title: "Layer 1",
		value: "Layer 1",
		description: "Programmable Blockchains / Networks",
	},
	{
		title: "Layer 2",
		value: "Layer 2",
		description: "Nodes / Node Providers / Data Platforms",
	},
	{
		title: "Layer 3",
		value: "Layer 3",
		description: "API's / API Providers / Systems",
	},
	{
		title: "Layer 4",
		value: "Layer 4",
		description: "Decentralized Platforms / Contract/Modeling",
	},
	{
		title: "Layer 5",
		value: "Layer 5",
		description: "Applications",
	},
	{
		title: "Layer 6",
		value: "Layer 6",
		description: "Interoperable Digital Assets / NFT's",
	},
];
// Amount Raised Filter
const AmountRaisedFilters: NumericFilter[] = [
	{
		title: "All Funding Amounts",
		rangeStart: 0,
		rangeEnd: 0,
	},
	{
		title: "Less than $1M",
		rangeStart: 0,
		rangeEnd: 10e5 - 1, //999999
	},
	{
		title: "$1M",
		rangeStart: 10e5,
		rangeEnd: 10e5,
	},
	{
		title: "$1M-$10M",
		rangeStart: 10e5 + 1,
		rangeEnd: 10e6,
	},
	{
		title: "$11M-$20M",
		rangeStart: 10e6 + 1,
		rangeEnd: 20e6,
	},
	{
		title: "$21M-$50M",
		rangeStart: 20e6 + 1,
		rangeEnd: 50e6,
	},
	{
		title: "$51M-$100M",
		rangeStart: 50e6 + 1,
		rangeEnd: 10e7,
	},
	{
		title: "$101M-$200M",
		rangeStart: 10e7 + 1,
		rangeEnd: 20e7,
	},
	{
		title: "$200M+",
		rangeStart: 20e7,
		rangeEnd: 90e14,
	},
];
// Total Employees Filter
const EmployeesFilters: NumericFilter[] = [
	{
		title: "Number of Employees",
		rangeStart: 0,
		rangeEnd: 0,
	},
	{
		title: "Less than 10 Employees",
		rangeStart: 0,
		rangeEnd: 9,
	},
	{
		title: "10-15 Employees",
		rangeStart: 10,
		rangeEnd: 15,
	},
	{
		title: "16-30 Employees",
		rangeStart: 16,
		rangeEnd: 30,
	},
	{
		title: "31-100 Employees",
		rangeStart: 31,
		rangeEnd: 100,
	},
	{
		title: "101-200 Employees",
		rangeStart: 101,
		rangeEnd: 200,
	},
	{
		title: "201-500 Employees",
		rangeStart: 201,
		rangeEnd: 500,
	},
	{
		title: "501-1000 Employees",
		rangeStart: 501,
		rangeEnd: 1000,
	},
	{
		title: "1000+ Employees",
		rangeStart: 1001,
		rangeEnd: 1000000000,
	},
];

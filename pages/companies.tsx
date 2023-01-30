import React, { useEffect, useState } from "react";
import type { NextPage, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { ElemHeading } from "@/components/ElemHeading";
import { Popover, RadioGroup } from "@headlessui/react";
import {
	PlaceholderCompanyCard,
	PlaceholderTable,
} from "@/components/Placeholders";
import { InputSelect } from "@/components/InputSelect";
import { ElemRecentCompanies } from "@/components/Companies/ElemRecentCompanies";
import { CompaniesTable } from "@/components/Companies/CompaniesTable";
import { ElemButton } from "@/components/ElemButton";
import { ElemTagsCarousel } from "@/components/ElemTagsCarousel";
import { runGraphQl, numberWithCommas } from "@/utils";
import {
	IconSearch,
	IconAnnotation,
	IconX,
	IconFilter,
	IconGrid,
	IconTable,
} from "@/components/Icons";
import {
	Companies,
	Companies_Bool_Exp,
	GetCompaniesDocument,
	GetCompaniesQuery,
	useGetCompaniesQuery,
} from "@/graphql/types";
import { Pagination } from "@/components/Pagination";
import { ElemCompanyCard } from "@/components/Companies/ElemCompanyCard";
import { companyChoices, companyLayerChoices } from "@/utils/constants";
import toast, { Toaster } from "react-hot-toast";
import { useStateParams } from "@/hooks/useStateParams";
import { onTrackView } from "@/utils/track";

function useStateParamsFilter<T>(filters: T[], name: string) {
	return useStateParams(
		filters[0],
		name,
		(companyLayer) => filters.indexOf(companyLayer).toString(),
		(index) => filters[Number(index)]
	);
}

type Props = {
	companiesCount: number;
	initialCompanies: GetCompaniesQuery["companies"];
	companyFilters: TextFilter[];
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
	companyFilters,
	companyLayers,
	amountRaised,
	totalEmployees,
	setToggleFeedbackForm,
}) => {
	const [initialLoad, setInitialLoad] = useState(true);

	const router = useRouter();

	// Company Filter
	const [selectedCompanyFilters, setSelectedCompanyFilters] =
		useStateParamsFilter(companyFilters, "filter");

	// Company Layers Filter
	const [selectedLayer, setSelectedLayer] = useStateParamsFilter(
		companyLayers,
		"layer"
	);

	// Amount Raised Filter
	const [selectedAmountRaised, setSelectedAmountRaised] = useStateParamsFilter(
		amountRaised,
		"amount"
	);

	// Total Employees Filter
	const [selectedTotalEmployees, setSelectedTotalEmployees] =
		useStateParamsFilter(totalEmployees, "totalEmp");

	// Filters
	const [toggleFilters, setToggleFilters] = useState(
		selectedLayer !== companyLayers[0] ||
			selectedAmountRaised !== amountRaised[0] ||
			selectedTotalEmployees !== totalEmployees[0]
	);

	const [tableLayout, setTableLayout] = useState(true);

	const [page, setPage] = useStateParams<number>(
		0,
		"page",
		(pageIndex) => pageIndex + 1 + "",
		(pageIndex) => Number(pageIndex) - 1
	);

	const limit = 50;
	const offset = limit * page;

	const [selectedTags, setSelectedTags] = useStateParams<string[]>(
		[],
		"tags",
		(tagArr) => tagArr.join(","),
		(tag) => tag.split(",")
	);

	const filters: DeepPartial<Companies_Bool_Exp> = {
		_and: [{ slug: { _neq: "" }, status: { _eq: "published" } }],
	};

	useEffect(() => {
		if (!initialLoad) {
			setPage(0);
		}
		if (
			initialLoad &&
			selectedTags.length !== 0 &&
			selectedLayer.value !== "" &&
			selectedCompanyFilters.value !== "" &&
			selectedAmountRaised.rangeEnd !== 0 &&
			selectedTotalEmployees.rangeEnd !== 0
		) {
			setInitialLoad(false);
		}

		onTrackView({
			properties: filters,
			pathname: router.pathname,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		selectedTags,
		selectedAmountRaised,
		selectedLayer,
		selectedTotalEmployees,
		selectedCompanyFilters,
	]);

	const filterByTag = async (
		event: React.MouseEvent<HTMLDivElement>,
		tag: string
	) => {
		event.stopPropagation();
		event.preventDefault();

		const newTags = selectedTags.includes(tag)
			? selectedTags.filter((t) => t !== tag)
			: [tag, ...selectedTags];
		setSelectedTags(newTags);

		selectedTags.includes(tag)
			? toast.custom(
					(t) => (
						<div
							className={`bg-slate-800 text-white py-2 px-4 rounded-lg transition-opacity ease-out duration-300 ${
								t.visible ? "animate-fade-in-up" : "opacity-0"
							}`}
						>
							Removed &ldquo;{tag}&rdquo; Filter
						</div>
					),
					{
						duration: 3000,
						position: "top-center",
					}
			  )
			: toast.custom(
					(t) => (
						<div
							className={`bg-slate-800 text-white py-2 px-4 rounded-lg transition-opacity ease-out duration-300 ${
								t.visible ? "animate-fade-in-up" : "opacity-0"
							}`}
						>
							Added &ldquo;{tag}&rdquo; Filter
						</div>
					),
					{
						duration: 3000,
						position: "top-center",
					}
			  );
	};

	const clearTagFilters = async () => {
		setSelectedTags([]);

		toast.custom(
			(t) => (
				<div
					className={`bg-slate-800 text-white py-2 px-4 rounded-lg transition-opacity ease-out duration-300 ${
						t.visible ? "animate-fade-in-up" : "opacity-0"
					}`}
				>
					Tag Filters Removed
				</div>
			),
			{
				duration: 3000,
				position: "top-center",
			}
		);
	};

	if (selectedTags.length > 0) {
		let allTags: any = [];
		selectedTags.map((tag) => {
			allTags.push({ tags: { _contains: tag } });
		});

		filters._and?.push({
			_and: allTags,
		});
	}

	if (selectedLayer?.value) {
		filters._and?.push({ layer: { _eq: selectedLayer.value } });
	}
	if (selectedCompanyFilters?.value) {
		filters._and?.push({
			status_tags: { _contains: selectedCompanyFilters.value },
		});
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
	});

	if (!isLoading && initialLoad) {
		setInitialLoad(false);
	}

	const companies = initialLoad ? initialCompanies : companiesData?.companies;
	const companies_aggregate = initialLoad
		? companiesCount
		: companiesData?.companies_aggregate?.aggregate?.count || 0;

	// New Filters UI data

	const tagsMethods = [
		{ id: "api", title: "API" },
		{ id: "platform", title: "Platform" },
		{ id: "dev-tools", title: "Dev Tools" },
		{ id: "tag1", title: "Tag 1" },
		{ id: "tag2", title: "Tag 2" },
	];

	const foundedDates = [
		{ id: "any", name: "Any", founded_date: "" },
		{ id: "past-30-days", name: "Past 30 Days", founded_date: "" },
		{ id: "past-60-days", name: "Past 60 Days", founded_date: "" },
		{ id: "past-90-days", name: "Past 90 Days", founded_date: "" },
		{ id: "custom-range", name: "Custom Range", founded_date: "" },
	];

	const [selected, setSelected] = useState(foundedDates[0]);

	const employeeCount = [
		{ id: "any", name: "Any", founded_date: "" },
		{ id: "past-30-days", name: "Past 30 Days", founded_date: "" },
		{ id: "past-60-days", name: "Past 60 Days", founded_date: "" },
		{ id: "past-90-days", name: "Past 90 Days", founded_date: "" },
		{ id: "custom-range", name: "Custom Range", founded_date: "" },
	];

	return (
		<div className="relative overflow-hidden">
			<ElemHeading
				title="Web3 Companies"
				subtitle="Early-stage companies in this Web3 market renaissance require actionable intelligence and hyper-speed. Consider this your greatest asset."
			></ElemHeading>

			<div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8">
				<ElemRecentCompanies className="shadow" heading="Recently Discovered" />
			</div>

			<div className="max-w-7xl px-4 mx-auto mt-7 sm:px-6 lg:px-8">
				<div className="bg-white rounded-lg shadow p-5">
					<div className="lg:flex items-baseline gap-2">
						<h2 className="text-xl font-bold">
							Filter Companies ({numberWithCommas(companies_aggregate)})
						</h2>
						{selectedTags.length > 0 && (
							<div className="flex flex-wrap items-baseline">
								{selectedTags?.map((item, index: number) => {
									return (
										<span key={index} className="pr-1">
											{item}
											{index != selectedTags.length - 1 && ","}
										</span>
									);
								})}
								<div
									className="flex items-center text-sm cursor-pointer ml-1 text-primary-500 hover:text-dark-500"
									onClick={clearTagFilters}
								>
									clear tags filter
									<IconX className="ml-0.5 h-3" />
								</div>
							</div>
						)}
					</div>

					{/* Filters */}
					<section className="pt-2 pb-3 border-b border-slate-200 mb-6">
						<div className="w-full flex flex-wrap justify-between lg:space-x-5 lg:flex-nowrap">
							<InputSelect
								className="md:shrink md:basis-0"
								buttonClasses="w-auto"
								dropdownClasses="w-60"
								value={selectedCompanyFilters}
								onChange={setSelectedCompanyFilters}
								options={companyFilters}
							/>

							<div className="w-full overflow-hidden grow min-w-0 order-last lg:order-none">
								<ElemTagsCarousel
									onClick={filterByTag}
									selectedTags={selectedTags}
								/>
							</div>

							<div className="self-end sm:shrink sm:basis-0 sm:self-auto">
								<ElemButton
									onClick={() => setToggleFilters(!toggleFilters)}
									btn="white"
									roundedFull={false}
									className="rounded-md font-normal focus:ring-1 focus:ring-slate-200"
								>
									<IconFilter className="w-5 h-5 mr-1" />
									Filters
								</ElemButton>
							</div>
						</div>
						{toggleFilters && (
							<div className="mt-3 grid gap-5 grid-cols-1 lg:grid-cols-3">
								<InputSelect
									className="w-full"
									value={selectedLayer}
									onChange={setSelectedLayer}
									options={companyLayers}
								/>
								<InputSelect
									className="w-full"
									value={selectedAmountRaised}
									onChange={setSelectedAmountRaised}
									options={amountRaised}
								/>
								<InputSelect
									className="w-full"
									value={selectedTotalEmployees}
									onChange={setSelectedTotalEmployees}
									options={totalEmployees}
								/>
							</div>
						)}
					</section>

					{/* New Filters UI */}
					<section className="w-full flex items-center justify-between mb-6 pb-3 border-b border-slate-200">
						<div className="flex items-center space-x-3">
							<div className="font-bold">Filters:</div>
							<Popover>
								<Popover.Button className="relative inline-flex items-center font-normal text-sm rounded-md px-2 py-1.5 transition ease-in-out duration-150 group bg-white ring-inset ring-1 ring-slate-200 hover:text-primary-500 hover:bg-slate-200 focus:outline-none focus:ring-1">
									<div>Industry</div>
								</Popover.Button>
								<Popover.Panel className="absolute z-10 bg-white shadow-lg border border-black/5 rounded-lg min-w-content">
									<div className="font-bold text-sm px-3 py-2">
										Filter by Industry
									</div>
									<ul className="grid grid-cols-2 overflow-y-auto no-scrollbar divide-y divide-slate-100">
										{tagsMethods.map((tagMethod) => (
											<li
												key={tagMethod.id}
												className="flex items-center w-full min-w-max text-sm text-left font-medium hover:text-primary-500 hover:bg-slate-100"
											>
												<label className="relative flex items-center gap-2 cursor-pointer w-full px-3 py-2 hover:bg-slate-100">
													<input
														id={tagMethod.id}
														type="checkbox"
														className="appearance-none w-4 h-4 border rounded border-slate-300 hover:border-slate-400 checked:bg-primary-500 checked:border-primary-500 checked:hover:bg-primary-500 focus:ring-0 focus:ring-offset-0 focus:checked:bg-primary-500"
													/>
													<div>{tagMethod.title}</div>
												</label>
											</li>
										))}
									</ul>
									<div className="px-3 py-2 border-t border-black/5">
										<button className="text-primary-500">Clear</button>
									</div>
								</Popover.Panel>
							</Popover>
							<Popover>
								<Popover.Button className="relative inline-flex items-center font-normal text-sm rounded-md px-2 py-1.5 transition ease-in-out duration-150 group bg-white ring-inset ring-1 ring-slate-200 hover:text-primary-500 hover:bg-slate-200 focus:outline-none focus:ring-1">
									<div>Status</div>
								</Popover.Button>
								<Popover.Panel className="absolute z-10 bg-white shadow-lg border border-black/5 rounded-lg min-w-content">
									<div className="font-bold text-sm px-3 py-2">
										Organization status
									</div>
									<ul className="overflow-y-auto no-scrollbar divide-y divide-slate-100">
										<li className="flex items-center w-full min-w-max text-sm text-left font-medium hover:text-primary-500 hover:bg-slate-100">
											<label className="relative flex items-center gap-2 cursor-pointer w-full px-3 py-2 hover:bg-slate-100">
												<input
													type="checkbox"
													className="appearance-none w-4 h-4 border rounded border-slate-300 hover:border-slate-400 checked:bg-primary-500 checked:border-primary-500 checked:hover:bg-primary-500 focus:ring-0 focus:ring-offset-0 focus:checked:bg-primary-500"
												/>
												<div>Trending</div>
											</label>
										</li>
										<li className="flex items-center w-full min-w-max text-sm text-left font-medium hover:text-primary-500 hover:bg-slate-100">
											<label className="relative flex items-center gap-2 cursor-pointer w-full px-3 py-2 hover:bg-slate-100">
												<input
													type="checkbox"
													className="appearance-none w-4 h-4 border rounded border-slate-300 hover:border-slate-400 checked:bg-primary-500 checked:border-primary-500 checked:hover:bg-primary-500 focus:ring-0 focus:ring-offset-0 focus:checked:bg-primary-500"
												/>
												<div>Acquired</div>
											</label>
										</li>
										<li className="flex items-center w-full min-w-max text-sm text-left font-medium hover:text-primary-500 hover:bg-slate-100">
											<label className="relative flex items-center gap-2 cursor-pointer w-full px-3 py-2 hover:bg-slate-100">
												<input
													type="checkbox"
													className="appearance-none w-4 h-4 border rounded border-slate-300 hover:border-slate-400 checked:bg-primary-500 checked:border-primary-500 checked:hover:bg-primary-500 focus:ring-0 focus:ring-offset-0 focus:checked:bg-primary-500"
												/>
												<div>Dead</div>
											</label>
										</li>
									</ul>
									<div className="px-3 py-2 border-t border-black/5">
										<button className="text-primary-500">Clear</button>
									</div>
								</Popover.Panel>
							</Popover>

							<Popover>
								<Popover.Button className="relative inline-flex items-center font-normal text-sm rounded-md px-2 py-1.5 transition ease-in-out duration-150 group bg-white ring-inset ring-1 ring-slate-200 hover:text-primary-500 hover:bg-slate-200 focus:outline-none focus:ring-1">
									<div>Founded</div>
								</Popover.Button>
								<Popover.Panel className="absolute z-10 bg-white shadow-lg border border-black/5 rounded-lg min-w-content">
									<div className="font-bold text-sm px-3 py-2">
										Founded date
									</div>
									<fieldset>
										<div className="overflow-y-auto no-scrollbar divide-y divide-slate-100">
											{foundedDates.map((foundedDate) => (
												<label
													key={foundedDate.id}
													className="relative flex items-center gap-2 cursor-pointer w-full px-3 py-2 hover:bg-slate-100"
												>
													<div className="flex h-5 items-center">
														<input
															id={foundedDate.id}
															name="founded-date"
															type="radio"
															defaultChecked={foundedDate.id === "any"}
															className="h-4 w-4 border-slate-200 text-primary-500 focus:ring-primary-500"
														/>
													</div>
													<div className="text-sm font-medium">
														{foundedDate.name}
													</div>
												</label>
											))}
										</div>
									</fieldset>
									<div className="px-3 py-2 border-t border-black/5">
										<button className="text-primary-500">Clear</button>
									</div>
								</Popover.Panel>
							</Popover>

							<Popover>
								<Popover.Button className="relative inline-flex items-center font-normal text-sm rounded-md px-2 py-1.5 transition ease-in-out duration-150 group bg-white ring-inset ring-1 ring-slate-200 hover:text-primary-500 hover:bg-slate-200 focus:outline-none focus:ring-1">
									<div>Funding</div>
								</Popover.Button>
								<Popover.Panel className="absolute z-10 bg-white shadow-lg border border-black/5 rounded-lg min-w-content">
									<div className="font-bold text-sm px-3 py-2">
										Funding Amount
									</div>
									<div className="font-medium px-3 py-2">
										Min-Max Range Slider will go here
									</div>
									<div className="px-3 py-2 border-t border-black/5">
										<button className="text-primary-500">Clear</button>
									</div>
								</Popover.Panel>
							</Popover>

							<Popover>
								<Popover.Button className="relative inline-flex items-center font-normal text-sm rounded-md px-2 py-1.5 transition ease-in-out duration-150 group bg-white ring-inset ring-1 ring-slate-200 hover:text-primary-500 hover:bg-slate-200 focus:outline-none focus:ring-1">
									<div>Employees</div>
								</Popover.Button>
								<Popover.Panel className="absolute z-10 bg-white shadow-lg border border-black/5 rounded-lg min-w-content">
									<div className="font-bold text-sm px-3 py-2">
										Employee Count
									</div>
									<div className="font-medium px-3 py-2">
										Min-Max Range Slider will go here
									</div>
									<div className="px-3 py-2 border-t border-black/5">
										<button className="text-primary-500">Clear</button>
									</div>
								</Popover.Panel>
							</Popover>
						</div>

						<div>
							<ElemButton
								onClick={() => setTableLayout(false)}
								btn="white"
								roundedFull={false}
								className={`font-normal rounded-l-md focus:ring-1 focus:ring-slate-200 ${
									!tableLayout && "bg-slate-200"
								}`}
							>
								<IconGrid className="w-5 h-5" />
							</ElemButton>
							<ElemButton
								onClick={() => setTableLayout(true)}
								btn="white"
								roundedFull={false}
								className={`font-normal rounded-r-md focus:ring-1 focus:ring-slate-200 ${
									tableLayout && "bg-slate-200"
								}`}
							>
								<IconTable className="w-5 h-5" />
							</ElemButton>
						</div>
					</section>

					{companies?.length === 0 && (
						<div className="flex items-center justify-center mx-auto min-h-[40vh]">
							<div className="w-full max-w-2xl my-8 p-8 text-center bg-white border rounded-2xl border-dark-500/10">
								<IconSearch className="w-12 h-12 mx-auto text-slate-300" />
								<h2 className="mt-5 text-3xl font-bold">No results found</h2>
								<div className="mt-1 text-lg text-slate-600">
									Please check spelling, try different filters, or tell us about
									missing data.
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
					)}

					{error ? (
						<h4>Error loading companies</h4>
					) : isLoading && !initialLoad ? (
						<>
							{tableLayout ? (
								<PlaceholderTable />
							) : (
								<>
									{Array.from({ length: 9 }, (_, i) => (
										<PlaceholderCompanyCard key={i} />
									))}
								</>
							)}
						</>
					) : (
						<>
							{tableLayout ? (
								<CompaniesTable
									filterByTag={filterByTag}
									companies={companies}
									itemsPerPage={limit}
								/>
							) : (
								<div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
									{companies?.map((company) => {
										return (
											<ElemCompanyCard
												key={company.id}
												company={company as Companies}
												tagOnClick={filterByTag}
											/>
										);
									})}
								</div>
							)}
						</>
					)}

					{/* <div
						className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
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
										tagOnClick={filterByTag}
									/>
								);
							})
						)}
					</div> */}
					<Pagination
						shownItems={companies?.length}
						totalItems={companies_aggregate}
						page={page}
						itemsPerPage={limit}
						numeric
						onClickPrev={() => setPage(page - 1)}
						onClickNext={() => setPage(page + 1)}
						onClickToPage={(selectedPage) => setPage(selectedPage)}
					/>
				</div>
			</div>
			<Toaster />
		</div>
	);
};

export const getStaticProps: GetStaticProps = async (context) => {
	const { data: companies } = await runGraphQl<GetCompaniesQuery>(
		GetCompaniesDocument,
		{
			offset: 0,
			limit: 50,
			where: { slug: { _neq: "" }, status: { _eq: "published" } },
		}
	);

	return {
		props: {
			metaTitle: "Web3 Companies - EdgeIn.io",
			metaDescription:
				"Early-stage companies in this Web3 market renaissance require actionable intelligence and hyper-speed. Consider this your greatest asset.",
			companiesCount: companies?.companies_aggregate.aggregate?.count,
			initialCompanies: companies?.companies,
			companyFilters: CompaniesFilters,
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
	icon?: string;
	value: string;
}

export interface NumericFilter {
	title: string;
	description?: string;
	rangeStart: number;
	rangeEnd: number;
}

const layerFilterValues = companyLayerChoices.map((option) => {
	return {
		title: option.id,
		value: option.id,
		description: option.name,
	};
});

const LayersFilters: TextFilter[] = [
	{
		title: "All Layers",
		value: "",
	},
	...layerFilterValues,
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

const companyFilterValues = companyChoices.map((option) => {
	return {
		title: option.name,
		value: option.id,
		icon: option.id,
		disabled: option.disabled ? option.disabled : false,
	};
});

const CompaniesFilters: TextFilter[] = [
	{
		title: "All Companies",
		value: "",
	},
	...companyFilterValues,
];

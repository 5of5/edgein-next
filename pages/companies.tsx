import React, { Fragment, useEffect, useState } from "react";
import type { NextPage, GetStaticProps } from "next";
import { useRouter } from "next/router";
import moment from "moment-timezone";
import { ElemHeading } from "@/components/elem-heading";
import { PlaceholderCompanyCard } from "@/components/placeholders";
import { ElemRecentCompanies } from "@/components/companies/elem-recent-companies";
import { ElemButton } from "@/components/elem-button";
import { runGraphQl } from "@/utils";
import { IconSearch, IconAnnotation } from "@/components/icons";
import {
	Companies,
	Companies_Bool_Exp,
	GetCompaniesDocument,
	GetCompaniesQuery,
	useGetCompaniesQuery,
} from "@/graphql/types";
import { Pagination } from "@/components/pagination";
import { ElemCompanyCard } from "@/components/companies/elem-company-card";
import { companyChoices } from "@/utils/constants";
import toast, { Toaster } from "react-hot-toast";
import { useStateParams } from "@/hooks/use-state-params";
import { onTrackView } from "@/utils/track";
import { processCompaniesFilters } from "@/utils/filter";
import { ElemFilter } from "@/components/elem-filter";
import { useIntercom } from "react-use-intercom";
import useFilterParams from "@/hooks/use-filter-params";
import useLibrary from "@/hooks/use-library";
import { DeepPartial } from "@/types/common";

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
	companyStatusTags: TextFilter[];
	setToggleFeedbackForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const Companies: NextPage<Props> = ({
	companiesCount,
	initialCompanies,
	companyStatusTags,
	setToggleFeedbackForm,
}) => {
	const [initialLoad, setInitialLoad] = useState(true);

	const router = useRouter();

	const { selectedLibrary } = useLibrary();

	const { selectedFilters, setSelectedFilters } = useFilterParams();

	// Company status-tag filter
	const [selectedStatusTag, setSelectedStatusTag] = useStateParamsFilter(
		companyStatusTags,
		"statusTag"
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

	const defaultFilters = [
    { slug: { _neq: "" } },
    { library: { _contains: selectedLibrary } },
  ];

	const filters: DeepPartial<Companies_Bool_Exp> = {
		_and: defaultFilters,
	};

	useEffect(() => {
		if (!initialLoad) {
			setPage(0);
		}
		if (
			initialLoad &&
			selectedStatusTag.value !== ""
		) {
			setInitialLoad(false);
		}

		onTrackView({
			properties: filters,
			pathname: router.pathname,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedStatusTag]);

	const filterByTag = async (
		event: React.MouseEvent<HTMLDivElement>,
		tag: string
	) => {
		event.stopPropagation();
		event.preventDefault();

		const currentFilterOption = [...(selectedFilters?.industry?.tags || [])];
		const newFilterOption = currentFilterOption.includes(tag)
		? currentFilterOption.filter((t) => t !== tag)
		: [tag, ...currentFilterOption]

		if (newFilterOption.length === 0) {
			setSelectedFilters({ ...selectedFilters, industry: undefined });
		} else {
			setSelectedFilters({ ...selectedFilters, industry: {
				...selectedFilters?.industry,
				tags: newFilterOption,
			}, });
		}

		currentFilterOption.includes(tag)
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

	/** Handle selected filter params */
	processCompaniesFilters(filters, selectedFilters, defaultFilters);

	if (selectedStatusTag.value) {
		filters._and?.push({
			status_tags: { _contains: selectedStatusTag.value },
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

	const { showNewMessages } = useIntercom();

	return (
		<div className="relative">
			<ElemHeading
				title={`${selectedLibrary} Companies`}
				subtitle={`Early-stage companies in this ${selectedLibrary} market renaissance require actionable intelligence and hyper-speed. Consider this your greatest asset.`}
			></ElemHeading>

			<div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8">
				<ElemRecentCompanies className="shadow" heading="Recently Discovered" />
			</div>

			<div className="max-w-7xl px-4 mx-auto mt-7 sm:px-6 lg:px-8">
				<div className="bg-white rounded-lg shadow p-5">
					<h2 className="text-xl font-bold">Companies</h2>

					<div
						className="mt-2 -mr-5 pr-5 flex items-center justify-between border-y border-black/10 overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth snap-x snap-mandatory touch-pan-x lg:mr-0 lg:pr-0"
						role="tablist"
					>
						<nav className="flex">
							{companyStatusTags &&
								companyStatusTags.map((tab: any, index: number) =>
									tab.disabled === true ? (
										<Fragment key={index}></Fragment>
									) : (
										<button
											key={index}
											onClick={() => setSelectedStatusTag(tab)}
											className={`whitespace-nowrap flex py-3 px-3 border-b-2 box-border font-bold transition-all ${
												selectedStatusTag.value === tab.value
													? "text-primary-500 border-primary-500"
													: "border-transparent  hover:bg-slate-200"
											} ${tab.disabled ? "cursor-not-allowed" : ""}}`}
										>
											{tab.title}
										</button>
									)
								)}
						</nav>
					</div>

					<ElemFilter
						resourceType="companies"
						filterValues={selectedFilters}
						onApply={(name, filterParams) => {
							filters._and = defaultFilters;
							setSelectedFilters({ ...selectedFilters, [name]: filterParams });
						}}
						onClearOption={(name) => {
							filters._and = defaultFilters;
							setSelectedFilters({ ...selectedFilters, [name]: undefined });
						}}
						onReset={() => setSelectedFilters(null)}
					/>

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

					<div
						className={`min-h-[42vh] grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3`}
					>
						{error ? (
							<div className="flex items-center justify-center mx-auto min-h-[40vh] col-span-3">
								<div className="max-w-xl mx-auto">
									<h4 className="mt-5 text-3xl font-bold">
										Error loading companies
									</h4>
									<div className="mt-1 text-lg text-slate-600">
										Please check spelling, reset filters, or{" "}
										<button
											onClick={() =>
												showNewMessages(
													`Hi EdgeIn, I'd like to report an error on companies page`
												)
											}
											className="inline underline decoration-primary-500 hover:text-primary-500"
										>
											<span>report error</span>
										</button>
										.
									</div>
								</div>
							</div>
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
			where: { _and: [{ slug: { _neq: "" } }, { library: { _contains: "Web3" } }] }
		}
	);

	return {
		props: {
			metaTitle: "Web3 Companies - EdgeIn.io",
			metaDescription:
				"Early-stage companies in this Web3 market renaissance require actionable intelligence and hyper-speed. Consider this your greatest asset.",
			companiesCount: companies?.companies_aggregate?.aggregate?.count || 0,
			initialCompanies: companies?.companies,
			companyStatusTags,
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

const companyStatusTagValues = companyChoices.map((option) => {
	return {
		title: option.name,
		value: option.id,
		icon: option.id,
		disabled: option.disabled ? option.disabled : false,
	};
});

const companyStatusTags: TextFilter[] = [
	{
		title: "All Companies",
		value: "",
	},
	...companyStatusTagValues,
];

import React, { Fragment, useEffect, useState } from "react";
import type { NextPage, GetStaticProps } from "next";
import { useRouter } from "next/router";
import moment from "moment-timezone";
import { ElemHeading } from "@/components/ElemHeading";
import { PlaceholderCompanyCard } from "@/components/Placeholders";
import { ElemRecentCompanies } from "@/components/Companies/ElemRecentCompanies";
import { ElemButton } from "@/components/ElemButton";
import { runGraphQl } from "@/utils";
import { IconSearch, IconAnnotation } from "@/components/Icons";
import {
	Companies,
	Companies_Bool_Exp,
	GetCompaniesDocument,
	GetCompaniesQuery,
	useGetCompaniesQuery,
} from "@/graphql/types";
import { Pagination } from "@/components/Pagination";
import { ElemCompanyCard } from "@/components/Companies/ElemCompanyCard";
import { companyChoices } from "@/utils/constants";
import toast, { Toaster } from "react-hot-toast";
import { useStateParams } from "@/hooks/useStateParams";
import { onTrackView } from "@/utils/track";
import {
	ElemCompaniesFilter,
	Filters,
} from "@/components/Companies/ElemCompaniesFilter";
import { processCompaniesFilters } from "@/utils/helpers";
import { useIntercom } from "react-use-intercom";

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

export type DeepPartial<T> = T extends object
	? {
			[P in keyof T]?: DeepPartial<T[P]>;
	  }
	: T;

const Companies: NextPage<Props> = ({
	companiesCount,
	initialCompanies,
	companyStatusTags,
	setToggleFeedbackForm,
}) => {
	const [initialLoad, setInitialLoad] = useState(true);

	const router = useRouter();

	const [selectedFilters, setSelectedFilters] = useStateParams<Filters | null>(
		null,
		"filters",
		(filters) => {
			if (!filters) {
				return "";
			}
			return JSON.stringify(filters);
		},
		(filterString) => {
			if (filterString) {
				const filterJson: Filters = JSON.parse(filterString);
				if (filterJson?.lastFundingDate?.fromDate) {
					filterJson.lastFundingDate.fromDate = moment(
						filterJson.lastFundingDate.fromDate
					)
						.format()
						.split("T")[0];
				}
				if (filterJson?.lastFundingDate?.toDate) {
					filterJson.lastFundingDate.toDate = moment(
						filterJson.lastFundingDate.toDate
					)
						.format()
						.split("T")[0];
				}
				return filterJson;
			}
			return null;
		}
	);

	// Company status-tag filter
	const [selectedStatusTag, setSelectedStatusTag] = useStateParamsFilter(
		companyStatusTags,
		"statusTag"
	);

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
		_and: [{ slug: { _neq: "" } }],
	};

	useEffect(() => {
		if (!initialLoad) {
			setPage(0);
		}
		if (
			initialLoad &&
			selectedTags.length !== 0 &&
			selectedStatusTag.value !== ""
		) {
			setInitialLoad(false);
		}

		onTrackView({
			properties: filters,
			pathname: router.pathname,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedTags, selectedStatusTag]);

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

	/** Handle selected filter params */
	processCompaniesFilters(filters, selectedFilters);

	if (selectedStatusTag.value) {
		filters._and?.push({
			status_tags: { _contains: selectedStatusTag.value },
		});
	}

	if (selectedTags.length > 0) {
		let allTags: any = [];
		selectedTags.map((tag) => {
			allTags.push({ tags: { _contains: tag } });
		});

		filters._and?.push({
			_and: allTags,
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

					<ElemCompaniesFilter
						defaultFilters={selectedFilters}
						onApply={(name, filterParams) => {
							filters._and = [{ slug: { _neq: "" } }];
							setSelectedFilters({ ...selectedFilters, [name]: filterParams });
						}}
						onClearOption={(name) => {
							filters._and = [{ slug: { _neq: "" } }];
							setSelectedFilters({ ...selectedFilters, [name]: undefined });
						}}
						onReset={() => setSelectedFilters(null)}
					/>

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
					</div>
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
			where: { slug: { _neq: "" } },
		}
	);

	return {
		props: {
			metaTitle: "Web3 Companies - EdgeIn.io",
			metaDescription:
				"Early-stage companies in this Web3 market renaissance require actionable intelligence and hyper-speed. Consider this your greatest asset.",
			companiesCount: companies?.companies_aggregate.aggregate?.count,
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

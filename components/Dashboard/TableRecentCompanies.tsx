import React, { useState, PropsWithChildren } from "react";
import { useRouter } from "next/router";
import {
	Companies_Bool_Exp,
	useGetCompaniesRecentQuery,
} from "@/graphql/types";
import { useTable, useSortBy, usePagination } from "react-table";
import { numberWithCommas, formatDate } from "@/utils";
import { LoaderPlasma } from "@/components/LoaderPlasma";
import { IconChevronDown, IconChevronUp } from "@/components/Icons";
import { Pagination } from "@/components/Pagination";

type Props = {
	className?: string;
	heading?: string;
};

export type DeepPartial<T> = T extends object
	? {
			[P in keyof T]?: DeepPartial<T[P]>;
	  }
	: T;

export const TableRecentCompanies: React.FC<PropsWithChildren<Props>> = ({
	className,
	heading,
	children,
}) => {
	const router = useRouter();

	const limit = null; //99999999;
	const offset = null; //limit * page1;

	const filters: DeepPartial<Companies_Bool_Exp> = {
		_and: [{ slug: { _neq: "" } }],
	};

	const {
		data: companiesData,
		error,
		isLoading,
	} = useGetCompaniesRecentQuery({
		offset: null,
		limit: null,
		where: filters as Companies_Bool_Exp,
	});

	const columns = React.useMemo(
		() => [
			{
				Header: "Company",
				accessor: "name" as const,
				Cell: (props: any) => (
					<div className="flex items-center shrink-0 w-full">
						<div className="flex items-center justify-center shrink-0 w-10 h-10 p-0.5 overflow-hidden bg-white rounded-md shadow-md">
							<img
								className="object-fit max-w-full max-h-full rounded-md"
								src={props.row.original.logo?.url}
								alt={props.row.original.name}
							/>
						</div>
						<p className="ml-2 line-clamp-2 break-words">
							{props.row.original.name}
						</p>
					</div>
				),
				width: 170,
				disableSortBy: true,
			},
			{
				Header: "Overview",
				accessor: "overview" as const,
				width: 280,
				Cell: (props: any) => <div className="line-clamp-3">{props.value}</div>,
				disableSortBy: true,
			},
			{
				Header: "Employees",
				accessor: "total_employees" as const,
				width: 100,
				disableSortBy: true,
			},
			{
				Header: "Funding Amount",
				accessor: "investor_amount" as const,
				Cell: (props: any) => <>${numberWithCommas(Number(props.value))}</>,
				width: 100,
				disableSortBy: true,
			},
			{
				Header: "Date Added",
				accessor: "date_added" as const,
				Cell: (props: any) => (
					<>
						{formatDate(props.value, {
							month: "short",
							day: "2-digit",
							year: "numeric",
						})}
					</>
				),
				width: 120,
			},
		],
		[]
	);

	const companies = React.useMemo(() => {
		return companiesData?.companies ? companiesData?.companies : [{}];
	}, [companiesData?.companies]);

	const companiesCount = companies.length;

	const sortees = React.useMemo(
		() => [
			{
				id: "date_added",
				desc: true,
			},
		],
		[]
	);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		//rows, //"rows" gets replaced with "page" for pagination
		prepareRow,
		page,
		nextPage,
		previousPage,
		state: { pageIndex, pageSize },
	} = useTable(
		{
			columns,
			data: companies,
			autoResetPage: false,
			disableSortRemove: true,
			//autoResetSortBy: false,
			initialState: {
				sortBy: sortees,
				pageSize: 50,
			},
		},
		useSortBy,
		usePagination
	);

	const goToCompany = (
		e: React.MouseEvent<Element, MouseEvent>,
		company: any
	): void => {
		e.preventDefault();
		if (!company) return;
		const { slug }: { slug: string } = company;
		const companyUrl = "/companies/" + slug;

		if (e.metaKey || e.ctrlKey) {
			//Open in new tab
			window.open(companyUrl, "_blank");
		} else {
			router.push(companyUrl);
		}
	};

	const generateSortingIndicator = (column: any) => {
		return column.isSorted ? (
			column.isSortedDesc ? (
				<IconChevronDown className="h-4 w-4 inline-block" />
			) : (
				<IconChevronUp className="h-4 w-4 inline-block" />
			)
		) : (
			""
		);
	};

	return (
		<section className={className}>
			<h2 className="text-2xl font-bold">{heading}</h2>
			{error ? (
				<h4 className="text-xl">Error loading companies</h4>
			) : isLoading ? (
				<LoaderPlasma />
			) : (
				<div>
					<div className="overflow-x-auto mt-2 border border-dark-500/10 rounded-lg">
						<table
							{...getTableProps()}
							className="min-w-full divide-y divide-dark-500/10"
						>
							<thead>
								{headerGroups.map((headerGroup) => {
									const { key, ...restHeaderGroupProps } =
										headerGroup.getHeaderGroupProps();
									return (
										<tr
											key={key}
											{...restHeaderGroupProps}
											className="table-row"
										>
											{headerGroup.headers.map((column: any) => {
												const { key, ...restColumnProps }: any = ({} = {
													...column.getHeaderProps(
														column.getSortByToggleProps(),
														{
															style: {
																width: column.width,
																minWidth: column.width,
																maxWidth: column.width,
															},
														}
													),
												});
												return (
													<th
														key={key}
														{...restColumnProps}
														className="px-4 py-2 whitespace-nowrap font-medium text-sm bg-white text-slate-500 text-left"
													>
														{column.render("Header")}
														{generateSortingIndicator(column)}
													</th>
												);
											})}
										</tr>
									);
								})}
							</thead>
							<tbody
								{...getTableBodyProps()}
								className="bg-white divide-y divide-dark-500/10 flex-1 md:flex-none mb-96"
							>
								{page.map((row) => {
									prepareRow(row);
									const { key, ...restRowProps } = row.getRowProps();

									return (
										<tr
											key={key}
											{...restRowProps}
											onClick={(e) => goToCompany(e, row?.original)}
											className="table-row cursor-pointer rounded-lg bg-white even:bg-slate-50 transition-all hover:ring-1 hover:ring-inset hover:ring-primary-400"
										>
											{row.cells.map((cell) => {
												const { key, ...restCellProps } = cell.getCellProps({
													style: {
														width: cell.column.width,
														minWidth: cell.column.width,
														maxWidth: cell.column.width,
													},
												});

												return (
													<td
														key={key}
														{...restCellProps}
														className="align-middle text-sm font-medium px-4 py-3"
													>
														{cell.render("Cell")}
													</td>
												);
											})}
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
					<Pagination
						count={companiesCount}
						page={pageIndex}
						rowsPerPage={pageSize}
						onClickPrev={() => previousPage()}
						onClickNext={() => nextPage()}
					/>
				</div>
			)}
			{children}
		</section>
	);
};

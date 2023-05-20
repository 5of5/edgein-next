import React, { FC, useEffect, useState } from "react";
import { ElemPhoto } from "@/components/elem-photo";
import moment from "moment-timezone";
import { orderBy, first } from "lodash";
import {
	IconSortUp,
	IconSortDown,
	IconX,
	IconChevronDown,
} from "@/components/icons";
//import { Pagination } from "@/components/Pagination";
// import { Companies_Bool_Exp, useGetCompaniesQuery } from "@/graphql/types";
import { ElemReactions } from "@/components/elem-reactions";
import { TableColumnsFilter } from "@/components/companies/elem-table-columns-filter";
import { last } from "lodash";
import { Menu } from "@headlessui/react";
import { numberWithCommas } from "@/utils";

import {
	useTable,
	useResizeColumns,
	useSortBy,
	usePagination,
} from "react-table";

export type DeepPartial<T> = T extends object
	? {
			[P in keyof T]?: DeepPartial<T[P]>;
	  }
	: T;

type Props = {
	className?: string;
	itemsPerPage: number;
	filterByTag: Function;
	companies?: any;
};

export const CompaniesTable: FC<Props> = ({
	className = "",
	itemsPerPage,
	filterByTag,
	companies,
}) => {
	//console.log(companies[8].location_json);
	const getLatestRound = (theRounds: any) => {
		const latestRound: any = first(
			theRounds
				.sort(
					(
						a: { round_date: string | number | Date },
						b: { round_date: string | number | Date }
					) => {
						const distantPast = new Date("April 2, 1900 00:00:00");
						let dateA = a?.round_date ? new Date(a.round_date) : distantPast;
						let dateB = b?.round_date ? new Date(b.round_date) : distantPast;
						return dateA.getTime() - dateB.getTime();
					}
				)
				.reverse()
		);

		return latestRound;
	};

	const defaultColumn = React.useMemo(
		() => ({
			minWidth: 100,
			width: 200,
			//maxWidth: 300,
		}),
		[]
	);

	const emptyCell = React.useMemo(
		() => <div className="text-slate-400">&mdash;</div>,
		[]
	);

	const columns = React.useMemo<any[]>(
		() => [
			{
				Header: "Name",
				accessor: "name" as const,
				Cell: (props: any) => (
					<a
						href={`/companies/` + props.row.original?.slug}
						className="flex items-center space-x-3 shrink-0 group transition-all"
					>
						<ElemPhoto
							photo={props.row.original?.logo}
							wrapClass="flex items-center justify-center shrink-0 w-10 h-10 p-1 bg-white border border-black/10 rounded-lg overflow-hidden"
							imgClass="object-fit max-w-full max-h-full"
							imgAlt={props.value}
							placeholderClass="text-slate-300"
						/>
						<p className="font-bold line-clamp-2 break-words group-hover:text-primary-500">
							{props.value}
						</p>
					</a>
				),
				width: 170,
				minWidth: 200,
			},
			{
				Header: "Token",
				accessor: "coin.ticker" as const,
				Cell: (props: any) => (
					<>{props.value ? <div>{props.value}</div> : emptyCell}</>
				),
				width: 100,
			},
			{
				Header: "Industries",
				accessor: "tags" as const,
				Cell: (props: any) => (
					<div className="whitespace-nowrap truncate">
						{props.value ? (
							<>
								{props.value?.map((tag: string, index: number) => {
									return (
										<div key={index} className="inline">
											<span
												onClick={(e) => filterByTag(e, tag)}
												className="cursor-pointer border-primary-500 hover:border-b hover:text-primary-500"
											>
												{tag}
											</span>
											{last(props.value) === tag ? "" : ","}{" "}
										</div>
									);
								})}
							</>
						) : (
							emptyCell
						)}
					</div>
				),
				disableSortBy: true,
			},
			// {
			// 	Header: "Location",
			// 	accessor: "location" as const,
			// 	Cell: (props: any) => {
			// 		return <div>{props.value ? props.value : emptyCell}</div>;
			// 	},
			// 	disableSortBy: true,
			// 	minWidth: 180,
			// },
			{
				Header: "Description",
				accessor: "overview" as const,
				Cell: (props: any) => (
					<div>
						{props.value ? (
							<p className="line-clamp-2 text-sm">{props.value}</p>
						) : (
							emptyCell
						)}
					</div>
				),
				disableSortBy: true,
				width: 400,
				minWidth: 300,
			},
			{
				Header: "City",
				accessor: "location_json.city" as const,
				Cell: (props: any) => {
					return <div>{props.value ? props.value : emptyCell}</div>;
				},
				//disableSortBy: true,
				minWidth: 180,
			},
			{
				Header: "State",
				accessor: "location_json.state" as const,
				Cell: (props: any) => {
					return <div>{props.value ? props.value : emptyCell}</div>;
				},
				//disableSortBy: true,
				minWidth: 180,
			},
			{
				Header: "Country",
				accessor: "location_json.country" as const,
				Cell: (props: any) => {
					return <div>{props.value ? props.value : emptyCell}</div>;
				},
				//disableSortBy: true,
				minWidth: 180,
			},
			{
				Header: "Founded",
				accessor: "year_founded" as const,
				Cell: (props: any) => {
					return <>{props.value ? <p>{props.value}</p> : emptyCell}</>;
				},
				width: 120,
			},
			{
				Header: "Employees",
				accessor: "total_employees" as const,
				Cell: (props: any) => {
					return (
						<>
							{props.value ? <p>{numberWithCommas(props.value)}</p> : emptyCell}
						</>
					);
				},
				width: 120,
			},
			{
				Header: "Total Funding",
				accessor: (data: { investment_rounds: Array<any> }) => {
					const totalFunding = data.investment_rounds?.reduce(
						(total: number, currentValue: any) =>
							(total = total + currentValue.amount),
						0
					);

					return totalFunding;
				},
				Cell: (props: any) => {
					return (
						<div>
							{props.value > 0 ? (
								<>${numberWithCommas(props.value)}</>
							) : props.value === 0 &&
							  props.row.original?.investment_rounds.length > 0 ? (
								<>Undisclosed Capital</>
							) : (
								<>${props.value}</>
							)}
						</div>
					);
				},
				width: 140,
			},
			{
				Header: "# Funding Rounds",
				accessor: "investment_rounds.length" as const,
				Cell: (props: any) => {
					const numberOfRounds = props.value;
					return <>{numberOfRounds ? numberOfRounds : emptyCell}</>;
				},
				width: 100,
			},
			{
				Header: "Last Funding Date",
				accessor: (data: { investment_rounds: Array<any> }) => {
					if (!data.investment_rounds) {
						return 0;
					} else {
						const latestRound = getLatestRound(data.investment_rounds);

						const out = latestRound?.round_date ? latestRound?.round_date : 0;

						return out;
					}
				},
				Cell: (props: any) => {
					return (
						<div>
							{props.value ? moment(props.value).format("LL") : emptyCell}
						</div>
					);
				},
				width: 120,
			},
			{
				Header: "Last Funding Total",
				accessor: (data: { investment_rounds: Array<any> }) => {
					if (!data.investment_rounds) {
						return 0;
					} else {
						const latestRound = getLatestRound(data.investment_rounds);

						const out = latestRound?.amount ? latestRound?.amount : 0;

						return out;
					}
				},
				Cell: (props: any) => {
					return (
						<div>
							{props.value > 0 ? (
								<>${numberWithCommas(props.value)}</>
							) : props.value === 0 &&
							  props.row.original?.investment_rounds.length > 0 ? (
								<>Undisclosed Capital</>
							) : (
								emptyCell
							)}
						</div>
					);
				},
				width: 140,
			},
			{
				Header: "Last Funding Type",
				accessor: (data: { investment_rounds: Array<any> }) => {
					if (!data.investment_rounds) {
						return 0;
					} else {
						const latestRound = getLatestRound(data.investment_rounds);

						const out = latestRound?.round ? latestRound?.round : 0;

						return out;
					}
				},
				Cell: (props: any) => {
					return <div>{props.value ? props.value : emptyCell}</div>;
				},
			},
			{
				Header: "Reactions",
				accessor: "company" as const,
				Cell: (props: any) => (
					<div>
						{props.row.original && (
							<ElemReactions
								resource={props.row.original}
								resourceType={"companies"}
								isInteractive={false}
							/>
						)}
					</div>
				),
				disableSortBy: true,
			},
		],
		[filterByTag, emptyCell]
	);

	const getCompanies = React.useMemo(() => {
		return companies ? companies : [{}];
		//return companiesData?.companies ? companiesData?.companies : [{}];
	}, [companies]);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		page,
		prepareRow,
		setSortBy,
		allColumns,
		nextPage,
		previousPage,
		state: { pageIndex, pageSize, selectedRowIds },
		//toggleAllRowsSelected,
	} = useTable(
		{
			columns: columns,
			data: getCompanies,
			disableSortRemove: true,
			autoResetSortBy: false,
			initialState: {
				pageSize: itemsPerPage,
			},
			defaultColumn,
			autoResetHiddenColumns: false,
			autoResetResize: false,
		},
		useResizeColumns,
		useSortBy,
		usePagination
	);

	const generateSortingIndicator = (column: any) => {
		return (
			<>
				{column.isSorted ? (
					column.isSortedDesc ? (
						<IconSortDown className="ml-1 h-5 w-5 inline-block" />
					) : (
						<IconSortUp className="ml-1 h-5 w-5 inline-block" />
					)
				) : column.canSort ? (
					<IconSortDown className="ml-1 h-5 w-5 inline-block text-slate-400 group-hover:text-primary-500" />
				) : (
					<></>
				)}
			</>
		);
	};

	return (
		<div className={`${className}`}>
			<div className="flex items-center justify-between space-x-2">
				<TableColumnsFilter columns={allColumns} />

				<div>0-50 of 20,0000 companies </div>
			</div>

			<div className="overflow-auto border border-black/10 rounded-lg mt-2">
				<table
					{...getTableProps()}
					className="table-auto min-w-full divide-y divide-black/10 overscroll-x-none"
				>
					<thead className="">
						{headerGroups.map((headerGroup) => {
							const { key, ...restHeaderGroupProps } =
								headerGroup.getHeaderGroupProps();
							return (
								<tr
									key={key}
									{...restHeaderGroupProps}
									className="table-row min-w-full"
								>
									{headerGroup.headers.map((column: any) => {
										const { key, ...restColumnProps }: any = ({} = {
											...column.getHeaderProps({
												style: {
													width: column.width,
													minWidth: column.minWidth,
													maxWidth: column.maxWidth,
												},
											}),
										});

										return (
											<th
												key={key}
												{...restColumnProps}
												className={`relative px-2 py-2 whitespace-nowrap font-bold text-sm text-left min-w-content`}
											>
												<div className="flex items-center min-w-content">
													{column.render("Header")}
													<Menu
														as="div"
														className="relative inline-block text-left ml-1"
													>
														<Menu.Button className="block align-middle text-slate-400 rounded-full hover:text-primary-500 hover:bg-slate-100">
															<IconChevronDown className="h-5 w-5" />
														</Menu.Button>

														<Menu.Items className="absolute z-50 left-0 origin-top-left flex flex-col mt-2 w-56 divide-y divide-gray-100 rounded-lg bg-white shadow ring-1 ring-black ring-opacity-5 overflow-hidden focus:outline-none">
															{column.canSort && (
																<Menu.Item
																	as="button"
																	className={`flex items-center w-full px-2 py-2 text-sm text-left font-medium hover:text-primary-500 hover:bg-slate-100 ${
																		column.isSorted &&
																		column.isSortedDesc === false
																			? "text-primary-500"
																			: ""
																	}`}
																	onClick={(e: any) => {
																		column.getHeaderProps(
																			setSortBy([
																				{ id: column.id, desc: false },
																			])
																		);
																	}}
																>
																	<IconSortUp className="mr-1 h-5 w-5 inline-block" />
																	Sort Ascending
																</Menu.Item>
															)}

															{column.canSort && (
																<Menu.Item
																	as="button"
																	className={`flex items-center w-full px-2 py-2 text-sm text-left font-medium hover:text-primary-500 hover:bg-slate-100 ${
																		column.isSorted &&
																		column.isSortedDesc === true
																			? "text-primary-500"
																			: ""
																	}`}
																	onClick={(e: any) => {
																		column.getHeaderProps(
																			setSortBy([{ id: column.id, desc: true }])
																		);
																	}}
																>
																	<IconSortDown className="mr-1 h-5 w-5 inline-block" />
																	Sort Descending
																</Menu.Item>
															)}

															{column.render("Header") != "Name" && (
																<Menu.Item
																	as="button"
																	className="flex items-center w-full px-2 py-2 text-sm text-left font-medium hover:text-primary-500 hover:bg-slate-100"
																	onClick={(e: any) => {
																		column.getHeaderProps(
																			column.toggleHidden()
																		);
																	}}
																>
																	<IconX className="mr-1 h-5 w-5 inline-block" />
																	Hide Column
																</Menu.Item>
															)}
														</Menu.Items>
													</Menu>

													<div
														{...column.getResizerProps()}
														className={`group absolute top-0 right-0 inline-block resizer w-1 h-full touch-none ${
															column.isResizing ? "isResizing select-none" : ""
														}`}
														onClick={(event) => event.stopPropagation()}
													>
														<div
															className={`w-px h-full translate-x-0.5 ${
																column.isResizing
																	? "bg-primary-500"
																	: "bg-black/10 group-hover:bg-primary-500"
															}`}
														></div>
													</div>
												</div>
											</th>
										);
									})}
								</tr>
							);
						})}
					</thead>
					<tbody
						{...getTableBodyProps()}
						className="bg-white divide-y divide-black/10"
					>
						{page.map((row) => {
							prepareRow(row);
							const { key, ...restRowProps } = row.getRowProps();

							return (
								<tr
									key={key}
									{...restRowProps}
									className="min-w-full bg-white hover:bg-slate-100"
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
												className="align-middle text-sm p-2"
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
			{/* <Pagination
				shownItems={page?.length}
				totalItems={companies?.length}
				page={pageIndex}
				itemsPerPage={pageSize}
				onClickPrev={() => previousPage()}
				onClickNext={() => nextPage()}
			/> */}
		</div>
	);
};

import React, { FC, useEffect, useState } from "react";
import { ElemPhoto } from "@/components/elem-photo";
import moment from "moment-timezone";
import { orderBy, first } from "lodash";
import {
	IconSortUp,
	IconSortDown,
	IconX,
	IconChevronDown,
	IconChevronLeft,
	IconChevronRight,
} from "@/components/icons";
import { ElemButton } from "@/components/elem-button";
import { ElemReactions } from "@/components/elem-reactions";
import { TableColumnsFilter } from "@/components/my-list/table-columns-filter";
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
	investors?: any;
	pageNumber: number;
	itemsPerPage: number;
	shownItems?: number;
	totalItems: number;
	filterByTag: Function;
	onClickPrev?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	onClickNext?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const InvestorsTable: FC<Props> = ({
	className = "",
	investors,
	pageNumber,
	itemsPerPage,
	shownItems = 0,
	totalItems,
	filterByTag,
	onClickPrev,
	onClickNext,
}) => {
	const shownItemsStart = pageNumber === 0 ? 1 : pageNumber * itemsPerPage;
	const shownItemsEnd =
		shownItems < itemsPerPage ? totalItems : (pageNumber + 1) * itemsPerPage;

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
						href={`/investors/` + props.row.original?.slug}
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
			// {
			// 	Header: "Employees",
			// 	accessor: "total_employees" as const,
			// 	Cell: (props: any) => {
			// 		return (
			// 			<>
			// 				{props.value ? <p>{numberWithCommas(props.value)}</p> : emptyCell}
			// 			</>
			// 		);
			// 	},
			// 	width: 120,
			// },
			{
				Header: "Investments Total",
				accessor: (data: {
					investments: {
						[x: string]: any;
						investment_round: Object;
					};
				}) => {
					const investmentRounds = data?.investments?.flatMap(
						(item: any) => item.investment_round
					);

					const investmentsTotal = investmentRounds?.reduce(
						(total: number, currentValue: any) =>
							(total = total + (currentValue ? currentValue.amount : 0)),
						0
					);

					return investmentsTotal;
				},
				Cell: (props: any) => {
					return (
						<div>
							{props.value ? <>${numberWithCommas(props.value)}</> : emptyCell}
						</div>
					);
				},
				width: 140,
			},
			{
				Header: "# Investment Rounds",
				accessor: "num_of_investments" as const,
				Cell: (props: any) => {
					return <>{props.value ? props.value : emptyCell}</>;
				},
				width: 40,
			},
			{
				Header: "Last Investment Date",
				accessor: (data: {
					investments: {
						[x: string]: any;
						investment_round: Object;
					};
				}) => {
					const investmentRounds = data?.investments?.flatMap(
						(item: any) => item.investment_round
					);

					if (!investmentRounds) {
						return 0;
					} else {
						const latestRound = getLatestRound(investmentRounds);

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
				Header: "Last Investment Type",
				accessor: (data: {
					investments: {
						[x: string]: any;
						investment_round: Object;
					};
				}) => {
					const investmentRounds = data?.investments?.flatMap(
						(item: any) => item.investment_round
					);

					if (!investmentRounds) {
						return 0;
					} else {
						const latestRound = getLatestRound(investmentRounds);

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
								resourceType={"vc_firms"}
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

	const getInvestors = React.useMemo(() => {
		return investors ? investors : [{}];
	}, [investors]);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		page,
		prepareRow,
		setSortBy,
		allColumns,
		// nextPage,
		// previousPage,
		toggleHideAllColumns,
		// state: { pageIndex, pageSize, selectedRowIds },
		//toggleAllRowsSelected,
	} = useTable(
		{
			columns: columns,
			data: getInvestors,
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

	return (
		<div className={`${className}`}>
			<div className="flex flex-wrap items-center justify-between space-x-2 p-2 rounded-t-lg border-t border-x border-black/10">
				<TableColumnsFilter
					columns={allColumns}
					resetColumns={() => toggleHideAllColumns(false)}
				/>

				<div className="flex">
					{shownItems === 0 ? (
						<></>
					) : shownItems == totalItems ? (
						<div>
							{shownItemsStart}
							{" - "} {shownItemsEnd} of {totalItems} investors
						</div>
					) : (
						<div>
							{numberWithCommas(shownItemsStart)}
							{"-"}
							{numberWithCommas(shownItemsEnd)} of{" "}
							{numberWithCommas(totalItems)} investors
						</div>
					)}
					<div className="flex space-x-1 ml-2">
						<ElemButton
							onClick={pageNumber * itemsPerPage > 0 ? onClickPrev : undefined}
							btn="white"
							roundedFull={true}
							className={`px-1 aspect-square ${
								pageNumber * itemsPerPage > 0
									? ""
									: "opacity-50 cursor-default hover:!bg-white hover:!text-current"
							}`}
						>
							<IconChevronLeft className="h-5 w-5" />
						</ElemButton>

						<ElemButton
							onClick={totalItems > shownItemsEnd ? onClickNext : undefined}
							btn="white"
							roundedFull={true}
							className={`px-1 aspect-square ${
								totalItems > shownItemsEnd
									? ""
									: "opacity-50 cursor-default hover:!bg-white hover:!text-current"
							}`}
						>
							<IconChevronRight className="h-5 w-5" />
						</ElemButton>
					</div>
				</div>
			</div>

			<div className="overflow-auto border border-black/10 overflow-y-hidden">
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
		</div>
	);
};

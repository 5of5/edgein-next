import { Follows_Companies } from "@/graphql/types";
import { compact, has, last, orderBy } from "lodash";
import moment from "moment-timezone";
import React, { FC, useEffect, useState } from "react";
import { Menu } from "@headlessui/react";
import {
	useTable,
	useResizeColumns,
	useSortBy,
	usePagination,
	useRowSelect,
	useGlobalFilter,
} from "react-table";
import { TableColumnsFilter } from "./TableColumnsFilter";
import { TableGlobalFilter } from "./TableGlobalFilter";
import { ElemPhoto } from "@/components/ElemPhoto";
import {
	IconSortUp,
	IconSortDown,
	IconX,
	IconTrash,
	IconChevronDown,
} from "@/components/Icons";
import { Pagination } from "@/components/Pagination";
import { ElemButton } from "@/components/ElemButton";
import { useCheckboxes } from "./IndeterminateCheckbox";
import {
	convertToInternationalCurrencySystem,
	numberWithCommas,
} from "@/utils";
import { ElemReactions } from "@/components/ElemReactions";
import toast, { Toaster } from "react-hot-toast";
import { useUser } from "@/context/userContext";

type Props = {
	companies?: Follows_Companies[];
	isCustomList?: boolean;
	selectedListName: string | null;
};

export const CompaniesList: FC<Props> = ({
	companies,
	isCustomList,
	selectedListName,
}) => {
	const { refreshProfile } = useUser();

	const [resourceList, setResourceList] = useState<Follows_Companies[]>();

	const [fundingTotal, setFundingTotal] = useState(0);

	const [tags, setTags] = useState<any>([]);

	const listNameTitle = selectedListName === "crap" ? "sh**" : selectedListName;

	useEffect(() => {
		let funding = 0;
		let allCompaniesTags: any = [];
		if (companies) {
			setResourceList(companies);
		}
		if (companies) {
			companies.forEach((item) => {
				if (item.company?.tags && item.company?.tags.length > 0) {
					item.company?.tags.forEach((tag: string) => {
						allCompaniesTags.push(tag);
					});
				}

				item.company?.investment_rounds.forEach((round) => {
					funding += round.amount;
				});
			});
		}
		setTags(allCompaniesTags);
		setFundingTotal(funding);
	}, [companies]);

	let reducedTagsArray = tags.reduce(
		(tag: { name: any; count: number }[], curr: any, _: any, arr: any) => {
			if (tag.length == 0) tag.push({ name: curr, count: 1 });
			else if (tag.findIndex((f) => f.name === curr) === -1)
				tag.push({ name: curr, count: 1 });
			else ++tag[tag.findIndex((f) => f.name === curr)].count;
			return tag;
		},
		[]
	);

	const sortedTags = reducedTagsArray.sort(
		(a: { count: number }, b: { count: number }) => b.count - a.count
	);

	const defaultColumn = React.useMemo(
		() => ({
			minWidth: 100,
			width: 120,
			sortType: "alphanumericNullLast",
			//maxWidth: 300,
		}),
		[]
	);

	const emptyCell = React.useMemo(
		() => <div className="text-slate-400">&mdash;</div>,
		[]
	);

	const sortTypes = React.useMemo(
		() => ({
			alphanumericNullLast(rowA: any, rowB: any, columnId: string, desc: any) {
				const a = rowA.values[columnId];
				const b = rowB.values[columnId];

				if (!a && !b) {
					return 0;
				}

				if (!a) {
					return desc ? -1 : 1;
				}

				if (!b) {
					return desc ? 1 : -1;
				}

				return a
					.toString()
					.localeCompare(b.toString(), "en", { numeric: true });
			},
		}),
		[]
	);

	const columns = React.useMemo<any[]>(
		() => [
			{
				Header: "Name",
				accessor: "company.name" as const,
				Cell: (props: any) => (
					<div>
						<a
							href={`/companies/` + props.row.original?.company?.slug}
							className="flex items-center space-x-3 shrink-0 group transition-all"
						>
							<ElemPhoto
								photo={props.row.original?.company?.logo}
								wrapClass="flex items-center justify-center shrink-0 w-10 h-10 p-1 bg-white border border-black/10 rounded-lg overflow-hidden"
								imgClass="object-fit max-w-full max-h-full"
								imgAlt={props.value}
								placeholderClass="text-slate-300"
							/>
							<p className="font-bold line-clamp-2 break-words group-hover:text-primary-500">
								{props.value}
							</p>
						</a>
					</div>
				),
				width: 170,
				minWidth: 200,
				//disableDropdown: true,
				//disableResizing: true,
				disableHiding: true,
			},
			{
				Header: "Token",
				accessor: "company.coin.ticker" as const,
				Cell: (props: any) => (
					<>{props.value ? <div>{props.value}</div> : emptyCell}</>
				),
				width: 100,
			},
			{
				Header: "Industries",
				accessor: "company.tags" as const,
				Cell: (props: any) => (
					<div className="whitespace-nowrap truncate">
						{props.value ? (
							<>
								{props.value?.map((tag: string, index: number) => {
									return (
										<div key={index} className="inline">
											<a
												href={`/companies/?tags=${tag}`}
												className="cursor-pointer border-primary-500 hover:border-b hover:text-primary-500"
											>
												{tag}
											</a>
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
				width: 200,
			},
			{
				Header: "Description",
				accessor: "company.overview" as const,
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
			// {
			// 	Header: "Location",
			// 	accessor: "company.location" as const,
			// 	Cell: (props: any) => {
			// 		return <div>{props.value ? props.value : emptyCell}</div>;
			// 	},
			// 	disableSortBy: true,
			// 	minWidth: 180,
			// },
			{
				Header: "City",
				accessor: "company.location_json.city" as const,
				Cell: (props: any) => {
					return <div>{props.value ? props.value : emptyCell}</div>;
				},
				width: 120,
			},
			{
				Header: "State",
				accessor: "company.location_json.state" as const,
				Cell: (props: any) => {
					return <div>{props.value ? props.value : emptyCell}</div>;
				},
				width: 120,
			},
			{
				Header: "Country",
				accessor: "company.location_json.country" as const,
				Cell: (props: any) => {
					return <div>{props.value ? props.value : emptyCell}</div>;
				},
				width: 120,
			},
			{
				Header: "Founded",
				accessor: "company.year_founded" as const,
				Cell: (props: any) => {
					return <>{props.value ? <p>{props.value}</p> : emptyCell}</>;
				},
				width: 120,
			},
			{
				Header: "Employees",
				accessor: "company.total_employees" as const,
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
				accessor: (data: { company: { investment_rounds: Array<any> } }) => {
					const totalFunding = data.company?.investment_rounds?.reduce(
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
							  props.row.original?.company.investment_rounds.length > 0 ? (
								<>Undisclosed Capital</>
							) : (
								<>{emptyCell}</>
							)}
						</div>
					);
				},
				width: 140,
			},
			{
				Header: "# Funding Rounds",
				accessor: "company.investment_rounds.length" as const,
				Cell: (props: any) => {
					const numberOfRounds = props.value;
					return <>{numberOfRounds ? numberOfRounds : emptyCell}</>;
				},
				width: 100,
			},
			{
				Header: "Last Funding Date",
				accessor: (data: { company: { investment_rounds: Array<any> } }) => {
					if (data.company?.investment_rounds.length > 0) {
						const roundsByLatestDate = orderBy(
							data.company?.investment_rounds,
							(a) => new Date(a.round_date),
							["desc"]
						);

						return roundsByLatestDate[0].round_date;
					} else {
						return 0;
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
				Header: "Last Funding Type",
				accessor: (data: { company: { investment_rounds: Array<any> } }) => {
					if (data.company?.investment_rounds.length > 0) {
						const roundsByLatestDate = orderBy(
							data.company?.investment_rounds,
							(a) => new Date(a.round_date),
							["desc"]
						);

						return roundsByLatestDate[0].round;
					} else {
						return 0;
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
						{props.value && (
							<ElemReactions
								resource={props.value}
								resourceType={"companies"}
								isInteractive={false}
							/>
						)}
					</div>
				),
				width: 200,
				disableSortBy: true,
			},
		],
		[emptyCell]
	);

	const getCompanies = React.useMemo(() => {
		return resourceList ? resourceList : [{}];
	}, [resourceList]);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		//rows, "rows" gets replaced with "page" for pagination
		prepareRow,
		setSortBy,
		allColumns,
		page,
		nextPage,
		previousPage,
		selectedFlatRows,
		toggleHideAllColumns,
		state: { pageIndex, pageSize, selectedRowIds, globalFilter },
		toggleAllRowsSelected,
		preGlobalFilteredRows,
		setGlobalFilter,
	} = useTable(
		{
			columns: columns,
			data: getCompanies,
			disableSortRemove: true,
			autoResetSortBy: false,
			sortTypes,
			initialState: {
				pageSize: 10,
			},
			defaultColumn,
			autoResetHiddenColumns: false,
			autoResetResize: false,
		},
		useGlobalFilter,
		useSortBy,
		usePagination,
		useRowSelect,
		useResizeColumns,
		useCheckboxes
	);

	const onRemove = async () => {
		const followIds = compact(
			selectedFlatRows.map((row: any, index: number) => row.original?.id)
		);

		const deleteCompaniesRes = await fetch(`/api/delete_follows/`, {
			method: "POST",
			body: JSON.stringify({ followIds }),
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});

		if (deleteCompaniesRes.ok) {
			setResourceList((prev) => {
				return prev?.filter(
					(resource) => !followIds.includes(resource.id as number)
				);
			});
			refreshProfile();
			toast.custom(
				(t) => (
					<div
						className={`bg-slate-800 text-white py-2 px-4 rounded-lg transition-opacity ease-out duration-300 ${
							t.visible ? "animate-fade-in-up" : "opacity-0"
						}`}
					>
						Removed from {listNameTitle}
					</div>
				),
				{
					duration: 3000,
					position: "top-center",
				}
			);
		}
	};

	return (
		<div className="rounded-lg p-5 bg-white shadow mb-8">
			<div className="sm:flex items-start justify-between mb-2">
				{listNameTitle && (
					<h2 className="font-bold text-lg capitalize mr-2">
						{listNameTitle}: Companies
					</h2>
				)}

				{fundingTotal > 0 && (
					<div className="flex items-center sm:justify-center sm:text-right font-bold shrink-0 mr-2">
						<div className="text-sm mr-1">Total Funding</div>
						<div className="text-green-600 text-lg">
							${convertToInternationalCurrencySystem(fundingTotal)}
						</div>
					</div>
				)}
			</div>

			{/* {sortedTags.length > 0 && (
				<div className="sm:flex items-start w-full mb-3">
					<div className="font-bold text-sm mr-2 py-0.5">Tags:</div>
					<div className="flex gap-2 flex-wrap">
						{sortedTags.map(
							(
								{
									name,
									count,
								}: {
									name: string;
									count: number;
								},
								index: number
							) => (
								<div
									key={index}
									className="group inline-flex items-center shrink-0 px-2 py-0.5 bg-slate-200 rounded-md text-sm"
								>
									<span>{name}</span>

									<span className="pl-1 text-sm proportional-nums lining-nums">
										({count})
									</span>
								</div>
							)
						)}
					</div>
				</div>
			)} */}

			{preGlobalFilteredRows.length > 0 && (
				<div className="flex items-center space-x-2 mb-2">
					{Object.keys(selectedRowIds).length > 0 ? (
						<>
							<button
								onClick={onRemove}
								className="relative inline-flex items-center text-sm rounded-md px-2 py-1.5 transition ease-in-out duration-150 group bg-white ring-inset ring-1 ring-slate-200 hover:text-red-600 hover:bg-slate-200 focus:outline-none focus:ring-1"
							>
								<IconTrash className="h-5 w-5 mr-1" title="Remove from list" />
								<div>Remove from list</div>
							</button>
							<button
								onClick={() => toggleAllRowsSelected(false)}
								className="relative inline-flex items-center text-sm rounded-md px-2 py-1.5 transition ease-in-out duration-150 group bg-white ring-inset ring-1 ring-slate-200 hover:text-primary-500 hover:bg-slate-200 focus:outline-none focus:ring-1"
							>
								<IconX className="h-5 w-5 mr-1" title="Clear Selection" />
								<div>Cancel</div>
							</button>

							<div className="text-sm shrink-0">
								{Object.keys(selectedRowIds).length} organization
								{Object.keys(selectedRowIds).length > 1 && "s"} selected
							</div>
						</>
					) : (
						<div className="flex flex-col space-y-1 sm:flex-row sm:items-center sm:space-x-3 sm:space-y-0">
							<TableColumnsFilter
								columns={allColumns}
								resetColumns={() => toggleHideAllColumns(false)}
							/>
							<TableGlobalFilter
								preGlobalFilteredRows={preGlobalFilteredRows}
								globalFilter={globalFilter}
								setGlobalFilter={setGlobalFilter}
							/>
						</div>
					)}
				</div>
			)}

			<div className="relative -mx-5 lg:mx-0">
				<div className="absolute pointer-events-none w-8 bg-gradient-to-l from-white z-10 rounded-tr-lg rounded-br-lg top-px bottom-px right-0 sm:right-px"></div>
				<div className="w-full border-y border-black/10 overflow-auto lg:border lg:rounded-lg">
					{preGlobalFilteredRows.length > 0 ? (
						<table
							{...getTableProps()}
							className="table-auto divide-y divide-black/10 overscroll-x-none"
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

															{column.disableDropdown != true && (
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
																						setSortBy([
																							{ id: column.id, desc: true },
																						])
																					);
																				}}
																			>
																				<IconSortDown className="mr-1 h-5 w-5 inline-block" />
																				Sort Descending
																			</Menu.Item>
																		)}

																		{!column.disableHiding && (
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
															)}

															{column.canResize && (
																<div
																	{...column.getResizerProps()}
																	className={`group absolute top-0 right-0 inline-block resizer w-1 h-full touch-none ${
																		column.isResizing
																			? "isResizing select-none"
																			: ""
																	}`}
																	onClick={(event) => event.stopPropagation()}
																>
																	<div
																		className={`w-px h-full ${
																			column.isResizing
																				? "bg-primary-500"
																				: "bg-black/10 group-hover:bg-primary-500"
																		}`}
																	></div>
																</div>
															)}
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
					) : (
						<div className="flex flex-col w-full items-center justify-center  p-5 text-slate-600">
							<div className="max-w-sm text-center">
								There are no companies in this list.
							</div>
							<ElemButton
								href="/companies"
								btn="transparent"
								arrow
								className="px-0"
							>
								Explore Companies
							</ElemButton>
						</div>
					)}
				</div>
			</div>
			<Pagination
				shownItems={page?.length}
				totalItems={getCompanies.length}
				page={pageIndex}
				itemsPerPage={pageSize}
				onClickPrev={() => previousPage()}
				onClickNext={() => nextPage()}
			/>
			<Toaster />
		</div>
	);
};

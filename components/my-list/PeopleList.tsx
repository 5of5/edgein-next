import { Follows_People } from "@/graphql/types";
import { compact } from "lodash";
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
import { TableColumnsFilter } from "./table-columns-filter";
import { TableGlobalFilter } from "./TableGlobalFilter";
import { ElemPhoto } from "@/components/elem-photo";
import {
	IconSortUp,
	IconSortDown,
	IconX,
	IconTrash,
	IconChevronDown,
} from "@/components/icons";
import { Pagination } from "@/components/pagination";
import { useCheckboxes } from "./indeterminate-checkbox";
import toast, { Toaster } from "react-hot-toast";
import { useUser } from "@/context/user-context";
import { removeSpecialCharacterFromString } from "@/utils";

type Props = {
	people?: Follows_People[];
	selectedListName: string | null;
};

export const PeopleList: FC<Props> = ({ people, selectedListName }) => {
	const { refreshProfile } = useUser();

	const [resourceList, setResourceList] = useState<Follows_People[]>([]);

	const listNameTitle = selectedListName === "crap" ? "sh**" : selectedListName;

	useEffect(() => {
		if (people) {
			setResourceList(people);
		}
	}, [people]);

	const defaultColumn = React.useMemo(
		() => ({
			minWidth: 100,
			width: 120,
			//maxWidth: 300,
			sortType: "alphanumericNullLast",
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
				accessor: "person.name" as const,
				Cell: (props: any) => (
					<div>
						<a
							href={`/people/` + props.row.original?.person?.slug}
							className="flex items-center space-x-3 shrink-0 group transition-all"
						>
							<ElemPhoto
								photo={props.row.original?.person?.picture}
								wrapClass="flex items-center justify-center shrink-0 w-10 h-10 bg-white border border-black/10 rounded-lg overflow-hidden"
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
				//width: 300,
				minWidth: 320,
				//disableDropdown: true,
				//disableResizing: true,
				disableHiding: true,
			},
			{
				Header: "Email",
				accessor: "person.work_email" as const,
				Cell: (props: any) => {
					let emails: any = [];

					if (props.value) {
						emails.push(props.value);
					}
					if (props.row.original?.person?.personal_email) {
						emails.push(props.row.original?.person?.personal_email);
					}

					return (
						<div>
							{emails.length > 0
								? [
										emails?.map((email: string, index: number) => {
											return (
												<a
													key={index}
													href={`mailto:${email}`}
													className="block text-sm hover:text-primary-500"
												>
													{email}
												</a>
											);
										}),
								  ]
								: emptyCell}
						</div>
					);
				},
				disableSortBy: true,
				minWidth: 320,
			},
			{
				Header: "Roles",
				accessor: "person.type" as const,
				Cell: (props: any) => {
					return (
						<div>
							{props.value
								? removeSpecialCharacterFromString(props.value)
								: emptyCell}
						</div>
					);
				},
				//	disableSortBy: true,
				minWidth: 160,
			},
			{
				Header: "Linkedin",
				accessor: "person.linkedin" as const,
				Cell: (props: any) => {
					return (
						<div>
							{props.value ? (
								<a
									href={props.value}
									target="_blank"
									rel="noreferrer"
									className="inline-block text-sm hover:text-primary-500"
								>
									View LinkedIn
								</a>
							) : (
								emptyCell
							)}
						</div>
					);
				},
				disableSortBy: true,
				minWidth: 160,
			},
			{
				Header: "Github",
				accessor: "person.github" as const,
				Cell: (props: any) => {
					return (
						<div>
							{props.value ? (
								<a
									href={props.value}
									target="_blank"
									rel="noreferrer"
									className="inline-block text-sm hover:text-primary-500"
								>
									View Github
								</a>
							) : (
								emptyCell
							)}
						</div>
					);
				},
				disableSortBy: true,
				minWidth: 160,
			},
		],
		[emptyCell]
	);

	const getPeople = React.useMemo(() => {
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
			data: getPeople,
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

		const deletePeopleRes = await fetch(`/api/delete_follows/`, {
			method: "POST",
			body: JSON.stringify({ followIds }),
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});

		if (deletePeopleRes.ok) {
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
						{listNameTitle}: People
					</h2>
				)}
			</div>

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
								{Object.keys(selectedRowIds).length}
								{Object.keys(selectedRowIds).length > 1
									? " people"
									: " person"}{" "}
								selected
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
				<div className="border-y border-black/10 overflow-auto lg:border lg:rounded-lg">
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
						<div className="flex flex-col w-full items-center justify-center p-5 text-slate-600">
							<div className="max-w-sm text-center">
								There are no people in this list.
							</div>
						</div>
					)}
				</div>
			</div>
			<Pagination
				shownItems={page?.length}
				totalItems={getPeople.length}
				page={pageIndex}
				itemsPerPage={pageSize}
				onClickPrev={() => previousPage()}
				onClickNext={() => nextPage()}
			/>
			<Toaster />
		</div>
	);
};

// Define a default UI for filtering
// const GlobalFilter: any = ({
// 	preGlobalFilteredRows,
// 	globalFilter,
// 	setGlobalFilter,
// }: any) => {
// 	const count = preGlobalFilteredRows.length;
// 	const [value, setValue] = useState(globalFilter);

// 	const onChange = useAsyncDebounce((value) => {
// 		setGlobalFilter(value || undefined);
// 	}, 750);

// 	return (
// 		<span>
// 			Search:{" "}
// 			<input
// 				className="border-2 border-slate-200 p-2 rounded-md w-1/2 focus:outline-teal-500 focus-visible:outline-teal-500"
// 				value={value || ""}
// 				onChange={(e) => {
// 					setValue(e.target.value);
// 					//setGlobalFilter(e.target.value.length > 0 ? value : undefined);
// 					onChange(e.target.value);
// 				}}
// 				placeholder={`${count} items...`}
// 			/>
// 		</span>
// 	);
// };

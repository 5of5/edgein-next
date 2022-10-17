import { Follows_Companies } from "@/graphql/types";
import { compact, has } from "lodash";
import React, { FC, useEffect, useState } from "react";
import { useTable, useSortBy, usePagination, useRowSelect } from "react-table";
import { ElemPhoto } from "@/components/ElemPhoto";
import { IconSortUp, IconSortDown, IconX, IconTrash } from "@/components/Icons";
import { Pagination } from "@/components/Pagination";
import { ElemButton } from "@/components/ElemButton";
import { ElemDeleteListsModal } from "./ElemDeleteListsModal";
import { useCheckboxes } from "./IndeterminateCheckbox";
import { convertToInternationalCurrencySystem } from "@/utils";
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
	const { refreshProfile } = useUser()
	
	const [showDeleteItemsModal, setShowDeleteItemsModal] = useState(false);

	const [resourceList, setResourceList] = useState<Follows_Companies[]>();

	const [fundingTotal, setFundingTotal] = useState(0);

	const [tagsCount, setTagsCount] = useState<any>({});

	const listNameTitle = selectedListName === "crap" ? "sh**" : selectedListName;

	// const handleRowClick = (link: string) => {
	// 	router.push(link);
	// };

	useEffect(() => {
		let funding = 0;
		if (companies) setResourceList(companies);
		if (companies) {
			companies.forEach(({ company }) => {
				setTagsCount(() => {
					let prev: any = {};
					company?.tags?.forEach((tag: string) => {
						if (!has(prev, tag)) prev = { ...prev, [tag]: 1 };
						else prev[tag] += 1;
					});
					return prev;
				});
				company?.investment_rounds.forEach((round) => {
					funding += round.amount;
				});
			});
		}
		setFundingTotal(funding);
	}, [companies]);

	const columns = React.useMemo(
		() => [
			{
				Header: "Name",
				accessor: "company.name" as const,
				Cell: (props: any) => (
					<a
						href={`/companies/` + props.row.original.company?.slug}
						className="flex items-center space-x-3 shrink-0 group transition-all hover:-translate-y-0.5"
					>
						<ElemPhoto
							photo={props.row.original.company?.logo}
							wrapClass="flex items-center justify-center shrink-0 w-10 h-10 p-1 bg-white border border-black/10 rounded-lg overflow-hidden"
							imgClass="object-fit max-w-full max-h-full"
							imgAlt={props.value}
							placeholderClass="text-slate-300"
						/>
						<p className="line-clamp-2 break-words group-hover:text-primary-500">
							{props.value}
						</p>
					</a>
				),
				width: 170,
			},
			{
				Header: "Token/Value",
				accessor: "company.coin" as const,
				Cell: (props: any) => (
					<div>{props.value?.ticker ? props.value.ticker : <>&mdash;</>}</div>
				),
				disableSortBy: true,
				width: 50,
			},
			{
				Header: "Team Size",
				accessor: "company.teamMembers.length" as const,
				Cell: (props: any) => {
					return <div>{!props.value ? <>&mdash;</> : props.value}</div>;
				},
				width: 20,
			},
			{
				Header: "Location",
				accessor: "company.location" as const,
				Cell: (props: any) => {
					return <div>{!props.value ? <>&mdash;</> : props.value}</div>;
				},
				width: 260,
			},
			{
				Header: "Reactions",
				accessor: "company" as const,
				Cell: (props: any) => (
					<div>
						{props.value && (
							<ElemReactions resource={props.value} resourceType={'companies'} isInteractive={false} />
						)}
					</div>
				),
				width: 200,
				disableSortBy: true,
			},
		],
		[]
	);

	const theResourceList = React.useMemo(() => {
		return resourceList ? resourceList : [{}];
	}, [resourceList]);

	const theResourceListCount = theResourceList.length;

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		//rows, "rows" gets replaced with "page" for pagination
		prepareRow,
		page,
		nextPage,
		previousPage,
		selectedFlatRows,
		state: { pageIndex, pageSize, selectedRowIds },
		toggleAllRowsSelected,
	} = useTable(
		{
			columns: columns,
			data: theResourceList,
			disableSortRemove: true,
			autoResetSortBy: false,
			initialState: {
				pageSize: 10,
			},
		},
		useSortBy,
		usePagination,
		useRowSelect,
		useCheckboxes
	);

	const onRemove = async () => {
		const followIds = compact(
			selectedFlatRows.map((row: any, index: number) => row.original?.id)
		);

		const deleteCompaniesRes = await fetch(`/api/delete_follows`, {
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
			refreshProfile()
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
					position: "bottom-left",
				}
			);
		}
	};

	const generateSortingIndicator = (column: any) => {
		return column.isSorted ? (
			column.isSortedDesc ? (
				<IconSortDown className="ml-1 h-5 w-5 inline-block" />
			) : (
				<IconSortUp className="ml-1 h-5 w-5 inline-block" />
			)
		) : column.canSort ? (
			<IconSortDown className="ml-1 h-5 w-5 inline-block text-slate-400 group-hover:text-primary-500" />
		) : (
			<></>
		);
	};

	return (
		<div className="rounded-lg p-5 bg-white shadow mb-8">
			<div className="flex items-start justify-between">
				<h2 className="font-bold text-lg capitalize mr-2">
					{listNameTitle}: Companies
				</h2>

				{fundingTotal > 0 && (
					<div className="font-bold text-right shrink-0 mr-2">
						<div className="text-sm">Total Funding</div>
						<div className="text-green-700 text-lg">
							${convertToInternationalCurrencySystem(fundingTotal)}
						</div>
					</div>
				)}

				{isCustomList && Object.keys(selectedRowIds).length > 0 && (
					<>
						<ElemDeleteListsModal
							isOpen={showDeleteItemsModal}
							onCloseModal={() => setShowDeleteItemsModal(false)}
							listName={selectedListName}
							onDelete={onRemove}
						/>
					</>
				)}
			</div>

			<div className="flex items-start w-full mb-4">
				{Object.keys(tagsCount).length > 0 && (
					<>
						<div className="font-bold text-sm mr-2 py-0.5">Tags</div>
						<div className="flex gap-2 flex-wrap">
							{Object.keys(tagsCount).map((tag: string) => (
								<div
									key={tag}
									className="shrink-0 px-2 py-0.5 bg-slate-200 rounded-md text-sm"
								>
									{tag} ({tagsCount[tag]})
								</div>
							))}
						</div>
					</>
				)}
			</div>

			{Object.keys(selectedRowIds).length > 0 && (
				<div className="flex items-center gap-4">
					<ElemButton
						onClick={onRemove}
						//onClick={() => setShowDeleteItemsModal(true)}
						roundedFull
						btn="transparent"
						size="sm"
						className="text-red-500 px-0"
					>
						<IconTrash className="h-5 w-5 mr-1" title="Remove from list" />
						Remove
					</ElemButton>
					<ElemButton
						onClick={() => toggleAllRowsSelected(false)}
						roundedFull
						btn="transparent"
						size="sm"
						className="px-0"
					>
						<IconX className="h-5 w-5 mr-1" title="Clear Selection" />
						Clear Selection
					</ElemButton>
					<div className="text-sm">
						{Object.keys(selectedRowIds).length} Result
						{Object.keys(selectedRowIds).length > 1 && "s"} Selected
					</div>
				</div>
			)}

			<div className="mt-1 overflow-scroll border border-black/10 rounded-lg">
				<table
					{...getTableProps()}
					className="table-auto min-w-full divide-y divide-black/10"
				>
					<thead>
						{headerGroups.map((headerGroup) => {
							const { key, ...restHeaderGroupProps } =
								headerGroup.getHeaderGroupProps();
							return (
								<tr key={key} {...restHeaderGroupProps} className="table-row">
									{headerGroup.headers.map((column: any) => {
										const { key, ...restColumnProps }: any = ({} = {
											...column.getHeaderProps(column.getSortByToggleProps(), {
												style: {
													width: column.width,
													minWidth: column.width,
													maxWidth: column.width,
												},
											}),
										});
										return (
											<th
												key={key}
												{...restColumnProps}
												className={`px-2 py-2 whitespace-nowrap text-sm bg-white font-bold text-left ${
													column.canSort ? "group hover:text-primary-500" : ""
												}`}
												title={column.canSort ? `Sort By ${column.Header}` : ""}
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
						className="bg-white divide-y divide-black/10"
					>
						{page.length === 0 && (
							<tr>
								<td colSpan={6}>
									<div className="flex flex-col items-center justify-center  p-5 text-slate-600">
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
								</td>
							</tr>
						)}

						{page.map((row) => {
							prepareRow(row);
							const { key, ...restRowProps } = row.getRowProps();

							return (
								<tr
									key={key}
									{...restRowProps}
									className="table-row bg-white even:bg-slate-50"
									// onClick={() =>
									// 	handleRowClick(`/companies/${row?.original.company?.slug}`)
									// }
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
												className="align-top text-sm px-2 py-2"
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
				shownItems={page?.length}
				totalItems={theResourceListCount}
				page={pageIndex}
				itemsPerPage={pageSize}
				onClickPrev={() => previousPage()}
				onClickNext={() => nextPage()}
			/>
			<Toaster />
		</div>
	);
};

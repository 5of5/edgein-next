import { Follows_Companies } from "@/graphql/types";
import React, {
	FC,
	forwardRef,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { useRouter } from "next/router";
import { useTable, useSortBy, usePagination, useRowSelect } from "react-table";
import { ElemPhoto } from "@/components/ElemPhoto";
import {
	IconEditPencil,
	IconSortUp,
	IconSortDown,
	IconTrash,
} from "@/components/Icons";
import { Pagination } from "@/components/Pagination";
import { ElemButton } from "@/components/ElemButton";
import { ElemDeleteListsModal } from "./ElemDeleteListsModal";
import { ElemListsOptionMenu } from "./ElemListsOptionMenu";
import { IndeterminateCheckbox, useCheckboxes } from "./IndeterminateCheckbox";
import { convertToInternationalCurrencySystem } from "@/utils";
import { ElemReactions } from "@/components/ElemReactions";

type Props = {
	companies?: Follows_Companies[];
	isCustomList?: boolean;
	selectedListName: string | null;
	//totalFunding: number;
	//getAlternateRowColor: (index: number) => string;
	//handleNavigation: (link: string) => void;
	tagsCount: any;
	setIsUpdated: Function;
};

export const ElemCompaniesNew: FC<Props> = ({
	companies,
	isCustomList,
	selectedListName,
	//totalFunding,
	//getAlternateRowColor,
	//handleNavigation,
	tagsCount,
	setIsUpdated,
}) => {
	const router = useRouter();

	const [selected, setSelected] = useState<number[]>([]);

	const [showDeleteItemsModal, setShowDeleteItemsModal] = useState(false);

	const [resourceList, setResourceList] = useState<Follows_Companies[]>();

	const [fundingTotal, setFundingTotal] = useState(0);

	useEffect(() => {
		let funding = 0;
		if (companies) setResourceList(companies);
		if (companies)
			companies.forEach(({ company }) => {
				company?.investment_rounds.forEach((round) => {
					funding += round.amount;
				});
			});

		setFundingTotal(funding);
	}, [companies]);

	const toggleCheckboxes =
		(clearAll: boolean = false) =>
		() => {
			if (clearAll) {
				setSelected([]);
				return;
			}

			if (selected.length > 0 && resourceList?.length === selected.length) {
				setSelected([]);
			} else if ((resourceList?.length || 0) > selected.length) {
				setSelected((prev) => {
					const items = [...prev];
					resourceList?.forEach(({ id }) => {
						if (!items.includes(id!)) items.push(id!);
					});
					return items;
				});
			}
		};

	const toggleCheckbox = (id: number) => () => {
		setSelected((prev) => {
			const items = [...prev];

			const index = items.indexOf(id);
			if (index === -1) items.push(id);
			else items.splice(index, 1);

			return items;
		});
	};

	const isChecked = useCallback(
		(id: number) => {
			return selected.includes(id);
		},
		[selected]
	);

	const isCheckedAll = () => {
		return (
			selected.length === resourceList?.length && Boolean(resourceList?.length)
		);
	};

	const onRemove = async () => {
		const deleteCompaniesRes = await fetch(`/api/delete_follows`, {
			method: "POST",
			body: JSON.stringify({ followIds: selected }),
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});

		if (deleteCompaniesRes.ok) {
			setResourceList((prev) => {
				return prev?.filter(
					(resource) => !selected.includes(resource.id as number)
				);
			});
			setSelected([]);
			setIsUpdated(new Date().getTime());
		}
	};

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
				width: 10,
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
				Cell: (props: any) => <div>{props.value}</div>,
				width: 300,
			},
			{
				Header: "Reactions",
				accessor: "company" as const,
				Cell: (props: any) => (
					<div>
						{props.value && (
							<ElemReactions data={props.value} isInteractive={false} />
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

	// const sortees = React.useMemo(
	// 	() => [
	// 		{
	// 			id: "date_added",
	// 			desc: true,
	// 		},
	// 	],
	// 	[]
	// );

	// export const IndeterminateCheckbox = forwardRef(function Checkbox(
	// 	{ indeterminate, ...rest },
	// 	ref
	// ) {
	// 	const defaultRef = useRef();
	// 	const resolvedRef = ref || defaultRef;

	// 	useEffect(() => {
	// 		resolvedRef.current.indeterminate = indeterminate;
	// 	}, [resolvedRef, indeterminate]);

	// 	return <input type="checkbox" ref={resolvedRef} {...rest} />;
	// });

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		//rows, //"rows" gets replaced with "page" for pagination
		prepareRow,
		page,
		nextPage,
		previousPage,
		selectedFlatRows,
		state: { pageIndex, pageSize, selectedRowIds },
	} = useTable(
		{
			columns: columns,
			data: theResourceList,
			//autoResetPage: true, true by default
			disableSortRemove: true,
			autoResetSortBy: false,
			initialState: {
				//sortBy: sortees,
				pageSize: 10,
			},
		},
		useSortBy,
		usePagination,
		useRowSelect,
		useCheckboxes
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
				<IconSortDown className="ml-1 h-5 w-5 inline-block" />
			) : (
				<IconSortUp className="ml-1 h-5 w-5 inline-block" />
			)
		) : (
			<IconSortUp className="ml-1 h-5 w-5 opacity-0 hidden group-hover:opacity-100" />
		);
	};

	return (
		<div className="rounded-lg p-3 bg-white shadow mb-8">
			<div className="inline-flex">
				<h2 className="font-bold text-xl capitalize mr-2">
					{selectedListName}: Companies
				</h2>

				{isCustomList && selected.length > 0 && (
					<>
						<ElemListsOptionMenu
							onRemoveBtn={() => setShowDeleteItemsModal(true)}
							onClearSelection={toggleCheckboxes(true)}
						/>

						<ElemDeleteListsModal
							isOpen={showDeleteItemsModal}
							onCloseModal={() => setShowDeleteItemsModal(false)}
							listName={selectedListName}
							onDelete={onRemove}
						/>
					</>
				)}

				{isCustomList && Object.keys(selectedRowIds).length > 0 && (
					<>
						<ElemListsOptionMenu
							onRemoveBtn={() => setShowDeleteItemsModal(true)}
							onClearSelection={toggleCheckboxes(true)}
						/>

						<ElemDeleteListsModal
							isOpen={showDeleteItemsModal}
							onCloseModal={() => setShowDeleteItemsModal(false)}
							listName={selectedListName}
							onDelete={onRemove}
						/>
					</>
				)}
			</div>

			<div className="flex justify-between w-full mt-1">
				<div>
					{Object.keys(tagsCount).length > 0 && (
						<>
							<div className="font-bold text-sm">Tags</div>
							<div className="flex gap-2 flex-wrap">
								{Object.keys(tagsCount).map((tag) => (
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

				{fundingTotal > 0 && (
					<div className="font-bold text-right shrink-0 mr-2">
						<div className="text-sm">Total Funding</div>
						<div className="text-green-700 text-lg">
							${convertToInternationalCurrencySystem(fundingTotal)}
						</div>
					</div>
				)}
			</div>

			{Object.keys(selectedRowIds).length > 0 && (
				<div className="border border-red-500 p-4">
					{Object.keys(selectedRowIds).length} Selected
					<ElemButton
						onClick={onRemove}
						roundedFull
						btn="transparent"
						size="sm"
					>
						<IconTrash className="h-5 w-5 mr-1" title="Remove" />
						Remove from list
					</ElemButton>
					{selectedFlatRows.map((selectedRow, index) => (
						<div key={index}>
							{selectedRow.original?.id}

							{/* {selectedRow.original.map(item, index) => (
								<div key={index}>
									{item.id}
								</div>
							)} */}
						</div>
					))}
					{/* {selectedFlatRows.map((d) => d.original)} */}
				</div>
			)}

			<div className="mt-2 overflow-scroll border border-black/10 rounded-lg">
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
						{page.map((row) => {
							prepareRow(row);
							const { key, ...restRowProps } = row.getRowProps();

							return (
								<tr
									key={key}
									{...restRowProps}
									className="table-row bg-white  even:bg-slate-50 hover:bg-slate-100"
									// onClick={(e) => goToCompany(e, row?.original)}
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
				<p>Selected Rows: {Object.keys(selectedRowIds).length}</p>
				<pre>
					<code>
						{JSON.stringify(
							{
								selectedRowIds: selectedRowIds,
								"selectedFlatRows[].original": selectedFlatRows.map(
									(d) => d.original
								),
							},
							null,
							2
						)}
					</code>
				</pre>
			</div>
			<Pagination
				shownItems={page?.length}
				totalItems={theResourceListCount}
				page={pageIndex}
				itemsPerPage={pageSize}
				onClickPrev={() => previousPage()}
				onClickNext={() => nextPage()}
			/>

			{/* <div className="mt-3 w-full rounded-lg border border-slate-200">
				<table className="w-full">
					<thead>
						<tr className="text-left text-sm border-b-slate-200">
							{isCustomList && (
								<th className="pl-2 px-1 border border-b-slate-200 border-r-0 border-l-0 border-t-0">
									<input
										type="checkbox"
										className="align-middle"
										onChange={toggleCheckboxes()}
										checked={isCheckedAll()}
									/>
								</th>
							)}
							<th className="px-1 border border-b-slate-200 border-r-0 border-l-0 border-t-0">
								Name
							</th>
						</tr>
					</thead>

					<tbody>
						{resourceList?.map(({ company, id }, index) => (
							<tr
								key={company?.id}
								className={`text-left text-sm hover:bg-slate-100`}
								//onClick={() => handleNavigation(`/companies/${company?.slug}`)}
								role="button"
							>
								{isCustomList && (
									<td className="pl-2 px-1 py-2">
										{id}
										<input
											type="checkbox"
											onChange={toggleCheckbox(id as number)}
											onClick={(e) => e.stopPropagation()}
											checked={isChecked(id as number)}
										/>
									</td>
								)}
								<td className="px-1 inline-flex items-center py-2">
									<ElemPhoto
										photo={company?.logo}
										wrapClass="flex items-center justify-center shrink-0 w-10 h-10 p-1 bg-white border border-black/10 rounded-lg overflow-hidden mr-2"
										imgClass="object-fit max-w-full max-h-full"
										imgAlt={"chia"}
									/>
									{company?.name}
								</td>
							</tr>
						))}

						{(!resourceList || resourceList?.length === 0) && (
							<tr>
								<td colSpan={5} className="text-center px-1 py-2">
									No Companies
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div> */}
		</div>
	);
};

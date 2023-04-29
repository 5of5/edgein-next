import React from "react";
import Link from "next/link";
import { ElemPhoto } from "@/components/elem-photo";
import { Investment_Rounds } from "@/graphql/types";
import { useTable, useSortBy, usePagination } from "react-table";

import { numberWithCommas, formatDate } from "@/utils";
import { IconEditPencil, IconSortUp, IconSortDown } from "@/components/icons";
import { Pagination } from "@/components/pagination";

type Props = {
	className?: string;
	heading?: string;
	investments: Investment_Rounds[];
	showEdit?: boolean;
};

export const ElemInvestments: React.FC<Props> = ({
	className,
	heading,
	investments,
	showEdit,
}) => {
	const columns = React.useMemo(
		() => [
			{
				Header: "Date",
				accessor: "round_date" as const,
				Cell: (props: any) => (
					<div>
						{props.value ? (
							<>
								{formatDate(props.value, {
									month: "short",
									day: "2-digit",
									year: "numeric",
								})}
							</>
						) : (
							<>&mdash;</>
						)}
					</div>
				),
				//width: 120,
			},
			{
				Header: "Company",
				accessor: "company" as const,
				Cell: (props: any) => (
					<div className="flex items-center shrink-0 w-full">
						{!props.value ? (
							<>&mdash;</>
						) : (
							<Link href={`/companies/${props.value.slug}`}>
								<a className="company flex items-center space-x-3 hover:opacity-70">
									<ElemPhoto
										photo={props.value.logo}
										wrapClass="flex items-center justify-center shrink-0 w-10 h-10 p-1 rounded-lg overflow-hidden bg-white border border-slate-200"
										imgClass="object-fit max-w-full max-h-full rounded"
										imgAlt={props.value.name}
									/>
									<p className="ml-2 line-clamp-2 break-words">
										{props.value.name}
									</p>
								</a>
							</Link>
						)}
					</div>
				),
				width: 280,
				disableSortBy: true,
			},
			{
				Header: "Round",
				accessor: "round" as const,
				//width: 120,
				Cell: (props: any) => (
					<div>{props.value ? <>{props.value}</> : <>&mdash;</>}</div>
				),
			},
			{
				Header: "Amount",
				accessor: "amount" as const,
				//width: 120,
				Cell: (props: any) => (
					<div>
						{props.value ? <>${numberWithCommas(props.value)}</> : <>&mdash;</>}
					</div>
				),
			},
		],
		[]
	);

	const dataInvestments = React.useMemo(() => {
		return investments ? investments : [{}];
	}, [investments]);

	const investmentsCount = dataInvestments.length;

	const sortees = React.useMemo(
		() => [
			{
				id: "round_date",
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
			data: dataInvestments,
			//autoResetPage: true, true by default
			disableSortRemove: true,
			autoResetSortBy: false,
			initialState: {
				sortBy: sortees,
				pageSize: 50,
			},
		},
		useSortBy,
		usePagination
	);

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
		<section className={className}>
			{heading && (
				<div className="flex items-center justify-between">
					<h2 className="text-xl font-bold">{heading}</h2>

					{showEdit && (
						<button className="border border-black/10 h-8 w-8 p-1.5 rounded-full transition-all hover:bg-slate-200">
							<IconEditPencil title="Edit" />
						</button>
					)}
				</div>
			)}

			<div className="mt-2 overflow-auto border border-black/10 rounded-lg">
				<table
					{...getTableProps()}
					className="table-auto min-w-full divide-y divide-black/10 overscroll-x-none"
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
												className={`px-4 py-2 whitespace-nowrap text-sm bg-white font-bold text-left ${
													column.canSort ? "hover:text-primary-500" : ""
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
						className="bg-white divide-y divide-black/10 flex-1 md:flex-none mb-96"
					>
						{page.map((row) => {
							prepareRow(row);
							const { key, ...restRowProps } = row.getRowProps();

							return (
								<tr
									key={key}
									{...restRowProps}
									className="table-row rounded-lg bg-white even:bg-slate-50"
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
												className="align-middle text-sm px-4 py-3"
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
				totalItems={investmentsCount}
				page={pageIndex}
				itemsPerPage={pageSize}
				onClickPrev={() => previousPage()}
				onClickNext={() => nextPage()}
			/>
		</section>
	);
};
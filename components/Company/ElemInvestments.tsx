import React from "react";
import { ElemPhoto } from "@/components/ElemPhoto";
import { useTable, useSortBy, usePagination } from "react-table";
import { IconEditPencil, IconSortUp, IconSortDown } from "@/components/Icons";
import { Pagination } from "@/components/Pagination";
import Link from "next/link";
import { numberWithCommas, formatDate } from "@/utils";
import { Investment_Rounds } from "@/graphql/types";

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
				Header: "Round",
				accessor: "round" as const,
				Cell: (props: any) => (
					<div>{props.value ? <>{props.value}</> : <>&mdash;</>}</div>
				),
			},
			{
				Header: "Amount Raised",
				accessor: "amount" as const,
				Cell: (props: any) => (
					<div>
						{props.value ? <>${numberWithCommas(props.value)}</> : <>&mdash;</>}
					</div>
				),
			},
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
			},
			{
				Header: "Investors",
				accessor: "investments" as const,
				Cell: (props: any) => {
					const vcsWithPartner = props.value?.filter(
						(investment: any) => investment.person && investment.vc_firm
					);
					const vcs = props.value?.filter(
						(investment: any) => !investment.person && investment.vc_firm
					);
					const angels = props.value?.filter(
						(investment: any) => investment.person && !investment.vc_firm
					);

					return (
						<div className="grid grid-cols-2 lg:grid-cols-3 gap-5 !whitespace-normal">
							{!props.value && <>&mdash;</>}

							{vcsWithPartner.map((investment: any) => {
								return (
									<div
										key={investment.id}
										className="h-fit bg-white border border-black/10 space-y-2 rounded-lg p-2 transition-all hover:shadow hover:-translate-y-0.5"
									>
										{investment.vc_firm && (
											<Link
												href={`/investors/${investment.vc_firm.slug}`}
												key={investment.vc_firm.id}
											>
												<a className="vcfirm flex items-center space-x-3 hover:opacity-70">
													<ElemPhoto
														photo={investment.vc_firm.logo}
														wrapClass="flex items-center justify-center shrink-0 w-12 h-12 p-1 rounded-lg overflow-hidden border border-slate-200"
														imgClass="object-fit max-w-full max-h-full"
														imgAlt={investment.vc_firm.name}
														placeholderClass="text-slate-300"
													/>
													<span className="line-clamp-2 font-bold">
														{investment.vc_firm.name}
													</span>
												</a>
											</Link>
										)}

										{investment.person && (
											<Link
												href={`/people/${investment.person.slug}`}
												key={investment.person.id}
											>
												<a className="investor flex items-center space-x-3 hover:opacity-70">
													<ElemPhoto
														photo={investment.person.picture}
														wrapClass="flex items-center justify-center shrink-0 w-12 h-12 rounded-full overflow-hidden"
														imgClass="object-cover w-12 h-12"
														imgAlt={investment.person.name}
														placeholder="user"
														placeholderClass="text-slate-300"
													/>
													<span className="line-clamp-2 font-bold">
														{investment.person.name}
													</span>
												</a>
											</Link>
										)}
									</div>
								);
							})}

							{vcs.map((investment: any) => {
								return (
									<div
										key={investment.id}
										className="h-fit bg-white border border-black/10 space-y-2 rounded-lg p-2 transition-all hover:shadow hover:-translate-y-0.5"
									>
										{investment.vc_firm && (
											<Link
												href={`/investors/${investment.vc_firm.slug}`}
												key={investment.vc_firm.id}
											>
												<a className="vcfirm flex items-center space-x-3 hover:opacity-70">
													<ElemPhoto
														photo={investment.vc_firm.logo}
														wrapClass="flex items-center justify-center shrink-0 w-12 h-12 p-1 border border-black/10 rounded-lg overflow-hidden"
														imgClass="object-fit max-w-full max-h-full"
														imgAlt={investment.vc_firm.name}
														placeholderClass="text-slate-300"
													/>
													<span className="line-clamp-2 font-bold">
														{investment.vc_firm.name}
													</span>
												</a>
											</Link>
										)}
									</div>
								);
							})}

							{angels.map((investment: any) => {
								return (
									<div
										key={investment.id}
										className="h-fit bg-white border border-black/10 space-y-2 rounded-lg p-2 transition-all hover:shadow hover:-translate-y-0.5"
									>
										{investment.person && (
											<Link
												href={`/people/${investment.person.slug}`}
												key={investment.person.id}
											>
												<a className="investor flex items-center space-x-3 hover:opacity-70">
													<ElemPhoto
														photo={investment.person.picture}
														wrapClass="flex items-center justify-center shrink-0 w-12 h-12 rounded-full overflow-hidden"
														imgClass="object-cover w-12 h-12"
														imgAlt={investment.person.name}
														placeholder="user"
														placeholderClass="text-slate-300"
													/>
													<span className="line-clamp-2 font-bold">
														{investment.person.name}
													</span>
												</a>
											</Link>
										)}
									</div>
								);
							})}
						</div>
					);
				},
				width: 650,
				disableSortBy: true,
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
		) : (
			<IconSortUp className="ml-1 h-5 w-5 inline-block opacity-0 group-hover:opacity-100" />
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

					{/* <button className="border border-black/10 h-8 w-8 p-1.5 rounded-full transition-all hover:bg-slate-200">
						<IconEditPencil title="Edit" />
					</button> */}
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
												className={`px-4 py-2 whitespace-nowrap text-sm bg-white font-bold text-left ${
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
												className="align-top text-sm px-4 py-3"
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

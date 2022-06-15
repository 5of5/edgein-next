import React, { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { ElemHeading } from "../components/ElemHeading";
import { useGetCompaniesQuery } from "../graphql/types";
import { useTable } from 'react-table';
import { ElemButton } from "../components/ElemButton";
  
type Props = {
};

const CompaniesTable: NextPage<Props> = () => {
  const [page, setPage] = useState<number>(0)
  const limit = 50
  const offset = limit * page

  const filters = {}

  const {
    data: companiesData,
    error,
    isLoading
  } = useGetCompaniesQuery({
    offset,
    limit,
  }) 
  
   const columns = React.useMemo(
       () => [
         {
           Header: 'Name',
           accessor: 'name' as const,
         },
         {
           Header: 'Layer',
           accessor: 'layer' as const,
         },
       ],
       []
   )
  
  const companies = companiesData?.companies || []

   const {
     getTableProps,
     getTableBodyProps,
     headerGroups,
     rows,
     prepareRow,
   } = useTable({ columns, data: companies })
  
  if (isLoading) {
    return <h1>Loading</h1>
  }

	return (
		<div>
			<Head>
				<title>Web3 Companies - EdgeIn.io</title>
				<meta
					name="description"
					content="Early-stage companies in this Web3 market renaissance require actionable intelligence and hyper-speed. Consider this your greatest asset."
				/>
			</Head>
			<div>
				<ElemHeading
					title="Web3 Companies"
					subtitle="Early-stage companies in this Web3 market renaissance require actionable intelligence and hyper-speed. Consider this your greatest asset."
				></ElemHeading>

				<div className="bg-gray-50 relative z-10 rounded-t-3xl lg:rounded-t-8xl">
					<div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 lg:px-8 lg:py-10">
						<div className="w-full flex flex-col py-5 gap-5 sm:grid sm:grid-cols-2 md:grid-cols-3"></div>
						<div>
							<table
								{...getTableProps()}
								//style={{ border: "solid 1px black" }}
								className="table table-auto w-full"
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
												{headerGroup.headers.map((column) => {
													const { key, ...restColumnProps } =
														column.getHeaderProps();
													return (
														<th
															key={key}
															{...restColumnProps}
															className="px-4 py-2 whitespace-nowrap font-bold text-left bg-white border border-dark-100 first:rounded-tl-lg last:rounded-tr-lg "
														>
															{column.render("Header")}
														</th>
													);
												})}
											</tr>
										);
									})}
								</thead>
								<tbody
									{...getTableBodyProps()}
									className="bg-white divide-y divide-dark-100 flex-1 md:flex-none mb-96"
								>
									{rows.map((row) => {
										prepareRow(row);
										const { key, ...restRowProps } = row.getRowProps();
										return (
											<tr
												key={key}
												{...restRowProps}
												className="flex flex-col flex-nowrap overflow-hidden md:table-row even:bg-slate-50"
											>
												{row.cells.map((cell) => {
													const { key, ...restCellProps } = cell.getCellProps();
													return (
														<td
															key={key}
															{...restCellProps}
															className="align-middle px-4 pb-4 whitespace-nowrap border border-dark-100 md:p-4"
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
              <ElemButton disabled={page === 0} onClick={() => { setPage((prev) => prev - 1)}}>Prev</ElemButton>
              <ElemButton onClick={() => { setPage((prev) => prev + 1)}}>Next</ElemButton>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CompaniesTable;

import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { ElemHeading } from "../components/ElemHeading";
import { useGetCompaniesQuery } from "../graphql/types";
import { useTable } from 'react-table';
  
type Props = {
};

const CompaniesTable: NextPage<Props> = () => {
  const companiesData = useGetCompaniesQuery() 
  
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
  
  const companies = companiesData?.data?.companies || []

   const {
     getTableProps,
     getTableBodyProps,
     headerGroups,
     rows,
     prepareRow,
   } = useTable({ columns, data: companies })
  
  if (companiesData?.isLoading) {
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
				>
					{/* <ElemButton href="/" btn="dark" arrow className="mt-6">
						Submit company
					</ElemButton> */}
				</ElemHeading>

				<div className="bg-gray-50 relative z-10 rounded-t-3xl lg:rounded-t-8xl">
					<div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 lg:px-8 lg:py-10">
						<div className="w-full flex flex-col py-5 gap-5 sm:grid sm:grid-cols-2 md:grid-cols-3">
						</div>
            <div>
              <table {...getTableProps()} style={{ border: 'solid 1px black' }}>
                <thead>
                {headerGroups.map(headerGroup => {
                   const { key, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps();
                  return (
                    <tr key={key} {...restHeaderGroupProps}>
                      {headerGroup.headers.map(column => {
                         const { key, ...restColumnProps } = column.getHeaderProps();
                          return (
                          <th
                              key={key}
                              {...restColumnProps}
                              style={{
                                borderBottom: 'solid 3px red',
                                color: 'black',
                              }}
                          >
                            {column.render('Header')}
                          </th>
                      )})}
                    </tr>
                  )
                })}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                  prepareRow(row)
                  const { key, ...restRowProps } = row.getRowProps();
                  return (
                      <tr key={key} {...restRowProps}>
                        {row.cells.map(cell => {
                          const { key, ...restCellProps } = cell.getCellProps();
                          return (
                              <td
                                key={key}
                                  {...restCellProps}
                                  style={{
                                    padding: '10px',
                                    border: 'solid 1px gray',
                                  }}
                              >
                                {cell.render('Cell')}
                              </td>
                          )
                        })}
                      </tr>
                  )
                })}
                </tbody>
              </table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CompaniesTable;

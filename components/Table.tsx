import { useState } from "react";
//import mockdata from "../data.json";
import TableBody from "./TableBody";
import TableHead from "./TableHead";

type Props = {
	columns: Record<string, any>[];
	data: Record<string, any>[];
};

export const Table: React.FC<Props> = ({ data, columns }: any) => {
	const [tableData, setTableData] = useState(data);

	const handleSorting = (sortField: any, sortOrder: any) => {
		if (sortField) {
			const sorted = [...tableData].sort((a, b) => {
				if (a[sortField] === null) return 1;
				if (b[sortField] === null) return -1;
				if (a[sortField] === null && b[sortField] === null) return 0;
				return (
					a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
						numeric: true,
					}) * (sortOrder === "asc" ? 1 : -1)
				);
			});
			setTableData(sorted);
		}
	};

	return (
		<>
			<table className="table w-full table-fixed">
				<TableHead {...{ columns, handleSorting }} />
				<TableBody {...{ columns, tableData }} />
			</table>
		</>
	);
};

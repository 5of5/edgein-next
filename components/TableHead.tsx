import { useState } from "react";

type TableHead = {
	columns: Array<any>;
	handleSorting: Function;
};

const TableHead = ({ columns, handleSorting }: TableHead) => {
	const [sortField, setSortField] = useState("");
	const [order, setOrder] = useState("asc");

	const handleSortingChange = (sortable: boolean, accessor: any) => {
		if (sortable) {
			const sortOrder =
				accessor === sortField && order === "asc" ? "desc" : "asc";
			setSortField(accessor);
			setOrder(sortOrder);
			handleSorting(accessor, sortOrder);
			return sortOrder;
		} else {
			return "";
		}
	};

	return (
		<thead>
			<tr>
				{columns.map(({ label, accessor, sortable }: any) => {
					const cl = sortable
						? sortField && sortField === accessor && order === "asc"
							? "up cursor-pointer"
							: sortField && sortField === accessor && order === "desc"
							? "down cursor-pointer"
							: "default cursor-pointer"
						: "";

					return (
						<th
							key={accessor}
							onClick={() => handleSortingChange(sortable, accessor)}
							className={`text-left ${cl}`}
						>
							{label}
						</th>
					);
				})}
			</tr>
		</thead>
	);
};

export default TableHead;

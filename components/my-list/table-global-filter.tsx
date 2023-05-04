import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";

interface Props {
	className?: string;
	placeholder?: string;
	preGlobalFilteredRows: any;
	globalFilter: any;
	setGlobalFilter: any;
}

export const TableGlobalFilter = ({
	className = "",
	preGlobalFilteredRows,
	globalFilter,
	setGlobalFilter,
	placeholder = `Search ${
		preGlobalFilteredRows.length > 1
			? `${preGlobalFilteredRows.length} items`
			: `${preGlobalFilteredRows.length} item`
	}...`,
}: Props) => {
	const count = preGlobalFilteredRows.length;
	const [value, setValue] = useState(globalFilter);

	const onChange = useAsyncDebounce((value) => {
		setGlobalFilter(value || undefined);
	}, 1000);

	return (
		<input
			className={`relative inline-flex items-center text-sm rounded-md px-2 py-1.5 transition ease-in-out duration-150 group bg-white ring-inset ring-1 ring-slate-200 focus:outline-none focus:ring-1 ${className}`}
			value={value || ""}
			onChange={(e) => {
				setValue(e.target.value);
				onChange(e.target.value);
			}}
			placeholder={placeholder}
		/>
	);
};

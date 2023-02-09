import React, { forwardRef, useEffect, useRef, useState } from "react";
import {
	TableToggleCommonProps,
	Column,
	HeaderProps,
	Hooks,
	TableToggleAllRowsSelectedProps,
} from "react-table";

interface Props {
	indeterminate?: boolean;
}

export const useCheckboxes = (hooks: Hooks) => {
	hooks.visibleColumns.push((columns: Column[]) => [
		{
			id: "selection",
			minWidth: 36,
			width: 36,
			maxWidth: 36,
			disableResizing: true,
			disableSortBy: true,
			disableDropdown: true,
			disableHiding: true,
			className: "checkbox",
			/* eslint-disable react/display-name */
			Header: ({ getToggleAllRowsSelectedProps }: HeaderProps<{}>) => (
				<div>
					<IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
				</div>
			),
			Cell: ({
				row,
			}: {
				row: { getToggleRowSelectedProps: () => TableToggleCommonProps };
			}) => <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />,
		},
		...columns,
	]);
};

export const IndeterminateCheckbox = forwardRef<HTMLInputElement, Props>(
	(
		{ indeterminate, ...rest }: Partial<TableToggleAllRowsSelectedProps>,
		ref: React.Ref<HTMLInputElement>
	) => {
		const [isIndeterminate, setIsIndeterminate] = useState(false);
		const defaultRef = useRef(null);
		const resolvedRef = ref || defaultRef;

		useEffect(() => {
			if (typeof resolvedRef === "object" && resolvedRef.current) {
				resolvedRef.current.indeterminate = Boolean(indeterminate);
				resolvedRef.current.checked = Boolean(indeterminate);
				setIsIndeterminate(resolvedRef.current.indeterminate);
			}
		}, [resolvedRef, indeterminate]);

		const onChange = (e: React.FormEvent<HTMLInputElement>) =>
			rest.onChange
				? rest.onChange({ ...e, target: e.currentTarget })
				: undefined;

		return (
			<>
				<input
					type="checkbox"
					ref={resolvedRef}
					{...rest}
					onChange={onChange}
					//onClick={(e) => e.stopPropagation()}
					data-indeterminate={
						isIndeterminate ? "indeterminate" : "not-indeterminate"
					}
					className={`relative appearance-none w-4 h-4 border rounded border-slate-300 cursor-pointer transition-all hover:border-slate-400 checked:bg-primary-500 checked:border-primary-500 checked:hover:bg-primary-500 focus:ring-0 focus:checked:bg-primary-500 indeterminate:bg-primary-500 indeterminate:hover:bg-primary-500`}
				/>
			</>
		);
	}
);

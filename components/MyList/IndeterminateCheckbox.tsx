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
			disableResizing: true,
			minWidth: 36,
			width: 36,
			maxWidth: 36,
			disableSortBy: true,
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
			<input
				type="checkbox"
				ref={resolvedRef}
				{...rest}
				onChange={onChange}
				data-testid={isIndeterminate ? "indeterminate" : "not-indeterminate"}
				onClick={(e) => e.stopPropagation()}
				className="appearance-none w-4 h-4 rounded border-gray-300 checked:bg-primary-500 checked:hover:opacity-75 focus:checked:bg-primary-500 focus:ring-0"
			/>
		);
	}
);

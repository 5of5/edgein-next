import React, { PropsWithChildren, useId, useEffect, useRef } from "react";

type Props = {
	className?: string;
	inputClass?: string;
	labelClass?: string;
	defaultChecked?: boolean;
	checked?: boolean;
	label?: string;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
	onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
};

export const InputCheckbox = React.forwardRef<HTMLInputElement, Props>(
	(
		{
			className = "",
			inputClass = "",
			labelClass = "",
			defaultChecked,
			checked,
			label,
			onChange,
			onClick,
		},
		ref
	) => {
		const uniqueName = "name-" + useId();

		return (
			<>
				<label
					className={`relative inline-flex items-center gap-2 cursor-pointer ${className}`}
				>
					<input
						type="checkbox"
						ref={ref}
						onChange={onChange}
						onClick={onClick}
						checked={checked}
						defaultChecked={defaultChecked}
						name={uniqueName}
						className={`peer relative appearance-none w-4 h-4 border rounded border-slate-300 cursor-pointer transition-all hover:border-slate-400 checked:bg-primary-500 checked:border-primary-500 checked:hover:bg-primary-500 focus:ring-0 focus:checked:bg-primary-500 indeterminate:bg-primary-500 indeterminate:hover:bg-primary-500  ${inputClass}`}
					/>
					{label && (
						<div className={`cursor-pointer ${labelClass}`}>{label}</div>
					)}
					{/* <span className="h-10 w-10 block border border-primary-500 rounded-full absolute z-0 opacity-0 peer-checked:animate-scale-and-fade"></span> */}
				</label>
			</>
		);
	}
);

InputCheckbox.displayName = "InputCheckbox";

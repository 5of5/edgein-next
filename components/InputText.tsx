import React, { PropsWithChildren } from "react";

type Props = {
	className?: string;
	labelClass?: string;
	label?: string;
	type?: "text" | "email" | "search" | "password" | "number";
	name: string;
	value: string;
	onChange: React.ChangeEventHandler<HTMLInputElement>;
	placeholder?: string;
	required?: boolean;
	autoComplete?: string;
	disabled?: boolean;
};

export const InputText: React.FC<PropsWithChildren<Props>> = ({
	className = "",
	labelClass = "",
	label,
	type = "",
	name,
	value,
	onChange,
	placeholder = "",
	required = false,
	autoComplete = "on",
	disabled = false,
}) => {
	return (
		<>
			{label && (
				<label htmlFor={name} className={`font-bold cursor-text ${labelClass}`}>
					{label}
				</label>
			)}

			<input
				className={`w-full mt-1 px-3 py-1.5 text-dark-500 relative bg-white rounded-md border-none outline-none ring-1 ring-slate-300 hover:ring-slate-400 focus:ring-2 focus:ring-primary-500 focus:outline-none placeholder:text-slate-400 ${className}`}
				type={type ? type : "text"}
				name={name}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				required={required}
				autoComplete={autoComplete}
				disabled={disabled}
			/>
		</>
	);
};

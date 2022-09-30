import React, { PropsWithChildren } from "react";

type Props = {
	className?: string;
	labelClass?: string;
	label?: string;
	name?: string;
	value?: string;
	onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
	placeholder?: string;
	required?: boolean;
	rows?: number;
};

export const InputTextarea: React.FC<PropsWithChildren<Props>> = ({
	className = "",
	labelClass = "",
	label,
	name,
	value,
	onChange,
	placeholder = "",
	required = false,
	rows = 2,
}) => {
	return (
		<>
			{label && (
				<label htmlFor={name} className={`font-bold cursor-text ${labelClass}`}>
					{label}
				</label>
			)}
			<textarea
				className={`appearance-none resize-none w-full mt-1 px-3 py-1.5 text-dark-500 relative bg-white rounded-md border-none outline-none ring-1 ring-slate-300 hover:ring-slate-400 focus:ring-2 focus:ring-primary-500 focus:outline-none placeholder:text-slate-400 ${className}`}
				name={name}
				value={value}
				onChange={onChange}
				required={required}
				placeholder={placeholder}
				rows={rows}
			/>
		</>
	);
};

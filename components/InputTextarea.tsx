import React, { PropsWithChildren } from "react";

type Props = {
	className?: string;
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
				<label htmlFor={name} className="font-bold text-gray-400 cursor-text">
					{label}
				</label>
			)}
			<textarea
				className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 relative bg-white rounded-md border border-slate-300 outline-none resize-none hover:ring-primary-100 focus:outline-none focus:border-primary-500 hover:ring focus:ring focus:ring-primary-100"
				name={name}
				value={value}
				onChange={onChange}
				required={required}
				placeholder={placeholder}
				rows={rows}
			/>

			{/* <input
				className={`${className} w-full mt-1 px-3 py-1.5 text-lg text-dark-500 relative bg-white rounded-md border border-slate-300 outline-none focus:outline-none focus:border-primary-500 focus:ring focus:ring-primary-100`}
				type="text"
				name={name}
				value={value}
				onChange={onChange}
				required={required}
				placeholder={placeholder}
			/> */}
		</>
	);
};

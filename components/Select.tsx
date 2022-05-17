import React, { PropsWithChildren } from "react";

type Props = {
	className?: string;
	label?: string;
	name?: string;
	value?: string;
	placeholder?: string;
	onChange?: any;
	options: Array<string>;
};

export const Select: React.FC<PropsWithChildren<Props>> = ({
	className = "",
	label,
	name,
	value,
	placeholder,
	onChange,
	options,
}) => (
	<div className={className}>
		<label className="relative block" htmlFor={name}>
			<span className="sr-only">{label}</span>
			<select
				name={name}
				value={value}
				onChange={onChange}
				className="h-10 w-full py-1.5 pr-3 px-3 text-dark-500 text-lg relative bg-white rounded-md border border-transparent outline-none placeholder:text-dark-400 focus:bg-white focus:outline-none focus:border-primary-500 hover:ring hover:ring-primary-100 focus:ring focus:ring-primary-100"
			>
				{options.map((option) => {
					return (
						<option
							className="text-dark-500"
							key={option}
							value={option}
							label={option}
						>
							{option}
						</option>
					);
				})}
			</select>
		</label>
	</div>
);

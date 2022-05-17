import React, { PropsWithChildren } from "react";

type Props = {
	className?: string;
	label?: string;
	name?: string;
	value?: string;
	placeholder?: string;
	onChange?: any;
};

export const InputSearch: React.FC<PropsWithChildren<Props>> = ({
	className = "",
	label,
	name,
	value,
	placeholder,
	onChange,
}) => (
	<div className={className} role="search">
		<label className="relative block" htmlFor="search">
			<span className="sr-only">{label}</span>
			<span className="absolute z-10 inset-y-0 left-1 flex items-center pl-2">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					strokeWidth="2"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/>
				</svg>
			</span>
			<input
				type="search"
				name={name}
				value={value}
				placeholder={placeholder}
				onChange={onChange}
				className="w-full py-1.5 pl-10 pr-3 text-dark-500 text-lg relative bg-white rounded-md border border-transparent outline-none placeholder:text-dark-400 focus:bg-white focus:outline-none focus:border-primary-500 hover:ring hover:ring-primary-100 focus:ring focus:ring-primary-100"
			/>
		</label>
	</div>
);

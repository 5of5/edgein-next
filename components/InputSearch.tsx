import React, { PropsWithChildren } from "react";

type Props = {
	className?: string;
	label?: string;
	name?: string;
	value?: string;
	placeholder?: string;
	onChange?: any;
	size?: "md" | "lg" | "";
};

export const InputSearch: React.FC<PropsWithChildren<Props>> = ({
	className = "",
	label,
	name,
	value,
	placeholder,
	onChange,
	size,
}) => {
	// Sizes
	let iconClasses = "h-5 w-5";
	let inputClasses = "py-1.5 pl-10";
	if (size === "md") {
		iconClasses = "h-6 w-6";
		inputClasses = "text-xl py-2 pl-10";
	} else if (size === "lg") {
		iconClasses = "h-7 w-7";
		inputClasses = "text-2xl py-2.5 pl-12";
	}

	return (
		<div className={className} role="search">
			<label className="relative block" htmlFor="search">
				<span className="sr-only">{label}</span>
				<span className="absolute z-10 inset-y-0 left-1 flex items-center pl-2">
					<IconSearch className={iconClasses} />
				</span>
				<input
					type="search"
					name={name}
					value={value}
					placeholder={placeholder}
					onChange={onChange}
					className={`${inputClasses} w-full pr-3 text-dark-500 relative bg-white rounded-md border border-dark-500/10 outline-none placeholder:text-dark-400 focus:bg-white focus:outline-none focus:border-primary-500 hover:ring hover:ring-primary-100 focus:ring focus:ring-primary-100`}
				/>
			</label>
		</div>
	);
};

type IconProps = {
	className?: string;
	title?: string;
};

const IconSearch: React.FC<IconProps> = ({ className, title = "Search" }) => {
	return (
		<svg
			className={className}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={2}
		>
			<title>{title}</title>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
			/>
		</svg>
	);
};

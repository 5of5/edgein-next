import React, { PropsWithChildren } from "react";
import { IconSearch } from "../components/Icons";

type Props = {
	className?: string;
	label?: string;
	name?: string;
	value?: string;
	placeholder?: string;
	onClick?:any;
  
};

export const InputSearchNavbar: React.FC<PropsWithChildren<Props>> = ({
	className = "",
	label,
	name,
	value,
	placeholder,
	onClick,
  
}) => {
	return (
		<div className={className} role="search">
			<label className="relative block" htmlFor="search">
				<span className="sr-only">{label}</span>
				<span className="absolute z-10 inset-y-0 left-1 flex items-center pl-2">
					<IconSearch className="h-5 w-5" />
				</span>
				<input
					type="search"
					name={name}
					value=""
					placeholder={placeholder}
					onClick={onClick}
					className={`py-1.5 cursor-pointer pl-10 w-full pr-3 text-dark-500 relative bg-white rounded-md border border-dark-500/10 outline-none placeholder:text-dark-400 focus:bg-white focus:outline-none focus:border-primary-500 focus:ring focus:ring-primary-100`}
				/>
			</label>
		</div>
	);
};

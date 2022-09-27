import Link from "next/link";
import { FC, PropsWithChildren } from "react";
import { IconSpinner } from "@/components/Icons";

type Props = {
	className?: string;
	loading?: boolean;
	arrow?: boolean;
	arrowLeft?: boolean;
	arrowClass?: string;
	btn?:
		| "danger"
		| "dark"
		| "primary"
		| "transparent"
		| "white"
		| "slate"
		| "ol-white"
		| "ol-primary"
		| "";
	roundedFull?: boolean;
	size?: "xs" | "sm" | "md" | "lg" | "";
	href?: string;
	disabled?: boolean;
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const ElemButton: FC<PropsWithChildren<Props>> = ({
	className = "",
	loading = false,
	arrow = false,
	arrowLeft = false,
	arrowClass = "",
	btn = "",
	roundedFull = true,
	size = "",
	href = "",
	disabled = false,
	children,
	onClick,
}) => {
	let btnClass = "";
	// button styles
	if (btn === "primary") {
		btnClass =
			"text-white from-blue-800 via-primary-500 to-primary-400 bg-gradient-to-r hover:opacity-60";
	} else if (btn === "ol-primary") {
		btnClass =
			"text-primary-500 bg-transparent ring-inset ring-1 ring-primary-500 hover:ring-2 focus:!ring-2 active:ring-2";
	} else if (btn === "transparent") {
		btnClass = "text-primary-500 bg-transparent hover:text-dark-500";
	} else if (btn === "white") {
		btnClass =
			"text-dark-500 bg-white border border-black/10 focus:ring-primary-800 hover:text-primary-500 hover:border-primary-500";
	} else if (btn === "slate") {
		btnClass =
			"text-dark-500 bg-slate-200 hover:text-primary-500 hover:bg-slate-300";
	} else if (btn === "dark") {
		btnClass = "text-white bg-dark-700 hover:opacity-60";
	} else {
		btnClass = "";
	}

	// button sizes
	let sizeClasses = "";

	if (size === "xs") {
		sizeClasses = "px-3 py-1 text-xs";
	} else if (size === "sm") {
		sizeClasses = "px-3.5 py-1.5 text-sm";
	} else if (size === "md") {
		sizeClasses = "px-4 py-1.5 text-base";
	} else if (size === "lg") {
		sizeClasses = "px-5 py-2 text-lg";
	} else {
		sizeClasses = "px-4 py-1.5";
	}

	btnClass += ` ${sizeClasses}`;

	// button disabled
	if (disabled) {
		btnClass = btnClass + " opacity-40 cursor-not-allowed";
	}

	const componentClassName = `relative inline-flex items-center font-bold focus:outline-none focus:ring-0 transition ease-in-out duration-150 group
		${btnClass}
		${roundedFull ? "rounded-full" : ""}
		${arrow || arrowLeft ? "justify-between" : "justify-center"}
	`;

	var component = (
		<button
			className={componentClassName + className}
			onClick={onClick}
			type="submit"
		>
			{loading && <IconSpinner className="animate-spin -ml-1 mr-3 h-5 w-5" />}
			{arrowLeft && <IconArrowLeft className={`h-3 w-4 ${arrowClass}`} />}
			{children}
			{arrow && <IconArrow className={`h-3 w-4 ml-1 ${arrowClass}`} />}
		</button>
	);

	if (href.length) {
		return (
			<Link href={href} passHref>
				{component}
			</Link>
		);
	}

	return component;
};

type IconProps = {
	className?: string;
	title?: string;
};

const IconArrowLeft: React.FC<IconProps> = ({
	className,
	title = "Arrow Left",
}) => {
	return (
		<svg
			viewBox="0 0 10 10"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={`${className} group-hover:transition group-hover:duration-150 group-hover:ease-in-out`}
		>
			<title>{title}</title>
			<path
				className="transition ease-in-out duration-150 group-hover:-translate-x-0.5"
				d="M5 1.36365L1 5.00001L5 8.63637"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				className="opacity-0 group-hover:opacity-100"
				d="M5 5H1"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

const IconArrow: React.FC<IconProps> = ({ className, title = "Arrow" }) => {
	return (
		<svg
			viewBox="0 0 10 10"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={`${className} group-hover:transition group-hover:duration-150 group-hover:ease-in-out`}
		>
			<title>{title}</title>
			<path
				className="transition ease-in-out duration-150 group-hover:translate-x-0.5"
				d="M1 1.36365L5 5.00001L1 8.63637"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				className="opacity-0 group-hover:opacity-100"
				d="M5 5H1"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

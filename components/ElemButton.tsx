import Link from "next/link";
import { FC, PropsWithChildren } from "react";

type Props = {
	className?: string;
	loading?: boolean;
	arrow?: boolean;
	arrowLeft?: boolean;
	btn?:
		| "danger"
		| "dark"
		| "primary"
		| "transparent"
		| "ol-white"
		| "ol-primary"
		| "";
	roundedFull?: boolean;
	size?: "md" | "sm" | "xs" | "lg" | "";
	href?: string;
	disabled?: boolean;
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const ElemButton: FC<PropsWithChildren<Props>> = ({
	className = "",
	loading = false,
	arrow = false,
	arrowLeft = false,
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
	if (btn === "danger") {
		btnClass =
			"text-red-500 bg-gray-50 hover:bg-red-500 focus:ring-red-500 border-red-500 hover:text-white";
	} else if (btn === "dark") {
		btnClass = "text-white bg-dark-700 hover:opacity-60";
	} else if (btn === "primary") {
		btnClass =
			"text-white from-blue-800 via-primary-500 to-primary-400 bg-gradient-to-r";
	} else if (btn === "transparent") {
		btnClass = "text-primary-500 bg-transparent hover:text-dark-500";
	} else if (btn === "ol-white") {
		btnClass =
			"text-white bg-transparent focus:ring-primary-800 border-white hover:bg-white hover:text-primary-500";
	} else if (btn === "ol-primary") {
		btnClass =
			"text-primary-500 bg-transparent focus:ring-primary-800 border-primary-500 hover:bg-primary-500 hover:text-white";
	} else {
		btnClass =
			"border-white bg-white hover:bg-gray-50 hover:text-primary-500 focus:ring-primary-500";
	}

	// button sizes
	let sizeClasses = "py-1.5 px-5";
	if (size === "md") {
		sizeClasses = "px-5 py-2 min-w-32 justify-center";
	} else if (size === "sm") {
		sizeClasses = "px-3 py-2 lg:px-2.5 lg:py-1.5 lg:text-sm";
	} else if (size === "xs") {
		sizeClasses = "px-2.5 py-1.5 text-sm lg:px-2 lg:py-1 lg:text-xs";
	} else if (size === "lg") {
		sizeClasses = "px-6 py-4 text-lg";
	}

	btnClass += ` ${sizeClasses}`;

	// button disabled
	if (disabled) {
		btnClass = btnClass + " opacity-40 cursor-not-allowed";
	}

	const componentClassName = `
  relative
  inline-flex
  items-center
  font-bold
  focus:outline-none focus:ring-0
  hover:opacity-60
  transition
  duration-150
  in-hoverTransition
  group
  ${btnClass}
  ${roundedFull ? "rounded-full" : ""}
  ${arrow || arrowLeft ? "justify-between" : "justify-center"}
  `;

	var component = (
		<button className={componentClassName + className} onClick={onClick}>
			{loading && <IconSpinner className="animate-spin -ml-1 mr-3 h-5 w-5" />}
			{arrowLeft && <IconArrowLeft className="h-3 w-6" />}
			{children}
			{arrow && <IconArrow className="h-3 w-6" />}
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

const IconSpinner: React.FC<IconProps> = ({ className, title = "Loading" }) => {
	return (
		<svg
			className={className}
			fill="none"
			viewBox="0 0 24 24"
			aria-hidden="true"
		>
			<title>{title}</title>
			<circle
				className="opacity-25"
				cx="12"
				cy="12"
				r="10"
				stroke="currentColor"
				strokeWidth="4"
			></circle>
			<path
				className="opacity-75"
				fill="currentColor"
				d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
			></path>
		</svg>
	);
};

const IconArrowLeft: React.FC<IconProps> = ({
	className,
	title = "Arrow Left",
}) => {
	return (
		<svg
			viewBox="0 0 6 10"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={`${className} group-hover:transition group-hover:duration-150 group-hover:in-hoverTransition`}
		>
			<title>{title}</title>
			<path
				className="transition duration-150 in-hoverTransition group-hover:-translate-x-0.5"
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
			viewBox="0 0 6 10"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={`${className} group-hover:transition group-hover:duration-150 group-hover:in-hoverTransition`}
		>
			<title>{title}</title>
			<path
				className="transition duration-150 in-hoverTransition group-hover:translate-x-0.5"
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

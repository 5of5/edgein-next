import React, { FunctionComponent } from "react";
import { numberWithCommas } from "../../utils";

type Props = {
	className?: string;
	mini?: boolean;
	heading?: string;
	employeeListings?: number;
	tokenExchangeValue?: number;
};

export const ElemVelocity: React.FC<Props> = ({
	className,
	mini = false,
	heading,
	employeeListings = null,
	tokenExchangeValue = null,
}) => {
	if (!employeeListings && !tokenExchangeValue) {
		return null;
	}

	let velocityItems: {
		text: string;
		number: number;
		icon?: FunctionComponent;
	}[] = [];

	if (employeeListings) {
		velocityItems.push({
			text: "Employee Listings",
			number: employeeListings,
			icon: IconEmployees,
		});
	}

	if (tokenExchangeValue) {
		velocityItems.push({
			text: "Token Exchange Value",
			number: tokenExchangeValue,
			icon: IconTokenValue,
		});
	}

	return (
		<section className={`${className} flex flex-col`}>
			{heading && <h2 className="text-3xl font-bold">{heading}</h2>}

			<div
				className={`${
					mini
						? "space-x-2 justify-end"
						: "flex-col justify-center space-y-3 mt-2 p-3 bg-white rounded-lg"
				} flex grow`}
			>
				{velocityItems.map((item: any, index: number) => {
					return (
						<div key={index} className="flex items-center justify-between">
							{!mini && <div>{item.text}</div>}
							<div
								className={`${
									item.number > 0
										? "bg-green-100 text-green-500"
										: "bg-red-100 text-red-500"
								} flex items-center text-sm font-bold leading-sm uppercase px-2 py-1 rounded-full`}
							>
								{mini && <item.icon className="h-4 w-4 mr-0.5" />}

								<div>{numberWithCommas(item.number)}</div>
								{item.number > 0 && <IconArrowUp className="h-4 w-4" />}
								{item.number < 0 && <IconArrowDown className="h-4 w-4" />}
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
};

type IconProps = {
	className?: string;
	title?: string;
};

const IconArrowUp: React.FC<IconProps> = ({
	className,
	title = "Arrow Up",
}) => {
	return (
		<svg
			className={className}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={3}
		>
			<title>{title}</title>
			<path
				d="M12 3V21M4.5 10.5L12 3L4.5 10.5ZM12 3L19.5 10.5L12 3Z"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

const IconArrowDown: React.FC<IconProps> = ({
	className,
	title = "Arrow Down",
}) => {
	return (
		<svg
			className={className}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={3}
		>
			<title>{title}</title>
			<path
				d="M12 21V3M4.5 13.5L12 21L4.5 13.5ZM12 21L19.5 13.5L12 21Z"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

const IconEmployees: React.FC<IconProps> = ({
	className,
	title = "Employees",
}) => {
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
				d="M12 4.354C12.5374 3.7447 13.2477 3.31351 14.0362 3.11779C14.8247 2.92208 15.6542 2.97112 16.4142 3.2584C17.1741 3.54568 17.8286 4.05757 18.2905 4.72596C18.7524 5.39435 18.9998 6.18754 18.9998 7C18.9998 7.81246 18.7524 8.60565 18.2905 9.27404C17.8286 9.94243 17.1741 10.4543 16.4142 10.7416C15.6542 11.0289 14.8247 11.0779 14.0362 10.8822C13.2477 10.6865 12.5374 10.2553 12 9.646M15 21H3V20C3 18.4087 3.63214 16.8826 4.75736 15.7574C5.88258 14.6321 7.4087 14 9 14C10.5913 14 12.1174 14.6321 13.2426 15.7574C14.3679 16.8826 15 18.4087 15 20V21ZM15 21H21V20C21.0001 18.9467 20.723 17.9119 20.1965 16.9997C19.6699 16.0875 18.9125 15.3299 18.0004 14.8032C17.0882 14.2765 16.0535 13.9992 15.0002 13.9992C13.9469 13.9991 12.9122 14.2764 12 14.803M13 7C13 8.06087 12.5786 9.07828 11.8284 9.82843C11.0783 10.5786 10.0609 11 9 11C7.93913 11 6.92172 10.5786 6.17157 9.82843C5.42143 9.07828 5 8.06087 5 7C5 5.93913 5.42143 4.92172 6.17157 4.17157C6.92172 3.42143 7.93913 3 9 3C10.0609 3 11.0783 3.42143 11.8284 4.17157C12.5786 4.92172 13 5.93913 13 7Z"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

const IconTokenValue: React.FC<IconProps> = ({
	className,
	title = "Token Exchange Value",
}) => {
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
				d="M12 8C10.343 8 9 8.895 9 10C9 11.105 10.343 12 12 12C13.657 12 15 12.895 15 14C15 15.105 13.657 16 12 16V8ZM12 8C13.11 8 14.08 8.402 14.599 9L12 8ZM12 8V7V8ZM12 8V16V8ZM12 16V17V16ZM12 16C10.89 16 9.92 15.598 9.401 15L12 16ZM21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

import React from "react";

type Props = {
	className?: string;
	heading?: string;
	employeeListings?: number;
	tokenExchangeValue?: number;
};

export const ElemVelocity: React.FC<Props> = ({
	className,
	heading,
	employeeListings = null,
	tokenExchangeValue = null,
}) => {
	if (!employeeListings && !tokenExchangeValue) {
		return null;
	}

	let velocityItems: { text: string; number: number }[] = [];

	if (employeeListings) {
		velocityItems.push({ text: "Employee Listings", number: employeeListings });
	}

	if (tokenExchangeValue) {
		velocityItems.push({
			text: "Token Exchange Value",
			number: tokenExchangeValue,
		});
	}

	return (
		<section className={className}>
			{heading && <h2 className="text-3xl font-bold">{heading}</h2>}

			<div className="flex flex-col justify-center bg-white rounded-lg mt-2 p-3 space-y-3 grow">
				{velocityItems.map((item: any, index: number) => {
					return (
						<div key={index} className="flex items-center justify-between">
							{item.text}
							<div
								className={`${
									item.number > 0
										? "bg-green-100 text-green-500"
										: "bg-red-100 text-red-500"
								} flex items-center text-sm font-bold leading-sm uppercase px-2 py-1 rounded-full`}
							>
								{item.number}
								{item.number > 0 && <IconArrowUp className="ml-1 h-4 w-4" />}
								{item.number < 0 && <IconArrowDown className="ml-1 h-4 w-4" />}
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
			fill="currentColor"
			viewBox="0 0 14 14"
			aria-hidden="true"
		>
			<title>{title}</title>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M6.29289 0.292893C6.68342 -0.0976311 7.31658 -0.0976311 7.70711 0.292893L12.7071 5.29289C13.0976 5.68342 13.0976 6.31658 12.7071 6.70711C12.3166 7.09763 11.6834 7.09763 11.2929 6.70711L8 3.41421L8 13C8 13.5523 7.55228 14 7 14C6.44771 14 6 13.5523 6 13L6 3.41421L2.70711 6.70711C2.31658 7.09763 1.68342 7.09763 1.29289 6.70711C0.902369 6.31658 0.902369 5.68342 1.29289 5.29289L6.29289 0.292893Z"
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
			fill="currentColor"
			viewBox="0 0 14 14"
			aria-hidden="true"
		>
			<title>{title}</title>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M7.70711 13.7071C7.31658 14.0976 6.68342 14.0976 6.29289 13.7071L1.29289 8.70711C0.902369 8.31658 0.902369 7.68342 1.29289 7.29289C1.68342 6.90237 2.31658 6.90237 2.70711 7.29289L6 10.5858L6 0.999999C6 0.447714 6.44772 -5.72819e-07 7 -5.24537e-07C7.55229 -4.76254e-07 8 0.447715 8 1L8 10.5858L11.2929 7.29289C11.6834 6.90237 12.3166 6.90237 12.7071 7.29289C13.0976 7.68342 13.0976 8.31658 12.7071 8.70711L7.70711 13.7071Z"
			/>
		</svg>
	);
};

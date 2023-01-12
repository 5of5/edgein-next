import React from "react";
import { ElemTooltip } from "@/components/ElemTooltip";
import { numberWithCommas } from "@/utils";
import {
	IconProps,
	IconUsers,
	IconCurrencyDollar,
	IconQuestion,
	IconArrowUp,
	IconArrowDown,
} from "@/components/Icons";

type Props = {
	className?: string;
	heading?: string;
	employeeListings?: string | null;
	tokenExchangeValue?: string | null;
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

	let velocityItems: {
		icon?: React.FC<IconProps>;
		text: string;
		number: number;
	}[] = [];

	if (employeeListings) {
		velocityItems.push({
			icon: IconUsers,
			text: "Employee Listings",
			number: Number(employeeListings),
		});
	}

	if (tokenExchangeValue) {
		velocityItems.push({
			icon: IconCurrencyDollar,
			text: "Token Exchange Value",
			number: Number(tokenExchangeValue),
		});
	}

	return (
		<section className={`${className} flex flex-col`}>
			{heading && (
				<div className="flex items-center space-x-2">
					<h2 className="text-xl font-bold">{heading}</h2>
					<ElemTooltip
						className="bg-slate-200 rounded-full h-4 w-4 p-0.5"
						size="md"
						content="Velocity trends based on the last 3 months of LinkedIn employment data, as well as token exchange values from Binance and Coinbase."
					>
						<IconQuestion className="" title="What is Velocity?" />
					</ElemTooltip>
				</div>
			)}

			<div className="flex flex-col grow justify-center space-y-3">
				{velocityItems.map((item, index: number) => {
					const badge = (
						<div
							className={`${
								item.number > 0
									? "bg-green-100 text-green-600"
									: "bg-red-100 text-red-600"
							} flex items-center text-sm font-bold leading-sm uppercase px-2 py-0.5 rounded-full`}
						>
							<div>{numberWithCommas(item.number)}</div>
							{item.number > 0 ? (
								<IconArrowUp className="h-3 w-3" strokeWidth={4} />
							) : (
								<IconArrowDown className="h-3 w-3" strokeWidth={4} />
							)}
						</div>
					);

					return (
						<div
							key={index}
							className="flex items-center justify-between space-x-2"
						>
							<div className="text-base text-slate-600">{item.text}</div>
							{badge}
						</div>
					);
				})}
			</div>
		</section>
	);
};

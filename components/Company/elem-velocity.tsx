import React from "react";
import { ElemTooltip } from "@/components/elem-tooltip";
import { numberWithCommas } from "@/utils";
import {
	IconProps,
	IconUsers,
	IconCurrencyDollar,
	IconArrowUp,
	IconArrowDown,
	IconInformationCircle,
} from "@/components/Icons2";

type Props = {
	className?: string;
	heading?: string;
	employeeListings?: string | null;
	tokenExchangeValue?: number | null;
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
				<div className="flex items-center space-x-1">
					<h2 className="text-xl font-bold">{heading}</h2>
					<ElemTooltip
						size="md"
						content="Velocity trends based on the last 3 months of LinkedIn employment data, as well as token exchange values from Binance and Coinbase."
					>
						<IconInformationCircle
							className="h-5 w-5 text-primary-500"
							title="What is Velocity?"
						/>
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

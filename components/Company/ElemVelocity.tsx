import React from "react";
import { ElemTooltip } from "../ElemTooltip";
import { numberWithCommas } from "../../utils";
import {
	IconProps,
	IconUsers,
	IconCurrencyDollar,
	IconQuestionMarkCircle,
	IconArrowUp,
	IconArrowDown,
} from "../Icons";

type Props = {
	className?: string;
	mini?: boolean;
	heading?: string;
	employeeListings?: string | null;
	tokenExchangeValue?: string | null;
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
				<h2 className="text-xl font-bold">
					{heading}
					<ElemTooltip
						className="ml-1"
						size="md"
						content="Velocity trends based on the last 3 months of LinkedIn employment data, as well as token exchange values from Binance and Coinbase."
					>
						<IconQuestionMarkCircle
							className="h-5 w-5"
							title="What is Velocity?"
						/>
					</ElemTooltip>
				</h2>
			)}

			<div
				className={`${
					mini
						? "space-x-2 justify-end"
						: "flex-col justify-center space-y-3 mt-2 p-3 bg-white"
				} flex grow`}
			>
				{velocityItems.map((item, index: number) => {
					const badge = (
						<div
							className={`${
								item.number > 0
									? "bg-green-100 text-green-500"
									: "bg-red-100 text-red-500"
							} flex items-center text-sm font-bold leading-sm uppercase px-2 py-0.5 rounded-full`}
						>
							{mini && item.icon && <item.icon className="h-4 w-4 mr-0.5" />}

							<div>{numberWithCommas(item.number)}</div>
							{item.number > 0 && <IconArrowUp className="h-4 w-4" />}
							{item.number < 0 && <IconArrowDown className="h-4 w-4" />}
						</div>
					);

					return (
						<div key={index} className="flex items-center space-x-2">
							{mini ? (
								<ElemTooltip content={item.text}>{badge}</ElemTooltip>
							) : (
								<>
									<div className="text-base text-slate-600 tracking-wide">
										{item.text}
									</div>
									{badge}
								</>
							)}
						</div>
					);
				})}
			</div>
		</section>
	);
};

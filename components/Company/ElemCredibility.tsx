import React from "react";
import { ElemTooltip } from "../ElemTooltip";
import {
	IconBadgeCheck,
	IconGithub,
	IconLinkedIn,
	IconChartUp,
} from "../Icons";

type Props = {
	className?: string;
	mini?: boolean;
	heading?: string;
	marketVerified?: string | null;
	githubVerified?: string | null;
	linkedInVerified?: string | null;
};

export const ElemCredibility: React.FC<Props> = ({
	className,
	mini = false,
	heading,
	marketVerified = null,
	githubVerified = null,
	linkedInVerified = null,
}) => {
	if (!marketVerified && !githubVerified && !linkedInVerified) {
		return null;
	}

	let credibilityItems: { text: string; icon: React.FC<IconProps> }[] = [];

	if (marketVerified) {
		credibilityItems.push({ text: "Market Verified", icon: IconChartUp });
	}

	if (githubVerified) {
		credibilityItems.push({ text: "Github Verified", icon: IconGithub });
	}

	if (linkedInVerified) {
		credibilityItems.push({ text: "LinkedIn Verified", icon: IconLinkedIn });
	}

	return (
		<section className={className}>
			{heading && <h2 className="text-2xl font-bold mb-2">{heading}</h2>}
			<div
				className={`grid gap-2 overflow-visible ${
					mini
						? `grid-cols-${credibilityItems.length}`
						: "grid-cols-3 bg-white rounded-lg border border-dark-500/10"
				}`}
			>
				{credibilityItems.map((item, index: number) => {
					const credibilityItem = (
						<div
							className={`${
								mini ? "w-8 h-8" : "w-12 h-12"
							} relative flex items-center justify-center bg-white rounded-lg border border-dark-500/10`}
						>
							<IconBadgeCheck
								title="Verified"
								className={`${
									mini ? "-top-2 -right-2 h-5 w-5" : "-top-3 -right-3 h-7 w-7"
								} absolute text-green-500`}
							/>
							<item.icon
								className={`${mini ? "w-6 h-6" : "h-8 w-8"}`}
								title={item.text}
							/>
						</div>
					);

					return (
						<div
							key={index}
							className={`${
								mini
									? ""
									: "pt-4 pb-2 flex flex-col items-center justify-center h-full bg-white rounded-lg"
							}`}
						>
							{mini ? (
								<ElemTooltip content={item.text}>{credibilityItem}</ElemTooltip>
							) : (
								<>
									{credibilityItem}
									<div className="mt-1 text-center text-xs font-semibold uppercase tracking-wide">
										{item.text}
									</div>
								</>
							)}
						</div>
					);
				})}
			</div>
		</section>
	);
};

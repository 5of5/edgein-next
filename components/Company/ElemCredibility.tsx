import React, { FunctionComponent } from "react";
import { ElemTooltip } from "../ElemTooltip";

type Props = {
	className?: string;
	mini?: boolean;
	heading?: string;
	marketVerified?: string;
	githubVerified?: string;
	linkedInVerified?: string;
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

	let credibilityItems: { text: string; icon: FunctionComponent }[] = [];

	if (marketVerified) {
		credibilityItems.push({ text: "Market Verified", icon: IconMarket });
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
			<div className="grid grid-cols-3 gap-1 overflow-visible">
				{credibilityItems.map((item: any, index: number) => {
					const credibilityItem = (
						<div
							className={`${
								mini ? "w-8 h-8" : "w-12 h-12"
							} relative flex items-center justify-center bg-white rounded-lg border border-dark-100`}
						>
							<IconVerified
								className={`${
									mini ? "-top-2 -right-2 h-5 w-5" : "-top-3 -right-3 h-7 w-7"
								} absolute text-green-500`}
							/>
							<item.icon className={`${mini ? "w-6 h-6" : "h-8 w-8"}`} />
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
									<div className="mt-1 text-center">{item.text}</div>
								</>
							)}
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

const IconVerified: React.FC<IconProps> = ({
	className,
	title = "Verified",
}) => {
	return (
		<svg
			className={className}
			fill="currentColor"
			viewBox="0 0 20 20"
			aria-hidden="true"
		>
			<title>{title}</title>
			<path
				fillRule="evenodd"
				d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
				clipRule="evenodd"
			/>
		</svg>
	);
};

const IconMarket: React.FC<IconProps> = ({ className, title = "Market" }) => {
	return (
		<svg
			className={className}
			fill="currentColor"
			viewBox="0 0 20 20"
			aria-hidden="true"
		>
			<title>{title}</title>
			<path d="M2 12.9053C2 12.6819 2.08872 12.4677 2.24665 12.3098C2.40457 12.1519 2.61877 12.0632 2.84211 12.0632H4.52632C4.74966 12.0632 4.96385 12.1519 5.12177 12.3098C5.2797 12.4677 5.36842 12.6819 5.36842 12.9053V17.1158C5.36842 17.3391 5.2797 17.5533 5.12177 17.7112C4.96385 17.8692 4.74966 17.9579 4.52632 17.9579H2.84211C2.61877 17.9579 2.40457 17.8692 2.24665 17.7112C2.08872 17.5533 2 17.3391 2 17.1158V12.9053ZM6.21053 9.53684C6.21053 9.3135 6.29925 9.09931 6.45717 8.94138C6.6151 8.78346 6.82929 8.69474 7.05263 8.69474H8.73684C8.96018 8.69474 9.17438 8.78346 9.3323 8.94138C9.49023 9.09931 9.57895 9.3135 9.57895 9.53684V17.1158C9.57895 17.3391 9.49023 17.5533 9.3323 17.7112C9.17438 17.8692 8.96018 17.9579 8.73684 17.9579H7.05263C6.82929 17.9579 6.6151 17.8692 6.45717 17.7112C6.29925 17.5533 6.21053 17.3391 6.21053 17.1158V9.53684ZM10.4211 11.2211C10.4211 10.9977 10.5098 10.7835 10.6677 10.6256C10.8256 10.4677 11.0398 10.3789 11.2632 10.3789H12.9474C13.1707 10.3789 13.3849 10.4677 13.5428 10.6256C13.7008 10.7835 13.7895 10.9977 13.7895 11.2211V17.1158C13.7895 17.3391 13.7008 17.5533 13.5428 17.7112C13.3849 17.8692 13.1707 17.9579 12.9474 17.9579H11.2632C11.0398 17.9579 10.8256 17.8692 10.6677 17.7112C10.5098 17.5533 10.4211 17.3391 10.4211 17.1158V11.2211Z" />
			<path d="M14.8782 7.25717C14.7203 7.4151 14.6316 7.62929 14.6316 7.85263V17.1158C14.6316 17.3391 14.7203 17.5533 14.8782 17.7112C15.0362 17.8692 15.2503 17.9579 15.4737 17.9579H17.1579C17.3812 17.9579 17.5954 17.8692 17.7534 17.7112C17.9113 17.5533 18 17.3391 18 17.1158V7.85263C18 7.62929 17.9113 7.4151 17.7534 7.25717C17.5954 7.09925 17.3812 7.01053 17.1579 7.01053H15.4737C15.2503 7.01053 15.0362 7.09925 14.8782 7.25717Z" />
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M17.2683 2.26484C17.5639 2.59324 17.5373 3.09907 17.2089 3.39464L12.9983 7.18412C12.7371 7.41924 12.353 7.45631 12.0516 7.27548L8.32827 5.0415L3.71215 8.88827C3.37273 9.17112 2.86827 9.12526 2.58542 8.78584C2.30257 8.44642 2.34843 7.94197 2.68785 7.65911L7.74048 3.44859C8.00188 3.23076 8.37246 3.20211 8.66423 3.37717L12.3676 5.59919L16.1385 2.20537C16.4669 1.9098 16.9728 1.93643 17.2683 2.26484Z"
			/>
		</svg>
	);
};

const IconGithub: React.FC<IconProps> = ({ className, title = "Github" }) => {
	return (
		<svg
			className={className}
			fill="currentColor"
			viewBox="0 0 24 24"
			aria-hidden="true"
		>
			<title>{title}</title>
			<path
				fillRule="evenodd"
				d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
				clipRule="evenodd"
			></path>
		</svg>
	);
};

const IconLinkedIn: React.FC<IconProps> = ({
	className,
	title = "LinkedIn",
}) => {
	return (
		<svg
			className={className}
			fill="currentColor"
			viewBox="0 0 20 20"
			aria-hidden="true"
		>
			<title>{title}</title>
			<path d="M2.2029 7.128H5.6319V17.447H2.2029V7.128ZM3.94035 2.15381C2.76674 2.15381 2 2.92429 2 3.93556C2 4.92605 2.7443 5.71892 3.89547 5.71892H3.91734C5.11338 5.71892 5.85822 4.92601 5.85822 3.93556C5.83578 2.92429 5.11342 2.15381 3.94035 2.15381ZM14.0511 6.88559C12.2309 6.88559 11.4155 7.88674 10.9605 8.58884V7.128H7.53053C7.57594 8.09605 7.53053 17.447 7.53053 17.447H10.9605V11.6842C10.9605 11.3755 10.983 11.068 11.0733 10.8468C11.3215 10.2308 11.8859 9.59265 12.8326 9.59265C14.0746 9.59265 14.5706 10.5393 14.5706 11.9259V17.447H18V11.5299C18 8.36034 16.3085 6.88559 14.0511 6.88559Z" />
		</svg>
	);
};

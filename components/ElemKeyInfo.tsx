import React, { Fragment } from "react";
import {
	IconGlobe,
	IconCash,
	IconDocumentDownload,
	IconUsers,
	IconFlag,
	IconLinkedIn,
	IconGithub,
	IconBriefcase,
	IconRole,
	IconEmail,
	IconLocation,
	IconTwitter,
	IconDiscord,
	IconGlassdoor,
} from "./Icons";

import {
	convertToInternationalCurrencySystem,
	numberWithCommas,
} from "../utils";

type Props = {
	className?: string;
	heading?: string;
	website?: string | null;
	totalFundingRaised?: string | null;
	whitePaper?: string | null;
	totalEmployees?: number;
	yearFounded?: string | null;
	location?: string | null;
	roles?: string | null;
	investmentsLength?: number;
	emails?: string[];
	linkedIn?: string | null;
	github?: string | null;
	twitter?: string | null;
	discord?: string | null;
	glassdoor?: string | null;
	careerPage?: string | null;
};

export const ElemKeyInfo: React.FC<Props> = ({
	className,
	heading,
	website,
	totalFundingRaised,
	whitePaper,
	totalEmployees,
	yearFounded,
	roles = [],
	investmentsLength = 0,
	emails = [],
	linkedIn,
	github,
	careerPage,
	location,
	twitter,
	discord,
	glassdoor,
}) => {
	const websiteName = website
		?.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "")
		.replace(/\/$/, "");

	return (
		<section className={className}>
			{heading && <h2 className="text-xl font-bold mb-3">{heading}</h2>}

			<div className="flex flex-col gap-x-6 gap-y-2">
				{website && (
					<a
						href={website}
						target="_blank"
						className="flex flex-1 space-x-2 py-1 hover:opacity-70"
						rel="noopener noreferrer"
						title={website}
					>
						<IconGlobe title={website} className="h-6 w-6" />
						<span className="text-primary-500">{websiteName}</span>
					</a>
				)}
				{totalFundingRaised && (
					<div className="flex space-x-2 py-1">
						<IconCash title="Total Funding Raised" className="h-6 w-6" />
						<div className="inline-flex space-x-1">
							<span>
								{convertToInternationalCurrencySystem(
									Number(totalFundingRaised)
								)}
							</span>
							<span>Total Funding Raised</span>
						</div>
					</div>
				)}
				{yearFounded && (
					<div className="flex space-x-2 py-1">
						<IconFlag title="Year Founded" className="h-6 w-6" />
						<div className="inline-flex space-x-1">
							<span>{yearFounded}</span>
							<span>Founded</span>
						</div>
					</div>
				)}
				{location && (
					<div className="flex space-x-2 py-1">
						<IconLocation title="Location" className="h-6 w-6" />
						<div>{location}</div>
					</div>
				)}
				{totalEmployees && (
					<div className="flex space-x-2 py-1">
						<IconUsers title="Total Employee Count" className="h-6 w-6" />

						<div className="inline-flex space-x-1">
							<span>{numberWithCommas(totalEmployees)}</span>
							<span>Employees</span>
						</div>
					</div>
				)}
				{whitePaper && (
					<a
						href={whitePaper}
						target="_blank"
						className="flex space-x-2 py-1 hover:opacity-70"
						rel="noopener noreferrer"
					>
						<IconDocumentDownload title="White Paper" className="h-6 w-6" />
						<span className="text-primary-500">White Paper</span>
					</a>
				)}
				{careerPage && (
					<a
						href={careerPage}
						target="_blank"
						className="flex space-x-2 py-1 hover:opacity-70"
						rel="noopener noreferrer"
					>
						<IconBriefcase title="Careers" className="h-6 w-6" />
						<span className="text-primary-500">Careers</span>
					</a>
				)}

				{roles && roles.length > 0 && (
					<div className="flex space-x-2 py-1">
						<IconRole title="Role" className="h-6 w-6 mr-1 text-primary-500" />
						<div>{roles}</div>
					</div>
				)}

				{investmentsLength > 0 && (
					<a
						href="#investments"
						className="flex space-x-2 py-1 hover:opacity-70"
					>
						<IconCash title="Investments" className="h-6 w-6" />
						<div className="flex space-x-1">
							<span className="font-bold">{investmentsLength}</span>
							<span>Investment{investmentsLength > 1 && "s"}</span>
						</div>
					</a>
				)}

				{emails && emails.length > 0 && (
					<div className="flex space-x-2 py-1">
						<IconEmail title="Email" className="h-6 w-6" />
						<div>
							{emails.map((_email, i: number) => [
								i > 0 && ", ",
								<span key={i} className="hover:opacity-70 cursor-not-allowed">
									&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;@&bull;&bull;&bull;&bull;&bull;&bull;
								</span>,
								// <Link key={i} href={`mailto:${email}`}>
								// 	<a className="hover:opacity-70">{email}</a>
								// </Link>,
							])}
						</div>
					</div>
				)}

				{linkedIn && (
					<a
						href={linkedIn}
						target="_blank"
						className="flex space-x-2 py-1 hover:opacity-70"
						rel="noopener noreferrer"
					>
						<IconLinkedIn title="LinkedIn" className="h-6 w-6" />
						<span className="text-primary-500">LinkedIn</span>
					</a>
				)}

				{github && (
					<a
						href={github}
						target="_blank"
						className="flex space-x-2 py-1 hover:opacity-70"
						rel="noopener noreferrer"
					>
						<IconGithub title="Github" className="h-6 w-6" />
						<span className="text-primary-500">Github</span>
					</a>
				)}
				{discord && (
					<a
						href={discord}
						target="_blank"
						className="flex space-x-2 py-1 hover:opacity-70"
						rel="noopener noreferrer"
					>
						<IconDiscord title="Discord" className="h-6 w-6" />
						<span className="text-primary-500">Discord</span>
					</a>
				)}
				{glassdoor && (
					<a
						href={glassdoor}
						target="_blank"
						className="flex space-x-2 py-1 hover:opacity-70"
						rel="noopener noreferrer"
					>
						<IconGlassdoor title="Glassdoor" className="h-6 w-6" />
						<span className="text-primary-500">Glassdoor</span>
					</a>
				)}
				{twitter && (
					<a
						href={twitter}
						target="_blank"
						className="flex space-x-2 py-1 hover:opacity-70"
						rel="noopener noreferrer"
					>
						<IconTwitter title="Twitter" className="h-6 w-6" />
						<span className="text-primary-500">Twitter</span>
					</a>
				)}
			</div>
		</section>
	);
};

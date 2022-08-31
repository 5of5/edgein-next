import React, { Fragment } from "react";
import {
	IconLink,
	IconCash,
	IconDocumentDownload,
	IconUsers,
	IconFlag,
	IconLinkedIn,
	IconGithub,
	IconBriefcase,
	IconRole,
	IconEmail,
	IconLocation
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
	roles?: string | null;
	investmentsLength?: number;
	emails?: string[];
	linkedIn?: string | null;
	github?: string | null;
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
}) => {
	const websiteName = website
		?.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "")
		.replace(/\/$/, "");

	return (
		<section className={className}>
			{heading && <h2 className="text-2xl font-bold">{heading}</h2>}

			<div className="inline-flex flex-col gap-x-6 gap-y-2 mt-2">
				{website && (
					<a
						href={website}
						target="_blank"
						className="inline-flex hover:opacity-70"
						rel="noopener noreferrer"
						title={website}
					>
						<IconLink
							title={website}
							className="h-6 w-6 mr-1 text-primary-500"
						/>
						{websiteName}
					</a>
				)}
				{totalFundingRaised && (
					<div className="inline-flex py-3">
						<IconCash
							title="Total Funding Raised"
							className="h-6 w-6 mr-1 text-primary-500"
						/>
						<span className="font-bold mr-1">
							{convertToInternationalCurrencySystem(Number(totalFundingRaised))}
						</span>
						Total Funding Raised
					</div>
				)}
				{whitePaper && (
					<div className="inline-flex py-3">
						<a
							href={whitePaper}
							target="_blank"
							className="inline-flex hover:opacity-70"
							rel="noopener noreferrer"
						>
							<IconDocumentDownload
								title="White Paper"
								className="h-6 w-6 mr-1 text-primary-500"
							/>
							<span>White Paper</span>
						</a>
					</div>
				)}

				{totalEmployees && (
					<div className="inline-flex py-3">
						<IconUsers
							title="Total Employee Count"
							className="h-6 w-6 mr-1 text-primary-500"
						/>
						<div>
							<span className="font-bold mr-1">
								{numberWithCommas(totalEmployees)}
							</span>
							Employees
						</div>
					</div>
				)}

				{careerPage && (
					<a
						href={careerPage}
						target="_blank"
						className="inline-flex py-3 hover:opacity-70"
						rel="noopener noreferrer"
					>
						<IconBriefcase
							title="Careers"
							className="h-6 w-6 mr-1 text-primary-500"
						/>
						<span>Careers</span>
					</a>
				)}

				{yearFounded && (
					<div className="inline-flex py-3">
						<IconFlag
							title="Year Founded"
							className="h-6 w-6 mr-1 text-primary-500"
						/>
						<div>
							<span className="font-bold mr-1">{yearFounded}</span>
							Founded
						</div>
					</div>
				)}

				{roles && roles.length > 0 && (
					<div className="inline-flex py-3">
						<IconRole title="Role" className="h-6 w-6 mr-1 text-primary-500" />
						<div>{roles}</div>
					</div>
				)}

				{investmentsLength > 0 && (
					<a href="#investments" className="inline-flex py-3 hover:opacity-70">
						<IconCash
							title="Investments"
							className="h-6 w-6 mr-1 text-primary-500"
						/>
						<span className="font-bold mr-1">{investmentsLength}</span>
						Investment{investmentsLength > 1 && "s"}
					</a>
				)}

				{emails && emails.length > 0 && (
					<div className="inline-flex py-3">
						<IconEmail
							title="Email"
							className="h-6 w-6 mr-1 text-primary-500"
						/>
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
						className="inline-flex py-3 hover:opacity-70"
						rel="noopener noreferrer"
					>
						<IconLinkedIn
							title="LinkedIn"
							className="h-6 w-6 mr-1 text-primary-500"
						/>
						<span>LinkedIn</span>
					</a>
				)}

				{github && (
					<a
						href={github}
						target="_blank"
						className="inline-flex py-3 hover:opacity-70"
						rel="noopener noreferrer"
					>
						<IconGithub
							title="Github"
							className="h-6 w-6 mr-1 text-primary-500"
						/>
						<span>Github</span>
					</a>
				)}
			</div>
		</section>
	);
};

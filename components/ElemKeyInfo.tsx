import React from "react";
import { ElemButton } from "./ElemButton";
import {
	convertToInternationalCurrencySystem,
	numberWithCommas,
} from "../utils";

type Props = {
	className?: string;
	heading?: string;
	website?: string;
	totalFundingRaised?: number;
	whitePaper?: string;
	totalEmployees?: number;
	yearFounded?: string;
	linkedIn?: string;
	github?: string;
};

export const ElemKeyInfo: React.FC<Props> = ({
	className,
	heading,
	website,
	totalFundingRaised,
	whitePaper,
	totalEmployees,
	yearFounded,
	linkedIn,
	github,
}) => {
	return (
		<section className={className}>
			{heading && <h2 className="text-2xl font-bold">{heading}</h2>}

			<div className="inline-flex flex-wrap items-center gap-x-6 gap-y-2 mt-2">
				{website && (
					<a
						href={website}
						target="_blank"
						rel="noopener noreferrer"
						title={website}
					>
						<ElemButton btn="primary" arrow>
							Website
						</ElemButton>
					</a>
				)}
				{totalFundingRaised && (
					<div className="inline-flex py-3">
						<IconCash
							title="Total Funding Raised"
							className="h-6 w-6 mr-1 text-primary-500"
						/>
						<span className="font-bold mr-1">
							{convertToInternationalCurrencySystem(totalFundingRaised)}
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

				{linkedIn && (
					<a
						href={linkedIn}
						target="_blank"
						className="inline-flex hover:opacity-70"
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
						className="inline-flex hover:opacity-70"
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

type IconProps = {
	className?: string;
	title?: string;
};

const IconCash: React.FC<IconProps> = ({ className, title }) => {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth="2"
		>
			<title>{title}</title>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
			/>
		</svg>
	);
};

const IconDocumentDownload: React.FC<IconProps> = ({ className, title }) => {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<title>{title}</title>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
			/>
		</svg>
	);
};

const IconUsers: React.FC<IconProps> = ({ className, title }) => {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth="2"
		>
			<title>{title}</title>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
			/>
		</svg>
	);
};

const IconFlag: React.FC<IconProps> = ({ className, title }) => {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth="2"
		>
			<title>{title}</title>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
			/>
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
			fill="none"
			viewBox="0 0 20 20"
			aria-hidden="true"
		>
			<title>{title}</title>
			<path
				d="M16.8571 1H3.14286C1.96 1 1 1.96 1 3.14286V16.8571C1 18.04 1.96 19 3.14286 19H16.8571C18.04 19 19 18.04 19 16.8571V3.14286C19 1.96 18.04 1 16.8571 1Z"
				stroke="currentColor"
				strokeWidth="2"
			/>
			<path
				d="M4.00049 5.48728C4.00049 4.88728 4.51477 4.42871 5.2862 4.42871C6.05763 4.42871 6.54192 4.88728 6.57192 5.48728C6.57192 6.08728 6.09192 6.57157 5.2862 6.57157C4.51477 6.57157 4.00049 6.08728 4.00049 5.48728Z"
				fill="currentColor"
			/>
			<path
				d="M6.57192 7.85728V16.0001H4.00049V7.85728H6.57192Z"
				fill="currentColor"
			/>
			<path
				d="M16.0005 16.0001H13.4291V11.7144C13.4291 10.8573 13.0005 10.0001 11.9291 9.983H11.8948C10.8576 9.983 10.4291 10.8659 10.4291 11.7144V16.0001H7.85763V7.85728H10.4291V8.95442C10.4291 8.95442 11.2562 7.85728 12.9191 7.85728C14.6205 7.85728 16.0005 9.02728 16.0005 11.3973V16.0001Z"
				fill="currentColor"
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

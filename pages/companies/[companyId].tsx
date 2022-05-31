import type { NextPage, GetStaticProps } from "next";
import React from "react";
import { useRouter } from "next/router";
import { ElemButton } from "../../components/ElemButton";
import { ElemPhoto } from "../../components/ElemPhoto";
import { ElemCredibility } from "../../components/Company/ElemCredibility";
import { ElemVelocity } from "../../components/Company/ElemVelocity";
import { ElemTags } from "../../components/ElemTags";
import { ElemFounderGrid } from "../../components/Company/ElemFounderGrid";
import { ElemInvestments } from "../../components/Company/ElemInvestments";
import { ElemTeamGrid } from "../../components/ElemTeamGrid";
import {
	runGraphQl,
	convertToInternationalCurrencySystem,
	numberWithCommas,
} from "../../utils";

type Props = {
	company: Record<string, any>;
	sortRounds: Record<string, any>;
};

const Company: NextPage<Props> = (props) => {
	const router = useRouter();
	const { companyId } = router.query;

	const goBack = () => router.back();

	const company = props.company;

	if (!company) {
		return <h1>Not Found</h1>;
	}

	const sortedInvestmentRounds = props.sortRounds;

	// Company tags
	const companyTags = [];
	if (company.layer?.length > 0) {
		companyTags.unshift(company.layer);
	}

	return (
		<div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
			<div onClick={goBack}>
				<ElemButton className="pl-0 pr-0" btn="transparent" arrowLeft>
					Back
				</ElemButton>
			</div>
			<div className="flex flex-col md:grid md:grid-cols-3 gap-5 my-8">
				<div className="col-span-1">
					<ElemPhoto
						photos={company.logo}
						wrapClass="flex items-center justify-center shrink-0 p-6 h-72 bg-white rounded-lg shadow-md lg:h-96"
						imgClass="object-contain w-full h-full"
						imgAlt={company.title}
					/>
				</div>
				<div className="w-full col-span-2">
					<h1 className="text-4xl md:text-6xl font-bold my-5">
						{company.title}
					</h1>
					{company.overview && (
						<p className="text-lg mb-5">{company.overview}</p>
					)}

					{/* <div className="flex flex-col md:grid md:grid-cols-5 gap-1 my-2">
						<ElemCredibility
							className="col-span-3"
							heading="Credibility"
							marketVerified={undefined}
							githubVerified={company.github}
							linkedInVerified={company.companyLinkedIn}
						/>
						<ElemVelocity
							className="col-span-2 flex flex-col"
							heading="Velocity"
							employeeListings={65}
							tokenExchangeValue={-2.31}
						/>
					</div> */}

					<div className="mb-5 inline-flex flex-wrap items-center gap-x-6">
						{company.investorAmount && (
							<div className="inline-flex py-3">
								<IconCash
									title="Total Funding Raised"
									className="h-6 w-6 mr-1 text-primary-500"
								/>
								<span className="font-bold mr-1">
									{convertAmountRaised(company.investorAmount)}
								</span>
								Total Funding Raised
							</div>
						)}

						{company.whitePaper && (
							<div className="inline-flex py-3">
								<a
									href={company.whitePaper}
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

						{company.totalEmployees && (
							<div className="inline-flex py-3">
								<IconUsers
									title="Total Employee Count"
									className="h-6 w-6 mr-1 text-primary-500"
								/>
								<div>
									<span className="font-bold mr-1">
										{numberWithCommas(company.totalEmployees)}

										{/* {company.totalEmployees} */}
									</span>
									Employees
								</div>
							</div>
						)}

						{company.yearFounded && (
							<div className="inline-flex py-3">
								<IconFlag
									title="Year Founded"
									className="h-6 w-6 mr-1 text-primary-500"
								/>
								<div>
									<span className="font-bold mr-1">{company.yearFounded}</span>
									Founded
								</div>
							</div>
						)}
					</div>
					<div className="mb-5 flex flex-row items-center">
						{company.website && (
							<a
								href={company.website}
								target="_blank"
								className="mr-4"
								rel="noopener noreferrer"
								title={`${company.title} Website`}
							>
								<ElemButton btn="primary" arrow>
									Visit website
								</ElemButton>
							</a>
						)}
						{company.companyLinkedIn && (
							<a
								href={company.companyLinkedIn}
								target="_blank"
								className="flex items-center justify-center w-9 h-9 mr-4 rounded-full text-primary-500 hover:text-white hover:bg-primary-500 border border-primary-500 "
								rel="noopener noreferrer"
							>
								<IconLinkedIn
									title={`${company.title} LinkedIn`}
									className="h-6 w-6"
								/>
							</a>
						)}
						{company.github && (
							<a
								href={company.github}
								target="_blank"
								className="flex items-center justify-center w-9 h-9 mr-4 rounded-full text-primary-500 hover:text-white hover:bg-primary-500 border border-primary-500 "
								rel="noopener noreferrer"
							>
								<IconGithub className="h-6 w-6" />
							</a>
						)}
					</div>
				</div>
			</div>

			{companyTags.length > 0 && (
				<ElemTags className="mt-20" heading="Tags" tags={companyTags} />
			)}

			{company.founder.length > 0 && (
				<ElemFounderGrid
					className="mt-20"
					heading="Founders"
					people={company.founder}
				/>
			)}

			{company.teamMembers.length > 0 && (
				<ElemTeamGrid
					className="mt-20"
					heading="Team Members"
					people={company.teamMembers}
				/>
			)}

			{sortedInvestmentRounds.length > 0 && (
				<ElemInvestments
					className="mt-20"
					heading="Investments"
					investments={sortedInvestmentRounds}
				/>
			)}
		</div>
	);
};

export async function getStaticPaths() {
	const {
		data: { companies },
	} = await runGraphQl("{ companies { slug }}");

	return {
		paths: companies
			.filter((comp: { slug: string }) => comp.slug)
			.map((comp: { slug: string }) => ({ params: { companyId: comp.slug } })),
		fallback: true, // false or 'blocking'
	};
}

export const getStaticProps: GetStaticProps = async (context) => {
	const { data: companies } = await runGraphQl(`{
    companies(slug: "${context.params?.companyId}") {
      id
      title
      slug
      logo
	  layer
      overview
      investorAmount
      whitePaper
      totalEmployees
      yearFounded
	  website
      companyLinkedIn
	  github
      founder {
        id
        slug
        name
        type
        email
        picture
      }
      teamMembers {
        id
        person {
          id
          slug
          name
          email
          picture
        }
        function
        startDate
        endDate
      }
      investmentRounds {
        id
        date
        name
        round
        amount
        investments {
          id
		  name
          people {
            id
			slug
            name
			picture
          }
          vcFirms {
            id
			slug
            vcFirm
            logo
          }

        }
      }
    }
  }
`);

	if (!companies.companies[0]) {
		return {
			notFound: true,
		};
	}

	const sortRounds = companies.companies[0].investmentRounds
		.slice()
		.sort(
			(
				a: { date: string | number | Date },
				b: { date: string | number | Date }
			) => {
				return new Date(a.date).getTime() - new Date(b.date).getTime();
			}
		)
		.reverse();

	return {
		props: {
			company: companies.companies[0],
			sortRounds,
		},
	};
};

const convertAmountRaised = (theAmount: number) => {
	return convertToInternationalCurrencySystem(theAmount);
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
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>{title}</title>
			<path
				d="M4.20805 9.10047H7.7241V19.6814H4.20805V9.10047ZM5.98961 4C4.78621 4 4 4.79004 4 5.82699C4 6.84262 4.7632 7.65562 5.94359 7.65562H5.96602C7.19242 7.65562 7.95617 6.84258 7.95617 5.82699C7.93316 4.79004 7.19246 4 5.98961 4V4ZM16.357 8.85191C14.4906 8.85191 13.6545 9.87848 13.188 10.5984V9.10047H9.67094C9.7175 10.0931 9.67094 19.6814 9.67094 19.6814H13.188V13.7723C13.188 13.4558 13.2111 13.1405 13.3036 12.9137C13.5582 12.282 14.1369 11.6277 15.1076 11.6277C16.3811 11.6277 16.8897 12.5984 16.8897 14.0202V19.6814H20.4062V13.6141C20.4062 10.3641 18.6718 8.85191 16.357 8.85191V8.85191Z"
				fill="currentColor"
			></path>
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

export default Company;

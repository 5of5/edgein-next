import type { NextPage, GetStaticProps } from "next";
import React from "react";
import { useRouter } from "next/router";
import { ElemButton } from "../../components/ElemButton";
import { ElemPhoto } from "../../components/ElemPhoto";
import { ElemFounderGrid } from "../../components/ElemFounderGrid";
import { ElemInvestments } from "../../components/ElemInvestments";
import { ElemTeamGrid } from "../../components/ElemTeamGrid";
import { Table } from "../../components/Table";
import { ElemTable } from "../../components/ElemTable";
import { convertToInternationalCurrencySystem, runGraphQl } from "../../utils";

type Props = {
	company: Record<string, any>;
};

const Company: NextPage<Props> = (props) => {
	const router = useRouter();
	const { companyId } = router.query;

	const goBack = () => router.back();

	const company = props.company;

	const investments = company.investmentRounds;

	// ["Funding Type", "Money Raised", "Date", "Investors"];
	const columns = [
		{ label: "Funding Type", accessor: "funding_type", sortable: false },
		{ label: "Money Raised", accessor: "money_raised", sortable: true },
		{ label: "Date", accessor: "date", sortable: true },
		{ label: "Investors", accessor: "investors", sortable: false },
		{ label: "Just Testing", accessor: "investors", sortable: false },
	];

	const data = [
		{
			id: 1,
			funding_type: "Seed",
			money_raised: "3395000",
			date: "2022-01-26",
			investors:
				"Andreessen Horowitz, Ben Horowitz, Greylock, True Ventures, DCM Ventures, Slow Ventures, Naval Ravikant, Craft Ventures",
		},
		{
			id: 2,
			funding_type: "Early VC",
			money_raised: "1395000",
			date: "",
			investors:
				"True Ventures, DCM Ventures, Slow Ventures, Naval Ravikant, Craft Ventures",
		},
		{
			id: 3,
			funding_type: "Seed",
			money_raised: "2395000",
			date: "2021-06-23",
			investors: "DCM Ventures, Slow Ventures, Naval Ravikant",
		},
		{
			id: 4,
			funding_type: "Seed",
			money_raised: "4512000",
			date: "2021-06-07",
			investors: "Ben Horowitz, Greylock, True Ventures, DCM Ventures",
		},
		{
			id: 5,
			funding_type: "Early VC",
			money_raised: "768000",
			date: "2021-07-05",
			investors: "Greylock, True Ventures",
		},
		{
			id: 6,
			funding_type: "Early VC",
			money_raised: "5008000",
			date: "2021-03-09",
			investors: "True Ventures",
		},
	];

	return (
		<div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
			{/* <section>
				<h2 className="text-3xl font-bold">Table Test</h2>

				<Table {...{ data, columns }} />
			</section> */}

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
				<div className="w-full col-span-2 p-2">
					<h1 className="text-4xl md:text-6xl font-bold my-5">
						{company.title}
					</h1>

					{company.layer && (
						<div className="text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 mr-1 bg-primary-200 text-primary-500 rounded-full">
							{company.layer}
						</div>
					)}

					{company.overview && (
						<p className="text-lg my-5">{company.overview}</p>
					)}

					<div className="inline-flex flex-wrap items-center gap-x-6">
						{company.investorAmount && (
							<div className="inline-flex py-3">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6 mr-1 text-primary-500"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth="2"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
									/>
								</svg>
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
									rel="noreferrer"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-6 w-6 mr-1 text-primary-500"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
										/>
									</svg>
									<span>White Paper</span>
								</a>
							</div>
						)}

						{company.totalEmployees && (
							<div className="inline-flex py-3">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6 mr-1 text-primary-500"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth="2"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
									/>
								</svg>
								<div>
									<span className="font-bold mr-1">
										{company.totalEmployees}
									</span>
									Total Employee Count
								</div>
							</div>
						)}

						{company.yearFounded && (
							<div className="inline-flex py-3">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6 mr-1 text-primary-500"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth="2"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
									/>
								</svg>
								<div>
									<span className="font-bold mr-1">{company.yearFounded}</span>
									Founded
								</div>
							</div>
						)}
					</div>

					<div className="my-5 flex flex-row items-center">
						{company.website && (
							<a
								href={company.website}
								target="_blank"
								className="mr-4"
								rel="noreferrer"
							>
								<ElemButton btn="primary" arrow>
									Visit website
								</ElemButton>
							</a>
						)}
						<a
							href={company.companyLinkedIn}
							target="_blank"
							className="flex items-center justify-center w-9 h-9 mr-4 rounded-full text-primary-500 hover:text-white hover:bg-primary-500 border border-primary-500 "
							rel="noreferrer"
						>
							<svg
								className="h-6 w-6"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<title>{company.title} LinkedIn</title>
								<path
									d="M4.20805 9.10047H7.7241V19.6814H4.20805V9.10047ZM5.98961 4C4.78621 4 4 4.79004 4 5.82699C4 6.84262 4.7632 7.65562 5.94359 7.65562H5.96602C7.19242 7.65562 7.95617 6.84258 7.95617 5.82699C7.93316 4.79004 7.19246 4 5.98961 4V4ZM16.357 8.85191C14.4906 8.85191 13.6545 9.87848 13.188 10.5984V9.10047H9.67094C9.7175 10.0931 9.67094 19.6814 9.67094 19.6814H13.188V13.7723C13.188 13.4558 13.2111 13.1405 13.3036 12.9137C13.5582 12.282 14.1369 11.6277 15.1076 11.6277C16.3811 11.6277 16.8897 12.5984 16.8897 14.0202V19.6814H20.4062V13.6141C20.4062 10.3641 18.6718 8.85191 16.357 8.85191V8.85191Z"
									fill="currentColor"
								></path>
							</svg>
						</a>
					</div>
				</div>
			</div>

			{company.founder.length > 0 && (
				<ElemFounderGrid heading="Founders" people={company.founder} />
			)}

			{company.teamMembers.length > 0 && (
				<div className="mt-20">
					<ElemTeamGrid heading="Team Members" people={company.teamMembers} />
				</div>
			)}

			{company.investmentRounds.length > 0 && (
				<div className="mt-20">
					<ElemInvestments
						heading="Investments"
						investments={company.investmentRounds}
					/>
				</div>
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
	const { data: companies } = await runGraphQl(`          {
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
      companyLinkedIn
      website
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
            name
			picture
            slug
          }
          vcFirms {
            id
            vcFirm
            slug
            logo
          }

        }
      }
    }
  }
`);

	return {
		props: {
			company: companies.companies[0],
		},
	};
};

const convertAmountRaised = (theAmount: number) => {
	return convertToInternationalCurrencySystem(theAmount);
};

export default Company;

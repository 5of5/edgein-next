import type { NextPage, GetStaticProps } from "next";
import React from "react";
import { useRouter } from "next/router";
import { ElemButton } from "../../components/ElemButton";
import { ElemPhoto } from "../../components/ElemPhoto";
import { ElemCredibility } from "../../components/Company/ElemCredibility";
import { ElemVelocity } from "../../components/Company/ElemVelocity";
import { ElemKeyInfo } from "../../components/ElemKeyInfo";
import { ElemTags } from "../../components/ElemTags";
import { ElemFounderGrid } from "../../components/Company/ElemFounderGrid";
import { ElemInvestments } from "../../components/Company/ElemInvestments";
import { ElemTeamGrid } from "../../components/Company/ElemTeamGrid";
import { runGraphQl } from "../../utils";

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
		<div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:py-12 lg:px-8">
			<div onClick={goBack}>
				<ElemButton className="pl-0 pr-0" btn="transparent" arrowLeft>
					Back
				</ElemButton>
			</div>
			<div className="flex flex-col md:grid md:grid-cols-3 gap-5 mt-6">
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

					<div className="flex flex-col md:grid grid-cols-5 gap-1 mt-6">
						<ElemCredibility
							className="col-span-3 mt-16 md:mt-0"
							heading="Credibility"
							marketVerified={company.marketVerified}
							githubVerified={company.github}
							linkedInVerified={company.companyLinkedIn}
						/>
						<ElemVelocity
							className="col-span-2 flex flex-col mt-16 md:mt-0"
							heading="Velocity"
							employeeListings={company.velocityLinkedIn}
							tokenExchangeValue={company.velocityToken}
						/>
					</div>
				</div>
			</div>

			<ElemKeyInfo
				className="mt-12"
				heading="Key Info"
				website={company.website}
				totalFundingRaised={company.investorAmount}
				whitePaper={company.whitePaper}
				totalEmployees={company.totalEmployees}
				yearFounded={company.yearFounded}
				linkedIn={company.companyLinkedIn}
				github={company.github}
			/>

			{companyTags.length > 0 && (
				<ElemTags className="mt-12" heading="Tags" tags={companyTags} />
			)}

			{company.founder.length > 0 && (
				<ElemFounderGrid
					className="mt-12"
					heading="Founders"
					people={company.founder}
				/>
			)}

			{company.teamMembers.length > 0 && (
				<ElemTeamGrid
					className="mt-12"
					heading="Team Members"
					people={company.teamMembers}
				/>
			)}

			{sortedInvestmentRounds.length > 0 && (
				<ElemInvestments
					className="mt-12"
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
	  marketVerified
      companyLinkedIn
	  github
	  velocityLinkedIn
	  velocityToken
      founder {
        id
        slug
        name
        type
        picture
      }
      teamMembers {
        id
        person {
          id
          slug
          name
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

export default Company;

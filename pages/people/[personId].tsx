import React, { MutableRefObject, useRef, useEffect } from "react";
import type { NextPage, GetStaticProps, GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { ElemPhoto } from "@/components/ElemPhoto";
import { ElemKeyInfo } from "@/components/ElemKeyInfo";
import { ElemInvestments } from "@/components/Investor/ElemInvestments";
import { ElemTabBar } from "@/components/ElemTabBar";
import { runGraphQl, removeSpecialCharacterFromString } from "@/utils";
import {
	GetCompaniesQuery,
	GetPersonDocument,
	GetPersonQuery,
	Investment_Rounds,
	People,
} from "../../graphql/types";
import { ElemJobsList } from "@/components/Person/ElemJobsList";
import { ElemInvestorsList } from "@/components/Person/ElemInvestorsList";
import { onTrackView } from "@/utils/track";

type Props = {
	person: People;
	sortByDateAscInvestments: Investment_Rounds[];
};

const Person: NextPage<Props> = (props) => {
	const router = useRouter();
	const overviewRef = useRef() as MutableRefObject<HTMLDivElement>;
	const investmentRef = useRef() as MutableRefObject<HTMLDivElement>;

	const goBack = () => router.back();

	const person = props.person;

	useEffect(() => {
    if (person) {
      onTrackView({
        resourceId: person?.id,
        resourceType: "people",
        pathname: router.asPath,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [person]);

	if (!person) {
		return <h1>Not Found</h1>;
	}

	const sortedInvestmentRounds = props.sortByDateAscInvestments;

	let personEmails: string[] = [];

	if (person.work_email) {
		personEmails.push(person.work_email);
	}

	if (person.personal_email) {
		personEmails.push(person.personal_email);
	}

	const tabBarItems = [{ name: "Overview", ref: overviewRef }];
	if (sortedInvestmentRounds.length > 0) {
		tabBarItems.push({
			name: "Investments",
			ref: investmentRef,
		});
	}

	return (
		<div className="relative">
			{/* <div onClick={goBack}>
				<ElemButton className="pl-0 pr-0" btn="transparent" arrowLeft>
				Back
				</ElemButton>
				</div> */}
			<div className="h-64 w-full bg-[url('https://source.unsplash.com/random/500×200/?shapes,pattern')] bg-cover bg-no-repeat bg-center shadow"></div>

			<div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8">
				<div className="-mt-12 lg:grid lg:grid-cols-11 lg:gap-7 lg:items-center">
					<div className="col-span-2 flex justify-center">
						<ElemPhoto
							photo={person.picture}
							wrapClass="flex items-center justify-center aspect-square shrink-0 p-1 bg-white overflow-hidden rounded-full shadow w-40 lg:w-full"
							imgClass="object-contain w-full h-full rounded-full overflow-hidden"
							imgAlt={person.name}
							placeholder="user"
							placeholderClass="text-slate-300"
						/>
					</div>
					<div className="w-full col-span-9 mt-7">
						<div className="flex justify-center text-center lg:justify-start lg:text-left lg:shrink-0">
							<div>
								<h1 className="text-3xl font-bold lg:text-4xl">
									{person.name}
								</h1>
								{person.type && (
									<div className="pb-0.5 whitespace-nowrap text-lg text-slate-600">
										{removeSpecialCharacterFromString(person.type as string)}
									</div>
								)}
							</div>
						</div>
						{person.about && (
							<p className="mt-4 line-clamp-3 text-base text-slate-600">
								{person.about}
							</p>
						)}
					</div>
				</div>

				<ElemTabBar className="mt-7" tabs={tabBarItems} />

				<div
					className="mt-7 lg:grid lg:grid-cols-11 lg:gap-7"
					ref={overviewRef}
					id="overview"
				>
					<div className="col-span-3">
						<ElemKeyInfo
							className="sticky top-4 mb-7 lg:mb-0"
							heading="Key Info"
							roles={removeSpecialCharacterFromString(person.type as string)}
							linkedIn={person.linkedin}
							investmentsLength={person.investments?.length}
							emails={personEmails}
							github={person.github}
							twitter={person.twitter_url}
							location={person.city}
							website={person.website_url}
						/>
					</div>
					<div className="col-span-8">
						{person.team_members.length > 0 && (
							<ElemJobsList
								heading="Experience"
								team_members={person.team_members}
								className="mb-7"
							/>
						)}
						{!person.investors || person.investors.length === 0 ? null : (
							<ElemInvestorsList
								heading="Investment Firms"
								investors={person.investors}
								className="mb-7"
							/>
						)}
					</div>
				</div>

				{/* {person.companies?.length > 0 && (
				<ElemCompaniesGrid
					className="mt-12"
					heading="Companies"
					companies={person.companies}
				/>
			)} */}

				{sortedInvestmentRounds.length > 0 && (
					<div
						ref={investmentRef}
						className="mt-7 p-5 rounded-lg bg-white shadow"
						id="investments"
					>
						<ElemInvestments
							heading="Investments"
							investments={sortedInvestmentRounds}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

// export async function getStaticPaths() {
// 	const { data: people } = await runGraphQl<GetPersonQuery>(`{
//     people(
// 			where: {slug: {_neq: ""}}, order_by: {slug: asc}
//     ){
//         id,
//         name,
//         slug,
//       }
//     }`);

// 	return {
// 		paths: people?.people
// 			?.filter((person) => person.slug)
// 			.map((person) => ({
// 				params: { personId: person.slug },
// 			})),
// 		fallback: true, // false or 'blocking'
// 	};
// }

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { data: people } = await runGraphQl<GetPersonQuery>(GetPersonDocument, {
		slug: context.params?.personId,
	});

	if (!people?.people?.[0]) {
		return {
			notFound: true,
		};
	}

	const getInvestments = people.people[0].investments.map((round) => {
		if (typeof round.investment_round === "object") {
			return round.investment_round;
		} else {
			return null;
		}
	});

	const sortByDateAscInvestments = getInvestments
		.slice()
		.sort((a, b) => {
			const distantFuture = new Date(8640000000000000);

			let dateA = a?.round_date ? new Date(a.round_date) : distantFuture;
			let dateB = b?.round_date ? new Date(b.round_date) : distantFuture;
			return dateA.getTime() - dateB.getTime();
		})
		.reverse();

	return {
		props: {
			person: people.people[0],
			sortByDateAscInvestments,
		},
	};
};

export default Person;

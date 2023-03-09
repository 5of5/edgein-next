import React, { MutableRefObject, useRef, useEffect, useState } from "react";
import type { NextPage, GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { ElemPhoto } from "@/components/ElemPhoto";
import { ElemKeyInfo } from "@/components/ElemKeyInfo";
import { ElemInvestments } from "@/components/Investor/ElemInvestments";
import { ElemTabBar } from "@/components/ElemTabBar";
import { ElemButton } from "@/components/ElemButton";
import { runGraphQl, removeSpecialCharacterFromString } from "@/utils";
import {
	GetPersonDocument,
	GetPersonQuery,
	Investment_Rounds,
	People,
	useGetUserProfileQuery,
} from "@/graphql/types";
import { ElemJobsList } from "@/components/Person/ElemJobsList";
import { ElemInvestorsList } from "@/components/Person/ElemInvestorsList";
import { onTrackView } from "@/utils/track";
import { useAuth } from "@/hooks/useAuth";
import { useIntercom } from "react-use-intercom";
import { IconCheckBadgeSolid } from "@/components/Icons";
import { ElemTooltip } from "@/components/ElemTooltip";

type Props = {
	person: People;
	sortByDateAscInvestments: Investment_Rounds[];
};

const Person: NextPage<Props> = (props) => {
	const router = useRouter();
	const overviewRef = useRef() as MutableRefObject<HTMLDivElement>;
	const investmentRef = useRef() as MutableRefObject<HTMLDivElement>;
	const { user } = useAuth();
	const { showNewMessages } = useIntercom();

	const person = props.person;
	const sortedInvestmentRounds = props.sortByDateAscInvestments;

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

	const personEmails = [
		...(person.work_email ? [person.work_email] : []),
		...(person.personal_email ? [person.personal_email] : []),
	];

	const tabBarItems = [
		{ name: "Overview", ref: overviewRef },
		...(sortedInvestmentRounds.length > 0
			? [
					{
						name: "Investments",
						ref: investmentRef,
					},
			  ]
			: []),
	];

	const [claimedProfile, setClaimedProfile] = useState(false);

	const profileUrl = `https://edgein.io${router.asPath}`;

	const {
		data: users,
		refetch,
		isLoading,
	} = useGetUserProfileQuery({
		id: user?.id ?? 0,
	});

	useEffect(() => {
		if (users?.users_by_pk?.person) {
			setClaimedProfile(true);
		}
	}, [users]);

	return (
		<div className="relative">
			<div className="w-full bg-gradient-to-b from-transparent to-white shadow">
				<div className="bg-slate-600 border-b border-black/10">
					<div className="h-64 w-full bg-[url('https://source.unsplash.com/random/500×200/?shapes')] bg-cover bg-no-repeat bg-center"></div>
				</div>
				<div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8">
					<div className="-mt-12 lg:grid lg:grid-cols-11 lg:gap-7 lg:items-start">
						<div className="col-span-2 flex justify-center">
							<ElemPhoto
								photo={person.picture}
								wrapClass="flex items-center justify-center aspect-square shrink-0 p-1 bg-white overflow-hidden rounded-full shadow w-40 lg:w-full"
								imgClass="object-cover w-full h-full rounded-full overflow-hidden"
								imgAlt={person.name}
								placeholder="user"
								placeholderClass="text-slate-300"
							/>
						</div>
						<div className="w-full col-span-9">
							<div className="text-center lg:flex lg:items-center lg:justify-between lg:text-left lg:pt-14 lg:shrink-0">
								<div>
									{person.type && (
										<div className="whitespace-nowrap text-lg text-slate-600">
											{removeSpecialCharacterFromString(person.type as string)}
										</div>
									)}
									<div className="flex items-center justify-center space-x-2 lg:justify-start">
										<h1 className="text-3xl font-bold lg:text-4xl">
											{person.name}
										</h1>

										{claimedProfile && (
											<ElemTooltip
												content="Claimed profile"
												className="cursor-pointer"
											>
												<IconCheckBadgeSolid
													className="h-8 w-8 text-primary-500"
													title="Claimed profile"
												/>
											</ElemTooltip>
										)}
									</div>

									{!claimedProfile && (
										<ElemButton
											className="mt-2"
											btn="primary"
											onClick={() =>
												showNewMessages(
													`Hi EdgeIn, I'd like to claim this profile: ${profileUrl}`
												)
											}
										>
											Claim profile
										</ElemButton>
									)}
								</div>
								<div className="mt-6 lg:mt-0"></div>
							</div>

							{person.about && (
								<p className="mt-4 line-clamp-3 text-base text-slate-600">
									{person.about}
								</p>
							)}
						</div>
					</div>

					<ElemTabBar
						className="mt-7"
						tabs={tabBarItems}
						resourceName={person.name}
					/>
				</div>
			</div>

			<div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8">
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
						{person.about && (
							<div className="w-full p-4 bg-white shadow rounded-lg mb-7">
								<div className="flex items-center justify-between">
									<h2 className="text-xl font-bold">About</h2>
								</div>
								<p className="line-clamp-3 text-base text-slate-600">
									{person.about}
								</p>
							</div>
						)}

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

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { data: people } = await runGraphQl<GetPersonQuery>(
		GetPersonDocument,
		{
			slug: context.params?.personId,
		},
		context.req.cookies
	);

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

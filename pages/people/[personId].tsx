import React, { MutableRefObject, useRef } from "react";
import type { NextPage, GetStaticProps, GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { ElemButton } from "../../components/ElemButton";
import { ElemPhoto } from "../../components/ElemPhoto";
import { ElemKeyInfo } from "../../components/ElemKeyInfo";
import { ElemCompaniesGrid } from "../../components/Person/ElemCompaniesGrid";
import { ElemVcfirmsGrid } from "../../components/Person/ElemVcfirmsGrid";
import { ElemTable } from "../../components/ElemTable";
import { ElemTableCell } from "../../components/ElemTableCell";
import { ElemTabBar } from "@/components/ElemTabBar";
import {
	runGraphQl,
	formatDate,
	convertToInternationalCurrencySystem,
	removeSpecialCharacterFromString,
} from "../../utils";
import {
	GetCompaniesQuery,
	GetPersonDocument,
	GetPersonQuery,
	Investment_Rounds,
	People,
} from "../../graphql/types";
import { ElemJobsGrid } from "@/components/Person/ElemJobsGrid";

type Props = {
	person: People;
	sortByDateAscInvestments: Investment_Rounds[];
};

const Person: NextPage<Props> = (props) => {
	const router = useRouter();
	const overviewRef = useRef() as MutableRefObject<HTMLDivElement>;

	const goBack = () => router.back();

	const person = props.person;

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

	// Tabs
	const tabBarItems = [{ name: "Overview", ref: overviewRef }];

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6">
			{/* <div onClick={goBack}>
        <ElemButton className="pl-0 pr-0" btn="transparent" arrowLeft>
          Back
        </ElemButton>
      </div> */}

			<div className="flex-col sm:grid sm:grid-cols-4 gap-5 my-5">
				<div className="col-span-1">
					<ElemPhoto
						photo={person.picture}
						wrapClass="flex items-center justify-center bg-white rounded-lg shadow-md overflow-hidden p-4"
						imgClass="object-fit min-w-full min-h-full"
						imgAlt={person.name}
					/>
				</div>

				<div className="col-span-3 flex min-h-full p-0 mt-7 lg:mt-0">
					<div className="flex flex-col justify-center">
						<div className="flex w-full items-center">
							<span className="text-4xl md:text-6xl font-bold">
								{person.name}
							</span>
							<span className="block ml-1 mt-5">
								{removeSpecialCharacterFromString(person.type as string)}
							</span>
						</div>

						{/* To do  */}
						<div className="flex p-1 max-w-[700px] text-slate-600 text-sm">
							Bram Cohen is an American computer programmer, best known as the
							author of the peer-to-peer BitTorrent protocol in 2001, as well as
							the first file sharing program to use the protocol, also known as
						</div>
					</div>
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
						className="sticky top-4"
						heading="Key Info"
						// roles={person.type}
						linkedIn={"linkedin"}
						// investmentsLength={person.investments?.length}
						emails={["email@gmail.com", "email2@gmail.com"]}
						github={"github"}
						twitter={"twitter"}
						location={"location"}
						website={"https://google.com"}
					/>
				</div>
				<div className="col-span-8">
					<ElemJobsGrid />
				</div>
			</div>

			{/* {person.companies?.length > 0 && (
				<ElemCompaniesGrid
					className="mt-12"
					heading="Companies"
					companies={person.companies}
				/>
			)} */}

			{/* {person.team_members[0]?.company && (
        <ElemCompaniesGrid
          className="mt-12"
          heading="Companies"
          companies={[person.team_members[0]?.company]}
        />
      )} */}

			{/* {person.vc.length > 0 && (
				<ElemVcfirmsGrid
					className="mt-12"
					heading="VC Firms"
					vcfirms={person.vcFirms}
				/>
			)} */}

			{/* {Object.keys(sortedInvestmentRounds).length > 0 && (
        <div className="mt-16" id="investments">
          <h2 className="text-2xl font-bold">Investments</h2>

          <ElemTable
            className="mt-3 w-full"
            columns={[
              { label: "Company" },
              { label: "Round" },
              { label: "Money Raised" },
              { label: "Date" },
            ]}
          >
            {sortedInvestmentRounds.map((theRound, index: number) => {
              if (!theRound) {
                return;
              }

              return (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "" : ""
                  } flex flex-col flex-no wrap overflow-hidden md:table-row`}
                >
                  <ElemTableCell header="Company">
                    {theRound.company ? (
                      <Link
                        href={`/companies/${theRound.company.slug}`}
                        key={theRound.company.id}
                      >
                        <a className="investor flex items-center hover:opacity-70">
                          <ElemPhoto
                            photo={theRound.company.logo}
                            wrapClass="flex items-center shrink-0 w-12 h-12 rounded-lg overflow-hidden mr-2 bg-white shadow-md"
                            imgClass="object-fit max-w-full max-h-full"
                            imgAlt={theRound.company.name}
                          />
                          {theRound.company.name}
                        </a>
                      </Link>
                    ) : (
                      <>&mdash;</>
                    )}
                  </ElemTableCell>

                  <ElemTableCell header="Round">
                    {theRound.round ? <>{theRound.round}</> : <>&mdash;</>}
                  </ElemTableCell>

                  <ElemTableCell header="Money Raised">
                    {theRound.amount ? (
                      <>
                        <span>$</span>
                        {convertAmountRaised(theRound.amount)}
                      </>
                    ) : (
                      <>&mdash;</>
                    )}
                  </ElemTableCell>

                  <ElemTableCell header="Date">
                    {theRound.round_date ? (
                      formatDate(theRound.round_date, {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                      })
                    ) : (
                      <>&mdash;</>
                    )}
                  </ElemTableCell>
                </tr>
              );
            })}
          </ElemTable>
        </div>
      )} */}
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

function convertAmountRaised(theAmount: number) {
	return convertToInternationalCurrencySystem(theAmount);
}

import type { NextPage, GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { ElemButton } from "../../components/ElemButton";
import { ElemPhoto } from "../../components/ElemPhoto";
import { ElemKeyInfo } from "../../components/ElemKeyInfo";
import { ElemCompaniesGrid } from "../../components/Person/ElemCompaniesGrid";
import { ElemVcfirmsGrid } from "../../components/Person/ElemVcfirmsGrid";
import { ElemTable } from "../../components/ElemTable";
import { ElemTableCell } from "../../components/ElemTableCell";
import {
	runGraphQl,
	formatDate,
	convertToInternationalCurrencySystem,
} from "../../utils";
import {
	GetCompaniesQuery,
	GetPersonDocument,
	GetPersonQuery,
	Investment_Rounds,
	People,
} from "../../graphql/types";

type Props = {
	person: People;
	sortByDateAscInvestments: Investment_Rounds[];
};

const Person: NextPage<Props> = (props) => {
	const router = useRouter();

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

	return (
		<div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:py-12 lg:px-8">
			<div onClick={goBack}>
				<ElemButton className="pl-0 pr-0" btn="transparent" arrowLeft>
					Back
				</ElemButton>
			</div>

			<div className="flex-col sm:grid sm:grid-cols-4 gap-5 my-8">
				<div className="col-span-1">
					<ElemPhoto
						photo={person.picture}
						wrapClass="flex items-center justify-center bg-white rounded-lg shadow-md overflow-hidden"
						imgClass="object-fit min-w-full min-h-full"
						imgAlt={person.name}
					/>
				</div>

				<div className="w-full col-span-3 p-2">
					<h1 className="text-4xl md:text-6xl font-bold my-5">{person.name}</h1>

					<ElemKeyInfo
						heading=""
						roles={person.type}
						linkedIn={person.linkedin}
						investmentsLength={person.investments?.length}
						emails={personEmails}
					/>
				</div>
			</div>

			{/* {person.companies?.length > 0 && (
				<ElemCompaniesGrid
					className="mt-12"
					heading="Companies"
					companies={person.companies}
				/>
			)} */}

			{person.team_members[0]?.company && (
				<ElemCompaniesGrid
					className="mt-12"
					heading="Companies"
					companies={[person.team_members[0]?.company]}
				/>
			)}

			{/* {person.vc.length > 0 && (
				<ElemVcfirmsGrid
					className="mt-12"
					heading="VC Firms"
					vcfirms={person.vcFirms}
				/>
			)} */}

			{Object.keys(sortedInvestmentRounds).length > 0 && (
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
			)}
		</div>
	);
};

export async function getStaticPaths() {
	const { data: people } = await runGraphQl<GetPersonQuery>(`{ 
    people( 
			where: {slug: {_neq: ""}}, order_by: {slug: asc}
    ){ 
        id, 
        name, 
        slug,
      }
    }`);

	return {
		paths: people?.people
			?.filter((person) => person.slug)
			.map((person) => ({
				params: { personId: person.slug },
			})),
		fallback: true, // false or 'blocking'
	};
}

export const getStaticProps: GetStaticProps = async (context) => {
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

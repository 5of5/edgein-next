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

type Props = {
	person: Record<string, any>;
	sortByDateAscInvestments: Record<string, any>;
};

const Person: NextPage<Props> = (props) => {
	const router = useRouter();

	const goBack = () => router.back();

	const person = props.person;

	if (!person) {
		return <h1>Not Found</h1>;
	}

	const sortedInvestmentRounds = props.sortByDateAscInvestments;

	let personEmails: {}[] = [];

	if (person.workEmail?.length > 0) {
		personEmails.push(person.workEmail);
	}

	if (person.personalEmail?.length > 0) {
		personEmails.push(person.personalEmail);
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
						photos={person.picture}
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
						linkedIn={person.linkedIn}
						investmentsLength={person.investments?.length}
						companies={person.companies}
						emails={personEmails}
					/>
				</div>
			</div>

			{person.companies?.length > 0 && (
				<ElemCompaniesGrid
					className="mt-12"
					heading="Companies"
					companies={person.companies}
				/>
			)}

			{person.teamMembers[0]?.company?.length > 0 && (
				<ElemCompaniesGrid
					className="mt-12"
					heading="Companies"
					companies={person.teamMembers[0]?.company}
				/>
			)}

			{person.vcFirms?.length > 0 && (
				<ElemVcfirmsGrid
					className="mt-12"
					heading="VC Firms"
					vcfirms={person.vcFirms}
				/>
			)}

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
						{sortedInvestmentRounds.map((theRound: any, index: number) => {
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
										{theRound.company?.length > 0 ? (
											theRound.company.map((company: any) => {
												return (
													<Link
														href={`/companies/${company.slug}`}
														key={company.id}
													>
														<a className="investor flex items-center hover:opacity-70">
															<ElemPhoto
																photos={company.logo}
																wrapClass="flex items-center shrink-0 w-12 h-12 rounded-lg overflow-hidden mr-2 bg-white shadow-md"
																imgClass="object-fit max-w-full max-h-full"
																imgAlt={company.title}
															/>
															{company.title}
														</a>
													</Link>
												);
											})
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
										{theRound.date ? (
											formatDate(theRound.date, {
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
	const {
		data: { people },
	} = await runGraphQl(`{ 
    people( 
      _order_by: {name: "asc"},
      _filter: {slug: {_ne: ""}},
    ){ 
        id, 
        name, 
        slug,
      }
    }`);

	return {
		paths: people
			.filter((person: { slug: string }) => person.slug)
			.map((person: { slug: string }) => ({
				params: { personId: person.slug },
			})),
		fallback: true, // false or 'blocking'
	};
}

export const getStaticProps: GetStaticProps = async (context) => {
	const {
		data: { people },
	} = await runGraphQl(`
  {
    people(slug: "${context.params?.personId}") {
		id
		name
		slug
		picture
		type
		personalEmail
		workEmail
		linkedIn
		teamMembers{
			company {
				id
				slug
				title
				logo
				overview
			}
		}
		companies {
			id
			title
			slug
			logo
			overview
		}
		investments {
			name
			investmentRound {
				id
				date
				round
				amount
				company {
					id
					slug
					title
					logo
				}
			}
		}
		vcFirms{
			id
			vcFirm
			slug
			logo
		}
	}
  }
  `);

	if (!people[0]) {
		return {
			notFound: true,
		};
	}

	const getInvestments = people[0].investments.map((round: any) => {
		if (
			typeof round.investmentRound[0] === "object" &&
			round.investmentRound[0] != "undefined"
		) {
			return round.investmentRound[0];
		} else {
			return null;
		}
	});

	const sortByDateAscInvestments = getInvestments
		.slice()
		.sort(
			(
				a: { date: string | number | Date },
				b: { date: string | number | Date }
			) => {
				const distantFuture = new Date(8640000000000000);

				let dateA = a ? new Date(a.date) : distantFuture;
				let dateB = b ? new Date(b.date) : distantFuture;
				return dateA.getTime() - dateB.getTime();
			}
		)
		.reverse();

	return {
		props: {
			person: people[0],
			sortByDateAscInvestments,
		},
	};
};

export default Person;

function convertAmountRaised(theAmount: any) {
	return convertToInternationalCurrencySystem(theAmount);
}

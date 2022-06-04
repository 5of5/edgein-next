import type { NextPage, GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { ElemButton } from "../../components/ElemButton";
import { ElemPhoto } from "../../components/ElemPhoto";
import { ElemKeyInfo } from "../../components/ElemKeyInfo";
import { ElemCompaniesGrid } from "../../components/Person/ElemCompaniesGrid";
import { ElemVcfirmsGrid } from "../../components/Person/ElemVcfirmsGrid";
import { ElemTable } from "../../components/ElemTable";
import {
	runGraphQl,
	formatDate,
	convertToInternationalCurrencySystem,
} from "../../utils";

type Props = {
	person: Record<string, any>;
};

const Person: NextPage<Props> = ({ person }) => {
	const router = useRouter();

	const goBack = () => router.back();

	if (!person) {
		return <h1>Not Found</h1>;
	}

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

			{person.investments[0]?.investmentRound.length > 0 && (
				<div className="mt-12" id="investments">
					<h2 className="text-2xl font-bold">Investments</h2>

					<ElemTable
						className="mt-3 w-full flex flex-row flex-no-wrap sm:table sm:table-auto"
						columns={[
							{ label: "Company" },
							{ label: "Round" },
							{ label: "Money Raised" },
							{ label: "Date" },
						]}
					>
						{person.investments.map((round: any, index: number) => {
							const theRound = round?.investmentRound[0];

							if (theRound) {
								return (
									<tr
										key={index}
										className={`${
											index % 2 === 0 ? "" : ""
										} flex flex-col flex-no wrap overflow-hidden sm:table-row`}
									>
										<th className="text-left px-4 pt-4 sm:hidden">Company</th>
										<td className="px-4 pb-4 whitespace-nowrap sm:p-4">
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
										</td>
										<th className="text-left px-4 pt-4 sm:hidden">Round</th>
										<td className="px-4 pb-4 whitespace-nowrap sm:p-4">
											{theRound.round ? <>{theRound.round}</> : <>&mdash;</>}
										</td>
										<th className="text-left px-4 pt-4 sm:hidden">
											Money Raised
										</th>
										<td className="px-4 pb-4 whitespace-nowrap sm:p-4">
											{theRound.amount ? (
												<>
													<span>$</span>
													{convertAmountRaised(theRound.amount)}
												</>
											) : (
												<>&mdash;</>
											)}
										</td>
										<th className="text-left px-4 pt-4 sm:hidden">Date</th>
										<td
											className="px-4 pb-4 whitespace-nowrap sm:p-4"
											// colSpan={4}
										>
											{theRound.date ? (
												formatDate(theRound.date, {
													month: "short",
													day: "2-digit",
													year: "numeric",
												})
											) : (
												<>&mdash;</>
											)}
										</td>
									</tr>
								);
							}
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

	return {
		props: {
			person: people[0],
		},
	};
};

export default Person;

function convertAmountRaised(theAmount: any) {
	return convertToInternationalCurrencySystem(theAmount);
}

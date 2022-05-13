import type { NextPage, GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { ElemButton } from "../../components/ElemButton";
import { ElemPhoto } from "../../components/ElemPhoto";
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

	return (
		<div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
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

					<div className="inline-flex flex-wrap items-center gap-x-6 mb-5">
						{person.type?.length > 0 && (
							<div className="w-full inline-flex py-3 sm:w-auto">
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
										d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
									/>
								</svg>
								<div className="inline font-medium">
									{person.type.map((type: any, i: number) => [
										i > 0 && ", ",
										<span key={i}>{type}</span>,
									])}
								</div>
							</div>
						)}

						{person.investments.length > 0 && (
							<a
								href="#investmentRounds"
								className="inline-flex py-3 hover:opacity-70"
							>
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
									{person.investments.length}
								</span>
								Investment{person.investments.length > 1 && "s"}
							</a>
						)}

						{person.companies?.length > 0 && (
							<div className="w-full inline-flex py-3 sm:w-auto">
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
										d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
									/>
								</svg>
								<div className="inline font-medium">
									{person.companies.map((company: any, i: number) => [
										i > 0 && ", ",
										<Link key={company.id} href={`/companies/${company.slug}`}>
											<a className="hover:opacity-60">{company.title}</a>
										</Link>,
									])}
								</div>
							</div>
						)}

						{person.email && (
							<div className="w-full inline-flex py-3 sm:w-auto">
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
										d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
									/>
								</svg>
								<a
									href={`mailto:${person.email}`}
									target="_blank"
									className="font-medium hover:opacity-60"
									rel="noopener noreferrer"
								>
									{person.email}
								</a>
							</div>
						)}

						{person.linkedin && (
							<div className="w-full inline-flex py-3 sm:w-auto">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6 mr-1 text-primary-500"
									fill="none"
									viewBox="0 0 24 24"
								>
									<path
										d="M4.20805 9.10047H7.7241V19.6814H4.20805V9.10047ZM5.98961 4C4.78621 4 4 4.79004 4 5.82699C4 6.84262 4.7632 7.65562 5.94359 7.65562H5.96602C7.19242 7.65562 7.95617 6.84258 7.95617 5.82699C7.93316 4.79004 7.19246 4 5.98961 4V4ZM16.357 8.85191C14.4906 8.85191 13.6545 9.87848 13.188 10.5984V9.10047H9.67094C9.7175 10.0931 9.67094 19.6814 9.67094 19.6814H13.188V13.7723C13.188 13.4558 13.2111 13.1405 13.3036 12.9137C13.5582 12.282 14.1369 11.6277 15.1076 11.6277C16.3811 11.6277 16.8897 12.5984 16.8897 14.0202V19.6814H20.4062V13.6141C20.4062 10.3641 18.6718 8.85191 16.357 8.85191V8.85191Z"
										fill="currentColor"
									></path>
								</svg>
								<a
									href={person.linkedin}
									target="_blank"
									className="font-medium hover:opacity-60"
									rel="noopener noreferrer"
								>
									LinkedIn
								</a>
							</div>
						)}
					</div>

					{person.companies.length > 0 && (
						<div className="w-full flex flex-col md:grid sm:grid-cols-2 md:grid-cols-3 gap-5">
							{person.companies.map((company: any) => (
								<Link
									key={company.id}
									href={`/companies/${company.slug}`}
									passHref
								>
									<a className="block overflow-hidden md:h-full bg-white p-6 rounded-lg transition-all hover:shadow-md hover:-translate-y-1">
										<ElemPhoto
											photos={company.logo}
											wrapClass="flex items-center justify-center h-28"
											imgClass="object-fit max-w-full max-h-full"
											imgAlt={company.title}
										/>
										<h3 className="font-bold text-center text-xl mt-2">
											{company.title}
										</h3>
									</a>
								</Link>
							))}
						</div>
					)}
				</div>
			</div>

			{person.investments.length > 0 && (
				<div className="mt-16" id="investmentRounds">
					<h2 className="text-3xl font-bold">Investments</h2>

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
							const theRound = round.investmentRound[0];

							return (
								<tr
									key={index}
									className={`${
										index % 2 === 0 ? "" : ""
									} flex flex-col flex-no wrap overflow-hidden sm:table-row`}
								>
									<th className="text-left px-4 pt-4 sm:hidden">Company</th>
									<td className="px-4 pb-4 whitespace-nowrap sm:p-4">
										{theRound.company.length > 0 ? (
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
        picture, 
        type
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
		picture
		type
		email
		linkedIn
		companies {
			id
			title
			slug
			logo
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

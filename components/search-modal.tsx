import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import algoliasearch from "algoliasearch/lite";
import { Hit as AlgoliaHit } from "instantsearch.js";
import { every } from "lodash";
import {
	InstantSearch,
	useInstantSearch,
	SearchBox,
	Highlight,
	InfiniteHits,
	Index,
	Configure,
} from "react-instantsearch-hooks-web";
import { FigureSearch } from "@/components/figures";
import {
	IconSearch,
	IconChevronRight,
	IconUser,
	IconImage,
} from "@/components/icons";
import Link from "next/link";
import { getEventBanner, randomImageOfCity } from "@/utils/helpers";
import { formatDate } from "@/utils/numbers";

const searchClient = algoliasearch(
	process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID!,
	process.env.NEXT_PUBLIC_ALGOLIA_API_KEY!
);

type HitCompaniesProps = {
	hit: AlgoliaHit<{
		name: string;
		overview: string;
		coinTicker: string;
		logo: string;
		slug: string;
		empty: boolean;
	}>;
};

type HitInvestorsProps = {
	hit: AlgoliaHit<{
		name: string;
		logo: string;
		slug: string;
		empty: boolean;
	}>;
};

type HitPeopleProps = {
	hit: AlgoliaHit<{
		name: string;
		work_email: string;
		personal_email: string;
		picture: string;
		slug: string;
		empty: boolean;
	}>;
};

type HitEventsProps = {
	hit: AlgoliaHit<{
		name: string;
		slug: string;
		overview: string;
		banner: string;
		location_json: Record<string, string>;
		start_date: string;
		end_date: string;
		timezone: string;
		empty: boolean;
	}>;
};

const HitCompanies = (onClose: () => void, isAdmin?: boolean, redirect?: any) =>
	function HitCompanies({ hit }: HitCompaniesProps) {
		return (
			<Link
				href={
					isAdmin
						? `/admin/app/#/companies/${hit.objectID}`
						: `/companies/${hit.slug}`
				}
				passHref
			>
				<a
					onClick={() => {
						onClose();
						if (isAdmin && redirect) {
							redirect(`/companies/${hit.objectID}`);
						}
					}}
					className="flex items-center px-6 py-1 group hover:bg-slate-100"
				>
					<div className="flex items-center justify-center shrink-0 w-12 h-12 p-1 bg-white rounded border border-slate-200">
						{hit.logo ? (
							<img
								className="object-contain max-w-full max-h-full"
								src={hit.logo}
								alt={hit.name}
							/>
						) : (
							<IconImage className="object-contain max-w-full max-h-full text-slate-200" />
						)}
					</div>
					<div className="flex grow">
						<h2 className="min-w-fit font-bold whitespace nowrap ml-2 text-slate-600 group-hover:text-primary-500">
							<Highlight
								attribute="name"
								hit={hit}
								classNames={{
									highlighted:
										"text-primary-500 border-b-2 border-primary-500 opacity-100 bg-transparent",
								}}
							/>
						</h2>
						{hit.coinTicker && (
							<div className="ml-2 uppercase">
								<Highlight
									attribute="coinTicker"
									hit={hit}
									classNames={{
										highlighted:
											"text-primary-500 border-b-2 border-primary-500 opacity-100 bg-primary-100",
									}}
								/>
							</div>
						)}
						<p className="ml-2 text-sm text-slate-600 line-clamp-1">
							<Highlight
								attribute="overview"
								hit={hit}
								classNames={{
									highlighted: "bg-primary-100",
								}}
							/>
						</p>
					</div>
					<IconChevronRight className="h-4 w-4 ml-3 shrink-0 group-hover:text-primary-500" />
				</a>
			</Link>
		);
	};

const HitInvestors = (onClose: () => void, isAdmin?: boolean, redirect?: any) =>
	function HitInvestors({ hit }: HitInvestorsProps) {
		return (
			<Link
				href={
					isAdmin
						? `/admin/app/#/vc_firms/${hit.objectID}`
						: `/investors/${hit.slug}`
				}
				passHref
			>
				<a
					className="flex items-center px-6 py-1 group hover:bg-slate-100"
					onClick={() => {
						onClose();
						if (isAdmin && redirect) {
							redirect(`/vc_firms/${hit.objectID}`);
						}
					}}
				>
					<div className="flex items-center justify-center shrink-0 w-12 h-12 p-1 bg-white rounded border border-slate-200">
						{hit.logo ? (
							<img
								className="object-contain max-w-full max-h-full"
								src={hit.logo}
								alt={hit.name}
							/>
						) : (
							<IconImage className="object-contain max-w-full max-h-full text-slate-200" />
						)}
					</div>
					<h2 className="min-w-fit grow font-bold whitespace nowrap ml-2 text-slate-600">
						<Highlight
							attribute="name"
							hit={hit}
							classNames={{
								highlighted:
									"text-primary-500 border-b-2 border-primary-500 opacity-100 bg-transparent",
							}}
						/>
					</h2>
					<IconChevronRight className="h-4 w-4 ml-3 shrink-0 group-hover:text-primary-500" />
				</a>
			</Link>
		);
	};

const HitPeople = (onClose: () => void, isAdmin?: boolean, redirect?: any) =>
	function HitPeople({ hit }: HitPeopleProps) {
		return (
			<Link
				href={
					isAdmin
						? `/admin/app/#/people/${hit.objectID}`
						: `/people/${hit.slug}`
				}
				passHref
			>
				<a
					className="flex items-center px-6 py-1 group hover:bg-slate-100"
					onClick={() => {
						onClose();
						if (isAdmin && redirect) {
							redirect(`/people/${hit.objectID}`);
						}
					}}
				>
					<div className="flex items-center justify-center shrink-0 w-12 h-12 p-1 bg-white rounded border border-slate-200">
						{hit.picture ? (
							<img
								className="object-contain max-w-full max-h-full"
								src={hit.picture}
								alt={hit.name}
							/>
						) : (
							<IconUser className="object-contain max-w-full max-h-full text-slate-200" />
						)}
					</div>
					<h2 className="min-w-fit grow font-bold whitespace nowrap ml-2 text-slate-600">
						<Highlight
							attribute="name"
							hit={hit}
							classNames={{
								highlighted:
									"text-primary-500 border-b-2 border-primary-500 opacity-100 bg-transparent",
							}}
						/>
					</h2>
					<IconChevronRight className="h-4 w-4 ml-3 shrink-0 group-hover:text-primary-500" />
				</a>
			</Link>
		);
	};

const HitEvents = (onClose: () => void, isAdmin?: boolean, redirect?: any) =>
	function HitEvents({ hit }: HitEventsProps) {
		return (
			<Link
				href={
					isAdmin
						? `/admin/app/#/events/${hit.objectID}`
						: `/events/${hit.slug}`
				}
				passHref
			>
				<a
					onClick={() => {
						onClose();
						if (isAdmin && redirect) {
							redirect(`/events/${hit.objectID}`);
						}
					}}
					className="flex items-center px-6 py-1 group hover:bg-slate-100"
				>
					<div className="flex items-center justify-center shrink-0 w-12 h-12 p-1 bg-white rounded border border-slate-200">
						<img
							className="object-contain max-w-full max-h-full"
							src={hit.banner || getEventBanner(hit.location_json?.city)}
							alt={hit.name}
							onError={(e) => {
								(e.target as HTMLImageElement).src = randomImageOfCity(
									hit.location_json?.city
								);
								(e.target as HTMLImageElement).onerror = null; // prevents looping
							}}
						/>
					</div>

					<div className="flex grow">
						<h2 className="min-w-fit font-bold whitespace nowrap ml-2 text-slate-600 group-hover:text-primary-500">
							<Highlight
								attribute="name"
								hit={hit}
								classNames={{
									highlighted:
										"text-primary-500 border-b-2 border-primary-500 opacity-100 bg-transparent",
								}}
							/>
						</h2>

						{hit.start_date && (
							<p className="ml-2 text-sm text-slate-600 line-clamp-1">
								{formatDate(hit.start_date, {
									month: "short",
									day: "2-digit",
									year: "numeric",
									timeZone: hit.timezone || undefined,
								})}
								{/* <Highlight
								attribute="start_date"
								hit={hit}
								classNames={{
									highlighted:
										"text-primary-500 border-b-2 border-primary-500 opacity-100 bg-primary-100",
								}}
							/> */}

								{hit.end_date && (
									<>
										&nbsp;&ndash;&nbsp;
										{formatDate(hit.end_date, {
											month: "short",
											day: "2-digit",
											year: "numeric",
											timeZone: hit.timezone || undefined,
										})}
										{/* <Highlight
										attribute="end_date"
										hit={hit}
										classNames={{
											highlighted:
												"text-primary-500 border-b-2 border-primary-500 opacity-100 bg-primary-100",
										}}
									/> */}
									</>
								)}
							</p>
						)}
					</div>

					<IconChevronRight className="h-4 w-4 ml-3 shrink-0 group-hover:text-primary-500" />
				</a>
			</Link>
		);
	};

export default function SearchModal(props: any) {
	const emptyView = React.useRef(true);

	const onClose = () => {
		props.onClose();
	};

	function MasterEmptyQueryBoundary({ children, emptyText = "" }: any) {
		const { scopedResults, results } = useInstantSearch();

		const allEmpty = every(
			scopedResults,
			(result) => result.results?.nbHits === 0
		);

		if (emptyView.current) {
			return (
				<div className="px-6 py-1 mt-5 text-center">
					<FigureSearch className="mx-auto h-36 lg:h-40" />
					<div className="mt-3 text-xl font-bold">
						Search for Companies, Investors, People &amp; Events
					</div>
					<div style={{ display: "none" }}>{children}</div>
				</div>
			);
		}

		if (allEmpty) {
			return (
				<div className="w-full mt-5 px-6 py-1">
					<h3 className="font-bold">No results for “{results.query}“</h3>
					<p>
						<Link href={`/contact/`} passHref>
							<a onClick={onClose} className="text-primary-500">
								Tell us about missing data.
							</a>
						</Link>
					</p>
				</div>
			);
		}
		return children;
	}

	function EmptyQueryBoundary({ children, emptyText = "" }: any) {
		const { results } = useInstantSearch();

		if (results._state.query === "") {
			return <div className="px-6 py-1 text-slate-600">{emptyText}</div>;
		} else if (results?.nbHits === 0) {
			return (
				<div className="w-full px-6 py-1">
					<p>
						No results for “{results.query}“.{" "}
						<Link href={`/contact/`} passHref>
							<a onClick={onClose} className="text-primary-500">
								Tell us about missing{" "}
								{results._state.index === "vc_firms"
									? " investors"
									: " " + results._state.index}
								.
							</a>
						</Link>
					</p>
				</div>
			);
		}
		return children;
	}

	return (
		<>
			<Transition appear show={props.show} as={Fragment}>
				<Dialog as="div" className="relative z-50" onClose={onClose}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-25" />
					</Transition.Child>
					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-start justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full max-w-3xl pb-5 transform rounded-lg shadow-2xl bg-white overflow-y-auto overflow-x-hidden text-left align-middle transition-all">
									<InstantSearch
										searchClient={searchClient}
										indexName="companies"
									>
										<header className="relative flex items-center z-10 p-0 px-4 border-b border-slate-100">
											<IconSearch className="h-6 w-6 text-slate-600" />
											<SearchBox
												className="w-full"
												placeholder="Quick Search..."
												autoFocus={true}
												queryHook={(query, search) => {
													emptyView.current = query.length === 0;
													search(query);
												}}
												classNames={{
													submitIcon: "hidden",
													resetIcon: "hidden",
													loadingIndicator: "hidden",
													form: "flex",
													input:
														"appearance-none bg-transparent ml-3 mr-4 flex-1 h-14 min-w-0 border-none placeholder:text-slate-400 focus:bg-transparent focus:border-none focus:ring-0",
												}}
											/>
											<button
												onClick={onClose}
												type="reset"
												arial-label="cancel"
												className="appearance-none w-8 justify-items-end p-1 bg-white border border-slate-100 rounded-md text-slate-600 font-bold text-[9px] hover:shadow-sm"
											>
												ESC
											</button>
										</header>

										<MasterEmptyQueryBoundary>
											<Index indexName="companies">
												<Configure hitsPerPage={4} />
												<h3 className="font-bold mt-5 mx-6">Companies</h3>
												<EmptyQueryBoundary>
													<InfiniteHits
														hitComponent={HitCompanies(
															onClose,
															props.isAdmin,
															props.redirect
														)}
														showPrevious={false}
														classNames={{
															list: "my-2 border-y border-slate-100 divide-y divide-slate-100",
															loadMore:
																"w-[calc(100%-3rem)] font-bold h-9 mx-6 mb-4 px-3 text-primary-500 bg-transparent border border-primary-500 rounded-full hover:bg-primary-100 focus:ring-primary-50",
															disabledLoadMore: "hidden",
														}}
													/>
												</EmptyQueryBoundary>
											</Index>

											<Index indexName="vc_firms">
												<Configure hitsPerPage={4} />
												<h3 className="font-bold mt-5 mx-6">Investors</h3>
												<EmptyQueryBoundary>
													<InfiniteHits
														hitComponent={HitInvestors(
															onClose,
															props.isAdmin,
															props.redirect
														)}
														showPrevious={false}
														classNames={{
															list: "my-2 border-y border-slate-100 divide-y divide-slate-100",
															loadMore:
																"w-[calc(100%-3rem)] font-bold h-9 mx-6 mb-4 px-3 text-primary-500 bg-transparent border border-primary-500 rounded-full hover:bg-primary-100 focus:ring-primary-50",
															disabledLoadMore: "hidden",
														}}
													/>
												</EmptyQueryBoundary>
											</Index>

											<Index indexName="people">
												<Configure hitsPerPage={4} />
												<h3 className="font-bold mt-5 mx-6">People</h3>
												<EmptyQueryBoundary>
													<InfiniteHits
														hitComponent={HitPeople(
															onClose,
															props.isAdmin,
															props.redirect
														)}
														showPrevious={false}
														classNames={{
															list: "my-2 border-y border-slate-100 divide-y divide-slate-100",
															loadMore:
																"w-[calc(100%-3rem)] font-bold h-9 mx-6 mb-4 px-3 text-primary-500 bg-transparent border border-primary-500 rounded-full hover:bg-primary-100 focus:ring-primary-500",
															disabledLoadMore: "hidden",
														}}
													/>
												</EmptyQueryBoundary>
											</Index>

											<Index indexName="events">
												<Configure hitsPerPage={4} />
												<h3 className="font-bold mt-5 mx-6">Events</h3>
												<EmptyQueryBoundary>
													<InfiniteHits
														hitComponent={HitEvents(
															onClose,
															props.isAdmin,
															props.redirect
														)}
														showPrevious={false}
														classNames={{
															list: "my-2 border-y border-slate-100 divide-y divide-slate-100",
															loadMore:
																"w-[calc(100%-3rem)] font-bold h-9 mx-6 mb-4 px-3 text-primary-500 bg-transparent border border-primary-500 rounded-full hover:bg-primary-100 focus:ring-primary-50",
															disabledLoadMore: "hidden",
														}}
													/>
												</EmptyQueryBoundary>
											</Index>
										</MasterEmptyQueryBoundary>
									</InstantSearch>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}
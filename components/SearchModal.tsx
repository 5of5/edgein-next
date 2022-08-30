import type { GetStaticProps } from "next";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import algoliasearch from "algoliasearch/lite";
import Link from "next/link";
import { Hit as AlgoliaHit } from "instantsearch.js";
import {
	InstantSearch,
	SearchBox,
	Hits,
	HitsPerPage,
	Highlight,
	InfiniteHits,
	Index,
	Configure,
} from "react-instantsearch-hooks-web";
import { empty } from "@apollo/client";
import { IconSearch } from "@/components/Icons";

const searchClient = algoliasearch(
	"TFBKEVTOJD",
	"c1067c8b29709544620c3ca4d0702ebc"
);

Modal.setAppElement("#modal-root");

type CompaniesHitProps = {
	hit: AlgoliaHit<{
		name: string;
		overview: string;
		logo: string;
		slug: string;
		empty: boolean;
	}>;
};

type InvestorsHitProps = {
	hit: AlgoliaHit<{
		vc_firm_name: string;
		vc_firm_logo: string;
		vc_firm_slug: string;
		empty: boolean;
	}>;
};

type PeopleHitProps = {
	hit: AlgoliaHit<{
		name: string;
		work_email: string;
		personal_email: string;
		picture: string;
		slug: string;
		empty: boolean;
	}>;
};

const transformItems = (items: any, { results }) => {
	if (results.hits.length === 0) {
		return {
			empty: true,
		};
	}
	return items.map((item: any, index: any) => ({
		...item,
		position: { index, page: results.page },
	}));
};

function CompaniesHit({ hit }: CompaniesHitProps) {
	return (
		<>
			{hit.empty ? (
				<div className="m-4 text-center">
					<h1 className="font-bold text-sm text-gray-500">No Results Found</h1>
					{/* <p className="text-sm test-slate-600">
						Not finding what you&rsquo;re looking for?{" "}
						<Link href="/contact" passHref>
							tell us about missing data.
						</Link>
					</p> */}
				</div>
			) : (
				<a
					href={`/companies/${hit.slug}`}
					className="flex items-center px-6 py-1 hover:bg-slate-100"
				>
					<div className="flex items-center justify-center shrink-0 w-12 h-12 p-1 bg-white rounded border border-slate-200">
						<img
							className="object-contain max-w-full max-h-full"
							src={hit.logo}
							alt={hit.logo}
						/>
					</div>
					<h2 className="min-w-fit font-bold whitespace nowrap ml-2 text-slate-600">
						{hit.name}
					</h2>
					<p className="ml-2 text-sm text-slate-600 line-clamp-1">
						{hit.overview}
					</p>
				</a>
			)}
		</>
	);
}

function InvestorsHit({ hit }: InvestorsHitProps) {
	return (
		<>
			{hit.empty ? (
				<div className="m-4 text-center">
					<h1 className="font-bold text-sm  text-gray-500">No Results Found</h1>
				</div>
			) : (
				<a
					href={`/investors/${hit.vc_firm_slug}`}
					className="flex items-center px-6 py-1 hover:bg-slate-100"
				>
					<div className="flex items-center justify-center shrink-0 w-12 h-12 p-1 bg-white rounded border border-slate-200">
						<img
							className="object-contain max-w-full max-h-full"
							src={hit.vc_firm_logo}
							alt={hit.vc_firm_logo}
						/>
					</div>
					<h2 className="min-w-fit font-bold whitespace nowrap ml-2 text-slate-600">
						{hit.vc_firm_name}
					</h2>
				</a>
			)}
		</>
	);
}

function PeopleHit({ hit }: PeopleHitProps) {
	return (
		<>
			{hit.empty ? (
				<div className="m-4 text-center">
					<h1 className="font-bold text-sm text-gray-500">No Results Found</h1>
				</div>
			) : (
				<a
					href={`/people/${hit.slug}`}
					className="flex items-center px-6 py-1 hover:bg-slate-100"
				>
					<div className="flex items-center justify-center shrink-0 w-12 h-12 p-1 bg-white rounded border border-slate-200">
						<img
							className="object-contain max-w-full max-h-full"
							src={hit.picture}
							alt={hit.picture}
						/>
					</div>
					<h2 className="min-w-fit font-bold whitespace nowrap ml-2 text-slate-600">
						{hit.name}
					</h2>
				</a>
			)}
		</>
	);
}

export default function SearchModal(props: any) {
	const onClose = () => {
		props.onClose();
	};

	return (
		<Modal
			isOpen={props.show}
			onRequestClose={onClose}
			shouldCloseOnOverlayClick={true}
			overlayClassName="fixed top-0 left-0 z-[50] flex flex-col h-screen w-screen p-6 cursor-auto bg-black/20 backdrop-blur-sm"
			className={`${
				props.show && "animate-fade-in-up"
			} max-w-3xl w-full mx-auto my-0 min-h-0 flex flex-col rounded-lg shadow-2xl bg-white overflow-y-scroll overflow-x-hidden`}
			contentLabel="Search Modal"
		>
			<InstantSearch searchClient={searchClient} indexName="companies">
				<header className="relative flex items-center z-10 p-0 px-4 border-b border-slate-100">
					<IconSearch className="h-6 w-6 text-slate-600" />
					<SearchBox
						className="w-full"
						placeholder="Search"
						classNames={{
							submitIcon: "hidden",
							resetIcon: "hidden",
							loadingIndicator: "hidden",
							input:
								"appearance-none bg-transparent ml-3 mr-4 flex-auto h-14 min-w-0 placeholder:text-slate-400 focus:bg-transparent focus:outline-none",
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

				<Configure analytics={false} hitsPerPage={3} />
				<Index indexName="companies">
					<h1 className="font-bold mt-5 mx-6">Companies</h1>
					<InfiniteHits
						transformItems={transformItems}
						classNames={{
							list: "my-2 border-y border-slate-100 divide-y divide-slate-100",
							// item: "",
							loadMore:
								"w-[calc(100%-3rem)] mx-6 font-bold mb-4 px-3 py-1 text-sm text-purple-50 bg-transparent border border-purple-50 rounded-full hover:bg-primary-100 focus:ring-purple-50",
							disabledLoadMore: "hidden",
						}}
						showPrevious={false}
						hitComponent={CompaniesHit}
					/>
				</Index>

				<Index indexName="investors">
					<h1 className="font-bold mt-5 mx-6">Investors</h1>
					<InfiniteHits
						transformItems={transformItems}
						classNames={{
							list: "my-2 border-y border-slate-100 divide-y divide-slate-100",
							loadMore:
								"w-[calc(100%-3rem)] mx-6 font-bold mb-5 text-sm text-purple-50 bg-transparent focus:ring-purple-50 border border-purple-50 hover:bg-primary-100 rounded-full px-3 py-1 min-w-32 justify-center",
							disabledLoadMore: "hidden",
						}}
						showPrevious={false}
						hitComponent={InvestorsHit}
					/>
				</Index>
				<Index indexName="people">
					<h1 className="font-bold mt-5 mx-6">People</h1>
					<InfiniteHits
						transformItems={transformItems}
						classNames={{
							list: "my-2 border-y border-slate-100 divide-y divide-slate-100",
							loadMore:
								"w-[calc(100%-3rem)] mx-6 font-bold mb-5 text-sm text-purple-50 bg-transparent focus:ring-purple-50 border border-purple-50 hover:bg-primary-100 rounded-full px-3 py-1 min-w-32 justify-center",
							disabledLoadMore: "hidden",
						}}
						showPrevious={false}
						hitComponent={PeopleHit}
					/>
				</Index>
			</InstantSearch>
		</Modal>
	);
}

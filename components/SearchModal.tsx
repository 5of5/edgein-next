import type { GetStaticProps } from "next";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import algoliasearch from "algoliasearch/lite";
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
import { truncate } from "lodash";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY!
);

Modal.setAppElement("#modal-root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    zindex: 100000,
    opacity: 1,
    borderRadius: 20,
    overlay: { backgroundColor: "red", opacity: 1 },
    width: "50%",
    height: "550px",
    overflowX:"hidden",
  },
};
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

const transformItems = (items:any, { results }) => {
  if (results.hits.length === 0) {
    return {
      empty: true
    }
  }
  return items.map((item:any, index:any) => ({
    ...item,
    position: { index, page: results.page },
  }));
};

function CompaniesHit({ hit }: CompaniesHitProps) {
  return (
    <div>
      {
        (hit.empty) ?
          <h1 className="text-xs m-4 text-gray-500 text-center">
            <b>No result found</b>
          </h1>
          :
          <a href={`/companies/${hit.slug}`}>
            <div className=" my-3 flex flex-row flex-start">
              <img
                 className="w-10 h-10 border-solid border border-gray-5 rounded-md"
                src={hit.logo}
                alt={hit.logo}
              />
              <h1 className="whitespace nowrap ml-2 text-xs mt-3 text-gray-10">
                <b>{hit.name}</b>
              </h1>
              <p className=" ml-2 mt-3 text-xs tracking-wide text-gray-10">
                {truncate(hit.overview, { omission: "...", length: 80 })}
              </p>
            </div>
          </a>
      }

    </div>
  );
}

function InvestorsHit({ hit }: InvestorsHitProps) {
  return (
    <div>
      {
        (hit.empty) ?
          <h1 className="text-xs m-4 text-gray-500 text-center">
            <b>No result found</b>
          </h1>
          :
          <a href={`/investors/${hit.vc_firm_slug}`}>
            <div className=" my-2 flex flex-row flex-start">
              <img
                 className="w-10 h-10 border-solid border border-gray-5 rounded-md"
                src={hit.vc_firm_logo}
                alt={hit.vc_firm_logo}
              />
              <h1 className=" mt-3 ml-2 text-xs text-gray-10">
                <b>{hit.vc_firm_name}</b>
              </h1>
            </div>
          </a>

      }

    </div>
  );
}

function PeopleHit({ hit }: PeopleHitProps) {
  return (
    <div>
      {
        (hit.empty) ?
          <h1 className="text-xs m-4 text-gray-500 text-center">
           <b>No result found</b>
          </h1>
          :
          <a href={`/people/${hit.slug}`}>
            <div className="my-2 flex flex-row flex-start">
              <img
                className="w-10 h-10 border-solid border border-gray-5 rounded-md"
                src={hit.picture}
                alt={hit.picture}
              />
              <h1 className=" ml-2 text-xs mt-3 text-gray-10">
                <b>{hit.name}</b>
              </h1>
            </div>
          </a>
      }

    </div>
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
      style={customStyles}
      contentLabel="Login Modal"

    >
      <div className="max-w-6xl  lg:min-h-[40vh] lg:max-h-[2vh]">
        <div className="bg-white rounded-2xl center">
          <InstantSearch searchClient={searchClient} indexName="companies">
            <SearchBox
              className="w-full"
              placeholder="Search"
              classNames={{
                submitIcon: "hidden",
                resetIcon: "hidden",
                loadingIndicator: "hidden",
                input:
                  "w-5/6 bg-white text-dark-500 rounded-md outline-none placeholder:text-dark-400 focus:bg-white focus:outline-none",
              }}
            />
             <button onClick={onClose} className="bg-white -mt-6 float-right w-8 justify-items-end border rounded-md text-dark-500 font-bold text-xs p-0.5 ml-10">
                  ESC
                </button>
            <hr className="max-w-8xl clear-both mt-2 -ml-10 -mr-8 "></hr>
            <Configure
              analytics={false}
              hitsPerPage={3}
            />
            <Index indexName="companies">
              <h1 className="font-bold mt-5 text-dark-500">Companies</h1>
              <InfiniteHits
                transformItems={transformItems}
                classNames={{
                  emptyRoot: "No result",
                  loadMore:
                    "font-bold w-full mb-4 text-sm text-purple-50 bg-transparent focus:ring-purple-50 border border-purple-50 hover:bg-primary-100 rounded-full px-3 py-1 min-w-32 justify-center",
                }}
                showPrevious={false}
                hitComponent={CompaniesHit}
              />
            </Index>

            <Index indexName="investors">
              <h1 className="font-bold my-1 text-dark-500">Investors</h1>
              <InfiniteHits
                transformItems={transformItems}
                classNames={{
                  loadMore:
                    "font-bold w-full mb-5 text-sm text-purple-50 bg-transparent focus:ring-purple-50 border border-purple-50 hover:bg-primary-100 rounded-full px-3 py-1 min-w-32 justify-center",
                }}
                showPrevious={false}
                hitComponent={InvestorsHit}
              />
            </Index>
            <Index indexName="people">
              <h1 className="font-bold my-2 text-dark-500">People</h1>
              <InfiniteHits
                transformItems={transformItems}
                classNames={{
                  loadMore:
                    "font-bold w-full mb-5 text-sm text-purple-50 bg-transparent focus:ring-purple-50 border border-purple-50 hover:bg-primary-100 rounded-full px-3 py-1 min-w-32 justify-center",
                }}
                showPrevious={false}
                hitComponent={PeopleHit}
              />
            </Index>
          </InstantSearch>
        </div>
      </div>
    </Modal>
  );
}

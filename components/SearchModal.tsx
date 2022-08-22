import { Magic } from "magic-sdk";
import type { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { IconSpinner } from "../components/Icons";
import { ElemButton } from "../components/ElemButton";
import Link from "next/link";
import ReactDOM from "react-dom";
import Modal from 'react-modal';
import algoliasearch from 'algoliasearch/lite';
import { Hit as AlgoliaHit } from 'instantsearch.js';
import {
    InstantSearch, SearchBox, Hits,
    HitsPerPage, Highlight,
    InfiniteHits, Index, Configure
} from 'react-instantsearch-hooks-web';

const searchClient = algoliasearch('TFBKEVTOJD', 'c1067c8b29709544620c3ca4d0702ebc');

Modal.setAppElement('#modal-root');

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        // marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        zindex: 100000,
        opacity: 1,
        borderRadius: 20,
        overlay: { backgroundColor: 'red', opacity: 1 }
    },
};
type CompaniesHitProps = {
    hit: AlgoliaHit<{
        name: string;
        overview: string;
        logo: string;
        slug: string;
    }>;
};

type InvestorsHitProps = {
    hit: AlgoliaHit<{
        person_name: string;
        vc_firm_name: string;
        person_picture: string;
        vc_firm_logo: string;
        slug: string;
    }>;
};

type PeopleHitProps = {
    hit: AlgoliaHit<{
        name: string;
        work_email: string;
        personal_email: string;
        picture: string;
        slug: string;
    }>;
};


function CompaniesHit({ hit }: CompaniesHitProps) {
    return (
      <div>
         <a href={`/companies/${hit.slug}`}>
        <div className="m-5 w-full flex flex-row justify-between">
          {/* <Highlight hit={hit} attribute="name" className="Hit-label" /> */}
          {/* <span className="Hit-price">{hit.name}</span>
              <span className="Hit-price">{hit.overview}</span> */}
          <img
            className="w-12 h-12 border-solid border-2 border-gray-200 rounded-md"
            src={hit.logo}
            alt={hit.logo}
          />
          <h1 className="text-sm ml-5">
            <b>{hit.name}</b>
          </h1>
          <p className="ml-3 text-xs">{hit.overview.substr(0, 100)}</p>
        </div>
        </a>
      </div>
    );
  }

  function InvestorsHit({ hit }: InvestorsHitProps) {
    return (
      <div>
        <a href={`/investors/${hit.slug}`}>
        <div className="m-5 flex flex-row justify-evenly">
          {/* <Highlight hit={hit} attribute="name" className="Hit-label" /> */}
          {/* <span className="Hit-price">{hit.name}</span>
              <span className="Hit-price">{hit.overview}</span> */}
          <img
            className="w-12 h-12 border-solid border-2 border-gray-200 rounded-md"
            src={hit.vc_firm_logo}
            alt={hit.vc_firm_logo}
          />
          <h1 className="text-sm">
            <b>{hit.vc_firm_name}</b>
          </h1>
          <p className="text-xs">{hit.person_name}</p>
        </div>
        </a>
      </div>
    );
  }

function PeopleHit({ hit }: PeopleHitProps) {
    return (
      <div>
        <a href={`/people/${hit.slug}`}>
        <div className="m-5 flex flex-row justify-evenly">
          {/* <Highlight hit={hit} attribute="name" className="Hit-label" /> */}
          {/* <span className="Hit-price">{hit.name}</span>
              <span className="Hit-price">{hit.overview}</span> */}
          <img
            className="-mt-3 w-12 h-12 border-solid border-2 border-gray-200 rounded-md"
            src={hit.picture}
            alt={hit.picture}
          />
          <h1 className="text-sm ">
            <b>{hit.name}</b>
          </h1>
          <p className="text-sm">{hit.work_email}</p>
          <p className="text-sm">{hit.personal_email}</p>
        </div>
        </a>
      </div>
    );
  }

export default function SearchModal(props:any) {
    const router = useRouter();

    const [isBrowser, setIsBrowser] = useState(false);


    useEffect(() => {
        setIsBrowser(true);
        setEmail('');
        setPassword('')
        setIsSignUp(false)
        setIsWaitlisted(false)
        setIsRegistered(false)
        setEmailError('')
        setErrorMessage('')
    }, [props.show]);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [isSignUp, setIsSignUp] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isWaitlisted, setIsWaitlisted] = useState(false)
    const [isRegistered, setIsRegistered] = useState(false)
    const [emailError, setEmailError] = useState('')
    const [errorMessage, setErrorMessage] = useState('')



    const onClose = () => {
        props.onClose();
    }

    return (
        <Modal
          isOpen={props.show}
          // onAfterOpen={afterOpenModal}
          onRequestClose={onClose}
          style={customStyles}
          contentLabel="Login Modal"
        >
          <div className="max-w-6xl sm:px-3 lg:min-h-[40vh] lg:max-h-[2vh]">
            <div className="bg-white rounded-2xl center">
              <InstantSearch searchClient={searchClient} indexName="companies">
                <SearchBox
                  placeholder="Search"
                  classNames={{
                    submitIcon: "hidden",
                    resetIcon: "hidden",
                    input:
                      "py-3 pl-5 w-full bg-transaparent text-dark-500  rounded-md border border-dark-500/10 outline-none placeholder:text-dark-400 focus:bg-white focus:outline-none",
                  }}
                />
                <Configure
                  analytics={false}
                  // filters="free_shipping:true"
                  hitsPerPage={3}
                />
                {/* <InfiniteHits showPrevious={false} hitComponent={Hit} /> */}
                <Index indexName="companies">
                  <InfiniteHits
                    classNames={{
                      loadMore:
                        "w-full text-primary-500 bg-transparent focus:ring-primary-800 border-2 border-primary-500 hover:bg-primary-100 rounded-full px-5 py-2 min-w-32 justify-center",
                    }}
                    showPrevious={false}
                    hitComponent={CompaniesHit}
                  />
                </Index>
    
                <Index indexName="investors">
                  <InfiniteHits
                    classNames={{
                      loadMore:
                        "w-full text-primary-500 bg-transparent focus:ring-primary-800 border-2 border-primary-500 hover:bg-primary-100 rounded-full px-5 py-2 min-w-32 justify-center",
                    }}
                    showPrevious={false}
                    hitComponent={InvestorsHit}
                  />
                </Index>
                <Index indexName="people">
                  <InfiniteHits
                    classNames={{
                      loadMore:
                        "w-full text-primary-500 bg-transparent focus:ring-primary-800 border-2 border-primary-500 hover:bg-primary-100 rounded-full px-5 py-2 min-w-32 justify-center",
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

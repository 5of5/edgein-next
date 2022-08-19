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
    InfiniteHits, Index
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
    }>;
};

type InvestorsHitProps = {
    hit: AlgoliaHit<{
        person_name: string;
        vc_firm_name: string;
        person_picture: string;
        vc_firm_logo : string
    }>;
};

type PeopleHitProps = {
    hit: AlgoliaHit<{
        name: string;
        work_email: string;
        personal_email: string;
        picture: string;
    }>;
};


function CompaniesHit({ hit }: CompaniesHitProps) {
    return (
        <div className="m-10">
            {/* <Highlight hit={hit} attribute="name" className="Hit-label" /> */}
            {/* <span className="Hit-price">{hit.name}</span>
            <span className="Hit-price">{hit.overview}</span> */}
            <img src={hit.logo} alt={hit.logo} />
            <h1><b>{hit.name}</b></h1>
            <p>{hit.overview}</p>
        </div>
    );
}

function InvestorsHit({ hit }: InvestorsHitProps) {
    return (
        <div className="m-10">
            {/* <Highlight hit={hit} attribute="name" className="Hit-label" /> */}
            {/* <span className="Hit-price">{hit.name}</span>
            <span className="Hit-price">{hit.overview}</span> */}
            <img src={hit.vc_firm_logo} alt={hit.vc_firm_logo} />
            <h1><b>{hit.vc_firm_name}</b></h1>
            <p>{hit.person_name}</p>
        </div>
    );
}

function PeopleHit({ hit }: PeopleHitProps) {
    return (
        <div className="m-10">
            {/* <Highlight hit={hit} attribute="name" className="Hit-label" /> */}
            {/* <span className="Hit-price">{hit.name}</span>
            <span className="Hit-price">{hit.overview}</span> */}
            <img src={hit.picture} alt={hit.picture} />
            <h1><b>{hit.name}</b></h1>
            <p>{hit.work_email}</p>
            <p>{hit.personal_email}</p>
        </div>
    );
}

export default function SearchModal(props) {
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
            <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 lg:min-h-[40vh] lg:max-h-[2vh]">
                <div className="bg-white rounded-2xl center">
                    <InstantSearch searchClient={searchClient} indexName="companies">
                        <SearchBox placeholder="Search" />
                        {/* <InfiniteHits showPrevious={false} hitComponent={Hit} /> */}
                        <Index indexName="companies">
                            <Hits hitComponent={CompaniesHit}/>
                        </Index>

                        <Index indexName="investors">
                            <Hits hitComponent={InvestorsHit}/>
                        </Index>
                        <Index indexName="people">
                            <Hits hitComponent={PeopleHit}/>
                        </Index>
                    </InstantSearch>
                </div>
            </div>
        </Modal>
    )



}

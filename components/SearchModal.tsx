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
import { InstantSearch, SearchBox, Hits,
    HitsPerPage,Highlight,
    InfiniteHits, } from 'react-instantsearch-hooks-web';

const searchClient = algoliasearch('0C9BYZPIV4', '8a8df05cd1111b26b9f20f3d0a2c615a');

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
type HitProps = {
    hit: AlgoliaHit<{
        name: string;
        overview: string;
        logo: object;
    }>;
  };

  function Hit({ hit }: HitProps) {
    return (
      <div className="m-10"> 
        <Highlight hit={hit} attribute="name" className="Hit-label" />
        <span className="Hit-price">{hit.name}</span>
        <span className="Hit-price">{hit.overview}</span>
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
            <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 lg:px-8 lg:py-10 lg:min-h-[40vh]">
                <div className="bg-white rounded-2xl center">
                    <InstantSearch searchClient={searchClient} indexName="instant_search">
                        <SearchBox placeholder="Search"/>
                        <InfiniteHits showPrevious={false} hitComponent={Hit} />
                    </InstantSearch>
                </div>
            </div>
        </Modal>
    )



}

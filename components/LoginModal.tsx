import { Magic } from "magic-sdk";
import type { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { IconSpinner } from "../components/Icons";
import { ElemButton } from "../components/ElemButton";
import Link from "next/link";
import ReactDOM from "react-dom";
import Modal from 'react-modal';

Modal.setAppElement('#modal-root');

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        zindex: 100000,
        opacity: 1,
        overlay: { backgroundColor: 'red', opacity: 1 }
    },
};

export default function LoginModal(props) {
    const router = useRouter();

    const [isBrowser, setIsBrowser] = useState(false);


    useEffect(() => {
        setIsBrowser(true);
        setEmail('');
        setPassword('')
        setIsSignUp(false)
        setIsWaitlisted(false)
    }, [props.show]);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [isSignUp, setIsSignUp] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isWaitlisted, setIsWaitlisted] = useState(false)
    const [finishingLogin, setFinishingLogin] = useState(
        Boolean(router.query.email)
    );

    // const login = async (did: string | null, redirect?: string | null) => {
    //     // Once we have the did from magic, login with our own API
    //     const authRequest = await fetch("/api/login/", {
    //         method: "POST",
    //         headers: { Authorization: `Bearer ${did}` },
    //     });

    //     if (authRequest.ok) {
    //         // We successfully logged in, our API
    //         // set authorization cookies and now we
    //         // can redirect to the dashboard!
    //         // Next.js middleware needs a full refresh rather than router.push

    //         debugger;
    //         const redirectUrl = Array.isArray(router.query.redirect)
    //             ? router.query.redirect[0]
    //             : router.query.redirect || redirect;
    //         if (redirectUrl && redirectUrl.startsWith("/")) {
    //             window.location.href = redirectUrl;
    //         } else {
    //             window.location.href = "/?loggedin";
    //         }
    //         // Trigger page refresh after logged in
    //         // window.location.reload();
    //     } else {
    //         console.log(authRequest);
    //         alert("Error Logging In");
    //         /* handle errors */
    //         setIsLoading(false);
    //     }
    // };

    const handleSubmit = async () => {
        // event.preventDefault();
        // setIsLoading(true);


        try {
            const response = await fetch("/api/check_email/", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            }).then(res => res.json());
            // console.log("response ==", response)
            if (response.nextStep && response.nextStep === "SIGNUP") {
                setIsSignUp(true);
                console.log("continue signup=", response)
            } else if (response.nextStep && response.nextStep === "LOGIN") {

            } 
            // the Magic code
            // const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUB_KEY || "");
            // const did = await magic.auth.loginWithMagicLink({
            //     email,
            //     redirectURI: location.href
            // });
            // await login(did);
        } catch (e) {
            setIsWaitlisted(true)
            console.log(e);
            // alert("Error Logging In");
            setIsLoading(false);
        }
    };

    const onClose = () => {
        props.onClose();
    }

    const onForgotPassword = () => {
        props.onClose();
        props.onForgotPassword();
    }

    return (
        <Modal
            isOpen={props.show}
            // onAfterOpen={afterOpenModal}
            onRequestClose={onClose}
            style={customStyles}
            contentLabel="Login Modal"
        >
            {/* <div className="mx-auto px-4 py-4 sm:px-6 lg:px-8 lg:py-10 lg:min-h-[40vh]"> */}
            <div className="relative max-w-xl mx-auto ">
                <div className="bg-white rounded-2xl  p-6">
                    {/* {finishingLogin ? (
                        <>
                            <h1 className="text-3xl lg:text-4xl font-bold">
                                Redirecting...
								<IconSpinner className="animate-spin mt-2 h-5 w-5" />
                            </h1>
                        </>
                    ) : ( */}
                    <>
                        <div className="group sm:col-span-1 flex" style={{ justifyContent: 'right' }}>
                            <button onClick={onClose}>Close</button>
                        </div>
                        {
                            isWaitlisted ? (
                                <p className="mt-2 text-xl text-dark-400">
                                    {`Your email ${email} has been added to our list.  We'll be in touch soon!`}
                                </p>
                            )
                            : (
                                <>
                                <h1 className="text-3xl lg:text-4xl font-bold">{(isSignUp) ? 'Sign Up' : 'Log In'}</h1>
    
                                <div
                                    className="relative grid grid-cols-1 gap-y-4 mt-6 sm:grid-cols-3 sm:gap-x-8"
                                >
                                    <div className="group sm:col-span-3">
                                        <label
                                            htmlFor="email"
                                            className="text-gray-400 cursor-text group-focus-within:text-primary-500"
                                        >
                                            Email
                                        </label>
                                        <input
                                            name="email"
                                            type="email"
                                            value={email}
                                            disabled={isLoading}
                                            onChange={(event) => setEmail(event ?.target.value)}
                                            placeholder="example@email.com"
                                            className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 relative bg-white rounded-md border border-slate-300 outline-none placeholder:text-gray-300  focus:outline-none focus:border-primary-500 focus:ring focus:ring-primary-100"
                                        />
                                        {
                                            (isSignUp) && (
                                                <input
                                                    name="password"
                                                    type="password"
                                                    value={password}
                                                    disabled={isLoading}
                                                    onChange={(event) => setPassword(event ?.target.value)}
                                                    placeholder="********"
                                                    className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 relative bg-white rounded-md border border-slate-300 outline-none placeholder:text-gray-300  focus:outline-none focus:border-primary-500 focus:ring focus:ring-primary-100"
                                                />
                                            )
                                        }
                                    </div>
                                    <button onClick={onForgotPassword}>
                                        I forgot my password
                                        </button>
                                    <div className="text-right sm:col-span-3">
                                        <ElemButton onClick={handleSubmit} btn="primary" loading={isLoading}>
                                            {(isSignUp) ? 'Sign Up' : 'Log In'}
                                        </ElemButton>
                                    </div>
                                </div>
                            </>
                            )
                        }
                       
                    </>
                    {/* )} */}
                </div>
            </div>
            {/* </div> */}
        </Modal>
    )

    // if (isBrowser) {
    //     return ReactDOM.createPortal(
    //       modalContent,
    //       document.getElementById("__next")
    //     );
    //   } else {
    //     return null;
    //   }

}

// export const getStaticProps: GetStaticProps = async () => {
// 	return {
// 		props: {
// 			metaTitle: "Login - EdgeIn.io",
// 		},
// 	};
// };

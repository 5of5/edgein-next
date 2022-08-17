import { Magic } from "magic-sdk";
import type { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { IconSpinner } from "../components/Icons";
import { ElemButton } from "../components/ElemButton";
import Link from "next/link";
import ReactDOM from "react-dom";
import Modal from 'react-modal';
import { ElemLogo } from "./ElemLogo";
import validator from 'validator'

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

export default function LoginModal(props) {
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


    const validateEmail = (value: string) => {
        setEmail(value)
        if (validator.isEmail(value)) {
            setEmailError('')
        } else {
            setEmailError('Enter valid Email!')
        }
    }

    const onLogin = async () => {
        validateEmail(email);

        if (emailError || !email) {
            return;
        }
        try {
            const response = await fetch("/api/check_email/", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            }).then(res => res.json());
            if (response.nextStep && response.nextStep === "SIGNUP") {
                setIsSignUp(true);
                onSignUp(email)
                //console.log("continue signup=", response)
            } else if (response.nextStep && response.nextStep === "LOGIN") {
                const url = `https://dev-h9qh-dn9.us.auth0.com/authorize?response_type=code&client_id=GQJNcsXDPCbPFo2OGCc1p3sAmY6T0b8p&connection=Username-Password-Authentication&redirect_uri=http://localhost:3000/&scope=openid%20profile%20email%20offline_access`;
                window.location.href = url;
            }

        } catch (e) {
            setIsWaitlisted(true)
            console.log(e);
            setIsLoading(false);
        }
    };

    const onSignUp = (email:  string) => {
        props.onSignUp(email)
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
            <div className="relative max-w-md mx-auto px-6">
                <div className="bg-white rounded-2xl p-6 px-6 center">
                    {
                        isWaitlisted ? (
                            <>
                                {/* <h1 className="text-center text-2xl lg:text-3xl font-bold">Registration Complete</h1> */}
                                <p className="mt-2 text-md text-dark-400 text-center">
                                    {`Your email ${email} has been added to our list.  We'll be in touch soon!`}
                                </p>
                            </>

                        )
                            :

                            <>
                                <ElemLogo
                                    mode="icon"
                                    className="text-center h-8 w-30 scale-95 mx-32 mb-10"
                                />
                                <h1 className="text-center text-2xl lg:text-3xl font-bold">Welcome to EdgeIn</h1>
                                <div className="text-center sm:col-span-3 mt-5">
                                    <ElemButton roundedFull={false} className="w-full rounded-md text-blue-md border border-slate-300" onClick={() => { }} btn="ol-primary" >
                                        Continue with LinkedIn
                                </ElemButton>
                                </div>
                                <div className="text-center sm:col-span-3 mt-5">
                                    <span className="text-gray-300 text-sm text-light">----------------------------<b className="text-dark-600">{` or `}</b>----------------------------</span>
                                </div>
                                <div
                                    className="text-center relative grid grid-cols-1 gap-y-4 mt-6 sm:grid-cols-1 sm:gap-x-0"
                                >
                                    <div className="group sm:col-span-1">
                                        <input
                                            name="email"
                                            type="email"
                                            value={email}
                                            disabled={isLoading}
                                            onChange={(event) => validateEmail(event ?.target.value)}
                                            placeholder="Email"
                                            className="w-full mt-1 px-3 py-1.5 text-md text-dark-500 relative bg-white rounded-md border border-slate-300 outline-none placeholder:text-gray-300  focus:outline-none focus:border-primary-500 focus:ring focus:ring-primary-100"
                                        />
                                        {emailError === '' ? null :
                                            <span className="w-full text-start text-sm">{emailError}</span>}
                                       
                                    </div>

                                    <div className="text-center sm:col-span-3">
                                        <ElemButton className="w-full" onClick={onLogin} btn="primary" loading={isLoading}>
                                            Login
                                </ElemButton>
                                    </div>
                                    <div className="text-center sm:col-span-3">
                                        <ElemButton className="w-full text-blue-500 text-sm font-light" onClick={onForgotPassword} btn="transparent" loading={isLoading}>
                                            Forgot Password?
                                </ElemButton>
                                    </div>
                                    <div className="text-center sm:col-span-3">
                                        <ElemButton className="w-full" onClick={onSignUp} btn="ol-primary" loading={isLoading}>
                                            Create an account
                                </ElemButton>
                                    </div>
                                </div>
                            </>
                    }
                </div>
            </div>
        </Modal>
    )

    // return (
    //     <Modal
    //         isOpen={props.show}
    //         // onAfterOpen={afterOpenModal}
    //         onRequestClose={onClose}
    //         style={customStyles}
    //         contentLabel="Login Modal"
    //     >
    //         {/* <div className="mx-auto px-4 py-4 sm:px-6 lg:px-8 lg:py-10 lg:min-h-[40vh]"> */}
    //         <div className="relative max-w-xl mx-auto ">
    //             <div className="bg-white rounded-2xl  p-6">
    //                 {/* {finishingLogin ? (
    //                     <>
    //                         <h1 className="text-3xl lg:text-4xl font-bold">
    //                             Redirecting...
    // 							<IconSpinner className="animate-spin mt-2 h-5 w-5" />
    //                         </h1>
    //                     </>
    //                 ) : ( */}
    //                 <>
    //                     <div className="group sm:col-span-1 flex" style={{ justifyContent: 'right' }}>
    //                         <button onClick={onClose}>Close</button>
    //                     </div>
    //                     {
    //                         isWaitlisted ? (
    //                             <p className="mt-2 text-xl text-dark-400">
    //                                 {`Your email ${email} has been added to our list.  We'll be in touch soon!`}
    //                             </p>
    //                         )
    //                         :
    //                         isRegistered ? (
    //                             <p className="mt-2 text-xl text-dark-400">
    //                                 {`User has been successfully registered. Please Login!`}
    //                             </p>
    //                         )
    //                         : 
    //                         (
    //                             <>
    //                             <h1 className="text-3xl lg:text-4xl font-bold">{(isSignUp) ? 'Sign Up' : 'Log In'}</h1>

    //                             <div
    //                                 className="relative grid grid-cols-1 gap-y-4 mt-6 sm:grid-cols-3 sm:gap-x-8"
    //                             >
    //                                 <div className="group sm:col-span-3">
    //                                     <label
    //                                         htmlFor="email"
    //                                         className="text-gray-400 cursor-text group-focus-within:text-primary-500"
    //                                     >
    //                                         Email
    //                                     </label>
    //                                     <input
    //                                         name="email"
    //                                         type="email"
    //                                         value={email}
    //                                         disabled={isLoading}
    //                                         onChange={(event) => setEmail(event ?.target.value)}
    //                                         placeholder="example@email.com"
    //                                         className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 relative bg-white rounded-md border border-slate-300 outline-none placeholder:text-gray-300  focus:outline-none focus:border-primary-500 focus:ring focus:ring-primary-100"
    //                                     />
    //                                     {
    //                                         (isSignUp) && (
    //                                             <input
    //                                                 name="password"
    //                                                 type="password"
    //                                                 value={password}
    //                                                 disabled={isLoading}
    //                                                 onChange={(event) => setPassword(event ?.target.value)}
    //                                                 placeholder="********"
    //                                                 className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 relative bg-white rounded-md border border-slate-300 outline-none placeholder:text-gray-300  focus:outline-none focus:border-primary-500 focus:ring focus:ring-primary-100"
    //                                             />
    //                                         )
    //                                     }
    //                                 </div>
    //                                 <button onClick={onForgotPassword}>
    //                                     I forgot my password
    //                                     </button>
    //                                 <div className="text-right sm:col-span-3">
    //                                     <ElemButton onClick={isSignUp ? onSignUp : onLogin} btn="primary" loading={isLoading}>
    //                                         {(isSignUp) ? 'Sign Up' : 'Log In'}
    //                                     </ElemButton>
    //                                 </div>
    //                             </div>
    //                         </>
    //                         )
    //                     }

    //                 </>
    //                 {/* )} */}
    //             </div>
    //         </div>
    //         {/* </div> */}
    //     </Modal>
    // )

}

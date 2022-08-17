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

export default function SignUpModal(props) {
    const router = useRouter();

    const [isBrowser, setIsBrowser] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [isSignUp, setIsSignUp] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    // const [isWaitlisted, setIsWaitlisted] = useState(false)
    const [isRegistered, setIsRegistered] = useState(false)
    const [emailError, setEmailError] = useState('')
    const [nameError, setNameError] = useState('')
    // const [finishingLogin, setFinishingLogin] = useState(
    //     Boolean(router.query.email)
    // );

    const validate = (value: string) => {
        setPassword(value)
        if (validator.isStrongPassword(value, {
            minLength: 8, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1
        })) {
            setErrorMessage('')
        } else {
            setErrorMessage('Password should have least 8 characters including a lower-case letter, an upper-case letter, a number, a special character')
        }
    }

    const validateEmail = (value: string) => {
        setEmail(value)
        if (validator.isEmail(email)) {
            setEmailError('')
        } else {
            setEmailError('Enter valid Email!')
        }
    }

    const validateName = (value: string) => {
        setName(value)
        if (value.length > 0) {
            setNameError('')
        } else {
            setNameError('Enter Name!')
        }
    }

    useEffect(() => {
        setIsBrowser(true);
        setEmail('');
        setPassword('')
        setIsSignUp(false)
        // setIsWaitlisted(false)
        setIsRegistered(false)
        setErrorMessage('')
        setEmailError('')
        setNameError('')
    }, [props.show]);



    const onLogin = () => {
        // event.preventDefault();
        // setIsLoading(true);
        props.onLogin()
    };

    const onSignUp = async () => {
        validateEmail(email)
        validateName(name)
        validate(password)
        if (!name || !email || !password) {
            return;
        }
        
        try {
            const response = await fetch("/api/register/", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password, name }),
            }).then(res => res.json());
            console.log("signnnup response =", response)
            if (response.success === true) {
                setIsRegistered(true)
            }

        } catch (e) {
            // setIsWaitlisted(true)
            console.log(e);
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
            contentLabel="SignUp Modal"
        >
            <div className="relative max-w-md mx-auto px-6">
                <div className="bg-white rounded-2xl p-6 px-6 center">
                    {

                        isRegistered ? (
                            <>
                                <h1 className="text-center text-2xl lg:text-3xl font-bold">Registration Complete</h1>
                                <p className="mt-2 text-md text-dark-400 text-center">
                                    {`User has been successfully registered. Please Login!`}
                                </p>
                                <div className="text-center sm:col-span-3 mt-10">
                                    <ElemButton className="w-full" onClick={onLogin} btn="primary" loading={isLoading}>
                                        Back to login
                                </ElemButton>
                                </div>
                            </>

                        )
                            :

                            <>
                                <ElemLogo
                                    mode="icon"
                                    className="text-center h-8  scale-90 self-center  mx-32 mb-10"
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
                                            name="name"
                                            type="text"
                                            value={name}
                                            disabled={isLoading}
                                            onChange={(event) => validateName(event ?.target.value)}
                                            placeholder="Name"
                                            className="w-full mt-1 px-3 py-1.5 text-md text-dark-500 relative bg-white rounded-md border border-slate-300 outline-none placeholder:text-gray-300  focus:outline-none focus:border-primary-500 focus:ring focus:ring-primary-100"
                                        />
                                        {nameError === '' ? null :
                                            <span className="w-full text-start text-sm">{nameError}</span>}
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
                                        <input
                                            name="password"
                                            type="password"
                                            value={password}
                                            disabled={isLoading}
                                            onChange={(event) => validate(event ?.target.value)}
                                            placeholder="Password"
                                            className="w-full mt-1 px-3 py-1.5 text-md text-dark-500 relative bg-white rounded-md border border-slate-300 outline-none placeholder:text-gray-300  focus:outline-none focus:border-primary-500 focus:ring focus:ring-primary-100"
                                        />
                                        {errorMessage === '' ? null :
                                            <span className="w-full text-start text-sm">{errorMessage}</span>}

                                    </div>

                                    <div className="text-center sm:col-span-3">
                                        <ElemButton className="w-full" onClick={onSignUp} btn="primary" loading={isLoading}>
                                            Sign up and explore
                                </ElemButton>
                                    </div>
                                    <p className="text-sm text-gray-300">Creating an account means you're okay with our terms of service, privact policy, and our default notification settings.</p>
                                    <div className="text-center sm:col-span-3">
                                        <ElemButton className="w-full" onClick={onLogin} btn="ol-primary" loading={isLoading}>
                                            Login
                                </ElemButton>
                                    </div>
                                </div>
                            </>
                    }
                </div>
            </div>
        </Modal>
    )
}

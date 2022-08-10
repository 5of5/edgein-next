import { Magic } from "magic-sdk";
import type { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { IconSpinner } from "./Icons";
import { ElemButton } from "./ElemButton";
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

export default function ForgotPasswordModal(props) {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [finishingLogin, setFinishingLogin] = useState(
        Boolean(router.query.email)
    );

    const handleSubmit = async () => {
        // event.preventDefault();
        // setIsLoading(true);


        // try {
        //     await fetch("/api/login_attempt/", {
        //         method: "POST",
        //         headers: {
        //             Accept: "application/json",
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify({ email }),
        //     });

        //     // the Magic code
        //     const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUB_KEY || "");
        //     const did = await magic.auth.loginWithMagicLink({
        //         email,
        //         redirectURI: location.href
        //     });
        //     await login(did);
        // } catch (e) {
        //     console.log(e);
        //     alert("Error Logging In");
        //     setIsLoading(false);
        // }
    };

    const onClose = () => {
        props.onClose();
    }

    const onBack = () => {
        props.onBack();
    }

    return (
        <Modal
            isOpen={props.show}
            // onAfterOpen={afterOpenModal}
            onRequestClose={onClose}
            style={customStyles}
            contentLabel="Forgot Password Modal"
        >
           
            <div className="relative max-w-xl mx-auto ">
                <div className="bg-white rounded-2xl  p-6">
                    {finishingLogin ? (
                        <>
                            <h1 className="text-3xl lg:text-4xl font-bold">
                                Redirecting...
								<IconSpinner className="animate-spin mt-2 h-5 w-5" />
                            </h1>
                        </>
                    ) : (
                            <>
                                <div className="group sm:col-span-1 flex" style={{ justifyContent: 'space-between' }}>
                                    <button onClick={onBack}>Back</button>
                                    <button onClick={onClose}>Close</button>
                                </div>

                                <h1 className="text-3xl lg:text-4xl font-bold mt-6">Forgot Password</h1>
                                <p className="mt-2 text-xl text-dark-400">
                                    {"A recovery link will be sent to the email below."}
                                </p>
                                <div
                                    className="relative grid grid-cols-1 gap-y-4 mt-6 sm:grid-cols-2 sm:gap-x-8"
                                >
                                    <div className="group sm:col-span-2">
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
                                    </div>

                                    <div className="text-right sm:col-span-2">
                                        <ElemButton onClick={handleSubmit} btn="primary" loading={isLoading}>
                                            Send Link
									</ElemButton>
                                    </div>
                                </div>
                            </>
                        )}
                </div>
            </div>
        </Modal>
    )
}

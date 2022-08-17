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
        //marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        zindex: 100000,
        opacity: 1,
        borderRadius: 20,
        overlay: { backgroundColor: 'red', opacity: 1 }
    },
};

export default function ForgotPasswordModal(props) {

    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isMailSent, setIsMailSent] = useState(false)

    const handleSubmit = async () => {
        if(!email){
            alert("Enter email!")
            return;
        }
        try {
            const response = await fetch("/api/change_password/", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email}),
            }).then(res => res.json());
            if (response.success === true) {
                setIsMailSent(true)
            }

        } catch (e) {
            // setIsMailSent(true)
            console.log(e);
            setIsLoading(false);
        }
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
           
            <div className="relative max-w-md mx-auto ">
                <div className="bg-white rounded-2xl  p-6">
                    {
                        isMailSent ? 
                        <>
                        <h1 className="text-center text-2xl lg:text-3xl font-bold">Email Sent</h1>
                                <p className="mt-2 text-md text-dark-400 text-center">
                                    {`We sent an email to ${email}! if this email is connected to an EdgeIn account, you'll be able to reset your password.`}
                                </p>
                                <div className="text-center sm:col-span-3 mt-10">
                                    <ElemButton className="w-full" onClick={onBack} btn="primary" loading={isLoading}>
                                        Back to login
                                </ElemButton>
                                </div>
                        </>
                        :
                        <>
                               
                        <h1 className="text-center text-2xl lg:text-3xl font-bold mt-6">Reset Password</h1>
                        {/* <p className="mt-2 text-xl text-dark-400">
                            {"A recovery link will be sent to the email below."}
                        </p> */}
                        <div
                            className="relative grid grid-cols-1 gap-y-4 mt-6 sm:grid-cols-2 sm:gap-x-8"
                        >
                            <div className="group sm:col-span-2">
                               
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
                                <ElemButton className="w-full" onClick={handleSubmit} btn="primary" loading={isLoading}>
                                    Send a password reset email
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

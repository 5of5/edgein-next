import type { GetStaticProps } from "next";
import { useEffect, useState } from "react";
import { ElemButton } from "../components/ElemButton";
import Modal from "react-modal";
import { ElemLogo } from "./ElemLogo";
const validator = require("validator");

Modal.setAppElement("#modal-root");

type Props = {
	show: boolean;
	onSignUp: (email: string, password: string) => void;
	onForgotPassword: () => void;
	onClose: () => void;
};

export default function LoginModal(props: Props) {
	useEffect(() => {
		setEmail("");
		setPassword("");
		setEmailError("");
		setErrorMessage("");
		setUnsuccessMessage("")
	}, [props.show]);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");;
	const [isLoading, setIsLoading] = useState(false);
	const [emailError, setEmailError] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [unsuccessMessage, setUnsuccessMessage] = useState('')

	const validateEmail = (value: string) => {
		setEmail(value);
		if (validator.isEmail(value)) {
			setEmailError("");
		} else {
			setEmailError("Enter valid Email!");
		}
	};

	const validate = (value: string) => {
		setPassword(value);
		if (
			validator.isStrongPassword(value, {
				minLength: 8,
				minLowercase: 1,
				minUppercase: 1,
				minNumbers: 1,
				minSymbols: 1,
			})
		) {
			setErrorMessage("");
		} else {
			setErrorMessage(
				"Password should have least 8 characters including a lower-case letter, an upper-case letter, a number, a special character"
			);
		}
	};

	const onLogin = async () => {
		validateEmail(email);

		if (emailError || !email) {
			return;
		}
		try {
			const response = await fetch("/api/signin/", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});
			
			if (response.status === 401 || response.status === 403) {
				const responseText = await response.clone().text();
				setUnsuccessMessage(responseText)
			}
			else if(response.status ===  404){ // 404 returns in both cases
				try{
					const res = await response.clone().json();
					if (res.nextStep && res.nextStep === "SIGNUP") {
						onSignUp(email, password);
					}
				}catch(err){
					const waitlistRes = await response.clone().text();
					if(waitlistRes === "Invalid Email"){
						setUnsuccessMessage(`Your email ${email} has been added to our waitlist.  We'll be in touch soon!`)
					}
				}
			}
			else if(response.status === 200){
				window.location.href = "/";
			}
			
		} catch (e) {
			console.log(e);
			setIsLoading(false);
		}
	};

	const onSignUp = (email: string, password: string) => {
		props.onSignUp(email, password);
	};

	const onClose = () => {
		props.onClose();
	};

	const onForgotPassword = () => {
		props.onClose();
		props.onForgotPassword();
	};

	return (
		<Modal
			isOpen={props.show}
			// onAfterOpen={afterOpenModal}
			onRequestClose={onClose}
			overlayClassName="fixed top-0 left-0 z-[50] flex items-center justify-center h-screen w-screen p-6 cursor-auto bg-black/20 backdrop-blur-sm"
			className="animate-fade-in-up relative z-[50] max-w-sm w-full mx-auto my-0 min-h-0 flex flex-col rounded-lg shadow-2xl bg-white overflow-y-scroll overflow-x-hidden focus:outline-none focus:ring-0"
			contentLabel="Login Modal"
		>
			<div className="relative max-w-md mx-auto">
				<div className="bg-white rounded-2xl p-10 center">
					{unsuccessMessage ? (
						<>
							{/* <h1 className="text-center text-2xl lg:text-3xl font-bold">Registration Complete</h1> */}
							<p className="mt-2 text-md text-dark-400 text-center">
								{unsuccessMessage}
							</p>
						</>
					)  : (
						<>
							<ElemLogo
								mode="icon"
								className="text-center h-8 w-30 scale-95 mx-32 mb-10"
							/>
							<h1 className="text-center text-2xl lg:text-3xl font-bold">
								Welcome to EdgeIn
							</h1>
							{/* <div className="text-center sm:col-span-3 mt-5">
                                    <ElemButton roundedFull={false} className="w-full rounded-md text-blue-md border border-slate-300" onClick={() => { }} btn="ol-primary" >
                                        Continue with LinkedIn
                                </ElemButton>
                                </div> */}
							{/* <div className="text-center sm:col-span-3 mt-5">
                                    <span className="text-gray-300 text-sm text-light">----------------------------<b className="text-dark-600">{` or `}</b>----------------------------</span>
                                </div> */}
							<div className="text-center relative grid grid-cols-1 gap-y-4 mt-6 sm:grid-cols-1 sm:gap-x-0">
								<div className="group sm:col-span-1">
									<input
										name="email"
										type="email"
										value={email}
										disabled={isLoading}
										onChange={(event) => validateEmail(event?.target.value)}
										placeholder="Email"
										className="w-full mt-1 px-3 py-1.5 text-md text-dark-500 relative bg-white rounded-md border border-slate-300 outline-none placeholder:text-gray-300  focus:outline-none focus:border-primary-500 focus:ring focus:ring-primary-100"
									/>
									{emailError === "" ? null : (
										<span className="w-full text-start text-sm">
											{emailError}
										</span>
									)}
									<input
										name="password"
										type="password"
										value={password}
										disabled={isLoading}
										onChange={(event) => validate(event?.target.value)}
										placeholder="Password"
										className="w-full mt-1 px-3 py-1.5 text-md text-dark-500 relative bg-white rounded-md border border-slate-300 outline-none placeholder:text-gray-300  focus:outline-none focus:border-primary-500 focus:ring focus:ring-primary-100"
									/>
									{errorMessage === "" ? null : (
										<span className="w-full text-start text-sm">
											{errorMessage}
										</span>
									)}
								</div>

								<div className="text-center sm:col-span-3">
									<ElemButton
										className="w-full"
										onClick={onLogin}
										btn="primary"
										loading={isLoading}
									>
										Login
									</ElemButton>
								</div>
								<div className="text-center sm:col-span-3">
									<ElemButton
										className="w-full text-blue-500 text-sm font-light"
										onClick={onForgotPassword}
										btn="transparent"
										loading={isLoading}
									>
										Forgot Password?
									</ElemButton>
								</div>
								<div className="text-center sm:col-span-3">
									<ElemButton
										className="w-full"
										onClick={() => onSignUp("", "")}
										btn="ol-primary"
										loading={isLoading}
									>
										Create an account
									</ElemButton>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</Modal>
	);
}

import type { GetStaticProps } from "next";
import { useEffect, useState, Fragment } from "react";
import { ElemButton } from "@/components/ElemButton";
import { InputText } from "@/components/InputText";
import { ElemLogo } from "./ElemLogo";
import { IconLinkedIn } from "./Icons";
import { Dialog, Transition } from "@headlessui/react";
const validator = require("validator");

type Props = {
	show: boolean;
	onSignUp: (email: string, password: string) => void;
	onForgotPassword: () => void;
	onClose: () => void;
	linkedInError: string;
};

export default function LoginModal(props: Props) {
	useEffect(() => {
		setEmail("");
		setPassword("");
		setEmailError("");
		setErrorMessage("");
		setUnsuccessMessage(props.linkedInError ? props.linkedInError : "");
	}, [props.show, props.linkedInError]);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [emailError, setEmailError] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [unsuccessMessage, setUnsuccessMessage] = useState("");

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
		validate(password);
		validateEmail(email);

		if (emailError || !email || !password) {
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

			if (response.status === 200) {
				window.location.href = "/";
			} else {
				try {
					const res = await response.clone().json();
					if (res.nextStep && res.nextStep === "SIGNUP") {
						onSignUp(email, password);
					} else {
						setUnsuccessMessage(res.message);
					}
				} catch (err) {
					setIsLoading(false);
				}
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

	const onLinkedInClick = () => {
		const url = `${process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL}/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}&connection=linkedin&redirect_uri=${process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URL}&scope=openid%20profile%20email%20offline_access`;
		window.location.href = url;
	};

	return (
		<>
			<Transition.Root show={props.show} as={Fragment}>
				<Dialog as="div" onClose={onClose} className="relative z-[60]">
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed z-10 inset-0 bg-black/20 transition-opacity backdrop-blur-sm" />
					</Transition.Child>

					<div className="fixed inset-0 z-[50] m-6 min-h-0 flex flex-col items-center justify-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-300"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<Dialog.Panel className="max-w-2xl w-full p-6 mx-auto rounded-lg shadow-2xl bg-white overflow-x-hidden overflow-y-scroll overscroll-y-none lg:p-12">
								<div className="max-w-xs mx-auto w-full">
									{unsuccessMessage ? (
										<>
											{/* <h1 className="text-center text-2xl lg:text-3xl font-bold">Registration Complete</h1> */}
											<p className="mt-2 text-dark-400 text-center">
												{unsuccessMessage}
											</p>
										</>
									) : (
										<>
											<div className="flex items-center h-12 w-12 p-2 mx-auto rounded-full shadow">
												<ElemLogo mode="icon" className="w-10 aspect-square" />
											</div>
											<h1 className="mt-4 text-2xl text-center font-bold lg:text-3xl">
												Log In
											</h1>
											<ElemButton
												roundedFull={false}
												onClick={onLinkedInClick}
												btn="transparent"
												className="w-full mt-5 gap-x-2 text-center rounded-md text-[#0077B5] ring-1 ring-inset ring-black/10 hover:ring-2 hover:ring-[#0077B5] hover:text-[#0077B5] hover:bg-slate-50"
											>
												<IconLinkedIn
													title="LinkedIn"
													className="h-6 w-6 text-[#0077B5]"
												/>
												Login with LinkedIn
											</ElemButton>

											<div className="flex py-3 items-center">
												<div className="flex-grow border-t border-black/10"></div>
												<span className="flex-shrink mx-4 font-bold">or</span>
												<div className="flex-grow border-t border-black/10"></div>
											</div>

											<div className="flex flex-col space-y-2">
												<label>
													<InputText
														name="email"
														type="email"
														value={email}
														disabled={isLoading}
														onChange={(event) =>
															validateEmail(event?.target.value)
														}
														placeholder="Email"
														className={`${
															emailError === ""
																? "ring-1 ring-slate-200"
																: "ring-2 ring-rose-400 focus:ring-rose-400 hover:ring-rose-400"
														}`}
													/>
													{emailError === "" ? null : (
														<div className="mt-2 font-bold text-sm text-rose-400">
															{emailError}
														</div>
													)}
												</label>
												<label>
													<InputText
														name="password"
														type="password"
														value={password}
														disabled={isLoading}
														onChange={(event) => validate(event?.target.value)}
														placeholder="Password"
														className={`${
															errorMessage === ""
																? "ring-1 ring-slate-200"
																: "ring-2 ring-rose-400 focus:ring-rose-400 hover:ring-rose-400"
														}`}
													/>
													{errorMessage === "" ? null : (
														<div className="mt-2 font-bold text-sm text-rose-400">
															{errorMessage}
														</div>
													)}
												</label>
												<button
													onClick={onForgotPassword}
													className="w-full text-right text-sm underline text-slate-600 hover:text-primary-500"
												>
													Forgot Password?
												</button>

												<div>
													<ElemButton
														className="w-full my-2"
														onClick={onLogin}
														btn="primary"
														loading={isLoading}
													>
														Login
													</ElemButton>
												</div>

												<div>
													<div className="w-full mt-4 text-sm text-center text-slate-600">
														Don&rsquo;t have an account?
														<button
															onClick={() => onSignUp("", "")}
															className="inline underline ml-0.5 text-dark-500 hover:text-primary-500"
														>
															Sign up
														</button>
													</div>
												</div>
											</div>
										</>
									)}
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition.Root>
		</>
	);
}

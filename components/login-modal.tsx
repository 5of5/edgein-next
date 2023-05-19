import { useEffect, useState, Fragment } from "react";
import { ElemButton } from "@/components/elem-button";
import { InputText } from "@/components/input-text";
import { ElemLogo } from "./elem-logo";
import { IconLinkedIn, IconExclamationTriangle } from "./icons";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
const validator = require("validator");

type Props = {
	show: boolean;
	onSignUp: (email: string, password: string) => void;
	onForgotPassword: () => void;
	onClose: () => void;
	linkedInError: string;
};

export default function LoginModal(props: Props) {
	const router = useRouter();

	useEffect(() => {
		setEmail("");
		setPassword("");
		setEmailError("");
		setPasswordError("");
		setUnsuccessMessage(props.linkedInError ? props.linkedInError : "");
	}, [props.show, props.linkedInError]);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [unsuccessMessage, setUnsuccessMessage] = useState("");

	const validateEmail = (value: string) => {
		if (validator.isEmail(value)) {
			setEmailError("");
		} else {
			setEmailError("Enter valid email");
		}
	};

	const validatePassword = (value: string) => {
		if (
			validator.isStrongPassword(value, {
				minLength: 8,
				minLowercase: 1,
				minUppercase: 1,
				minNumbers: 1,
				minSymbols: 1,
			})
		) {
			setPasswordError("");
		} else {
			setPasswordError("Invalid password");
		}
	};

	const onLogin = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();
		setIsLoading(true);

		validateEmail(email);
		validatePassword(password);

		if (emailError || passwordError || !email || !password) {
			setIsLoading(false);
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
				if (router.query.redirect) {
					window.location.href = router.query.redirect as string;
				} else {
					window.location.href = "/";
				}
			} else {
				try {
					const res = await response.clone().json();
					if (res.nextStep && res.nextStep === "SIGNUP") {
						onSignUp(email, password);
					} else {
						setIsLoading(false);
						setUnsuccessMessage("Incorrect email or password."); //res.message
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
							<Dialog.Panel className="max-w-lg w-full p-6 mx-auto rounded-lg shadow-2xl bg-white overflow-x-hidden overflow-y-auto overscroll-y-none scrollbar-hide lg:p-12">
								<div className="max-w-xs mx-auto w-full">
									<div className="flex items-center h-12 w-12 p-2 mx-auto rounded-full shadow">
										<ElemLogo mode="icon" className="w-10 aspect-square" />
									</div>
									<h1 className="mt-4 text-2xl text-center font-bold lg:text-3xl">
										Login
									</h1>
									<ElemButton
										roundedFull={false}
										onClick={onLinkedInClick}
										btn="transparent"
										className="w-full mt-5 gap-x-2 text-center rounded-full text-[#0077B5] bg-white ring-1 ring-slate-200 hover:bg-slate-200 hover:!text-[#0077B5]"
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

									<div>
										<form onSubmit={onLogin}>
											<div className="flex flex-col space-y-4">
												<label>
													<span className="text-sm font-medium">Email</span>
													<InputText
														name="email"
														type="email"
														value={email}
														disabled={isLoading}
														onChange={(event) => setEmail(event?.target.value)}
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
													<span className="text-sm font-medium">
														<div className="flex justify-between">
															<span>Password</span>
															<span
																onClick={onForgotPassword}
																className="text-primary-500 cursor-pointer hover:underline"
															>
																Forgot your password?
															</span>
														</div>
													</span>
													<InputText
														name="password"
														type="password"
														value={password}
														disabled={isLoading}
														onChange={(event) =>
															setPassword(event?.target.value)
														}
														className={`${
															passwordError === ""
																? "ring-1 ring-slate-200"
																: "ring-2 ring-rose-400 focus:ring-rose-400 hover:ring-rose-400"
														}`}
													/>
													{passwordError === "" ? null : (
														<div className="mt-2 font-bold text-sm text-rose-400">
															{passwordError}
														</div>
													)}
												</label>

												{unsuccessMessage && (
													<p className="mt-1 flex items-center font-bold text-sm text-red-500">
														<IconExclamationTriangle className="h-5 w-5 mr-1" />
														{unsuccessMessage}
													</p>
												)}
												{/* <button
														onClick={onForgotPassword}
														type="button"
														className="w-full text-right text-sm underline text-slate-600 hover:text-primary-500"
													>
														Forgot your password?
													</button> */}
												{/* 
														<button
															//onClick={onLogin}
															type="submit"
															className="inline-flex items-center font-bold focus:outline-none focus:ring-0 text-white from-blue-800 via-primary-500 to-primary-400 bg-gradient-to-r hover:opacity-80 my-2 px-4 py-1.5 rounded-full justify-center w-full"
														>
															Login
														</button> */}
												<ElemButton
													className="w-full mt-10"
													btn="primary"
													loading={isLoading}
												>
													Login
												</ElemButton>
											</div>
										</form>

										<div>
											<div className="w-full mt-6 text-sm text-center text-slate-600">
												Don&rsquo;t have an account?
												<button
													onClick={() => onSignUp("", "")}
													className="inline ml-0.5 text-primary-500 hover:underline"
												>
													Sign up
												</button>
											</div>
										</div>
									</div>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition.Root>
		</>
	);
}
